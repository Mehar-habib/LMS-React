import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useGetCreatorCourseQuery } from "../../../features/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "../../../components/ui/badge";

export default function CourseTable() {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading..</h1>;
  console.log("data =>", data);
  return (
    <div>
      <Button
        onClick={() => navigate("create")}
        className="mb-6 cursor-pointer"
      >
        Create a new Course
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.courseTitle}
              </TableCell>
              <TableCell>{course.coursePrice || "Free"}</TableCell>
              <TableCell>
                <Badge>
                  {course.isPublished ? "Published" : "Unpublished"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost">
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
