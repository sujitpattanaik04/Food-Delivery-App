<template>
  <v-main>
    <the-header></the-header>
    <h2>Hello {{ fullname }}! How's it going?</h2>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    const user = this.$store.getters.getUser;
    if (!user) this.$router.replace("/signup");
    this.fullname = user ? user.fullname : "";
  },
};
</script>

<style scoped>
h2 {
  position: absolute;
  margin: -55px 0 0 10px;
}
</style>
