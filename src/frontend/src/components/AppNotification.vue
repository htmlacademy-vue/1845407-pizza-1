<template>
  <div
    v-if="notifications.length"
    class="notification__wrapper"
  >
    <div
      v-for="({ text, type }, index) in notifications"
      :key="index"
      class="notification"
      :class="`notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppNotification",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped>
.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 1rem;

  text-align: center;

  color: $white;
  border: 1px solid transparent;
  border-radius: 8px;

  &__wrapper {
    position: fixed;
    z-index: 9999;
    top: 5px;
    right: 5px;

    width: 455px;
  }

  &--info {
    border-color: $purple-400;
    background: $purple-200;
  }
  &--error {
    border-color: $red-900;
    background: $red-800;
  }
  &--success {
    border-color: $green-600;
    background: $green-300;
  }
  &--warning {
    border-color: $orange-300;
    background: $orange-100;
  }
}
</style>
