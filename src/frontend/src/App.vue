<template>
  <div id="app">
    <app-layout />
    <app-index-view />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import AppIndexView from "@/views/AppIndexView.vue";

export default {
  name: "App",
  components: { AppLayout, AppIndexView },
};
</script>

<style lang="scss">
@import "../src/assets/scss/app";
</style>
