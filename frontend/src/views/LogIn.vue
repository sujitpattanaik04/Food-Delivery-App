<template>
  <v-main>
    <the-header></the-header>
    <v-container fluid class="mt-5">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="custom-card text-center">
            <v-card-title
              style="
                color: #609966;
                margin: 10px 0 10px 0;
                font-weight: 700;
                font-size: x-large;
                letter-spacing: 1.5px;
              "
              >Login Form</v-card-title
            >
            <v-form v-model="isFormValid" class="px-10">
              <!-- <v-text-field
                v-model="phone"
                :counter="10"
                :rules="phoneRules"
                label="Phone*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                @input="filterPhoneNumber"
              ></v-text-field> -->

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <v-select
                v-model="role"
                :items="roles"
                :rules="[(v) => !!v || 'Select Role is a required field']"
                label="Select Role*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
              ></v-select>

              <div class="mt-n6 mb-8" style="text-align: right">
                <router-link
                  to="/forgot-password"
                  class="custom-link"
                  style="font-weight: 500"
                  replace
                  >Forgot Password?</router-link
                >
              </div>

              <div class="d-flex justify-center">
                <v-btn
                  class="custom-btn b-6"
                  width="250"
                  @click="handleSubmit"
                  :disabled="!isFormValid"
                  >Login</v-btn
                >
              </div>

              <div class="text-center my-4">
                Not a member?
                <router-link
                  to="/signup"
                  class="custom-link"
                  style="font-weight: 500"
                  replace
                  >Signup Here</router-link
                >
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      emailRules: [
        (v) => !!v || "Email is a required field",
        (v) =>
          (v && /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) ||
          "Please enter a valid email",
      ],
      password: null,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v &&
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
              v
            )) ||
          "Password must be at least 8 characters and must include Digit, Special Character, Uppercase and Lowercase",
      ],
      role: null,
      roles: ["Admin", "Customer", "Delivery Partner", "Restaurant Owner"],
      showPassword: false,
      isFormValid: false,
      checkbox: false,
    };
  },
  methods: {
    // filterPhoneNumber(event) {
    //   const value = event.target.value.replace(/\D/g, "");
    //   this.phone = value;
    // },
    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
        role: this.role,
      };

      const res = await this.$store.dispatch("login", payload);

      if (res?.data?.status === "success") this.$router.replace("/dashboard");
    },
  },
};
</script>

<style scoped></style>
