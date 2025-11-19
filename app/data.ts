import { TemplateProp } from "@/components/TemplateGrid";
import { TimerIcon, BotOffIcon, TagIcon } from "lucide-react";

export const featuresData = [
  {
    title: "Swanky fast",
    text: "Your bumper gets ready within 48h since confirmed order - or it's on us!",
    icon: TimerIcon,
  },
  {
    title: "Handcrafted by Humans",
    text: "In the world of impersonal automation, we refine each piece with warm human touch.",
    icon: BotOffIcon,
  },
  {
    title: "Straightforward Pricing",
    text: "No marketing gimmicks, hidden fees and upsells. What you see is what you get - all for $99.",
    icon: TagIcon,
  },
];

export const testimonialData = [
  {
    id: 0,
    name: "Mia Lux",
    profile: "/testimonials/Mia Lux_profile.jpg",
    title: "Digital Creator",
    company: "",
    text: "Above and beyond expectations. Improved my overall design and created a fantastic bumper that captured the feel I was looking for. Quick and professional to boot!",
  },
  {
    id: 1,
    name: "Will Hinkson",
    profile: "/testimonials/Will Hinkson_profile.jpg",
    title: "Sales Strategist",
    company: "Force Blue",
    text: "Great service. Highly recommended and quick turnaround time!",
  },
  {
    id: 2,
    name: "Jim Wendt",
    profile: "/testimonials/Jim Wendt_profile.jpg",
    title: "Marketing Expert",
    company: "",
    text: "VBF exceeded my expectations. Very easy to work with. These video bumpers will play a key part of our new branding roll out. Can't wait to slap these on some video clips. Well done Video Bumper Factory!",
  },
  {
    id: 3,
    name: "Ikmal Ezzani",
    profile: "/testimonials/Ikmal Ezzani_profile.jpg",
    title: "Shared Workshop Owner",
    company: "",
    text: "I'm so pleased with our video bumper for our build videos. It was made very promptly and yet so awesome. Really pleased to have your work with us. Thank you!",
  },
];

export const FILTER_TYPE = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

export const templates: TemplateProp[] = [
  {
    id: 0,
    name: "01",
    poster: "/preview/01_thumbnail.jpg",
    preview: "/preview/01_preview.mp4",
    category: FILTER_TYPE.VERTICAL,
  },
  {
    id: 1,
    name: "01",
    poster: "/preview/01_thumbnail.jpg",
    preview: "/preview/01_preview.mp4",
    category: FILTER_TYPE.VERTICAL,
  },
  {
    id: 2,
    name: "01",
    poster: "/preview/01_thumbnail.jpg",
    preview: "/preview/01_preview.mp4",
    category: FILTER_TYPE.VERTICAL,
  },
  {
    id: 3,
    name: "01",
    poster: "/preview/01_thumbnail.jpg",
    preview: "/preview/01_preview.mp4",
    category: FILTER_TYPE.VERTICAL,
  },
  {
    id: 4,
    name: "01",
    poster: "/preview/01_thumbnail.jpg",
    preview: "/preview/01_preview.mp4",
    category: FILTER_TYPE.VERTICAL,
  },
];
