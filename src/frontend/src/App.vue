<template>
  <div id="app">
    <app-notification />
    <app-header />
    <component :is="layoutComponent" :class="layoutClass" />
  </div>
</template>

<script>
import kebabCase from "lodash/kebabCase";

const defaultLayout = "Default";

export default {
  name: "App",
  computed: {
    layoutComponent() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}`);
    },
    layoutClass() {
      const layout = this.$route.meta.layout || defaultLayout;
      return kebabCase(`${layout}Layout`);
    },
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "../src/assets/scss/app";

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > main {
    flex-grow: 1;
  }

  .modal {
    z-index: 10;

    &:not(:empty):before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
