<template>
  <v-main>
    <the-header></the-header>
    <h2>Hello {{ firstname }} ! How's it going?</h2>
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
    if (!user) this.$router.replace("/signup");
    this.firstname = user ? user.fullname.split(" ")[0] : null;
  },
};
</script>

<style scoped>
h2 {
  margin: -55px 0 0 10px;
}
</style>
