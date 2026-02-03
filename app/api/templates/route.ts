import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { uploadToCloudinary } from "@/lib/helpers/uploadToCloudinary";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/upload/cloudinary";
import { params } from "@/lib/constants";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get(params.FILTER);

  const templates = await prisma.templatePreview.findMany({
    where: category ? { category } : undefined,
  });

  return new Response(JSON.stringify(templates), { status: 200 });
}

export type UploadedMedia = {
  poster?: UploadApiResponse;
  video?: UploadApiResponse;
};

type UpdatedData = {
  title: string;
  category: string;
  posterUrl?: string;
  posterPublicId?: string;
  videoUrl?: string;
  videoPublicId?: string;
};

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const poster = formData.get("poster") as File;
  const video = formData.get("video") as File;

  if (!poster || !video) {
    return NextResponse.json(
      {
        error: "Poster and video are required",
      },
      { status: 400 },
    );
  }

  const uploaded: UploadedMedia = {};

  try {
    // upload poster
    uploaded.poster = await uploadToCloudinary(poster, "image");

    // upload video
    uploaded.video = await uploadToCloudinary(video, "video");

    if (!uploaded.poster || !uploaded.video) return;

    const template = await prisma.templatePreview.create({
      data: {
        title,
        category,
        posterUrl: uploaded.poster.secure_url,
        posterPublicId: uploaded.poster.public_id,
        videoUrl: uploaded.video.secure_url,
        videoPublicId: uploaded.video.public_id,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    // rollback Cloudinary uploads if Prisma fails
    if (uploaded.poster?.public_id) {
      await cloudinary.uploader.destroy(uploaded.poster.public_id);
    }
    if (uploaded.video?.public_id) {
      await cloudinary.uploader.destroy(uploaded.video.public_id, {
        resource_type: "video",
      });
    }
    console.log(error);
  }
}

export async function PUT(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json(
      {
        error: "Forbidden",
      },
      { status: 401 },
    );
  }

  const formData = await req.formData();

  const id = formData.get("videoId") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const posterFile = formData.get("poster") as File | null;
  const videoFile = formData.get("video") as File | null;

  if (!id || !title || !category)
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );

  const template = await prisma.templatePreview.findUnique({ where: { id } });

  if (!template) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updatedData: UpdatedData = {
    title,
    category,
  };

  try {
    // poster update
    if (posterFile) {
      const uploadedPoster = await uploadToCloudinary(posterFile, "image");
      updatedData.posterUrl = uploadedPoster?.secure_url;
      updatedData.posterPublicId = uploadedPoster?.public_id;

      await cloudinary.uploader.destroy(template.posterPublicId);
    }

    // video update
    if (videoFile) {
      const video = await uploadToCloudinary(videoFile, "video");
      updatedData.videoUrl = video?.secure_url;
      updatedData.videoPublicId = video?.public_id;

      await cloudinary.uploader.destroy(template.videoPublicId, {
        resource_type: "video",
      });
    }

    const updated = await prisma.templatePreview.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Templated update failed: ", error);
    return NextResponse.json(
      {
        error: "Failed to update template",
      },
      { status: 500 },
    );
  }
}
