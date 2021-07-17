<template>
  <main class="layout">
    <router-view name="sidebar" class="layout__sidebar" />
    <router-view class="layout__content" />
  </main>
</template>

<script>
export default {
  name: "SidebarLayout",
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
