import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);

app.use("/api/v1/media", mediaRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
