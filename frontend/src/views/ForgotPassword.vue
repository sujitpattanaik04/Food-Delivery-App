<template>
  <section>
    <the-header></the-header>
    <div class="wrapper">
      <div class="title"><span>Forgot Password</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="row" :class="{ 'input-error': emailError }">
          <i class="bx bx-envelope"></i>
          <input
            type="text"
            placeholder="Enter Your Email"
            v-model.trim="email"
            required
            @blur="getEmailError"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="row button">
          <input type="submit" value="Send Password Reset Request" />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailError: "",
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
    async handleSubmit() {
      if (!this.emailError) {
        const payload = {
          email: this.email,
        };
        await this.$store.dispatch("forgotPassword", payload);
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
