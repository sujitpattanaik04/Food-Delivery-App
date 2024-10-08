<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Zomato Signup</v-toolbar-title>
    </v-app-bar>
    <v-container class="d-flex justify-center align-center">
      <v-card class="pa-4" max-width="500">
        <v-card-title class="title">Signup Form</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleSubmit">
            <v-row>
              <!-- Username Field -->
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  label="Username"
                  outlined
                  prepend-icon="mdi-account"
                  :rules="[getUsernameError]"
                  @blur="getUsernameError"
                ></v-text-field>
              </v-col>

              <!-- Email Field -->
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  prepend-icon="mdi-email"
                  :rules="[getEmailError]"
                  @blur="getEmailError"
                ></v-text-field>
              </v-col>

              <!-- Phone Field -->
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  outlined
                  prepend-icon="mdi-phone"
                  :rules="[getPhoneError]"
                  @blur="getPhoneError"
                ></v-text-field>
              </v-col>

              <!-- Password Field -->
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password"
                  outlined
                  prepend-icon="mdi-lock"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="[getPasswordError]"
                  @click:append="togglePasswordVisibility"
                  @blur="getPasswordError"
                ></v-text-field>
              </v-col>

              <!-- Role Selector -->
              <v-col cols="12">
                <v-select
                  v-model="role"
                  label="Select Role"
                  outlined
                  :items="roles"
                  :rules="[getRoleError]"
                  prepend-icon="mdi-id-card"
                  @blur="getRoleError"
                ></v-select>
              </v-col>

              <!-- Signup Button -->
              <v-col cols="12">
                <v-btn
                  color="primary"
                  large
                  type="submit"
                  :disabled="isFormInvalid"
                >
                  Signup
                </v-btn>
              </v-col>

              <!-- Login Link -->
              <v-col class="text-center">
                Already a member?
                <router-link to="/login" class="ml-2">Login now</router-link>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      isPasswordVisible: false,
      roles: ["Admin", "Customer", "Delivery Partner", "Restaurant Owner"],
    };
  },
  computed: {
    // Check if the form has errors
    isFormInvalid() {
      return (
        this.getUsernameError() ||
        this.getEmailError() ||
        this.getPhoneError() ||
        this.getPasswordError() ||
        this.getRoleError()
      );
    },
  },
  methods: {
    ...mapActions(["signup"]),
    getUsernameError() {
      return this.username && this.username.length < 3
        ? "Username must be at least 3 characters."
        : "";
    },
    getEmailError() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return this.email && !emailPattern.test(this.email)
        ? "Please enter a valid email."
        : "";
    },
    getPhoneError() {
      const phonePattern = /^\d{10}$/;
      return this.phone && !phonePattern.test(this.phone)
        ? "Phone number must be 10 digits."
        : "";
    },
    getPasswordError() {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return this.password && !passwordPattern.test(this.password)
        ? "Password must include digit, special character, and a mix of cases."
        : "";
    },
    getRoleError() {
      return !this.role ? "Please select a role." : "";
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    handleSubmit() {
      if (!this.isFormInvalid) {
        const payload = {
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
          role: this.role,
        };
        this.signup(payload);

        setTimeout(() => {
          this.$router.replace("/dashboard");
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
.title {
  color: #609966;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
}
</style>
