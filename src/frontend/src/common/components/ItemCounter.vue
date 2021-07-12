<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--disabled': !allowStepDown }"
      :disabled="!allowStepDown"
      :value="value - 1"
      @click="$emit('changeCounter', $event)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="number"
      class="counter__input"
      :name="name"
      :value="value"
      readonly="true"
      disabled="true"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--disabled': !allowStepUp }"
      :disabled="!allowStepUp"
      :value="value + 1"
      @click="$emit('changeCounter', $event)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseItemCounter",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      equired: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    allowStepDown() {
      return this.value > 0;
    },
    allowStepUp() {
      return this.value < 3;
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="number"] {
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
}
</style>
