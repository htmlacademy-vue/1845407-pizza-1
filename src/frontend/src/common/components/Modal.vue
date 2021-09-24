<template>
  <transition
    appear
    enter-active-class="animate__animated animate__faster animate__fadeIn"
    leave-active-class="animate__animated animate__faster animate__fadeOut"
    @leave="navigateTo"
  >
    <div class="modal" v-if="visible">
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
  name: "Modal",
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
