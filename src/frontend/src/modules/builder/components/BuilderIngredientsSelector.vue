<template>
  <div class="ingridients__filling">
    <p>Начинка:</p>

    <ul class="ingridients__list">
      <li
        v-for="{ name, type, quantity } of ingredients"
        :key="type"
        class="ingridients__item"
      >
        <span
          class="filling"
          :class="`filling--${type}`"
          draggable
          @dragstart="onDragIngredient(type, $event)"
        >
          {{ name }}
        </span>

        <base-item-counter
          class="ingridients__counter"
          :name="`counter[${type}]`"
          :value="quantity"
          :min="0"
          :max="3"
          @input="onChangeIngredient(type, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import find from "lodash/find";

import BaseItemCounter from "@/common/components/ItemCounter";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

export default {
  name: "PzzBuilderIngredientsSelector",
  components: { BaseItemCounter },
  computed: {
    ...mapState("Builder", ["ingredients"]),
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    onChangeIngredient(type, quantity) {
      let ingredients = this.ingredients.map((item) => ({
        ...item,
      }));
      const checked = find(ingredients, { type });
      if (checked) {
        Object.assign(checked, { quantity });
        this[UPDATE_CHOICE]({ ingredients });
      }
    },
    onDragIngredient(type, { dataTransfer }) {
      let ingredients = this.ingredients.map((item) => ({
        ...item,
      }));
      const checked = find(ingredients, { type });
      if (checked) {
        if (checked.quantity < 3) {
          checked.quantity += 1;
          dataTransfer.setData("ingredients", JSON.stringify(ingredients));
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
