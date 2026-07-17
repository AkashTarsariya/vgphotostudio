import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    // coverImage: { type: String, required: true },
    coverImage: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    story: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // gallery: [{ type: String }],
    gallery: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    videos: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          default: 0,
        },
        format: {
          type: String,
          default: "",
        },
      },
    ],
    equipment: {
      camera: { type: String, default: "" },
      lenses: [{ type: String }],
      lighting: { type: String, default: "" },
      notes: { type: String, default: "" },
    },
    testimonial: {
      clientName: { type: String, default: "" },
      content: { type: String, default: "" },
      rating: { type: Number, min: 1, max: 5 },
    },
    location: { type: String, required: true },
    shootDate: { type: Date, required: true },
    clientName: { type: String, default: "" },
    relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

projectSchema.index({
  title: "text",
  story: "text",
  tags: "text",
  location: "text",
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
