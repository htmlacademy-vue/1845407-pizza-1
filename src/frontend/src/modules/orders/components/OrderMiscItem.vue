<template>
  <li>
    <img :src="image" width="20" height="30" :alt="name" />
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
    id: [Number, String],
    image: String,
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
};
</script>
