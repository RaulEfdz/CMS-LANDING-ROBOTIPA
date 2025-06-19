import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/actions";
import { Project } from "../types";

export function useProjectCards() {
  const queryClient = useQueryClient();

  const listQuery = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: api.listItems,
  });

  const createMutation = useMutation({
    mutationFn: api.createItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<Project> }) =>
      api.updateItem(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  return {
    listQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useGetProjectCard(id: string) {
  return useQuery<Project>({
    queryKey: ["projects", id],
    queryFn: () => api.getItem(id),
    enabled: !!id,
  });
}
