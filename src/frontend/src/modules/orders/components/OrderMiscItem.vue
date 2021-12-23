<template>
  <li class="order__misc-item">
    <img
      class="misc-item__img"
      :src="image"
      width="20"
      height="30"
      :alt="name"
    >
    <p class="misc-item__text">
      <span>{{ name }}</span>
      <b class="misc-item__price">{{ quantity }} x {{ price }}₽</b>
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
  .order__misc-item {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  .misc-item__text {
    margin: 0;
  }

  .misc-item__img {
    float: left;

    margin-right: 7px;
  }

  .misc-item__price {
    display: block;
  }
</style>
