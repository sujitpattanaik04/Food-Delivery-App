<template>
  <nav>
    <div class="nav-bar">
      <span class="logo navLogo"><a href="#">FooDelivery</a></span>

      <div class="nav-links">
        <li class="center"><a href="#">Dashboard</a></li>
        <li class="center"><a href="#">Profile</a></li>
        <li class="center">
          <router-link to="/change-password">Change Password</router-link>
        </li>
      </div>

      <div class="icon-container">
        <i class="bx bx-log-out" @click="logout"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace("/signup");
    },
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
  color: black;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

body.dark nav {
  border: 1px solid #393838;
}

nav .nav-bar {
  position: relative;
  height: 100%;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav .nav-bar .logo.navLogo a {
  font-size: 25px;
  font-weight: 500;
  color: #16a085;
  text-decoration: none;
}

.nav-bar .nav-links {
  display: flex;
  align-items: center;
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
  color: #16a085;
}

.nav-links li a:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: #1abc9c;
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

.icon-container {
  display: flex;
  align-items: center;
}
.icon-container i {
  color: var(--text-color);
  margin: 0 10px;
  font-size: 22px;
  cursor: pointer;
}

.icon-container i:hover {
  color: #1abc9c;
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
