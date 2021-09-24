<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!stepDownAllowed"
      @click="stepDown"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      ref="input"
      type="number"
      class="counter__input"
      :name="name"
      :value="value"
      disabled
      :min="min"
      :max="max"
      @input="$emit('input', $event.target.valueAsNumber)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="!stepUpAllowed"
      @click="stepUp"
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
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
  },
  computed: {
    stepDownAllowed() {
      return this.min == null || this.min < this.value;
    },
    stepUpAllowed() {
      return this.max == null || this.max > this.value;
    },
  },
  methods: {
    stepDown() {
      if (this.stepDownAllowed) this.$emit("input", this.value - 1);
    },
    stepUp() {
      if (this.stepUpAllowed) this.$emit("input", this.value + 1);
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
