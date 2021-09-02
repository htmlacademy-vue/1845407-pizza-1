<template>
  <div
    class="content__constructor"
    @drop="onDrop"
    @dragover="dropable"
    @dragenter="dropable"
  >
    <div class="pizza" :class="foundationClass">
      <div class="pizza__wrapper">
        <template v-for="{ type, quantity } in ingredients">
          <div
            v-for="index in quantity"
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
import { mapGetters, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

export default {
  name: "PzzBuilderPizzaView",
  computed: {
    ...mapGetters("Builder", ["choice"]),
    ingredients() {
      return this.choice.ingredients.filter(({ quantity }) => quantity);
    },
    foundationClass() {
      return `pizza--foundation--${this.choice.dough?.value}-${this.choice.sauce?.type}`;
    },
    ingredientIndexClass() {
      return ["", "pizza__filling--second", "pizza__filling--third"];
    },
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    dropable(event) {
      const dataTransfer = event.dataTransfer;

      if (!dataTransfer) return;

      if (dataTransfer.types.includes("ingredients")) {
        event.preventDefault();
      }
    },
    onDrop({ dataTransfer }) {
      if (!dataTransfer) return;

      const payload = dataTransfer.getData("ingredients");
      if (payload) {
        const ingredients = JSON.parse(dataTransfer.getData("ingredients"));
        this[UPDATE_CHOICE]({ ingredients });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
