<template>
  <div class="sidebar">
    <router-link
      :to="{ name: 'orders' }"
      class="layout__link"
      :active-class="activeClass"
    >
      История заказов
    </router-link>
    <router-link
      :to="{ name: 'profile' }"
      class="layout__link"
      :active-class="activeClass"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
const activeClass = "layout__link--active";

export default {
  name: "PzzAccountSidebar",
  computed: {
    activeClass() {
      return activeClass;
    },
  },
  methods: {
    authenticate(account) {
      this.account = account;
    },
  },
};
</script>
