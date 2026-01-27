import { deleteTemplate } from "@/lib/actions/templates";
import { queryKey } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.templates] });
    },
    onError: (error) => {
      toast.error("Failed to delete template");
    },
  });
};
