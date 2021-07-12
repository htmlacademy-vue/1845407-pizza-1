<template>
  <div
    class="content__constructor"
    @drop="onDrop"
    @dragover="dropable"
    @dragenter="dropable"
  >
    <div class="pizza" :class="foundationClass">
      <div class="pizza__wrapper">
        <template v-for="{ type, count } in pizzaChoice.ingredients">
          <div
            v-for="index in count"
            :key="`${type}-${index}`"
            class="pizza__filling"
            :class="[`pizza__filling--${type}`, ingredientIndexClass[index]]"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
//import _ from "lodash";

export default {
  name: "PzzBuilderPizzaView",
  props: {
    pizzaChoice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    foundationClass() {
      return `pizza--foundation--${this.pizzaChoice.dough.value}-${this.pizzaChoice.sauce.type}`;
    },
    ingredientIndexClass() {
      return ["", "pizza__filling--second", "pizza__filling--third"];
    },
  },
  methods: {
    dropable(event) {
      const dataTransfer = event.dataTransfer;
      if (!dataTransfer) {
        return;
      }
      if (dataTransfer.types.includes("ingredients")) {
        event.preventDefault();
      }
    },
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const payload = dataTransfer.getData("ingredients");
      if (payload) {
        const ingredients = JSON.parse(dataTransfer.getData("ingredients"));
        this.$emit("pizzaUpdate", { ingredients: ingredients });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>