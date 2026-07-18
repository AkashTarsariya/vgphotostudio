import Project from "../models/Project.js";
// import path from "path";
import { uploadToCloudinary } from "./uploadController.js";
import cloudinary from "../config/cloudinary.js";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

export const getProjects = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const filter = { isPublished: true };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === "true") filter.isFeatured = true;
  // if (req.query.search) filter.$text = { $search: req.query.search };
  if (req.query.search) {
    filter.$or = [
      {
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        story: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate("category", "name slug")
      .select("-gallery")
      .sort({ shootDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Project.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  });
};

export const getProject = async (req, res) => {
  const query = req.params.slug
    ? { slug: req.params.slug }
    : { _id: req.params.id };

  const project = await Project.findOne({ ...query, isPublished: true })
    .populate("category", "name slug")
    .populate("relatedProjects", "title slug coverImage location shootDate");

  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  }

  project.views += 1;
  await project.save();

  res.json({ success: true, data: project });
};

// export const createProject = async (req, res) => {
//   const data = { ...req.body };
//   if (!data.slug) data.slug = slugify(data.title);

//   const project = await Project.create(data);
//   res.status(201).json({ success: true, data: project });
// };

export const createProject = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.slug) {
      data.slug = slugify(data.title);
    }

    // Cover Image
    if (req.files?.coverImage?.length > 0) {
      // data.coverImage =
      //   "/uploads/cover/" + path.basename(req.files.coverImage[0].path);
      const coverUpload = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "vg-photostudio/cover",
      );

      // data.coverImage = coverUpload.secure_url;
      data.coverImage = {
        url: coverUpload.secure_url,
        publicId: coverUpload.public_id,
      };
    }

    // Gallery Images
    // if (req.files?.gallery?.length > 0) {
    //   data.gallery = req.files.gallery.map((file) => {
    //     return "/uploads/gallery/" + path.basename(file.path);
    //   });
    // }

    // Gallery Images
    if (req.files?.gallery?.length > 0) {
      data.gallery = [];

      for (const file of req.files.gallery) {
        const upload = await uploadToCloudinary(
          file.buffer,
          "vg-photostudio/gallery",
        );

        // data.gallery.push(upload.secure_url);
        data.gallery.push({
          url: upload.secure_url,
          publicId: upload.public_id,
        });
      }
    }

    console.log("========== CREATE PROJECT DATA ==========");
    console.dir(data, { depth: null });

    const project = await Project.create(data);

    res.status(201).json({
      success: true,
      data: project,
    });
    // } catch (error) {
    //   console.error(error);
  } catch (error) {
    console.error("========== CREATE PROJECT ERROR ==========");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const updateProject = async (req, res) => {
//   const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!project) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Project not found" });
//   }

//   res.json({ success: true, data: project });
// };

export const updateProject = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Upload new cover image if selected
    // if (req.files?.coverImage?.length > 0) {
    //   data.coverImage = "/uploads/cover/" + req.files.coverImage[0].filename;
    // } else {
    //   data.coverImage = project.coverImage;
    // }

    // Upload new cover image if selected
    // if (req.files?.coverImage?.length > 0) {
    //   const coverUpload = await uploadToCloudinary(
    //     req.files.coverImage[0].buffer,
    //     "vg-photostudio/cover",
    //   );

    //   data.coverImage = coverUpload.secure_url;
    // } else {
    //   data.coverImage = project.coverImage;
    // }

    // if (req.files?.coverImage?.length > 0) {
    //   // TODO: Old Cloudinary image delete karishu (next step)
    //   const coverUpload = await uploadToCloudinary(
    //     req.files.coverImage[0].buffer,
    //     "vg-photostudio/cover",
    //   );

    //   data.coverImage = {
    //     url: coverUpload.secure_url,
    //     publicId: coverUpload.public_id,
    //   };
    // } else {
    //   data.coverImage = project.coverImage;
    // }

    if (req.files?.coverImage?.length > 0) {
      // Delete old cover image
      if (project.coverImage?.publicId) {
        await cloudinary.uploader.destroy(project.coverImage.publicId);
      }

      // Upload new cover image
      const coverUpload = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "vg-photostudio/cover",
      );

      data.coverImage = {
        url: coverUpload.secure_url,
        publicId: coverUpload.public_id,
      };
    } else {
      data.coverImage = project.coverImage;
    }

    // Upload new gallery images if selected
    // if (req.files?.gallery?.length > 0) {
    //   data.gallery = req.files.gallery.map(
    //     (file) => "/uploads/gallery/" + file.filename,
    //   );
    // } else {
    //   data.gallery = project.gallery;
    // }

    data.gallery = [...project.gallery];

    if (req.files?.gallery?.length > 0) {
      for (const file of req.files.gallery) {
        const upload = await uploadToCloudinary(
          file.buffer,
          "vg-photostudio/gallery",
        );

        data.gallery.push({
          url: upload.secure_url,
          publicId: upload.public_id,
        });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    res.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const deleteProject = async (req, res) => {
//   const project = await Project.findByIdAndDelete(req.params.id);

//   if (!project) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Project not found" });
//   }

//   res.json({ success: true, message: "Project deleted" });
// };

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // // Delete cover image
    // if (project.coverImage?.publicId) {
    //   await cloudinary.uploader.destroy(project.coverImage.publicId);
    // }

    // // Delete gallery images
    // if (project.gallery?.length) {
    //   await Promise.all(
    //     project.gallery.map((image) =>
    //       cloudinary.uploader.destroy(image.publicId),
    //     ),
    //   );
    // }

    // // Future: Delete videos
    // if (project.videos?.length) {
    //   await Promise.all(
    //     project.videos.map((video) =>
    //       cloudinary.uploader.destroy(video.publicId, {
    //         resource_type: "video",
    //       }),
    //     ),
    //   );
    // }

    // // Delete cover image
    // if (project.coverImage?.publicId) {
    //   const result = await cloudinary.uploader.destroy(
    //     project.coverImage.publicId,
    //   );

    //   console.log("Cover Delete Result:", result);
    // }

    // // Delete gallery images
    // if (project.gallery?.length) {
    //   for (const image of project.gallery) {
    //     const result = await cloudinary.uploader.destroy(image.publicId);

    //     console.log("Gallery Delete Result:", result);
    //   }
    // }

    // // Future videos
    // if (project.videos?.length) {
    //   for (const video of project.videos) {
    //     const result = await cloudinary.uploader.destroy(video.publicId, {
    //       resource_type: "video",
    //     });

    //     console.log("Video Delete Result:", result);
    //   }
    // }

    // Delete cover image
    if (project.coverImage?.publicId) {
      await cloudinary.uploader.destroy(project.coverImage.publicId);
    }

    // Delete gallery images
    if (project.gallery?.length) {
      await Promise.all(
        project.gallery.map((image) =>
          cloudinary.uploader.destroy(image.publicId),
        ),
      );
    }

    // Delete videos
    if (project.videos?.length) {
      await Promise.all(
        project.videos.map((video) =>
          cloudinary.uploader.destroy(video.publicId, {
            resource_type: "video",
          }),
        ),
      );
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentProjects = async (req, res) => {
  const ids = req.body.projectIds || [];
  const projects = await Project.find({ _id: { $in: ids }, isPublished: true })
    .select("title slug coverImage category location shootDate")
    .populate("category", "name slug")
    .limit(6);

  res.json({ success: true, data: projects });
};
