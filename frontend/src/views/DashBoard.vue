<template>
  <the-header></the-header>
  <h1>Hello {{ username }}! How's it going?</h1>
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
    };
  },
  created() {
    const user = this.$store.getters.getUser;
    if (!user) this.$router.replace("/signup");
    this.username = user ? user.username : "";
  },
};
</script>

<style scoped>
h1 {
  position: absolute;
  margin-top: 50px;
}
</style>
