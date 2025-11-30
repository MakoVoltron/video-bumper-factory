import z from "zod";
import { addNewTemplateSchema } from "../lib/validators";

export type Template = z.infer<typeof addNewTemplateSchema> & {
  id: string;
  createdAt: Date;
};
