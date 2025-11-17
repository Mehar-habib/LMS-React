import { Navigate, useParams } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "../../features/api/purchaseApi";

export default function PurchasedCourseProtectedRoute({ children }) {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);
  if (isLoading) return <h1>Loading...</h1>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
}
