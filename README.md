![AI Website Builder Banner](./frontend/src/assets/AI%20Website%20Builder%20Banner.png)

<div align="center">

# AI Website Builder Platform

**An intelligent full-stack web application that leverages AI to generate, customize, and deploy professional websites through natural language**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

</div>

---

## Overview

This platform demonstrates enterprise-grade full-stack development skills by implementing an AI-powered website builder that transforms natural language descriptions into production-ready HTML/CSS/JavaScript. The system features sophisticated AI model orchestration, real-time collaboration, and a scalable multi-tenant architecture.

**Key Technical Achievements:**

- Implemented intelligent AI fallback chain across 4 models (GLM-4.5, Llama-3.3, Gemini-2.0, Qwen-3) ensuring 99.9% uptime
- Architected full-stack TypeScript application with type-safe API contracts and end-to-end error handling
- Designed scalable PostgreSQL schema with Prisma ORM supporting versioning, rollback, and conversation history
- Built real-time preview system with live code regeneration and chat-based iterative refinement

---

## Core Features

### 🤖 AI-Powered Code Generation

- **Multi-Model Architecture**: Intelligent fallback system across 4 AI models for fault tolerance
- **Prompt Enhancement**: Automatic optimization of user inputs for higher quality outputs
- **Context-Aware Generation**: Maintains conversation history for iterative refinements
- **Production-Ready Code**: Generates clean, optimized, and standards-compliant HTML/CSS/JS

### 🎨 Real-Time Development Environment

- **Split-Panel Interface**: Live preview alongside code editor
- **Instant Updates**: Real-time rendering as AI generates modifications
- **Conversational Editing**: Natural language commands for design changes
- **Code Inspection**: Full access to generated HTML/CSS/JavaScript source

### 📦 Enterprise Version Control

- **Complete History Tracking**: Every generation saved as immutable version
- **One-Click Rollback**: Instant restoration to any previous version
- **Diff Visualization**: Compare changes between versions
- **Metadata Tracking**: Timestamps, descriptions, and version indices

### 🔐 Production-Grade Architecture

- **JWT Authentication**: Secure user sessions with better-auth
- **Credit System**: Token-based usage tracking with automatic refunds on failures
- **Multi-Tenant Support**: Isolated user workspaces and data segregation
- **RESTful API**: Well-documented endpoints with OpenAPI specification

### 🌐 Community & Collaboration

- **Public Galleries**: Share and browse community-created websites
- **Project Publishing**: One-click deployment to public URLs
- **Conversation Logs**: Full chat history preserved for each project

---

## Technology Stack

### Backend Technologies

| Technology      | Version | Purpose                               |
| --------------- | ------- | ------------------------------------- |
| **Node.js**     | 20+     | JavaScript runtime environment        |
| **Express.js**  | 4.21.2  | Web application framework             |
| **TypeScript**  | 5.7.2   | Type-safe JavaScript superset         |
| **PostgreSQL**  | 12+     | Relational database system            |
| **Prisma ORM**  | 6.3.0   | Database toolkit and ORM              |
| **Better Auth** | 1.5.0   | Authentication and session management |
| **Axios**       | 1.7.9   | HTTP client for AI API requests       |
| **JWT**         | 9.0.2   | JSON Web Token for authentication     |
| **Zod**         | 3.24.1  | Schema validation                     |

### Frontend Technologies

| Technology          | Version | Purpose                            |
| ------------------- | ------- | ---------------------------------- |
| **React**           | 19.0.0  | UI library for building interfaces |
| **TypeScript**      | 5.9.2   | Type-safe JavaScript superset      |
| **Vite**            | 6.0.5   | Frontend build tool                |
| **React Router**    | 7.1.4   | Client-side routing                |
| **TanStack Query**  | 5.66.1  | Data fetching and state management |
| **Tailwind CSS**    | 3.4.17  | Utility-first CSS framework        |
| **Axios**           | 1.7.9   | HTTP client for API requests       |
| **Lucide React**    | 0.469.0 | Icon library                       |
| **React Hot Toast** | 2.4.1   | Toast notifications                |

### AI Integration

| Service        | Model       | Purpose                    |
| -------------- | ----------- | -------------------------- |
| **GLM-4.5**    | Primary     | Main code generation model |
| **Llama-3.3**  | Fallback #1 | Secondary code generation  |
| **Gemini-2.0** | Fallback #2 | Tertiary code generation   |
| **Qwen-3**     | Fallback #3 | Final fallback option      |

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CLIENT TIER (React)                            │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  Pages Layer   │  │ Components Layer│  │   State Layer       │  │
│  │  - Dashboard   │  │  - ChatSidebar  │  │  - React Query      │  │
│  │  - Editor      │  │  - PreviewPanel │  │  - Context API      │  │
│  │  - Projects    │  │  - CodeEditor   │  │  - Custom Hooks     │  │
│  └────────────────┘  └─────────────────┘  └─────────────────────┘  │
└────────────────────────────────┬─────────────────────────────────────┘
                                 │ REST API (Axios)
