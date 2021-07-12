<template>
  <label>
    <input
      type="radio"
      class="visually-hidden"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('changeChoice', $event)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "BaseRadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    checked: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped></style>
