<template>
  <label class="input">
    <slot></slot>
    <input
      ref="input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BaseInputField",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
