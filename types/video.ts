import z from "zod";
import { addNewTemplateSchema } from "../lib/validators";

export type Template = z.infer<typeof addNewTemplateSchema> & {
  id: string;
  createdAt: Date;
};

export type VideoAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger";
  icon?: React.ReactNode;
};

type VideoMode = "hover" | "loop";

export type VideoPreviewProps = Pick<Template, "posterUrl" | "videoUrl"> & {
  id?: string;
  mute?: boolean;
  mode?: VideoMode;
  actions?: VideoAction[];
  onClick?: () => void;
};
