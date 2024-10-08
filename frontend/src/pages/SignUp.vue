<template>
  <section>
    <the-header></the-header>
    <div class="wrapper">
      <div class="title"><span>Signup Form</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="row" :class="{ 'input-error': usernameError }">
          <i class="bx bx-user"></i>
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
            @blur="getUsernameError"
          />
          <span v-if="usernameError" class="error-message">{{
            usernameError
          }}</span>
        </div>

        <div class="row" :class="{ 'input-error': emailError }">
          <i class="bx bx-envelope"></i>

          <input
            type="text"
            placeholder="Email"
            v-model="email"
            required
            @blur="getEmailError"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="row" :class="{ 'input-error': phoneError }">
          <i class="bx bx-phone"></i>
          <input
            type="text"
            placeholder="Phone"
            v-model="phone"
            required
            @blur="getPhoneError"
          />
          <span v-if="phoneError" class="error-message">{{ phoneError }}</span>
        </div>

        <div class="row" :class="{ 'input-error': passwordError }">
          <i class="bx bx-lock"></i>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
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
            <option value="" disabled selected>Select Role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="delivery partner">Delivery Partner</option>
            <option value="restaurant owner">Restaurant Owner</option>
          </select>
          <span v-if="downArrow" class="arrow">▼</span>
          <span v-else class="arrow">▲</span>
          <span v-if="roleError" class="error-message">{{ roleError }}</span>
        </div>

        <div class="row button">
          <input type="submit" value="Signup" />
        </div>
        <div class="signup-link">
          Already a member? <router-link to="/login">Login now</router-link>
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
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      isPasswordVisible: false,
      emailError: "",
      usernameError: "",
      phoneError: "",
      passwordError: "",
      roleError: "",
      downArrow: true,
    };
  },
  methods: {
    getUsernameError() {
      this.usernameError =
        this.username && this.username.length < 3
          ? "Username must be at least 3 characters."
          : "";
    },
    getEmailError() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailError =
        this.email && !emailPattern.test(this.email)
          ? "Please enter a valid email."
          : "";
    },
    getPhoneError() {
      const phonePattern = /^\d{10}$/;
      this.phoneError =
        this.phone && !phonePattern.test(this.phone)
          ? "Phone number must be 10 digits."
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
    handleSubmit() {
      if (
        !this.usernameError &&
        !this.emailError &&
        !this.phoneError &&
        !this.passwordError &&
        !this.roleError
      ) {
        const payload = {
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
          role: this.role,
        };

        this.$store.dispatch("signup", payload);

        setTimeout(() => {
          this.$router.replace("/dashboard");
        }, 1500);
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

.wrapper form .pass a:hover {
  text-decoration: underline;
}

.wrapper form .button input {
  margin-top: 25px;
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

img {
  width: 100%;
  height: auto;
}
</style>
