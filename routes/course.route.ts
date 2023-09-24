import express from "express";
import {
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorization, isAuthenticated } from "../middlewares/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorization("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorization("admin"),
  editCourse
);

courseRouter.get(
  "/get-course/:id",
  getSingleCourse
);

courseRouter.get(
  "/get-courses",
  getAllCourses
);

courseRouter.get(
    "/get-course-content/:id",
    isAuthenticated,
    getCourseByUser
  );

export default courseRouter;
