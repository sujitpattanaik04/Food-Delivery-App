<template>
  <the-header></the-header>
  <v-main class="d-flex justify-center align-center flex-column">
    <h1 style="color: chocolate">Hello {{ firstname }} ! How's it going?</h1>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      firstname: null,
    };
  },
  created() {
    const user = this.$store.getters.getUser;
    if (!user) this.$router.replace("/login");
    this.firstname = user ? user.fullname.split(" ")[0] : null;
  },
};
</script>

<style scoped>
h2 {
  margin: -55px 0 0 10px;
}
</style>
