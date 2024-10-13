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
              >Reset Password Form</v-card-title
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
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Enter New Password*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <div class="d-flex justify-center">
                <v-btn
                  class="custom-btn mb-5"
                  width="250"
                  @click="handleSubmit"
                  :disabled="!isFormValid"
                  >Reset Password</v-btn
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
      showPassword: false,
      isFormValid: false,
    };
  },
  methods: {
    async handleSubmit() {
      const payload = {
        newPassword: this.password,
      };

      const res = await this.$store.dispatch("resetPassword", payload);

      if (res?.data?.status === "success") this.$router.replace("/login");
    },
  },
};
</script>

<style scoped></style>
