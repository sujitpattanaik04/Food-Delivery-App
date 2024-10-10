<template>
  <section>
    <the-header></the-header>
    <div class="wrapper">
      <div class="title"><span>Change Password </span></div>
      <form @submit.prevent="handleSubmit">
        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isOldPasswordVisible ? 'text' : 'password'"
            placeholder="Old Password"
            v-model.trim="oldPassword"
            required
            @blur="getOldPasswordError"
          />
          <i
            class="toggle-password"
            @click="toggleOldPasswordVisibility"
            :class="{
              'bx bx-hide': isOldPasswordVisible === true,
              'bx bx-show': isOldPasswordVisible === false,
            }"
          ></i>
          <span v-if="oldPasswordError" class="error-message">{{
            oldPasswordError
          }}</span>
        </div>

        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isNewPasswordVisible ? 'text' : 'password'"
            placeholder="New Password"
            v-model.trim="newPassword"
            required
            @blur="getNewPasswordError"
          />
          <i
            class="toggle-password"
            @click="toggleNewPasswordVisibility"
            :class="{
              'bx bx-hide': isNewPasswordVisible === true,
              'bx bx-show': isNewPasswordVisible === false,
            }"
          ></i>
          <span v-if="newPasswordError" class="error-message">{{
            newPasswordError
          }}</span>
        </div>

        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            placeholder="Confirm Password"
            v-model.trim="confirmPassword"
            required
            @blur="getConfirmPasswordError"
          />
          <i
            class="toggle-password"
            @click="toggleConfirmPasswordVisibility"
            :class="{
              'bx bx-hide': isConfirmPasswordVisible === true,
              'bx bx-show': isConfirmPasswordVisible === false,
            }"
          ></i>
          <span v-if="confirmPasswordError" class="error-message">{{
            confirmPasswordError
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
import TheHeader from "../components/UI/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      passwordPattern:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      msg: "Password must be at least 8 characters and must include Digit, Special Character, Uppercase and Lowercase",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isOldPasswordVisible: false,
      isNewPasswordVisible: false,
      isConfirmPasswordVisible: false,
      oldPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",
    };
  },
  created() {
    const user = this.$store.getters.getUser;
    if (!user) {
      this.$router.replace("/");
    }
  },
  methods: {
    getOldPasswordError() {
      this.oldPasswordError =
        !this.passwordPattern.test(this.oldPassword) && this.oldPassword
          ? this.msg
          : "";
    },
    getNewPasswordError() {
      this.newPasswordError =
        !this.passwordPattern.test(this.newPassword) && this.newPassword
          ? this.msg
          : "";
    },
    getConfirmPasswordError() {
      this.confirmPasswordError =
        !this.passwordPattern.test(this.confirmPassword) && this.confirmPassword
          ? this.msg
          : "";
    },

    getPasswordMatchError() {},
    toggleOldPasswordVisibility() {
      this.isOldPasswordVisible = !this.isOldPasswordVisible;
    },
    toggleNewPasswordVisibility() {
      this.isNewPasswordVisible = !this.isNewPasswordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    },
    async handleSubmit() {
      if (!this.passwordError) {
        const payload = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        };

        const res = await this.$store.dispatch("changePassword", payload);

        if (res?.status === "success") {
          this.$router.replace("/dashboard");
        }
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
  color: #609966;
  border-radius: 5px 5px 0 0;
  font-size: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid rgba(128, 128, 128, 0.323);
  margin-inline: 15px;
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
  color: grey;
  font-size: 22px;
  border: 0.5px solid rgba(128, 128, 128, 0.337);
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
  color: grey;
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
  border: 1.5px solid red;
}

.error-message {
  color: red;
  font-size: 15px;
  position: absolute;
  width: 450px;
}
</style>
