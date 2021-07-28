<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>

          <base-radio-button
            v-for="{ name, type, checked } of sauces"
            :key="type"
            class="radio ingridients__input"
            name="sauce"
            :value="type"
            :checked="checked"
            @changeChoice="onChangeSouse($event.target.value)"
          >
            <span>{{ name }}</span>
          </base-radio-button>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="{ name, type, count } of ingredients"
              :key="type"
              class="ingridients__item"
            >
              <span
                class="filling"
                :class="`filling--${type}`"
                draggable="true"
                @dragstart="onDragIngredient($event, type)"
              >
                {{ name }}
              </span>

              <base-item-counter
                class="ingridients__counter"
                :name="`counter[${type}]`"
                :value="count"
                :min="0"
                :max="3"
                @input="onChangeIngredient(type, $event.target.value)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import find from "lodash/find";

import BaseRadioButton from "@/common/components/RadioButton.vue";
import BaseItemCounter from "@/common/components/ItemCounter.vue";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

export default {
  name: "PzzBuilderIngredientsSelector",
  components: { BaseRadioButton, BaseItemCounter },
  computed: {
    ...mapState("Builder", ["sauces", "ingredients"]),
  },
  methods: {
    ...mapActions("Builder", {
      pizzaUpdate: UPDATE_CHOICE,
    }),
    onChangeSouse(choice) {
      let sauces = this.sauces.map((item) => ({
        ...item,
        checked: false,
      }));
      const checked = find(sauces, ["type", choice]);
      if (checked) {
        Object.assign(checked, { checked: true });
        this.pizzaUpdate({ sauces });
      }
    },
    onChangeIngredient(choice, value) {
      let ingredients = this.ingredients.map((item) => ({
        ...item,
      }));
      const checked = find(ingredients, ["type", choice]);
      if (checked) {
        Object.assign(checked, { count: value * 1 });
        this.pizzaUpdate({ ingredients });
      }
    },
    onDragIngredient({ dataTransfer }, choice) {
      let ingredients = this.ingredients.map((item) => ({
        ...item,
      }));
      const checked = find(ingredients, ["type", choice]);
      if (checked) {
        if (checked.count < 3) {
          checked.count += 1;
          dataTransfer.setData("ingredients", JSON.stringify(ingredients));
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
