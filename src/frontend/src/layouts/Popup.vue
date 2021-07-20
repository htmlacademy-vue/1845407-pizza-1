<template>
  <div id="app">
    <app-header />
    <main class="content">
      <router-view name="main" />
    </main>
    <div class="modal">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupLayout",
};
</script>
