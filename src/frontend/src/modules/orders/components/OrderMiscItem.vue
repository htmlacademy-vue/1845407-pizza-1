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

<style lang="scss" scoped>
  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
</style>
