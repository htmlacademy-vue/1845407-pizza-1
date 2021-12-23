<template>
  <transition
    appear
    enter-active-class="animate__animated animate__faster animate__fadeIn"
    leave-active-class="animate__animated animate__faster animate__fadeOut"
    @leave="navigateTo"
  >
    <div
      v-if="visible"
      class="modal"
    >
      <transition
        appear
        appear-active-class="animate__animated animate__bounceInDown"
      >
        <slot :close="closeModal" />
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModal",
  data() {
    return {
      visible: true,
      to: false,
    };
  },
  methods: {
    closeModal(to) {
      this.visible = false;
      this.to = to;
    },
    navigateTo() {
      this.$router.replace(this.to);
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    z-index: 10;

    &:not(:empty):before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>
