import axios from "axios";
import forge from "node-forge";
import { successToast, errorToast } from "../../utils/toast.js";

export default {
  async encryptPassword(_, password) {
    try {
      const res = await axios.get(
        "http://192.1.200.113:3000/api/v1/auth/get-public-key-pem",
        {
          withCredentials: true,
        }
      );

      // Convert the PEM to a forge public key
      const publicKey = forge.pki.publicKeyFromPem(res.data.publicKeyPem);

      // Encrypt the message
      password = publicKey.encrypt(password, "RSA-OAEP");

      // Convert the encrypted data to base64
      password = forge.util.encode64(password);

      return password;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
    }
  },
  async signup(context, payload) {
    try {
      payload.password = await context.dispatch(
        "encryptPassword",
        payload.password
      );

      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/users/signup",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 100);

      context.commit("setUser", res.data);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
    }
  },
  async login(context, payload) {
    try {
      payload.password = await context.dispatch(
        "encryptPassword",
        payload.password
      );

      const res = await axios.post(
        "http://192.1.200.113:3000/api/v1/auth/login",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 100);

      context.commit("setUser", res.data);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
    }
  },
  async getUserDetails(context) {
    try {
      const res = await axios.get(
        "http://192.1.200.113:3000/api/v1/users/get-user",
        {
          withCredentials: true,
        }
      );

      context.commit("setUser", res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
  async changePassword(context, payload) {
    try {
      if (payload.oldPassword === payload.newPassword)
        throw new Error("New Password and Old Password couldn't be same !!");

      if (payload.newPassword !== payload.confirmPassword)
        throw new Error("New Password and Confirm Password must be same !!");

      payload.newPassword = await context.dispatch(
        "encryptPassword",
        payload.newPassword
      );

      const res = await axios.post(
        `http://192.1.200.113:3000/api/v1/auth/change-password`,
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 100);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
    }
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
        successToast(res);
      }, 100);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
    }
  },

  async resetPassword(context, payload) {
    try {
      payload.newPassword = await context.dispatch(
        "encryptPassword",
        payload.newPassword
      );

      const res = await axios.post(
        `http://192.1.200.113:3000/api/v1/auth/reset-password/${this.$route.params.token}`,
        payload
      );

      setTimeout(() => {
        successToast(res);
      }, 100);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
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
        successToast(res);
      }, 100);

      context.commit("removeUser");

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 100);
    }
  },
};
