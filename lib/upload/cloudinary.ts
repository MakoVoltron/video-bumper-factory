/* eslint-disable @typescript-eslint/no-explicit-any */
let cloudinaryInstance: any = null;

const getCloudinary = async () => {
  if (!cloudinaryInstance) {
    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    cloudinaryInstance = cloudinary;
  }
  return cloudinaryInstance;
};

export default getCloudinary;
