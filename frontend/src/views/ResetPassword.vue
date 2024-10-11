<template>
  <div class="wrapper">
    <div class="title"><span>Reset Password</span></div>
    <form @submit.prevent="handleSubmit">
      <div class="row" :class="{ 'input-error': passwordError }">
        <i class="bx bx-lock"></i>
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="New Password"
          v-model.trim="newPassword"
          required
          @blur="getPasswordError"
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
        <input type="submit" value="Reset Password" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
      isPasswordVisible: false,
      passwordError: "",
    };
  },
  methods: {
    getPasswordError() {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      this.passwordError =
        !passwordPattern.test(this.newPassword) && this.newPassword
          ? "Password must be at least 8 characters and must include Digit, Special Character, Uppercase and Lowercase"
          : "";
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    async handleSubmit() {
      if (!this.passwordError) {
        const payload = {
          newPassword: this.newPassword,
        };

        const res = await this.$store.dispatch("resetPassword", payload);

        if (res.data.status === "success") this.$router.replace("/login");
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

.wrapper form .row input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 70px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 18px;
  transition: all 0.3s ease;
  color: #333;
}

form .row input:focus {
  border-color: #609966;
}

form .row input::placeholder {
  color: #999;
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

.wrapper form .button input {
  margin-top: 10px;
  color: #609966;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

form .button input:hover {
  background: #609966;
  color: white;
}

.wrapper form .input-error input {
  border: 1.5px solid red;
}

.error-message {
  color: red;
  font-size: 15px;
  position: absolute;
  width: 450px;
}
</style>
