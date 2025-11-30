import { z } from "zod";

// Schema for adding templates
export const addNewTemplateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  previewUrl: z.string(),
  posterUrl: z.string(),
  isFeatured: z.boolean(),
  orderPriority: z.number().optional,
  price: z.number(),
});
