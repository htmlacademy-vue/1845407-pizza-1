<template>
  <div id="app">
    <app-notification />
    <app-header />
    <main class="content">
      <router-view />
    </main>
    <div class="modal">
      <router-view name="popup" />
    </div>
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
