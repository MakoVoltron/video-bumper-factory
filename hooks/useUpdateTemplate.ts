import { endpoint, queryKey } from "@/lib/constants";
import { UploadTemplateProps } from "@/types/video";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

async function updateTemplate({ formData, onProgress }: UploadTemplateProps) {
  const url = endpoint.templates;
  const res = axios.put(url, formData, {
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

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, UploadTemplateProps>({
    mutationFn: updateTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.templates] });
    },
  });
};
