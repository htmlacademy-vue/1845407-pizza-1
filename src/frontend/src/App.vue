<template>
  <app-meta-layout id="app" v-bind="$data" @authenticate="authenticate" />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      account: {},
    };
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
</style>
