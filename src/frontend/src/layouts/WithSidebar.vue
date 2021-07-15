<template>
  <div class="with-sidebar-layout">
    <app-header
      :account="$attrs.account"
      @authenticate="$emit('authenticate', $event)"
    />
    <main class="layout">
      <router-view name="sidebar" class="layout__sidebar" />
      <router-view class="layout__content" />
    </main>
    <slot />
  </div>
</template>

<script>
export default {
  name: "WithSidebarLayout",
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
