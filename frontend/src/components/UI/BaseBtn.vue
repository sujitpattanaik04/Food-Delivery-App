<template>
  <button v-if="!link" :class="mode" type="submit">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: { type: Boolean, required: false, default: false },
    to: { type: String, required: false, default: '/' },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  font-size: medium;
  background-color: rgb(201, 144, 0);
  color: rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 15px;
  margin-right: 0.5rem;
  display: inline-block;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: rgb(233, 169, 7);
}
/* 
.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
} */
</style>
