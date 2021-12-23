<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        to="/"
        class="logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        >
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">
        <block-cost v-bind="{ pizzas, misc }" />
      </router-link>
    </div>
    <account-header />
  </header>
</template>

<script>
import AccountHeader from "@/modules/account/components/AccountHeader";
import BlockCost from "@/common/components/BlockCost";
import { mapState } from "vuex";

export default {
  name: "AppHeader",
  components: { AccountHeader, BlockCost },
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/logo.scss";
</style>
