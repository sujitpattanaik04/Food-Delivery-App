import axios from "axios";
// import forge from "node-forge";
import { successToast, errorToast } from "../../utils/toast.js";

export default {
  async signup(context, payload) {
    try {
      // const publicKeyPem = `-----BEGIN PUBLIC KEY-----
      // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt5pWFglmvAV8wSPRgO9z
      // 6fLaz7L833nZiGJnz41tSEa+00fyf0rF4QwRYJw34LNjb0cBN1KR3lVe8SmhQWtb
      // sSSL0Q0iUaOuR+z+1B0oU43z2ZF12gGamcLoJciA0a8kNOYWBw9fLAEr/PXA00oQ
      // GvlzrdSAZnLP4zSPX8QQXZaou1L+Xpmfc4niS9ghxtbMZ30oJQmcRtb5BBU0gKKx
      // BOp+mLunT6feKkBB0bPvQdBBbA8l6D+pLE9Fh9ZMxenwD3F5NtyEMbrAbCxPEQoo
      // ylsXk5I1tdL9Z26+z6MmXDTpRiqjYk3au06m+4oi5xQJhTnMzB2pPUYxR4ycKLQI
      // PQIDAQAB
      // -----END PUBLIC KEY-----`;
      //       // Convert the PEM to a forge public key
      //       const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      //       // Encrypt the message
      //       payload.password = publicKey.encrypt(payload.password, "RSA-OAEP");
      //       // Convert the encrypted data to base64
      //       payload.password = forge.util.encode64(payload.password);

      const res = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 200);

      context.commit("setUser", res.data);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 200);
    }
  },
  async login(context, payload) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 200);

      context.commit("setUser", res.data.data);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 200);
    }
  },
  async getUserDetails(context) {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/users/get-user",
        {
          withCredentials: true,
        }
      );

      context.commit("setUser", res.data);

      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
  async changePassword(_, payload) {
    try {
      if (payload.oldPassword === payload.newPassword)
        throw new Error("New Password and Old Password couldn't be same !!");

      if (payload.newPassword !== payload.confirmPassword)
        throw new Error("New Password and Confirm Password must be same !!");

      const res = await axios.post(
        `http://localhost:3000/api/v1/auth/change-password`,
        payload,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 200);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 200);
    }
  },
  async forgotPassword(_, payload) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/forgot-password",
        payload.email,
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        successToast(res);
      }, 200);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 200);
    }
  },

  async resetPassword(context, payload) {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/auth/reset-password/${this.$route.params.token}`,
        payload
      );

      setTimeout(() => {
        successToast(res);
      }, 200);

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 200);
    }
  },

  async logout(context) {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/auth/logout", {
        withCredentials: true,
      });

      setTimeout(() => {
        successToast(res);
      }, 200);

      context.commit("removeUser");

      return res;
    } catch (error) {
      setTimeout(() => {
        errorToast(error);
      }, 200);
    }
  },
};
