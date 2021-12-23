<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: <block-cost v-bind="{ pizzas, misc }" /></span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          data-test="destroyOrder"
          @click.prevent="onDestroy"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="repeatOrder"
          @click.prevent="repeatOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <order-pizza-item
        v-for="item in pizzas"
        :key="item.id"
        v-bind="item"
      />
    </ul>

    <ul class="order__additional">
      <order-misc-item
        v-for="item in filteredMisc"
        :key="item.id"
        v-bind="item"
      />
    </ul>

    <ul class="order__address">
      <block-address
        сlass="order__address"
        v-bind="address"
      >
        <template v-if="address">
          Адрес доставки:
        </template>
        <template v-else>
          Самовывоз
        </template>
      </block-address>
    </ul>
  </section>
</template>

<script>
import find from "lodash/find";
import pick from "lodash/pick";

import { normalizeByKey } from "@/common/helpers";

import BlockAddress from "@/common/components/BlockAddress";
import BlockCost from "@/common/components/BlockCost";
import OrderPizzaItem from "@/modules/orders/components/OrderPizzaItem";
import OrderMiscItem from "@/modules/orders/components/OrderMiscItem";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/modules/cart/store";

export default {
  name: "OrderItem",
  components: { OrderPizzaItem, OrderMiscItem, BlockAddress, BlockCost },
  props: {
    id: {
      type: [Number],
      required: true,
    },
    orderPizzas: {
      type: Array,
      default: () => [],
    },
    orderMisc: {
      type: Array,
      default: () => [],
    },
    orderAddress: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredients"]),
    ...mapState("Cart", {
      cartMisc: "misc",
    }),
    pizzas() {
      return this.orderPizzas.map(this.buildPizza).map(this.pricePizza);
    },
    misc() {
      return normalizeByKey(
        this.cartMisc.map((item) => ({ ...item, quantity: 0 })),
        this.orderMisc.map(({ miscId, quantity }) => ({
          id: miscId,
          quantity,
        })),
        "id"
      );
    },
    address() {
      return (
        this.orderAddress &&
        pick(this.orderAddress, ["street", "building", "flat"])
      );
    },
    filteredMisc() {
      return this.misc.filter(({ quantity }) => quantity);
    },
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    buildPizza({ id, name, doughId, sizeId, sauceId, ingredients, quantity }) {
      return {
        id,
        name,
        dough: { ...find(this.dough, ["id", doughId]), checked: true },
        size: { ...find(this.sizes, ["id", sizeId]), checked: true },
        sauce: { ...find(this.sauces, ["id", sauceId]), checked: true },
        ingredients: normalizeByKey(
          this.ingredients.map((item) => ({ ...item, quantity: 0 })),
          ingredients.map(({ ingredientId, quantity }) => ({
            id: ingredientId,
            quantity,
          })),
          "id"
        ),
        quantity,
      };
    },
    pricePizza(pizza) {
      let price = pizza.ingredients.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      price += pizza.dough?.price ?? 0;
      price += pizza.sauce?.price ?? 0;
      price *= pizza.size?.multiplier ?? 0;

      return { ...pizza, price };
    },
    async onDestroy() {
      try {
        await this.$api.orders.delete(this.id);
        this.$emit("onDestroy", { id: this.id });
      } catch (e) {
        // continue regardless of error
      }
    },
    repeatOrder() {
      this[UPDATE_CART]({
        pizzas: this.pizzas,
        misc: this.misc,
        address: this.orderAddress,
      });
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/order.scss";

  .order__address p {
    margin: 0;
  }
</style>