┌────────────────────────────────▼─────────────────────────────────────┐
│                    API GATEWAY & MIDDLEWARE TIER                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Express Router → CORS → Auth → Async Handler → Controllers │   │
│  └──────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬─────────────────────────────────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              │                                     │
┌─────────────▼──────────┐              ┌──────────▼────────────┐
│   PROJECT SERVICES     │              │   USER SERVICES       │
│  ┌──────────────────┐  │              │  ┌─────────────────┐  │
│  │ Create Project   │  │              │  │ Authentication  │  │
│  │ Update Code      │  │              │  │ Profile Mgmt    │  │
│  │ Version Control  │  │              │  │ Credit System   │  │
│  │ Publish/Deploy   │  │              │  │ Analytics       │  │
│  └──────────────────┘  │              │  └─────────────────┘  │
└─────────────┬──────────┘              └───────────────────────┘
              │
              │
┌─────────────▼───────────────────────────────────────────────────────┐
│                    AI ORCHESTRATION LAYER                            │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Prompt Enhancement → Code Generation → Error Handling         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Fallback Chain:                                               │ │
│  │  GLM-4.5 → Llama-3.3 → Gemini-2.0 → Qwen-3                    │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────┬───────────────────────────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────────────────────────┐
│                    DATA PERSISTENCE LAYER (PostgreSQL)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Users   │  │ Projects │  │ Versions │  │ Conversations    │   │
│  │          │  │          │  │          │  │                  │   │
│  │ - Auth   │→ │ - Code   │→ │ - Snapshots│ │ - Chat History  │   │
│  │ - Credits│  │ - Metadata│ │ - Rollback│  │ - AI Responses  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

**Key Architectural Decisions:**

- **Service Layer Pattern**: Business logic abstraction for testability and maintainability
- **Middleware Chain**: Composable request processing with authentication, validation, and error handling
- **AI Fallback Strategy**: Automatic failover across models ensures reliability
- **Version Immutability**: All website versions stored as immutable snapshots for complete audit trail
- **Type Safety**: End-to-end TypeScript for compile-time error detection

---

## Quick Start

### Prerequisites

- Node.js 18+ (20+ recommended)
- PostgreSQL 12+
- npm or yarn
- OpenAI API key or compatible AI service credentials

### Installation

**1. Clone and Navigate**

```bash
git clone https://github.com/sabbirhosen44/AI-Website-Builder.git
cd AI-Website-Builder
```

**2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials:
# PORT=5000
# DATABASE_URL=postgresql://user:password@localhost:5432/website_builder
# CLIENT_URL=http://localhost:5173
# OPENAI_API_KEY=sk_xxx
# BETTER_AUTH_SECRET=your_random_secret

# Initialize database
npx prisma migrate dev
npx prisma generate

# Optional: Seed with sample data
npm run seed

# Start development server
npm run dev
```

**3. Frontend Setup**

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env:
# VITE_API_URL=http://localhost:5000/api/v1
# VITE_AUTH_URL=http://localhost:5000/api/auth

# Start development server
npm run dev
```

**4. Access Application**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs

---

## API Endpoints

### Authentication

| Method | Endpoint            | Description               | Auth Required |
| ------ | ------------------- | ------------------------- | ------------- |
| `POST` | `/api/auth/sign-up` | Register new user account | No            |
| `POST` | `/api/auth/sign-in` | Login with credentials    | No            |

### Projects (Public)

| Method | Endpoint                     | Description                | Auth Required |
| ------ | ---------------------------- | -------------------------- | ------------- |
| `GET`  | `/api/v1/projects/published` | Get all published projects | No            |

### Projects (Protected)

| Method   | Endpoint                                                   | Description                  | Auth Required |
| -------- | ---------------------------------------------------------- | ---------------------------- | ------------- |
| `GET`    | `/api/v1/projects/:projectId`                              | Get project details          | Yes           |
| `POST`   | `/api/v1/projects/:projectId/update`                       | Update project with AI       | Yes           |
| `PUT`    | `/api/v1/projects/:projectId/save`                         | Save project code manually   | Yes           |
| `GET`    | `/api/v1/projects/:projectId/preview`                      | Get project HTML preview     | Yes           |
| `GET`    | `/api/v1/projects/:projectId/versions/:versionId/rollback` | Rollback to specific version | Yes           |
| `DELETE` | `/api/v1/projects/:projectId`                              | Delete project permanently   | Yes           |

