// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "/api",
//   withCredentials: true,
//   headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("vg_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("vg_token");
//       localStorage.removeItem("vg_user");
//     }
//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vg_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("vg_token");
      localStorage.removeItem("vg_user");
    }
    return Promise.reject(error);
  },
);

export default api;
