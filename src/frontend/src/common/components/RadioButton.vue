<template>
  <label>
    <input
      type="radio"
      class="visually-hidden"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', $event.target.value)"
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
