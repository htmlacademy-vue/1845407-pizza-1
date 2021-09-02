<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ cost }}₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click.prevent="onDestroy"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click.prevent="repeatOrder">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <item-pizza v-for="item in pizzas" :key="item.id" v-bind="item" />
    </ul>

    <ul class="order__additional">
      <item-misc v-for="item in filteredMisc" :key="item.id" v-bind="item" />
    </ul>

    <item-delivery v-bind="orderAddress" />
  </section>
</template>

<script>
import find from "lodash/find";
import isUndefined from "lodash/isUndefined";
import pick from "lodash/pick";

import { normalizeByKey } from "@/common/helpers";

import ItemPizza from "@/modules/orders/components/ItemPizza";
import ItemMisc from "@/modules/orders/components/ItemMisc";
import ItemDelivery from "@/modules/orders/components/ItemDelivery";

import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";

export default {
  name: "OrderItem",
  components: { ItemPizza, ItemMisc, ItemDelivery },
  props: {
    id: {
      type: Number,
      required: true,
    },
    orderPizzas: Array,
    orderMisc: Array,
    orderAddress: Object,
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
        this.orderMisc?.map(({ miscId, quantity }) => ({
          id: miscId,
          quantity,
        })),
        "id"
      );
    },
    address() {
      return isUndefined(this.orderAddress)
        ? null
        : pick(this.orderAddress, ["id", "name", "street", "building", "flat"]);
    },
    filteredMisc() {
      return this.misc.filter(({ quantity }) => quantity);
    },
    cost() {
      let cost = 0;
      cost += this.pizzas.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      cost += this.misc.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      return cost;
    },
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    buildPizza({ id, name, doughId, sizeId, sauceId, ingredients, quantity }) {
      const dough = { ...find(this.dough, ["id", doughId]), checked: true };
      const size = { ...find(this.sizes, ["id", sizeId]), checked: true };
      const sauce = { ...find(this.sauces, ["id", sauceId]), checked: true };
      const _ingredients = normalizeByKey(
        this.ingredients.map((item) => ({ ...item, quantity: 0 })),
        ingredients.map(({ ingredientId, quantity }) => ({
          id: ingredientId,
          quantity,
        })),
        "id"
      );

      return {
        id,
        name,
        dough,
        size,
        sauce,
        ingredients: _ingredients,
        quantity,
      };
    },
    pricePizza(pizza) {
      let price = 0;
      price += pizza.ingredients.reduce(
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
        address: this.address,
      });
      this.$router.push({ name: "cart" });
    },
  },
};
</script>
