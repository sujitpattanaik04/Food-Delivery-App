<template>
  <v-toolbar>
    <v-toolbar-title class="nav-title">FooDelivery</v-toolbar-title>
    <div class="nav-links">
      <router-link to="/login" class="center" replace>Login</router-link>
      <router-link to="/signup" class="center" replace>Signup</router-link>
    </div>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

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
