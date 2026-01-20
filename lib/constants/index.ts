import IconHorizontal from "@/components/icons/IconHorizontal";

// ENDPOINTS
export const endpoint = {
  cloudinarySigning: "/api/sign-cloudinary-params",
  uploadTemplate: "/api/templates",
  fetchTemplates: `/api/templates`,
};

// CLOUDINARY PRESETS
export const cloudinaryPreset = {
  videoPreview: "video_template_preview",
};

export const APP = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || "Video Bumper Factory",
  DESCRIPTION: "We Turn Your Logo Into an Animation",
  URL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
};

export const CATEGORY_TYPE = [
  {
    label: "Horizontal",
    icon: IconHorizontal,
  },
  {
    label: "Vertical",
    icon: "",
  },
] as const;

export const params = {
  FILTER: "filter",
};
