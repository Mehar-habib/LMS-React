import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/component/Navbar";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/leacture/CreateLecture";

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
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // admin routes start from here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courses",
            element: <CourseTable />,
          },
          {
            path: "courses/create",
            element: <AddCourse />,
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />,
          },
          {
            path: "courses/:courseId/lecture",
            element: <CreateLecture />,
          },
        ],
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
