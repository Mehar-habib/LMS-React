import { Skeleton } from "../../components/ui/skeleton";
import { useGetPublishedCourseQuery } from "../../features/courseApi";
import Course from "./Course";

export default function Courses() {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  if (isError) {
    return <h1>Some Error occurred while fetching Courses</h1>;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
}

const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Placeholder */}
      <div className="relative">
        <Skeleton className="w-full h-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 to-transparent" />
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded-md" />

        {/* Instructor and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <Skeleton className="h-4 w-10 rounded-md" />
        </div>

        {/* Description */}
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-2/3 rounded-md" />

        {/* Price or Button */}
        <div className="pt-3">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};
