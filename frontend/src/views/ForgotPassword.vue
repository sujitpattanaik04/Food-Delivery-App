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
              >Password Reset Request Form</v-card-title
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

              <!-- <v-text-field
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
              ></v-text-field> -->

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Enter Your Email*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                prepend-inner-icon="mdi-email"
              ></v-text-field>

              <div class="d-flex justify-center">
                <v-btn
                  class="custom-btn mb-5"
                  width="280"
                  @click="handleSubmit"
                  :disabled="!isFormValid"
                  >Send Password Reset Request</v-btn
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
      isFormValid: false,
    };
  },
  methods: {
    async handleSubmit() {
      const payload = {
        email: this.email,
      };

      await this.$store.dispatch("forgotPassword", payload);

      this.email = null;
      this.isFormValid = false;
    },
  },
};
</script>

<style scoped></style>
