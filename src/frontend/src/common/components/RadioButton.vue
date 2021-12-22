<template>
  <label>
    <input
      type="radio"
      class="visually-hidden"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', $event.target.value)"
    >
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: undefined,
    },
    checked: {
      type: Boolean,
      default: undefined,
    },
  },
};
</script>
