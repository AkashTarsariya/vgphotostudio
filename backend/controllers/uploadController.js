import multer from "multer";
import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

const uploadToCloudinary = (buffer, folder = "vg-photostudio") =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    Readable.from(buffer).pipe(uploadStream);
  });

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image file provided" });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(503).json({
      success: false,
      message: "Cloudinary not configured. Set CLOUDINARY_* env variables.",
    });
  }

  try {
    const result = await uploadToCloudinary(
      req.file.buffer,
      req.body.folder || "vg-photostudio",
    );

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        thumbnailUrl: cloudinary.url(result.public_id, {
          transformation: [{ width: 400, crop: "limit", quality: "auto" }],
        }),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadMultiple = async (req, res) => {
  if (!req.files?.length) {
    return res
      .status(400)
      .json({ success: false, message: "No image files provided" });
  }

  try {
    const results = await Promise.all(
      req.files.map((file) =>
        uploadToCloudinary(file.buffer, req.body.folder || "vg-photostudio"),
      ),
    );

    res.json({
      success: true,
      data: results.map((r) => ({
        url: r.secure_url,
        publicId: r.public_id,
        width: r.width,
        height: r.height,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res
      .status(400)
      .json({ success: false, message: "publicId is required" });
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, message: "Image deleted from Cloudinary" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
