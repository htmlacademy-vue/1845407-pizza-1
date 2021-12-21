<template>
  <li>
    <img
      :src="image"
      width="20"
      height="30"
      :alt="name"
    >
    <p>
      <span>{{ name }}</span>
      <b>{{ quantity }} x {{ price }}₽</b>
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderMiscItem",
  props: {
    id: {
      type: [Number, String],
      default: undefined,
    },
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
};
</script>
