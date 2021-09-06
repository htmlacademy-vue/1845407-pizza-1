<template>
  <label class="input">
    <slot></slot>
    <input
      ref="input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
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
    readonly: {
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
    console.log({ autofocus: this.autofocus });
    if (this.autofocus) this.$refs.input.focus();
  },
};
</script>
