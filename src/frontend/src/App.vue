<template>
  <div id="app">
    <app-header :account="account" @authenticate="authenticate" />
    <component :is="layoutComponent" :class="layoutClass" />
    <div class="modal">
      <router-view name="popup" @authenticate="authenticate" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import AppHeader from "./components/AppHeader";

const defaultLayout = "Default";

export default {
  name: "App",
  components: { AppHeader },
  data() {
    return {
      account: {},
    };
  },
  computed: {
    layoutComponent() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
    layoutClass() {
      const layout = this.$route.meta.layout || defaultLayout;
      return _.kebabCase(`${layout}Layout`);
    },
  },
  methods: {
    authenticate(account) {
      this.account = account;
      this.$router.push({ name: "builder" });
    },
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
