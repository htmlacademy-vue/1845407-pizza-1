<template>
  <label class="input">
    <slot />
    <input
      ref="input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>

<script>
export default {
  name: "InputField",
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
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  },
};
</script>
