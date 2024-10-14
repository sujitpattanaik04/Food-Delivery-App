<template>
  <v-app-bar>
    <v-container>
      <v-row align="center">
        <v-toolbar-title class="nav-title">FooDelivery</v-toolbar-title>
        <v-col class="nav-links d-none d-lg-flex justify-end">
          <v-icon
            style="margin: 3px 14px 0 0"
            size="28"
            @click="toggleTheme"
            v-if="darkTheme"
            >mdi-weather-sunny</v-icon
          >

          <v-icon
            style="margin: 3px 14px 0 0"
            size="28"
            @click="toggleTheme"
            v-else
            >mdi-weather-night</v-icon
          >

          <div v-if="user">
            <router-link
              to="/dashboard"
              class="mx-3"
              replace
              :class="darkTheme ? 'text-white' : 'text-black'"
              >Dashboard</router-link
            >
            <router-link
              to="/change-password"
              class="mx-3"
              replace
              :class="darkTheme ? 'text-white' : 'text-black'"
              >Change Password</router-link
            >
            <a
              class="mx-3"
              :class="darkTheme ? 'text-white' : 'text-black'"
              @click="logout"
              >Logout</a
            >
          </div>
          <div v-else>
            <router-link
              to="/login"
              class="mx-3"
              replace
              :class="darkTheme ? 'text-white' : 'text-black'"
              >Login</router-link
            >
            <router-link
              to="/signup"
              class="mx-3"
              replace
              :class="darkTheme ? 'text-white' : 'text-black'"
              >Signup</router-link
            >
          </div>
        </v-col>

        <v-col class="d-flex d-lg-none justify-end">
          <v-btn icon v-if="darkTheme">
            <v-icon style="margin-right: 10px" size="28" @click="toggleTheme"
              >mdi-weather-sunny</v-icon
            >
          </v-btn>

          <v-btn icon v-else>
            <v-icon style="margin-right: 10px" size="28" @click="toggleTheme"
              >mdi-weather-night</v-icon
            >
          </v-btn>

          <v-menu offset="4">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon size="28">mdi-menu</v-icon>
              </v-btn>
            </template>

            <v-list class="custom-list">
              <v-list-item-group v-if="user">
                <v-list-item>
                  <router-link
                    to="/dashboard"
                    replace
                    :class="darkTheme ? 'text-white' : 'text-black'"
                    >Dashboard</router-link
                  >
                </v-list-item>
                <v-list-item>
                  <router-link
                    to="/change-password"
                    replace
                    :class="darkTheme ? 'text-white' : 'text-black'"
                    >Change Password</router-link
                  >
                </v-list-item>
                <v-list-item>
                  <a
                    style="cursor: pointer"
                    :class="darkTheme ? 'text-white' : 'text-black'"
                    @click="logout"
                    >Logout</a
                  >
                </v-list-item>
              </v-list-item-group>

              <v-list-item-group v-else>
                <v-list-item>
                  <router-link
                    to="/login"
                    replace
                    :class="darkTheme ? 'text-white' : 'text-black'"
                    >Login</router-link
                  >
                </v-list-item>
                <v-list-item>
                  <router-link
                    to="/signup"
                    replace
                    :class="darkTheme ? 'text-white' : 'text-black'"
                    >Signup</router-link
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  data() {
    return {
      user: null,
      darkTheme: null,
      theme: useTheme(),
    };
  },
  created() {
    this.user = this.$store.getters.getUser;
    console.log(23, this.user);

    this.darkTheme = this.$store.getters.isDark;
  },
  methods: {
    toggleTheme() {
      this.$store.commit("toggleTheme");
      this.darkTheme = this.$store.getters.isDark;
      this.theme.global.name = this.darkTheme ? "dark" : "light";
    },
    async logout() {
      const res = await this.$store.dispatch("logout");

      if (res?.data?.status === "success") this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.nav-title {
  color: #609966;
  font-size: 30px;
  font-weight: 700;
}

.nav-links a {
  position: relative;
  margin: 0 12px;
  font-size: 20px;
  font-weight: 500;
  padding: 6px 0;
  text-decoration: none;
}

.nav-links a:hover {
  cursor: pointer;
  color: #609966;
}

.nav-links a:hover {
  cursor: pointer; /* Change cursor on hover */
  color: #609966; /* Change link color on hover */
}

.nav-links a:before {
  content: ""; /* Create a pseudo-element */
  position: absolute; /* Position it relative to the link */
  bottom: 0; /* Align to the bottom */
  height: 3px; /* Height of the underline */
  width: 0%; /* Start with no width */
  background: #609966; /* Underline color */
  border-radius: 12px; /* Rounded corners */
  transition: width 0.4s ease; /* Smooth transition for width change */
}

.nav-links a:hover:before {
  width: 100%; /* Expand to full width on hover */
}

.custom-list a {
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
}
</style>
