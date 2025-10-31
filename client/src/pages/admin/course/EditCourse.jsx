import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import CourseTab from "./CourseTab";

export default function EditCourse() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add details information regarding course
        </h1>
        <Link to="lecture">
          <Button variant="outline">Go to Lecture page</Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
}
