import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import api from "../../services/api";
import { getImageUrl } from "../../utils/media";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deletingImage, setDeletingImage] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchData = async () => {
    const [projRes, catRes] = await Promise.all([
      api.get("/projects?limit=50"),
      api.get("/categories"),
    ]);
    setProjects(projRes.data.data);
    setCategories(catRes.data.data);
  };

  useEffect(() => {
    fetchData().catch(() => toast.error("Failed to load"));
  }, []);

  // const uploadSingleImage = async (file) => {
  //   const formData = new FormData();

  //   formData.append("image", file);

  //   const { data } = await api.post("/upload/single", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  //   return data.data.url;
  // };

  // const uploadGallery = async (files) => {
  //   const formData = new FormData();

  //   Array.from(files).forEach((file) => {
  //     formData.append("images", file);
  //   });

  //   const { data } = await api.post("/upload/multiple", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  //   return data.data.map((img) => img.url);
  // };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("category", data.category);
      formData.append("location", data.location);
      formData.append("story", data.story);
      formData.append("shootDate", data.shootDate);
      formData.append("isPublished", data.isPublished);
      formData.append("isFeatured", data.isFeatured);

      // Cover Image
      if (data.coverImage?.[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      // Gallery Images
      if (data.gallery?.length) {
        Array.from(data.gallery).forEach((file) => {
          formData.append("gallery", file);
        });
      }

      if (editing) {
        await api.put(`/projects/${editing}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Project Updated");
      } else {
        await api.post("/projects", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Project Created");
      }

      reset();
      setEditing(null);
      setShowForm(false);

      setCoverPreview("");
      setGalleryPreview([]);

      fetchData();
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Project upload failed");
    } finally {
      setUploading(false);
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     setUploading(true);

  //     let coverImageUrl = "";
  //     let galleryUrls = [];

  //     // Upload Cover Image
  //     if (data.coverImage?.[0]) {
  //       coverImageUrl = await uploadSingleImage(data.coverImage[0]);
  //     }

  //     // Upload Gallery Images
  //     if (data.gallery?.length) {
  //       galleryUrls = await uploadGallery(data.gallery);
  //     }

  //     const payload = {
  //       title: data.title,
  //       slug: data.slug,
  //       coverImage: coverImageUrl,
  //       gallery: galleryUrls,
  //       category: data.category,
  //       story: data.story,
  //       location: data.location,
  //       shootDate: new Date(data.shootDate),
  //       isPublished: data.isPublished === "true",
  //       isFeatured: data.isFeatured === "true",
  //     };

  //     if (editing) {
  //       await api.put(`/projects/${editing}`, payload);
  //       toast.success("Project Updated");
  //     } else {
  //       await api.post("/projects", payload);
  //       toast.success("Project Created");
  //     }

  //     reset();
  //     setShowForm(false);
  //     setEditing(null);
  //     setCoverPreview("");
  //     setGalleryPreview([]);

  //     fetchData();
  //   } catch (err) {
  //     console.error(err);

  //     toast.error(err.response?.data?.message || "Project upload failed");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // const handleEdit = (project) => {
  //   setEditing(project._id);
  //   setShowForm(true);
  //   Object.entries(project).forEach(([key, val]) => {
  //     if (key === "gallery") setValue(key, val?.join("\n") || "");
  //     else if (key === "category") setValue(key, val._id || val);
  //     else if (key === "shootDate")
  //       setValue(key, new Date(val).toISOString().split("T")[0]);
  //     else if (typeof val === "boolean") setValue(key, String(val));
  //     else if (typeof val !== "object") setValue(key, val);
  //   });
  // };

  const handleEdit = async (project) => {
    try {
      const { data } = await api.get(`/projects/${project._id}`);

      const fullProject = data.data;

      setEditing(fullProject._id);
      setShowForm(true);

      Object.entries(fullProject).forEach(([key, val]) => {
        if (key === "category") {
          setValue(key, val?._id || val);
        } else if (key === "shootDate") {
          setValue(key, new Date(val).toISOString().split("T")[0]);
        } else if (typeof val === "boolean") {
          setValue(key, String(val));
        } else if (
          key !== "gallery" &&
          key !== "coverImage" &&
          typeof val !== "object"
        ) {
          setValue(key, val);
        }
      });

      // Existing Cover Preview
      setCoverPreview(getImageUrl(fullProject.coverImage));

      // Existing Gallery Preview
      setGalleryPreview(fullProject.gallery || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load project");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete project?")) return;
    await api.delete(`/projects/${id}`);
    toast.success("Deleted");
    fetchData();
  };

  const handleGalleryDelete = async (publicId) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      setDeletingImage(publicId);

      await api.delete(`/projects/${editing}/gallery`, {
        data: { publicId },
      });

      setGalleryPreview((prev) =>
        prev.filter((img) => img.publicId !== publicId),
      );

      toast.success("Gallery image deleted successfully");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to delete gallery image",
      );
    } finally {
      setDeletingImage("");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl">Projects</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditing(null);
            reset();
          }}
          className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className="input-field"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            <input
              className="input-field"
              placeholder="Slug (auto-generated if empty)"
              {...register("slug")}
            />
            {/* <input
              className="input-field"
              placeholder="Cover Image URL"
              {...register("coverImage", { required: true })}
            /> */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="input-field"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setCoverPreview(URL.createObjectURL(file));
                  }
                }}
                {...register("coverImage")}
              />

              {coverPreview && (
                <img
                  src={coverPreview}
                  className="mt-3 h-40 rounded-lg object-cover"
                />
              )}
            </div>

            <select
              className="input-field"
              {...register("category", { required: true })}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              className="input-field"
              placeholder="Location"
              {...register("location", { required: true })}
            />
            <input
              type="date"
              className="input-field"
              {...register("shootDate", { required: true })}
            />
          </div>
          <textarea
            className="input-field"
            rows={4}
            placeholder="Story"
            {...register("story", { required: true })}
          />
          {/* <textarea
            className="input-field"
            rows={3}
            placeholder="Gallery URLs (one per line)"
            {...register("gallery")}
          /> */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Gallery Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              className="input-field"
              onChange={(e) => {
                const files = Array.from(e.target.files);

                setGalleryPreview(
                  files.map((file) => URL.createObjectURL(file)),
                );
              }}
              {...register("gallery")}
            />

            <div className="grid grid-cols-4 gap-2 mt-4">
              {/* {galleryPreview.map((img, i) => (
                <img
                  key={i}
                  // src={img}
                  src={typeof img === "string" ? img : getImageUrl(img)}
                  className="w-full h-24 rounded object-cover"
                />
              ))} */}

              {/* <div className="grid grid-cols-4 gap-2 mt-4"> */}
              {galleryPreview.map((img, i) => (
                <div key={img.publicId || i} className="relative group">
                  <img
                    src={typeof img === "string" ? img : getImageUrl(img)}
                    className="w-full h-24 rounded object-cover"
                    alt=""
                  />

                  {img.publicId && (
                    <button
                      type="button"
                      onClick={() => handleGalleryDelete(img.publicId)}
                      disabled={deletingImage === img.publicId}
                      className="
            absolute
            top-2
            right-2
            bg-red-600
            text-white
            rounded-full
            p-2
            opacity-0
            group-hover:opacity-100
            transition
            disabled:opacity-60
          "
                    >
                      {deletingImage === img.publicId ? (
                        <span className="text-xs">...</span>
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  )}
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
          <div className="flex gap-4">
            <select className="input-field w-auto" {...register("isPublished")}>
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
            <select className="input-field w-auto" {...register("isFeatured")}>
              <option value="false">Not Featured</option>
              <option value="true">Featured</option>
            </select>
          </div>
          {/* <button type="submit" className="btn-primary text-sm">
            {editing ? "Update" : "Create"}
          </button> */}

          <button
            type="submit"
            disabled={uploading}
            className="btn-primary text-sm"
          >
            {uploading
              ? "Uploading..."
              : editing
                ? "Update Project"
                : "Create Project"}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4"
          >
            <img
              // src={`http://localhost:5000${p.coverImage}`}
              // src={`${import.meta.env.VITE_API_URL}${p.coverImage}`}
              src={getImageUrl(p.coverImage)}
              alt={p.title}
              className="w-16 h-16 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.title}</p>
              <p className="text-sm text-muted">
                {p.category?.name} · {p.location}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
