<template>
  <div
    class="content__constructor"
    @drop.prevent="onDrop"
    @dragover="dropable"
    @dragenter="dropable"
  >
    <div
      class="pizza"
      :class="foundationClass"
    >
      <div class="pizza__wrapper">
        <transition-group
          name="drop"
          tag="div"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <template v-for="{ type, quantity } in ingredients">
            <div
              v-for="index in quantity"
              :key="`${type}-${index}`"
              class="pizza__filling"
              :class="[
                `pizza__filling--${type}`,
                PIZZA_FILLING_QUANTITY_CLASSES[index - 1],
              ]"
            />
          </template>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";
import isUndefined from "lodash/isUndefined";

import { PIZZA_FILLING_QUANTITY_CLASSES } from "@/common/constants";

import { mapGetters, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/modules/builder/store";

export default {
  name: "BuilderPizzaView",
  data() {
    return {
      PIZZA_FILLING_QUANTITY_CLASSES: PIZZA_FILLING_QUANTITY_CLASSES,
    };
  },

  computed: {
    ...mapGetters("Builder", ["choice"]),
    ingredients() {
      return this.choice.ingredients.filter(({ quantity }) => quantity);
    },

    foundationClass() {
      return [
        "pizza--foundation-",
        this.choice.dough?.value,
        this.choice.sauce?.type,
      ]
        .filter(Boolean)
        .join("-");
    },
  },

  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    dropable(event) {
      if (event.dataTransfer.types.includes("ingredient")) {
        event.preventDefault();
      }
    },

    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData("ingredient");
      let { type, quantity } = payload && JSON.parse(payload);

      if (isUndefined(type) || isUndefined(quantity)) return;

      let ingredients = cloneDeep(this.choice.ingredients);
      let ingredient = find(ingredients, { type });
      if (ingredient) {
        quantity += 1;
        Object.assign(ingredient, { quantity });
        this[UPDATE_CHOICE]({ ingredients });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/pizza.scss";
</style>
