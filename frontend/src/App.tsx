import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Community from "./pages/Community";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import View from "./pages/View";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
