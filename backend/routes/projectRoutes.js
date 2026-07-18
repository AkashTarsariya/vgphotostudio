import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  deleteGalleryImage,
  getRecentProjects,
} from "../controllers/projectController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/recent", getRecentProjects);
router.get("/slug/:slug", getProject);
router.get("/:id", getProject);
// router.post('/', protect, adminOnly, createProject);
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 50,
    },
  ]),
  createProject,
);
// router.put('/:id', protect, adminOnly, updateProject);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 50,
    },
  ]),
  updateProject,
);

router.delete("/:id/gallery", protect, adminOnly, deleteGalleryImage);

router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
