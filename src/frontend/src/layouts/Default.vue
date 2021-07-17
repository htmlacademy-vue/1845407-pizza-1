<template>
  <main class="content">
    <router-view />
  </main>
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
