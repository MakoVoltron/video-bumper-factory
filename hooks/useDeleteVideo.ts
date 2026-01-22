import { deleteTemplate } from "@/lib/actions/templates";
import { queryKey } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoId: string) => {
      await deleteTemplate(videoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.templates] });
    },
  });
};
