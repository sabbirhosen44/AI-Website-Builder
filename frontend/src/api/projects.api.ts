import { axiosInstance } from "@/lib/axios";

export const projectApi = {
  updateProject: async (projectId: string, payload: { message: string }) => {
    const { data } = await axiosInstance.post(
      `/projects/${projectId}/update`,
      payload,
    );
    return data;
  },

  rollbackToVersion: async (projectId: string, versionId: string) => {
    const { data } = await axiosInstance.get(
      `/projects/${projectId}/versions/${versionId}/rollback`,
    );
    return data;
  },

  deleteProject: async (projectId: string) => {
    const { data } = await axiosInstance.delete(`/projects/${projectId}`);
    return data;
  },

  getUserProjects: async () => {
    const { data } = await axiosInstance.get("/projects");
    return data;
  },

  getProjectPreview: async (projectId: string) => {
    const { data } = await axiosInstance.get(`/projects/${projectId}/preview`);
    return data;
  },

  getPublishedProjects: async () => {
    const { data } = await axiosInstance.get("/projects/published");
    return data;
  },

  getProjectById: async (projectId: string) => {
    const { data } = await axiosInstance.get(`/projects/${projectId}`);
    return data;
  },

  saveProjectCode: async (projectId: string, payload: { code: string }) => {
    const { data } = await axiosInstance.put(
      `/projects/${projectId}/save`,
      payload,
    );
    return data;
  },
};
