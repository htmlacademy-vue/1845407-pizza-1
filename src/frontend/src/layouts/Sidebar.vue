<template>
  <main class="layout">
    <account-sidebar class="layout__sidebar" />
    <router-view class="layout__content" />
  </main>
</template>

<script>
import AccountSidebar from "@/modules/account/components/Sidebar";

export default {
  name: "SidebarLayout",
  components: { AccountSidebar },
};
</script>

<style lang="scss">
main.layout {
  display: flex;

  > .layout__sidebar {
    position: unset;
    height: unset;
    padding: 22px 0;
  }

  > .layout__content {
    flex-grow: 1;
    padding: 22px;
  }
}
</style>
