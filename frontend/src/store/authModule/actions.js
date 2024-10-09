import axios from "axios";
// import JSEncrypt from "jsencrypt";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  async signup(context, payload) {
    try {
      // console.log(payload);

      // const encrypt = new JSEncrypt();

      // const publicKey = `-----BEGIN PUBLIC KEY-----
      //                   ${"do -it - now"}
      //                   -----END PUBLIC KEY-----`;

      // encrypt.setPublicKey(publicKey);

      // payload.password = encrypt.encrypt(payload.password);

      // console.log(payload);

      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/users/signup",
        // "http://localhost:3000/api/v1/users/signup",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);

      context.commit("setUser", res.data);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // Cookie.set("authToken", res.data.data.token);
    } catch (error) {
      console.log(error.response?.data?.message);

      setTimeout(() => {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    }
  },

  async login(context, payload) {
    try {
      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/auth/login",
        // "http://localhost:3000/api/v1/auth/login",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);

      context.commit("setUser", res.data.data);
      // localStorage.setItem("user", JSON.stringify(res.data.data.user));
      // Cookie.set("authToken", res.data.data.token);
    } catch (error) {
      console.log(error.response?.data?.message);
      setTimeout(() => {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    }
  },

  async changePassword(_, payload) {
    let res = null;
    try {
      if (payload.newPassword !== payload.confirmPassword)
        throw new Error("New Password and Confirm Password must be same !!");

      // const authToken = document.cookie.split("=")[1];

      // if (!authToken) throw new Error("Authorization token not found !!");

      res = await axios.post(
        `http://192.1.200.113:3000/api/v1/auth/change-password`,
        // "http://localhost:3000/api/v1/auth/change-password",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    } catch (error) {
      console.log(error.response?.data?.message);
      // alert(error.response?.data?.message);
      setTimeout(() => {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    }
    return res;
  },

  async forgotPassword(_, payload) {
    try {
      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/auth/forgot-password",
        // "http://localhost:3000/api/v1/auth/forgot-password",
        payload.email,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    } catch (error) {
      console.log(error.response?.data?.message);
      // alert(error.response?.data?.message);
      setTimeout(() => {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    }
  },
  async logout(context) {
    try {
      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/auth/logout",
        // "http://localhost:3000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);

      context.commit("removeUser");
    } catch (error) {
      console.log(error.response?.data?.message);
      // alert(error.response?.data?.message);
      setTimeout(() => {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 500);
    }
  },
};
