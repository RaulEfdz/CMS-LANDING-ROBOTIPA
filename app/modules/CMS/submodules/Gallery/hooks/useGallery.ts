import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/actions";
import { GalleryImage } from "../types";

export function useGallery() {
  const queryClient = useQueryClient();

  const listQuery = useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: api.listItems,
  });

  const createMutation = useMutation({
    mutationFn: api.createItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<GalleryImage> }) =>
      api.updateItem(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery"] }),
  });

  return {
    listQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
