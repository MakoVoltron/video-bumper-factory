export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import getCloudinary from "@/lib/upload/cloudinary";
import { CloudinaryUploadResult } from "@/lib/helpers/uploadToCloudinary";

export async function POST(req: Request) {
  const cloudinary = await getCloudinary();

  const formData = await req.formData();
  const posterFile = formData.get("poster") as File | null;

  if (!posterFile) {
    return NextResponse.json({ error: "No poster provided" }, { status: 400 });
  }

  const posterBuffer = Buffer.from(await posterFile.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "videobumper",
          resource_type: posterFile.type.startsWith("video/")
            ? "video"
            : "image",
        },
        (error: Error | null, result: CloudinaryUploadResult | undefined) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      )
      .end(posterBuffer);
  });

  return NextResponse.json(result);
}
