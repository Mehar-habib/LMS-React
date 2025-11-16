import { Card, CardContent, CardTitle } from "../../components/ui/card";
import {
  CheckCircle,
  CheckCircle2,
  CirclePlay,
  Clock,
  PlayCircle,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  useGetCourseProgressQuery,
  useMarkAsCompletedMutation,
  useMarkAsUnCompletedMutation,
  useUpdateLectureProgressMutation,
} from "../../features/api/courseProgressApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Progress } from "../../components/ui/progress";

export default function CourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [markAsCompleted, { isSuccess: completedSuccess }] =
    useMarkAsCompletedMutation();
  const [markAsUnCompleted, { isSuccess: inCompletedSuccess }] =
    useMarkAsUnCompletedMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success("Course marked as completed!");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success("Course progress updated!");
    }
  }, [completedSuccess, inCompletedSuccess, refetch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Course
          </h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lecture: lectures = [] } = courseDetails;

  // Calculate progress percentage
  const completedLectures = progress?.filter((prog) => prog.viewed).length || 0;
  const totalLectures = lectures.length;
  const progressPercentage =
    totalLectures > 0
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0;

  // Set initial lecture if not set
  const initialLecture =
    currentLecture || (lectures.length > 0 ? lectures[0] : null);

  if (!initialLecture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Lectures Available</h1>
          <p className="text-gray-600">
            This course doesn't have any lectures yet.
          </p>
        </div>
      </div>
    );
  }

  const isLectureCompleted = (lectureId) => {
    return (
      progress?.some((prog) => prog.lectureId === lectureId && prog.viewed) ||
      false
    );
  };

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update progress");
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    try {
      await markAsCompleted(courseId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark course as completed");
    }
  };

  const handleInCompleteCourse = async () => {
    try {
      await markAsUnCompleted(courseId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update course progress");
    }
  };

  const getCurrentLectureIndex = () => {
    return lectures.findIndex(
      (lec) => lec._id === (currentLecture?._id || initialLecture._id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {courseTitle}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{totalLectures} lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedLectures} completed</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-3">
                <Progress value={progressPercentage} className="w-32" />
                <span className="text-sm font-medium text-gray-700">
                  {progressPercentage}%
                </span>
              </div>
              <Button
                onClick={
                  completed ? handleInCompleteCourse : handleCompleteCourse
                }
                variant={completed ? "outline" : "default"}
                className="whitespace-nowrap"
                size="lg"
              >
                {completed ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Mark as Completed</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Video Player Section */}
          <div className="flex-1">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-black">
                  <video
                    src={currentLecture?.videoUrl || initialLecture.videoUrl}
                    controls
                    className="w-full h-full"
                    onPlay={() =>
                      handleLectureProgress(
                        currentLecture?._id || initialLecture._id
                      )
                    }
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>
                      Lecture {getCurrentLectureIndex() + 1} of {totalLectures}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Duration
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {currentLecture?.lectureTitle ||
                      initialLecture.lectureTitle}
                  </h2>
                  <p className="text-gray-600">
                    {currentLecture?.description ||
                      initialLecture.description ||
                      "No description available."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lectures Sidebar */}
          <div className="xl:w-96">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Course Content
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {completedLectures}/{totalLectures}
                  </Badge>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {lectures.map((lecture, index) => {
                    const isCompleted = isLectureCompleted(lecture._id);
                    const isActive =
                      lecture._id ===
                      (currentLecture?._id || initialLecture._id);

                    return (
                      <Card
                        key={lecture._id}
                        onClick={() => handleSelectLecture(lecture)}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                          isActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                              ) : (
                                <PlayCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                                    {lecture.lectureTitle}
                                  </CardTitle>
                                  <p className="text-xs text-gray-500">
                                    Lecture {index + 1}
                                  </p>
                                </div>
                                {isCompleted && (
                                  <Badge
                                    variant="success"
                                    className="flex-shrink-0 text-xs"
                                  >
                                    Done
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
