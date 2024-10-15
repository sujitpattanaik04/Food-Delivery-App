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
              >Signup Form</v-card-title
            >
            <v-form v-model="isFormValid" class="px-10">
              <v-text-field
                v-model="fullname"
                :rules="fullnameRules"
                label="Full Name*"
                color="#609966"
                variant="outlined"
                class="mb-2"
                prepend-inner-icon="mdi-account"
                required
              ></v-text-field>

              <v-text-field
                v-model="phone"
                :counter="10"
                :rules="phoneRules"
                label="Phone*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                prepend-inner-icon="mdi-phone"
                @input="filterPhoneNumber"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                prepend-inner-icon="mdi-email"
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
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <v-date-input
                v-model="dob"
                label="Date of Birth*"
                variant="outlined"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar"
                required
                :rules="dobRules"
                :max="new Date().toISOString().slice(0, 10)"
                class="mb-2"
              ></v-date-input>

              <v-select
                v-model="role"
                :items="roles"
                :rules="[(v) => !!v || 'Select Role is a required field']"
                label="Select Role*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                prepend-inner-icon="mdi-card-account-details"
              ></v-select>

              <div class="d-flex justify-center">
                <v-btn
                  class="custom-btn mt-4"
                  width="280"
                  @click="handleSubmit"
                  :disabled="!isFormValid"
                  >Register</v-btn
                >
              </div>

              <div class="text-center my-4">
                Already have an account?
                <router-link
                  to="/login"
                  class="custom-link"
                  style="font-weight: 500"
                  replace
                  >Login Here</router-link
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
import { VDateInput } from "vuetify/labs/VDateInput";

export default {
  components: {
    VDateInput,
  },
  data: () => ({
    fullname: null,
    fullnameRules: [
      (v) => !!v || "Full Name is a required field",
      (v) => (v && v.length > 3) || "Full Name must be more than 3 characters",
      (v) =>
        (v && /^[A-Za-z\s]+$/.test(v)) ||
        "Full Name must contain characters only.",
    ],
    email: null,
    emailRules: [
      (v) => !!v || "Email is a required field",
      (v) =>
        (v && /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) ||
        "Please enter a valid email",
    ],
    phone: null,
    phoneRules: [
      (v) => !!v || "Phone is a required field",
      (v) => (v && /^\d{10}$/.test(v)) || "Phone number must be 10 digits.",
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
    dob: null,
    dobRules: [
      (v) => !!v || "Date of Birth is a required field",
      (v) => {
        const age = Math.floor(
          (Date.now() - new Date(v).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
        );
        return age >= 16 || "Age must be at least 16 to create an account";
      },
    ],
    role: null,
    roles: ["Admin", "Customer", "Delivery Partner", "Restaurant Owner"],
    showPassword: false,
    isFormValid: false,
    checkbox: false,
  }),
  methods: {
    filterPhoneNumber(event) {
      const value = event.target.value.replace(/\D/g, "");
      this.phone = value;
    },
    async handleSubmit() {
      const dobString = this.dob.toLocaleDateString();

      const payload = {
        fullname: this.fullname,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: this.role,
        dob: dobString,
      };

      const res = await this.$store.dispatch("signup", payload);

      if (res?.data?.status === "success") this.$router.replace("/dashboard");
    },
  },
};
</script>

<style scoped></style>
