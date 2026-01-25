import { userApi } from "@/api/users.api";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCredits = () => {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["credits"],
    queryFn: userApi.getCredits,
    enabled: !!session?.user,
  });
};

export const usePurchaseCredits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.purchaseCredits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      toast.success("Credits purchased successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to purchase credits",
      );
    },
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: userApi.getProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      toast.success("Project created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create project");
    },
  });
};

export const useGetProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => userApi.getProject(projectId),
    enabled: !!projectId,
  });
};

export const useTogglePublish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.togglePublish,
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success("Project publish status updated!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update publish status",
      );
    },
  });
};
