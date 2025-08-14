import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Interes from "./pages/Interes";
import Profile from "./pages/Profile";
import Details from "./pages/Details";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/interests",
          element: <Interes />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