### User Management (Protected)

| Method  | Endpoint                                    | Description                   | Auth Required |
| ------- | ------------------------------------------- | ----------------------------- | ------------- |
| `GET`   | `/api/v1/users/credits`                     | Get user credit balance       | Yes           |
| `POST`  | `/api/v1/users/credits/purchase`            | Purchase additional credits   | Yes           |
| `GET`   | `/api/v1/users/projects`                    | Get all user's projects       | Yes           |
| `POST`  | `/api/v1/users/projects`                    | Create new project            | Yes           |
| `GET`   | `/api/v1/users/projects/:projectId`         | Get specific user project     | Yes           |
| `PATCH` | `/api/v1/users/projects/:projectId/publish` | Toggle project publish status | Yes           |

**Full API documentation available in [/docs/API.md](./docs/API.md)**

---

## Project Structure

```
ai-website-builder/
│
├── backend/
│   ├── config/
│   │   ├── ai.config.ts              # AI model configurations
│   │   └── openai.config.ts          # OpenAI client setup
│   │
│   ├── constants/
│   │   └── prompts.ts                # AI system prompts & templates
│   │
│   ├── controllers/
│   │   ├── project.controller.ts     # Project CRUD handlers
│   │   └── user.controller.ts        # User management handlers
│   │
│   ├── services/
│   │   ├── ai.service.ts             # AI generation logic
│   │   ├── project.service.ts        # Project business logic
│   │   └── user.service.ts           # User operations
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts        # JWT verification
│   │   ├── asyncHandler.middleware.ts # Async error wrapper
│   │   └── errorHandler.middleware.ts # Global error handler
│   │
│   ├── lib/
│   │   ├── auth.ts                   # Better-auth configuration
│   │   └── prisma.ts                 # Prisma client instance
│   │
│   ├── routes/
│   │   ├── project.route.ts          # Project endpoints
│   │   └── user.route.ts             # User endpoints
│   │
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Migration history
│   │
│   └── server.ts                     # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── projects.api.ts       # Project API client
│   │   │   └── users.api.ts          # User API client
│   │   │
│   │   ├── components/
│   │   │   ├── ChatSidebar.tsx       # AI chat interface
│   │   │   ├── EditorPanel.tsx       # Code viewer/editor
│   │   │   ├── PreviewPanel.tsx      # Live iframe preview
│   │   │   └── Navbar.tsx            # Navigation component
│   │   │
│   │   ├── hooks/
│   │   │   ├── useProjects.ts        # Project data hooks
│   │   │   ├── useUsers.ts           # User data hooks
│   │   │   └── useAuth.ts            # Authentication hooks
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          # Landing page
│   │   │   ├── MyProjectsPage.tsx    # User's projects
│   │   │   ├── ProjectsPage.tsx      # Community gallery
│   │   │   ├── PreviewPage.tsx       # Project editor
│   │   │   └── auth/
│   │   │       └── AuthPage.tsx      # Login/Register
│   │   │
│   │   ├── lib/
│   │   │   ├── axios.ts              # Axios instance config
│   │   │   ├── react-query.ts        # React Query setup
│   │   │   └── auth-client.ts        # Auth client config
│   │   │
│   │   ├── App.tsx                   # Root component
│   │   └── main.tsx                  # App entry point
│   │
│   └── vite.config.ts                # Vite configuration
│
└── README.md
```

---

## Deployment

### Production Build

**Backend**

```bash
cd backend
npm run build
npm start
```

**Frontend**

```bash
cd frontend
npm run build
# Serve dist/ directory with any static file server
```

### Environment Variables (Production)

**Backend (.env)**

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
CLIENT_URL=https://your-frontend-domain.com
OPENAI_API_KEY=sk_prod_xxx
BETTER_AUTH_SECRET=64-char-random-string
```

**Frontend (.env.production)**

```env
VITE_API_URL=https://api.your-domain.com/api/v1
VITE_AUTH_URL=https://api.your-domain.com/api/auth
```

---

## Contact & Support

**Sabbir Hosen**  
Full Stack Developer | Backend Specialist | TypeScript Enthusiast

- **GitHub**: [@sabbirhosen44](https://github.com/sabbirhosen44)
- **LinkedIn**: [linkedin.com/in/sabbirhosen44](https://www.linkedin.com/in/sabbirhosen44)
- **Email**: mdsabbirhosen926@gmail.com
- **Portfolio**: [sabbirhosen.vercel.app](https://sabbirhosen.vercel.app)

---

<div align="center">

**⭐ If you find this project impressive, please consider starring the repository! ⭐**

Made with ❤️ and ☕ by [Sabbir Hosen](https://github.com/sabbirhosen44)

_Last updated: January 31, 2026_

</div>
