import { Skeleton } from "../../components/ui/skeleton";
import Course from "./Course";

export default function MyLearning() {
  const isLoading = false;
  const myLearningCourses = [1, 2, 3, 4];
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p>You are not enrolled in any course</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearningCourses.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
        >
          {/* Course Thumbnail */}
          <div className="relative">
            <Skeleton className="w-full h-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/30 to-transparent" />
          </div>

          <div className="p-4 space-y-4">
            {/* Title */}
            <Skeleton className="h-5 w-3/4 rounded-md" />

            {/* Progress Bar Section */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-2/3 rounded-md" />
            </div>

            {/* Continue Button */}
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
