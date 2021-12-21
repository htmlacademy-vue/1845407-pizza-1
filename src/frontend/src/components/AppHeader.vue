<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        :to="{ name: 'Builder' }"
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
      <router-link :to="{ name: 'Cart' }">
        <base-cost-block v-bind="{ pizzas, misc }" />
      </router-link>
    </div>
    <account-header />
  </header>
</template>

<script>
import AccountHeader from "@/modules/account/components/AccountHeader";
import BaseCostBlock from "@/common/components/CostBlock";
import { mapState } from "vuex";

export default {
  name: "AppHeader",
  components: { AccountHeader, BaseCostBlock },
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
  },
};
</script>

<style lang="scss"></style>
