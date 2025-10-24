import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/component/Navbar";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
