<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("getUserDetails");
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  user-select: none;
}
</style>
