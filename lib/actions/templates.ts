import z from "zod";
import { addNewTemplateSchema } from "../validators";
import { prisma } from "../db/client";

// Add template
export async function createNewTemplate(
  data: z.infer<typeof addNewTemplateSchema>
) {
  try {
    const template = addNewTemplateSchema.parse(data);

    await prisma.templatePreview.create({ data: template });

    return { success: true, message: "Template added successfully" };
  } catch (error) {
    return {
      success: false,
      message: `There was an error with adding template, ${error}`,
    };
  }
}
