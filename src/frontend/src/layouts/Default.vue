<template>
  <div class="default-layout">
    <app-header
      :account="$attrs.account"
      @authenticate="$emit('authenticate', $event)"
    />
    <main class="content">
      <router-view />
    </main>
    <slot />
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style lang="scss">
main.content {
  display: flex;
}
</style>
