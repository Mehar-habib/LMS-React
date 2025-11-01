import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(200).json({
      success: true,
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(400).json({
        courses: [],
        message: "Courses not found",
      });
    }
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      category,
      subTitle,
      description,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    const updateData = {
      courseTitle,
      category,
      subTitle,
      description,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lecture.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lecture");
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      lectures: course.lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// export const editLecture = async (req, res) => {
//   try {
//     const { lectureTitle, videoInfo, isPreviewFree } = req.body;
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };
