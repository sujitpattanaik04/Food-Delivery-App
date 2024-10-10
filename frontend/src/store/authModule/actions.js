import axios from "axios";
import forge from "node-forge";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { successToast, errorToast } from "../../utils/toast.js";

export default {
  async signup(context, payload) {
    try {
      const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwClsse5BLszmRaDN7MeO
m92xgIE+NngsGjG4kSXtUgKUY6qPShI0aNOBnR1BxyL+rJO/eoURlSLQB1Ugk3/q
4nUvzK6bitubldPFvDDPM6UXba6SRVe9bgt5dz4mUKsro0g/3VwWKxtdVyJYGbn0
/Ts3BuamGaP4/PwSqOwXjyCRHklEyEjprzVBvIJ116UVphQiLvGToluyDB0iaXTn
zB84cxe/aINeZpehYHqYAHieURHFGxOeSgLC0HQFwovEFOBnweljY6EqXTEf8mTc
zhn0VCOrumrF/zbfqJr+Zp+wPoiO04730vXHRr3YpQ2zN4sAV/WC6XJluYvLea2S
AwIDAQAB
-----END PUBLIC KEY-----`;

      // Convert the PEM to a forge public key
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

      // Encrypt the message
      payload.password = publicKey.encrypt(payload.password, "RSA-OAEP");

      // Convert the encrypted data to base64
      payload.password = forge.util.encode64(payload.password);

      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/users/signup",
        payload,
        {
          withCredentials: true,
        }
      );
      setTimeout(() => {
        successToast(res);
      }, 300);

      context.commit("setUser", res.data);
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);

      setTimeout(() => {
        errorToast(error);
      }, 300);
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

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 300);

      context.commit("setUser", res.data.data);
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
      }, 300);
    }
  },

  async getUserDetails(context) {
    let res;
    try {
      res = await axios.get("http://192.1.200.113:3000/api/v1/users/get-user", {
        withCredentials: true,
      });

      context.commit("setUser", res.data);
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },

  async changePassword(_, payload) {
    let res = null;
    try {
      if (payload.oldPassword === payload.newPassword)
        throw new Error("New Password and Old Password couldn't be same !!");

      if (payload.newPassword !== payload.confirmPassword)
        throw new Error("New Password and Confirm Password must be same !!");

      res = await axios.post(
        `http://192.1.200.113:3000/api/v1/auth/change-password`,
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
      }, 300);
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
      }, 300);
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

      setTimeout(() => {
        toast.success(res.data?.message, {
          autoClose: 1000,
          closeOnClick: false,
          pauseOnHover: true,
          position: "top-center",
          transition: "flip",
        });
      }, 300);
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
      }, 300);
    }
  },
  async logout(context) {
    try {
      const res = await axios.get(
        "http://192.1.200.113:3000/api/v1/auth/logout",
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
      }, 300);

      context.commit("removeUser");
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
      }, 300);
    }
  },
};
