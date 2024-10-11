<template>
  <v-toolbar>
    <v-toolbar-title class="nav-title">FooDelivery</v-toolbar-title>
    <div class="nav-links" v-if="user">
      <router-link to="/dashboard" class="center" replace
        >Dashboard</router-link
      >
      <router-link to="/change-password" class="center" replace
        >Change Password</router-link
      >
      <a @click="logout">Logout</a>
    </div>
    <div class="nav-links" v-else>
      <router-link to="/login" class="center" replace>Login</router-link>
      <router-link to="/signup" class="center" replace>Signup</router-link>
    </div>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$store.getters.getUser;
  },
  methods: {
    async logout() {
      const res = await this.$store.dispatch("logout");

      if (res?.data?.status === "success") this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.nav-title {
  font-size: 30px;
  font-weight: 700;
  color: #609966;
}

.nav-links a {
  position: relative;
  margin: 0 12px;
  color: #333;
  font-size: 20px;
  font-weight: 500;
  padding: 6px 0;
  text-decoration: none;
}

.nav-links a:hover {
  cursor: pointer;
  color: #609966;
}

.nav-links a:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 0%;
  background: #609966;
  border-radius: 12px;
  transition: all 0.4s ease;
}

.nav-links a:hover:before {
  width: 100%;
}
</style>
