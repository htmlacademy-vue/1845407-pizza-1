<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!stepDownAllowed"
      value="stepDown"
      @click="click"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      ref="input"
      type="number"
      class="counter__input"
      :name="name"
      :value="value"
      readonly="true"
      disabled="true"
      :min="min"
      :max="max"
      @input="$emit('input', $event)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="!stepUpAllowed"
      value="stepUp"
      @click="click"
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
    click(event) {
      this.$refs["input"][event.target.value]();
      this.$refs["input"].dispatchEvent(new Event("input"));
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
