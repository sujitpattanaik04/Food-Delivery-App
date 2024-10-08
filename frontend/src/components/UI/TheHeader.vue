<template>
  <nav>
    <div class="nav-bar">
      <span class="logo navLogo"><a href="#">FooDelivery</a></span>

      <div class="nav-links" v-if="user">
        <li class="center">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="center">
          <router-link to="/change-password">Change Password</router-link>
        </li>
        <li class="center">
          <a @click="logout">Logout</a>
        </li>
      </div>

      <div class="nav-links" v-else>
        <li class="center">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="center">
          <router-link to="/signup">Signup</router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      localStorage.clear();

      this.$router.replace("/login");
    },
  },
  created() {
    const user = this.$store.getters.getUser;
    this.user = user;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  transition: all 0.4s ease;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: white;
}

nav .nav-bar {
  position: relative;
  height: 100%;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav .nav-bar .logo.navLogo a {
  margin-left: -500px;
  font-size: 30px;
  font-weight: 700;
  color: #609966;
  text-decoration: none;
}

.nav-bar .nav-links {
  display: flex;
  align-items: center;
  margin-right: -340px;
}

.nav-links li {
  list-style: none;
  margin: 0 12px;
}
.nav-links li a {
  position: relative;
  color: #333;
  font-size: 20px;
  font-weight: 500;
  padding: 6px 0;
  text-decoration: none;
}

.nav-links li a:hover {
  color: #609966;
}

.nav-links li a:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: #609966;
  border-radius: 12px;
  transition: all 0.4s ease;
}
.nav-links li a:hover:before {
  width: 100%;
}
.nav-links li.center a:before {
  left: 50%;
  transform: translateX(-50%);
}
/* .nav-links li.upward a:before {
  width: 100%;
  bottom: -5px;
  opacity: 0;
}
.nav-links li.upward a:hover:before {
  bottom: 0px;
  opacity: 1;
}
.nav-links li.forward a:before {
  width: 100%;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}
.nav-links li.forward a:hover:before {
  transform: scaleX(1);
  transform-origin: left;
} */
</style>
