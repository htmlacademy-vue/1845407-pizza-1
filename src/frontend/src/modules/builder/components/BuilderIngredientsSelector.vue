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
          draggable="true"
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
import cloneDeep from "lodash/cloneDeep";

import BaseItemCounter from "@/common/components/ItemCounter";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/modules/builder/store";

export default {
  name: "BuilderIngredientsSelector",
  components: { BaseItemCounter },
  computed: {
    ...mapState("Builder", ["ingredients"]),
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    onChangeIngredient(type, quantity) {
      let ingredients = cloneDeep(this.ingredients);
      let ingredient = find(ingredients, { type });
      if (ingredient) {
        Object.assign(ingredient, { quantity });
        this[UPDATE_CHOICE]({ ingredients });
      }
    },
    onDragIngredient(type, { dataTransfer }) {
      const ingredient = find(this.ingredients, { type });

      if (!ingredient || ingredient.quantity >= 3) return;

      dataTransfer.setData("ingredient", JSON.stringify(ingredient));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/mixins/m_clear-list.scss";
  @import "~@/assets/scss/blocks/filling.scss";

  .ingridients__filling {
    width: 100%;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-bottom: 16px;
    }
  }

  .ingridients__list {
    @include clear-list;

    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .ingridients__item {
    width: 100px;
    min-height: 40px;
    margin-right: 17px;
    margin-bottom: 35px;
  }

  .ingridients__counter {
    width: 54px;
    margin-top: 10px;
    margin-left: 36px;
  }
</style>
