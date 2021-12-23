<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="image"
        width="39"
        height="60"
        :alt="name"
      >
      <span>
        {{ name }}
        <br>
        <span>{{ price }} ₽/шт</span>
      </span>
    </p>

    <div class="additional-list__wrapper">
      <base-item-counter
        class="additional-list__counter"
        name="addition[quantity]"
        :value="quantity"
        :min="0"
        @input="$emit('onChangeCount', $event)"
      />
      <div class="additional-list__price">
        <b><block-cost :misc="[{ price, quantity }]" /></b>
      </div>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/ItemCounter";
import BlockCost from "@/common/components/BlockCost";

export default {
  name: "CartMiscItem",
  components: { BaseItemCounter, BlockCost },
  props: {
    name: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    cost() {
      return this.quantity * this.price;
    },
  },
};
</script>

<style lang="scss" scoped>
  .additional-list__description {
    display: flex;
    align-items: flex-start;

    margin: 0;
    margin-bottom: 8px;
  }

  .additional-list__item {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-grow: 1;

    width: 200px;
    margin-bottom: 15px;
    padding-top: 15px;
    padding-bottom: 15px;

    & + & {
      margin-left: 15px;
    }

    img {
      margin-right: 10px;
      margin-left: 15px;
    }

    span {
      @include b-s14-h16;

      display: inline;

      width: 100px;
      margin-right: 15px;

      > span {
        font-weight: normal;
      }
    }
  }

  .additional-list__wrapper {
    display: flex;
    align-items: center;

    box-sizing: border-box;
    width: 100%;
    margin-top: auto;
    padding-top: 18px;
    padding-right: 15px;
    padding-left: 15px;

    border-top: 1px solid rgba($green-500, 0.1);
  }

  .additional-list__counter {
    width: 54px;
    margin-right: auto;
  }

  .additional-list__price {
    @include b-s16-h19;
  }
</style>
