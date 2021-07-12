<template>
  <div id="app">
    <pzz-app-layout />
    <pzz-index />
  </div>
</template>

<script>
import PzzAppLayout from "@/layouts/AppLayout.vue";
import PzzIndex from "@/views/Index.vue";

export default {
  name: "App",
  components: { PzzAppLayout, PzzIndex },
};
</script>

<style lang="scss">
@import "../src/assets/scss/app";
</style>
