// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create uploads folder automatically if it doesn't exist
// const uploadDir = path.join(process.cwd(), "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },

//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1000000000) +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   },
// });

// // Accept only image files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;

//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase(),
//   );

//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   }

//   cb(new Error("Only image files are allowed."));
// };

// // Upload configuration
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10 MB
//   },
// });

// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload folders
const uploadRoot = path.join(process.cwd(), "uploads");
const coverDir = path.join(uploadRoot, "cover");
const galleryDir = path.join(uploadRoot, "gallery");

// Create folders if they don't exist
[uploadRoot, coverDir, galleryDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverImage") {
      cb(null, coverDir);
    } else if (file.fieldname === "gallery") {
      cb(null, galleryDir);
    } else {
      cb(null, uploadRoot);
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;

  const ext = allowed.test(path.extname(file.originalname).toLowerCase());

  const mime = allowed.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

export default upload;
