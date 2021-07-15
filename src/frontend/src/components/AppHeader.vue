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
      <router-link :to="{ name: 'cart' }">0 ₽</router-link>
    </div>
    <pzz-account-header
      :account="account"
      @authenticate="$emit('authenticate', $event)"
    />
  </header>
</template>

<script>
import PzzAccountHeader from "@/modules/account/components/Header.vue";

export default {
  name: "AppHeader",
  components: { PzzAccountHeader },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
