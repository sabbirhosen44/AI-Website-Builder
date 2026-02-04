import { projectApi } from "@/api/projects.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      message,
    }: {
      projectId: string;
      message: string;
    }) => projectApi.updateProject(projectId, { message }),
    onSuccess: async (data, { projectId }) => {
      // Refetch once to show the user message that was just added
      await queryClient.refetchQueries({
        queryKey: ["project", projectId],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      toast.success("Project is being updated...");
      // Polling will handle subsequent updates for the assistant response
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update project");
    },
  });
};

export const useRollbackToVersion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      versionId,
    }: {
      projectId: string;
      versionId: string;
    }) => projectApi.rollbackToVersion(projectId, versionId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success("Project rolled back successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to rollback project",
      );
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete project");
    },
  });
};

export const useGetProjectPreview = (projectId: string) => {
  return useQuery({
    queryKey: ["projectPreview", projectId],
    queryFn: () => projectApi.getProjectPreview(projectId),
    enabled: !!projectId,
  });
};

export const useGetPublishedProjects = () => {
  return useQuery({
    queryKey: ["publishedProjects"],
    queryFn: projectApi.getPublishedProjects,
  });
};

export const useGetUserProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectApi.getUserProjects,
  });
};

export const useGetProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ["publicProject", projectId],
    queryFn: () => projectApi.getProjectById(projectId),
    enabled: !!projectId,
  });
};

export const useSaveProjectCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, code }: { projectId: string; code: string }) =>
      projectApi.saveProjectCode(projectId, { code }),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success("Project saved successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to save project");
    },
  });
};
