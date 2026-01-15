import { z } from "zod";

// Schema for adding templates
export const addNewTemplateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  previewUrl: z.string(),
  posterUrl: z.string(),
  posterPublicId: z.string(),
  videoUrl: z.string(),
  videoPublicId: z.string(),
  category: z.string().min(3, "Category must be at least 3 characters"),
  isFeatured: z.boolean(),
  orderPriority: z.number().optional,
  price: z.number(),
});
