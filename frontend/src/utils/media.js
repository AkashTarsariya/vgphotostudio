const API_URL = "https://vg-photostudio-api.onrender.com";

export const getImageUrl = (image) => {
  if (!image) return "";

  // New Cloudinary schema
  if (typeof image === "object" && image.url) {
    return image.url;
  }

  // Old schema compatibility
  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  }

  return "";
};
