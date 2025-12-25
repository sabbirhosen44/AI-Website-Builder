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
      name: "Jawwad",
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
    createdAt: "2025-02-01T09:00:00Z",
    updatedAt: "2025-02-03T16:40:00Z",
    userId: "user_2",
    user: {
      id: "user_2",
      email: "founder@startup.com",
      fullName: "Startup Founder",
      name: "Founder",
      imageUrl: "/avatars/founder.png",
    },
    isPublished: false,
    versionId: "version_5",
    current_version_index: "1",
    conversation: [
      {
        id: "msg_3",
        role: "user",
        content: "I need a SaaS landing page",
        timestamp: "2025-02-01T09:05:00Z",
      },
      {
        id: "msg_4",
        role: "assistant",
        content:
          "Here’s a responsive SaaS landing page layout optimized for conversions.",
        timestamp: "2025-02-01T09:06:00Z",
      },
    ],
    versions: [
      {
        id: "version_4",
        timestamp: "2025-02-01T09:20:00Z",
        code: "<div><h1>SaaS v1</h1></div>",
      },
      {
        id: "version_5",
        timestamp: "2025-02-03T16:40:00Z",
        code: "<div><h1>SaaS v2</h1></div>",
      },
    ],
  },

  {
    id: "project_3",
    name: "E-commerce Store",
    initial_prompt:
      "Build a fast e-commerce store with product listing, cart, and checkout",
    current_code: "<div><h1>E-commerce Store</h1></div>",
    createdAt: "2025-02-10T11:15:00Z",
    updatedAt: "2025-02-12T17:00:00Z",
    userId: "user_3",
    user: {
      id: "user_3",
      email: "seller@shop.com",
      fullName: "Online Seller",
      imageUrl: "/avatars/seller.png",
    },
    isPublished: true,
    versionId: "version_7",
    current_version_index: "1",
    conversation: [
      {
        id: "msg_5",
        role: "user",
        content: "Create an online store",
        timestamp: "2025-02-10T11:16:00Z",
      },
    ],
    versions: [
      {
        id: "version_6",
        timestamp: "2025-02-10T11:30:00Z",
        code: "<div><h1>Store v1</h1></div>",
      },
      {
        id: "version_7",
        timestamp: "2025-02-12T17:00:00Z",
        code: "<div><h1>Store v2</h1></div>",
      },
    ],
  },

  {
    id: "project_4",
    name: "Personal Blog",
    initial_prompt:
      "Create a clean, SEO-friendly blog with categories and markdown support",
    current_code: "<div><h1>Personal Blog</h1></div>",
    createdAt: "2025-03-01T07:45:00Z",
    updatedAt: "2025-03-02T12:20:00Z",
    userId: "user_1",
    user: {
      id: "user_1",
      email: "jawwad@example.com",
      fullName: "Jawwad Al Sabbir",
    },
    isPublished: false,
    versionId: "version_8",
    current_version_index: "0",
    conversation: [],
    versions: [
      {
        id: "version_8",
        timestamp: "2025-03-01T07:50:00Z",
        code: "<div><h1>Blog v1</h1></div>",
      },
    ],
  },

  {
    id: "project_5",
    name: "Educational Platform",
    initial_prompt:
      "Build an educational platform with courses, lessons, and progress tracking",
    current_code: "<div><h1>Edu Platform</h1></div>",
    createdAt: "2025-03-10T10:00:00Z",
    updatedAt: "2025-03-12T18:10:00Z",
    userId: "user_4",
    user: {
      id: "user_4",
      email: "teacher@edu.com",
      fullName: "Online Teacher",
      imageUrl: "/avatars/teacher.png",
    },
    isPublished: true,
    versionId: "version_10",
    current_version_index: "2",
    conversation: [
      {
        id: "msg_6",
        role: "user",
        content: "Create an educational platform",
        timestamp: "2025-03-10T10:05:00Z",
      },
      {
        id: "msg_7",
        role: "assistant",
        content: "Platform structure with courses and lessons created.",
        timestamp: "2025-03-10T10:06:00Z",
      },
    ],
    versions: [
      {
        id: "version_9",
        timestamp: "2025-03-10T10:20:00Z",
        code: "<div><h1>Edu v1</h1></div>",
      },
      {
        id: "version_10",
        timestamp: "2025-03-12T18:10:00Z",
        code: "<div><h1>Edu v2</h1></div>",
      },
    ],
  },
];
