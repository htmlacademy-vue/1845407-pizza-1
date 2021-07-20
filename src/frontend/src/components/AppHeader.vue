<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'builder' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'cart' }">{{ price }} ₽</router-link>
    </div>
    <pzz-account-header />
  </header>
</template>

<script>
import PzzAccountHeader from "@/modules/account/components/Header.vue";

import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  components: { PzzAccountHeader },
  computed: {
    ...mapGetters("Cart", ["price"]),
  },
};
</script>

<style lang="scss"></style>
