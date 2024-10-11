<template>
  <section>
    <the-header></the-header>
    <div class="wrapper">
      <div class="title"><span>Login Form</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="row" :class="{ 'input-error': emailError }">
          <i class="bx bx-envelope"></i>
          <input
            type="text"
            placeholder="Email"
            v-model.trim="email"
            required
            @blur="getEmailError"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="Password"
            v-model.trim="password"
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

        <div class="row" :class="{ 'input-error': roleError }">
          <i class="bx bx-id-card"></i>
          <select
            v-model="role"
            required
            @click="downArrow = !downArrow"
            @blur="getRoleError"
          >
            <option value="" disabled>Select Role</option>
            <option value="admin" @click="downArrow = true">Admin</option>
            <option value="customer" @click="downArrow = true">Customer</option>
            <option value="delivery partner" @click="downArrow = true">
              Delivery Partner
            </option>
            <option value="restaurant owner" @click="downArrow = true">
              Restaurant Owner
            </option>
          </select>
          <span v-if="downArrow" class="arrow">▼</span>
          <span v-else class="arrow">▲</span>
          <span v-if="roleError" class="error-message">{{ roleError }}</span>
        </div>

        <div class="pass">
          <router-link to="/forgot-password" replace
            >Forgot password?</router-link
          >
        </div>

        <div class="row button">
          <input type="submit" value="Login" />
        </div>
        <div class="signup-link">
          Not a member?
          <router-link to="/signup" replace>Signup Here</router-link>
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
      email: "",
      password: "",
      role: "",
      isPasswordVisible: false,
      emailError: "",
      passwordError: "",
      roleError: "",
      downArrow: false,
    };
  },
  methods: {
    getEmailError() {
      const emailPattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      this.emailError =
        this.email && !emailPattern.test(this.email)
          ? "Please enter a valid email."
          : "";
    },
    getPasswordError() {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      this.passwordError =
        this.password && !passwordPattern.test(this.password)
          ? "Password must be at least 8 characters and must include Digit, Special Character, Uppercase and Lowercase"
          : "";
    },
    getRoleError() {
      this.roleError = !this.role ? "Please select a role." : "";
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    async handleSubmit() {
      if (!this.emailError && !this.passwordError && !this.roleError) {
        const payload = {
          email: this.email,
          password: this.password,
          role: this.role,
        };

        const res = await this.$store.dispatch("login", payload);

        if (res?.data?.status === "success") this.$router.replace("/dashboard");
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
  color: #333;
}

.wrapper form .row select {
  padding-right: 30px;
  appearance: none;
  color: #666;
}

.wrapper form .row select option {
  color: #333;
}

.wrapper form .row select option[value=""] {
  color: rgba(51, 51, 51, 0.7);
}

form .row input:focus,
form .row select:focus {
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
  background: transparent;
  color: grey;
  font-size: 28px;
  border: none;
}

.wrapper form .row .arrow {
  position: absolute;
  right: 34px;
  top: 50%;
  transform: translateY(-50%);
  color: grey;
  font-size: 18px;
}

.wrapper form .row .arrow:hover {
  cursor: pointer;
}

.wrapper form .pass {
  margin-top: 5px;
}

.wrapper form .pass a {
  margin-left: -280px;
  color: #609966;
  font-size: 17px;
  text-decoration: none;
}
.wrapper form .pass a:hover {
  text-decoration: underline;
}

.wrapper form .button input {
  margin-top: 25px;
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

.wrapper form .input-error input,
.wrapper form .input-error select {
  border: 1.5px solid red;
}

.error-message {
  color: red;
  font-size: 15px;
  position: absolute;
  width: 450px;
}
</style>
