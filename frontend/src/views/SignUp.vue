<template>
  <section>
    <the-header></the-header>
    <v-container fluid class="mt-5">
      <v-row justify="center">
        <v-col cols="4">
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
            <v-form ref="form" class="px-10 gap-2">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username*"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email*"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <v-text-field
                v-model="phone"
                :counter="10"
                :rules="phoneRules"
                label="Phone*"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password*"
                variant="outlined"
                class="mb-2"
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
                required
              ></v-select>

              <v-checkbox
                v-model="checkbox"
                label="Remember Me"
                required
                class="mt-n6"
              ></v-checkbox>

              <div class="d-flex justify-center">
                <v-btn class="custom-btn b-6" width="350" @click="handleSubmit"
                  >Submit</v-btn
                >
              </div>

              <div class="text-center my-4">
                Already have an account?
                <router-link
                  to="/login"
                  class="router-link"
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
  </section>
</template>

<script>
import TheHeader from "../components/UI/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  data: () => ({
    username: null,
    usernameRules: [
      (v) => !!v || "Username is a required field",
      (v) => (v && v.length > 3) || "Username must be more than 3 characters",
      (v) =>
        (v && /^[A-Za-z\s]+$/.test(v)) ||
        "Username must contain characters only.",
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
    role: null,
    roles: ["Admin", "Customer", "Delivery Partner", "Restaurant Owner"],
    showPassword: false,
    checkbox: false,
  }),

  methods: {
    async handleSubmit() {
      console.log(this.$refs.form);

      if (this.$refs.form.validate()) {
        const payload = {
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
          role: this.role,
        };

        const res = await this.$store.dispatch("signup", payload);

        if (res?.data?.status === "success") this.$router.replace("/dashboard");
      } else {
        alert("Form is invalid, please correct the errors.");
      }
    },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
  },
};
</script>

<style scoped>
.custom-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.custom-btn {
  color: #609966;
  background-color: white;
}

.custom-btn:hover {
  background-color: #609966;
  color: white;
}

.router-link {
  color: #609966;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
