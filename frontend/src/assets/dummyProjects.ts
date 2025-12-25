import type { Project } from "@/types";

export const dummyProjects: Project[] = [
  {
    id: "project_1",
    name: "AI Portfolio Website",
    initial_prompt:
      "Create a modern portfolio website with hero section, projects, and contact form",
    current_code: "<div><h1>AI Portfolio</h1></div>",
    createdAt: "2025-01-10T08:30:00Z",
    updatedAt: "2025-01-12T14:20:00Z",
    userId: "user_1",
    user: {
      id: "user_1",
      email: "jawwad@example.com",
      fullName: "Jawwad Al Sabbir",
      imageUrl: "/avatars/jawwad.png",
    },
    isPublished: true,
    versionId: "version_3",
    current_version_index: "2",
    conversation: [
      {
        id: "msg_1",
        role: "user",
        content: "Build a clean portfolio website",
        timestamp: "2025-01-10T08:31:00Z",
      },
      {
        id: "msg_2",
        role: "assistant",
        content:
          "Here is a modern portfolio layout using React and Tailwind CSS.",
        timestamp: "2025-01-10T08:32:00Z",
      },
    ],
    versions: [
      {
        id: "version_1",
        timestamp: "2025-01-10T08:35:00Z",
        code: "<div><h1>Portfolio v1</h1></div>",
      },
      {
        id: "version_2",
        timestamp: "2025-01-11T09:10:00Z",
        code: "<div><h1>Portfolio v2</h1></div>",
      },
      {
        id: "version_3",
        timestamp: "2025-01-12T14:20:00Z",
        code: "<div><h1>Portfolio v3</h1></div>",
      },
    ],
  },

  {
    id: "project_2",
    name: "SaaS Landing Page",
    initial_prompt:
      "Design a high-converting SaaS landing page with pricing and call-to-action",
    current_code: "<div><h1>SaaS Landing</h1></div>",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-16T18:45:00Z",
    userId: "user_1",
    isPublished: false,
    current_version_index: "1",
    conversation: [
      {
        id: "msg_3",
        role: "user",
        content: "I need a SaaS landing page",
        timestamp: "2025-01-15T10:01:00Z",
      },
      {
        id: "msg_4",
        role: "assistant",
        content:
          "Here’s a responsive SaaS landing page layout optimized for conversions.",
        timestamp: "2025-01-15T10:02:00Z",
      },
    ],
    versions: [
      {
        id: "version_4",
        timestamp: "2025-01-15T10:10:00Z",
        code: "<div><h1>SaaS v1</h1></div>",
      },
      {
        id: "version_5",
        timestamp: "2025-01-16T18:45:00Z",
        code: "<div><h1>SaaS v2</h1></div>",
      },
    ],
  },
];
