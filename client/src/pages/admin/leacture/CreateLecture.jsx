import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateLectureMutation } from "../../../features/courseApi";

export default function CreateLecture() {
  const params = useParams();
  const courseId = params.courseId;
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture created successfully");
    }
    if (error) {
      toast.error(error.data.message || "Something went wrong");
    }
  }, [isSuccess, error]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add lecture, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, atque.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/courses/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
