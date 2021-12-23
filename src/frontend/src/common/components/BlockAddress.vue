<template>
  <p>
    <slot />
    {{ address }}
  </p>
</template>

<script>
export default {
  name: "BlockAddress",
  props: {
    street: {
      type: String,
      default: "",
    },
    building: {
      type: String,
      default: "",
    },
    flat: {
      type: String,
      default: "",
    },
  },
  computed: {
    address() {
      return [
        this.street,
        this.building && `д. ${this.building}`,
        this.flat && `кв. ${this.flat}`,
      ]
        .filter(Boolean)
        .join(", ");
    },
  },
};
</script>
