// import type { UploadApiResponse } from "cloudinary";
import getCloudinary from "@/lib/upload/cloudinary";

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

export async function uploadToCloudinary(
  file: File,
  type: "image" | "video",
  folder?: string,
): Promise<CloudinaryUploadResult | undefined> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const cloudinary = await getCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: type,
          folder: folder ?? "videobumper",
        },
        (error: Error | null, result: CloudinaryUploadResult | undefined) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
}
