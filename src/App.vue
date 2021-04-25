<template>
  <div id="page">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default {
  mounted() {
    console.log("mounted");
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
}
</style>
