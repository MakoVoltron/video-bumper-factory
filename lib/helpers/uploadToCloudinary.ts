import type { UploadApiResponse } from "cloudinary";
import getCloudinary from "@/lib/upload/cloudinary";

export async function uploadToCloudinary(
  file: File,
  type: "image" | "video",
  folder?: string,
): Promise<UploadApiResponse | undefined> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const cloudinary = await getCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: type,
          folder: folder ?? "videobumper",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
}
