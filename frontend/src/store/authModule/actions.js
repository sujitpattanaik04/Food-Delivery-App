import axios from "axios";
import forge from "node-forge";
import { successToast, errorToast } from "../../utils/toast.js";

export default {
  async signup(context, payload) {
    try {
      const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7W4y0BrsyqgFdWEbxbpO
mwC1W7Su9Pykhj/Pmvfs67AHOwQPUgCsWrs0nyDR9FDABrpmxwrSMnHfwjXq4dck
n5omB2merBxYpDC7W5rlaoTdkSNGLFTQ58ayjZLNNTqZwZk9nNuFEs3i88SkEqjn
jZWFKeQI9R37RGlmH2VG2QWotEiGraVwe+vBJeM56JUz7hmI4kO8r5zIGTAc673E
xSPwMiv2wTeXHQUWq0XVcB+QMynZyfVNYvrO+OpnWpJERGY/l9hlqZL8s8NKYFcD
8WFZJc2+HSiek/BXI6fM679dxGm/ieCnDYfLGPpqphgHURxvt6dYwCRIWQtK+smK
RQIDAQAB
-----END PUBLIC KEY-----`;
      // Convert the PEM to a forge public key
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      // Encrypt the message
      payload.password = publicKey.encrypt(payload.password, "RSA-OAEP");
      // Convert the encrypted data to base64
      payload.password = forge.util.encode64(payload.password);

      console.log(payload.password);

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
