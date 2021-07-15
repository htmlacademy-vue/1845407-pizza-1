<template>
  <component :is="metaLayout" v-bind="$attrs" v-on="$listeners">
    <div class="modal">
      <router-view name="popup" v-on="$listeners" />
    </div>
  </component>
</template>

<script>
const defaultLayout = "Default";

export default {
  name: "AppLayout",
  computed: {
    metaLayout() {
      const metaLayout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${metaLayout}.vue`);
    },
  },
};
</script>

<style lang="scss">
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
