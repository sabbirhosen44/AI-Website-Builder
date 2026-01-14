import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Community from "./pages/CommunityPage";
import Home from "./pages/HomePage";
import MyProjects from "./pages/MyProjectsPage";
import Preview from "./pages/PreviewPage";
import Pricing from "./pages/PricingPage";
import Projects from "./pages/ProjectsPage";
import View from "./pages/ViewPage";
import AuthPage from "./pages/auth/AuthPage";
import SettingsPage from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <MyProjects />,
          },
          {
            path: ":projectId",
            element: <Projects />,
          },
        ],
      },
      {
        path: "preview/:projectId",
        children: [
          {
            index: true,
            element: <Preview />,
          },
          {
            path: ":versionId",
            element: <Preview />,
          },
        ],
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "view/:projectId",
        element: <View />,
      },
      {
        path: "auth/:pathname",
        element: <AuthPage />,
      },
      {
        path: "account/settings",
        element: <SettingsPage />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
