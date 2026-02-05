import IconHorizontal from "@/components/icons/IconHorizontal";
import IconVertical from "@/components/icons/IconVertical";

// ENDPOINTS
export const endpoint = {
  cloudinarySigning: "/api/sign-cloudinary-params",
  templates: "/api/templates",
  createSession: "/create-checkout-session",
};

// QUERY KEYS
export const queryKey = {
  templates: "templates",
};

// CLOUDINARY PRESETS
export const cloudinaryPreset = {
  videoPreview: "video_template_preview",
  user_logo_upload: "user_logo_upload",
};

export const MAX_FILE_SIZE_MB = 40 * 1024 * 1024;

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
    icon: IconVertical,
  },
] as const;

export const params = {
  FILTER: "filter",
  PAYMENT_INTENT: "payment_intent", // as per requested by Stripe
  PAYMENT_INTENT_ID: "paymentIntentId",
};

export const product = {
  price: 9900, //cents
  currency: "usd",
};

export const route = {
  success: "/payment/success",
  paymentIntent: "/payment-intent/",
};
