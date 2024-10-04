<template>
  <section>
    <the-header></the-header>
    <div class="wrapper">
      <div class="title"><span>Change Password </span></div>
      <form @submit.prevent="handleSubmit">
        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="Old Password"
            v-model="oldPassword"
            required
            @blur="getPasswordError(oldPassword)"
          />
          <i
            class="toggle-password"
            @click="togglePasswordVisibility"
            :class="{
              'bx bx-hide': isPasswordVisible === true,
              'bx bx-show': isPasswordVisible === false,
            }"
          ></i>
          <span v-if="passwordError" class="error-message">{{
            passwordError
          }}</span>
        </div>

        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="New Password"
            v-model="newPassword"
            required
            @blur="getPasswordError(newPassword)"
          />
          <i
            class="toggle-password"
            @click="togglePasswordVisibility"
            :class="{
              'bx bx-hide': isPasswordVisible === true,
              'bx bx-show': isPasswordVisible === false,
            }"
          ></i>
          <span v-if="passwordError" class="error-message">{{
            passwordError
          }}</span>
        </div>

        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="New Password"
            v-model="confirmPassword"
            required
            @blur="getPasswordError(confirmPassword)"
          />
          <i
            class="toggle-password"
            @click="togglePasswordVisibility"
            :class="{
              'bx bx-hide': isPasswordVisible === true,
              'bx bx-show': isPasswordVisible === false,
            }"
          ></i>
          <span v-if="passwordError" class="error-message">{{
            passwordError
          }}</span>
        </div>

        <div class="row button">
          <input type="submit" value="Change Password" />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import TheHeader from "../components/UI/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isPasswordVisible: false,
      passwordError: "",
    };
  },
  methods: {
    getPasswordError(password) {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      this.passwordError =
        !passwordPattern.test(password) && password
          ? "Password must be at least 8 characters and must include Digit, Special Character, Uppercase and Lowercase"
          : "";
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    async handleSubmit() {
      try {
        if (!this.passwordError) {
          const payload = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          };

          const authToken = document.cookie.split("=")[1];
          console.log(document.cookie);

          await axios.post(
            `http://127.0.0.1:3000/api/v1/auth/change-password`,
            payload,
            {
              headers: {
                cookies: authToken,
              },
            }
          );
          this.$router.replace("/dashboard");
        }
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.wrapper {
  margin-top: 100px;
  max-width: 500px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-left: 34vw;
}

.wrapper .title {
  height: 120px;
  background: #609966;
  border-radius: 5px 5px 0 0;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper form {
  padding: 25px 35px;
}

.wrapper form .row {
  height: 60px;
  margin-top: 15px;
  position: relative;
}

.wrapper form .row input,
.wrapper form .row select {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 70px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 18px;
  transition: all 0.3s ease;
  color: #333; /* Set text color to black when typing */
}

.wrapper form .row select {
  padding-right: 30px; /* Space for the arrow */
  appearance: none; /* Remove default dropdown icon */
  color: #666; /* Set text color of the select field to a faded color */
}

.wrapper form .row select option {
  color: #333; /* Set dropdown options color to black */
}

.wrapper form .row select option[value=""] {
  color: rgba(
    51,
    51,
    51,
    0.7
  ); /* Placeholder color to match input placeholder */
}

form .row input:focus,
form .row select:focus {
  border-color: #609966;
}

form .row input::placeholder {
  color: #999; /* Placeholder color for input fields */
}

.wrapper form .row i {
  position: absolute;
  width: 55px;
  height: 100%;
  color: #fff;
  font-size: 22px;
  background: #609966;
  border: 1px solid #609966;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper form .row .toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #609966;
  background: transparent;
  border: none;
  font-size: 28px;
}

.wrapper form .row .arrow {
  position: absolute;
  right: 34px;
  top: 50%;
  transform: translateY(-50%);
  color: #609966;
  font-size: 18px;
}

.wrapper form .row .arrow:hover {
  cursor: pointer;
}

.wrapper form .pass {
  margin-top: 12px;
}

.wrapper form .pass a {
  margin-left: -275px;
  color: #609966;
  font-size: 17px;
  text-decoration: none;
}

.wrapper form .pass a:hover {
  text-decoration: underline;
}

.wrapper form .button input {
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  background: #609966;
  border: 1px solid #609966;
  cursor: pointer;
}

form .button input:hover {
  background: #609966;
}

.wrapper form .signup-link {
  text-align: center;
  margin-top: 45px;
  font-size: 17px;
}

.wrapper form .signup-link a {
  color: #609966;
  text-decoration: none;
}

form .signup-link a:hover {
  text-decoration: underline;
}

.wrapper form .row .input-error input,
.wrapper form .row .input-error select {
  border-radius: 2px solid red;
}

.error-message {
  color: red;
  font-size: 15px;
  position: absolute;
  width: 450px;
}
</style>
