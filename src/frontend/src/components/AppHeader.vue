<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        :to="{ name: 'builder' }"
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
      <router-link :to="{ name: 'cart' }">
        <base-cost v-bind="{ pizzas, misc }" />
      </router-link>
    </div>
    <account-header />
  </header>
</template>

<script>
import AccountHeader from "@/modules/account/components/AccountHeader";
import BaseCost from "@/common/components/Cost";
import { mapState } from "vuex";

export default {
  name: "AppHeader",
  components: { AccountHeader, BaseCost },
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
  },
};
</script>

<style lang="scss"></style>
