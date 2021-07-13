<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">0 ₽</a>
    </div>
    <pzz-account-header :account="account" @onAuth="authenticate" />
  </header>
</template>

<script>
import PzzAccountHeader from "@/modules/account/components/Header.vue";

export default {
  name: "AppLayout",
  components: { PzzAccountHeader },
  data() {
    return {
      account: {},
    };
  },
  methods: {
    authenticate(account) {
      console.log(account);
      this.account = account;
    },
  },
};
</script>

<style lang="scss"></style>
