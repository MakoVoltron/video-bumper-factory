import { endpoint } from "@/lib/constants";
import { UploadTemplateProps } from "@/types/video";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

async function uploadTemplate({ formData, onProgress }: UploadTemplateProps) {
  const url = endpoint.templates;
  const res = axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e) => {
      if (!e.total) return;
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress?.(percent);
    },
  });

  return res;
}

export const useUploadTemplate = () => {
  return useMutation<AxiosResponse, Error, UploadTemplateProps>({
    mutationFn: uploadTemplate,
  });
};
