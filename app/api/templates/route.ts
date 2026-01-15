import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { uploadToCloudinary } from "@/lib/helpers/uploadToCloudinary";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/upload/cloudinary";

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
      { status: 400 }
    );
  }

  type UploadedMedia = {
    poster?: UploadApiResponse;
    video?: UploadApiResponse;
  };

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
