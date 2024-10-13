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
              >Change Password</v-card-title
            >
            <v-form v-model="isFormValid" class="px-10">
              <v-text-field
                v-model="NewPassword"
                :rules="passwordRules"
                :type="showNewPassword ? 'text' : 'password'"
                label="New Password*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showNewPassword = !showNewPassword"
              ></v-text-field>

              <v-text-field
                v-model="oldPassword"
                :rules="passwordRules"
                :type="showOldPassword ? 'text' : 'password'"
                label="Old Password*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                :append-inner-icon="showOldPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showOldPassword = !showOldPassword"
              ></v-text-field>

              <v-text-field
                v-model="ConfirmPassword"
                :rules="passwordRules"
                :type="showConfirmPassword ? 'text' : 'password'"
                label="Confirm Password*"
                variant="outlined"
                class="mb-2"
                color="#609966"
                required
                :append-inner-icon="
                  showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>

              <div class="d-flex justify-center">
                <v-btn
                  class="custom-btn mb-5"
                  width="250"
                  @click="handleSubmit"
                  :disabled="!isFormValid"
                  >Change Password</v-btn
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
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v &&
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
              v
            )) ||
          "Password must be at least 8 characters and must include Digit, Special Character, Uppercase and Lowercase",
      ],
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      isFormValid: false,
    };
  },
  methods: {
    async handleSubmit() {
      const payload = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      };

      const res = await this.$store.dispatch("changePassword", payload);

      if (res?.status === "success") {
        this.$router.replace("/dashboard");
      }
    },
  },
};
</script>

<style scoped></style>
