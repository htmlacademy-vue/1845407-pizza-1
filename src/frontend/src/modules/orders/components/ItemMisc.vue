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
  name: "ItemMisc",
  props: {
    id: Number,
    image: String,
    name: String,
    price: Number,
    quantity: Number,
  },
};
</script>
