import z from "zod";
import { addNewTemplateSchema } from "../lib/validators";
import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";

export type Template = z.infer<typeof addNewTemplateSchema> & {
  id: string;
  createdAt: Date;
  category: CategoryLabels;
};

export type VideoAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger";
  icon?: React.ReactNode;
};

export type VideoMode = "hover" | "loop";

export type VideoPreviewProps = Pick<Template, "posterUrl" | "videoUrl"> & {
  id?: string;
  mute?: boolean;
  mode?: VideoMode;
  actions?: VideoAction[];
  onClick?: () => void;
};

export type UploadTemplateProps = {
  formData: FormData;
  onProgress?: (percent: number) => void;
};
