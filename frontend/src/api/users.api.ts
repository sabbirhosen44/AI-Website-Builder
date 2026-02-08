import { axiosInstance } from "@/lib/axios";

export const userApi = {
  getCredits: async () => {
    const { data } = await axiosInstance.get("/users/credits");
    return data;
  },

  purchaseCredits: async (planId: string) => {
    const { data } = await axiosInstance.post("/users/credits/purchase", {
      planId,
    });
    return data;
  },

  getProjects: async () => {
    const { data } = await axiosInstance.get("/users/projects");
    return data;
  },

  createProject: async (payload: { initialPrompt: string }) => {
    const { data } = await axiosInstance.post("/users/projects", payload);
    return data;
  },

  getProject: async (projectId: string) => {
    const { data } = await axiosInstance.get(`/users/projects/${projectId}`);
    return data;
  },

  togglePublish: async (projectId: string) => {
    const { data } = await axiosInstance.patch(
      `/users/projects/${projectId}/publish`,
    );
    return data;
  },
};
