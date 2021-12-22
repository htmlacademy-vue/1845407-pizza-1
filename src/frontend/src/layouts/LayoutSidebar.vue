<template>
  <main class="layout">
    <account-sidebar class="layout__sidebar" />
    <router-view class="layout__content" />
  </main>
</template>

<script>
import AccountSidebar from "@/modules/account/components/AccountSidebar";

export default {
  name: "LayoutSidebar",
  components: { AccountSidebar },
};
</script>
