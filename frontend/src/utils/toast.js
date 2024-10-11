import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Success toast function
const successToast = (res) => {
  toast.success(res.data?.message, {
    autoClose: 1500,
    closeOnClick: false,
    pauseOnHover: true,
    position: "top-center",
    transition: "flip",
  });
};

// Error toast function
const errorToast = (error) => {
  console.log(error.response?.data?.message);
  toast.error(
    error?.response?.data?.message || error.message || "An error occurred",
    {
      autoClose: 1500,
      closeOnClick: false,
      pauseOnHover: true,
      position: "top-center",
      transition: "flip",
    }
  );
};
export { successToast, errorToast };
