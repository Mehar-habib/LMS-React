import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";

export default function SearchResult({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row"
      >
        {/* Course Image */}
        <div className="md:w-48 lg:w-56 flex-shrink-0">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
                  {course.courseTitle}
                </h1>
                <div className="text-right ml-4 flex-shrink-0">
                  <h1 className="text-2xl font-bold text-green-600">
                    ${course.coursePrice}
                  </h1>
                  {course.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ${course.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-3 line-clamp-2">
                {course.subTitle}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <p className="text-sm text-gray-700">
                  By <span className="font-medium">{course.creator?.name}</span>
                </p>
                {course.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-700">
                      {course.rating} ({course.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {course.courseLevel}
                </Badge>
                {course.duration && (
                  <Badge variant="outline" className="text-gray-600">
                    ⏱️ {course.duration}
                  </Badge>
                )}
                {course.isBestSeller && (
                  <Badge
                    variant="default"
                    className="bg-orange-100 text-orange-800"
                  >
                    🏆 Bestseller
                  </Badge>
                )}
              </div>

              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Enroll Now →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
