import IconHorizontal from "@/components/icons/IconHorizontal";
import IconVertical from "@/components/icons/IconVertical";

// DEFAULTS
export const defaultValues = {
  emailFrom: "onboarding@resend.dev",
};

// ENDPOINTS
export const endpoint = {
  cloudinarySigning: "/sign-cloudinary-params",
  templates: "/api/templates",
  createSession: "/stripe/create-checkout-session",
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

export const MAX_FILE_SIZE_MB = 40;

export const APP = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || "Video Bumper Factory",
  DESCRIPTION:
    "Professional done-for-you business logo animation service. Get animated logo bumpers for TikTok, YouTube & Reels in 48h. Only $99. Done by real humans.",
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
  paymentIntent: "/stripe/payment-intent",
};

export const acceptedFiles = ".png, .jpg, .jpeg, .zip, .ai, .psd";
