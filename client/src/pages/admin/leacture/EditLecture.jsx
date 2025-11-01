import { Link, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import LectureTab from "./LectureTab";

export default function EditLecture() {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/courses/${courseId}/lecture`}>
            <Button className="rounded-full" variant="outline" size="icon">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Update you lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
}
