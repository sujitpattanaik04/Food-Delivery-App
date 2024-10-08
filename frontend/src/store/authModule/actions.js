import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  async signup(context, payload) {
    try {
      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/users/signup",
        payload,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data?.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });

      context.commit("setUser", res.data);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // Cookie.set("authToken", res.data.data.token);
    } catch (error) {
      // headers: {
      //   cookies: authToken,
      // },
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });
    }
  },

  async login(context, payload) {
    try {
      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/auth/login",
        payload,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data?.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });

      context.commit("setUser", res.data.data);
      // localStorage.setItem("user", JSON.stringify(res.data.data.user));
      // Cookie.set("authToken", res.data.data.token);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });
    }
  },

  async changePassword(_, payload) {
    let res = null;
    try {
      if (payload.newPassword !== payload.confirmPassword)
        throw new Error("New Password and Confirm Password must be same !!");

      console.log(document.cookie);

      // const authToken = document.cookie.split("=")[1];

      // if (!authToken) throw new Error("Authorization token not found !!");

      res = await axios.post(
        `http://192.1.200.113:3000/api/v1/auth/change-password`,
        payload,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data?.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });
    } catch (error) {
      console.log(error.response?.data?.message);
      // alert(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });
    }
    return res;
  },

  async forgotPassword(_, payload) {
    try {
      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/auth/forgot-password",
        payload.email,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data?.message, {
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });
    } catch (error) {
      console.log(error.response?.data?.message);
      // alert(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: true,
        position: "top-center",
        transition: "flip",
      });
    }
  },
};
