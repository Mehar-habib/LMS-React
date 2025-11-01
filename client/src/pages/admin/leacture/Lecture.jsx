import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Lecture({ lecture, index, courseId }) {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#f7f9fa] dark:bg-[#1f1f1f] px-4 py-2 rounded-md my-2">
      <h1>
        <span className="font-bold">Lecture - {index + 1}</span>{" "}
        {lecture.lectureTitle}
      </h1>
      <Edit className="cursor-pointer" size={20} onClick={goToUpdateLecture} />
    </div>
  );
}
