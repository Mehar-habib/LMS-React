import { Router } from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
