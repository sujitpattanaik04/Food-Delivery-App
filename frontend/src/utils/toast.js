// import { toast } from "vue3-toastify";
// import "vue3-toastify/dist/index.css";

// export const successToast = (res) => {
//   toast.success(res.data?.message, {
//     autoClose: 1000,
//     closeOnClick: false,
//     pauseOnHover: true,
//     position: "top-center",
//     transition: "flip",
//   });
// };

// export const errorToast = (error) => {
//   toast.error(error.response?.data?.message || error.message, {
//     autoClose: 1000,
//     closeOnClick: false,
//     pauseOnHover: true,
//     position: "top-center",
//     transition: "flip",
//   });
// };

// export default {
//   successToast,
//   errorToast,
// };

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Success toast function
export const successToast = (res) => {
  toast.success(res?.data?.message, {
    autoClose: 1000,
    closeOnClick: false,
    pauseOnHover: true,
    position: "top-center",
    transition: "flip",
  });
};

// Error toast function
export const errorToast = (error) => {
  toast.error(
    error?.response?.data?.message || error?.message || "An error occurred",
    {
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: true,
      position: "top-center",
      transition: "flip",
    }
  );
};
