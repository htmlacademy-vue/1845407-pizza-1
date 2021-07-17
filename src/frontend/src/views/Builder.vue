<template>
  <form action="#" method="post" class="layout-form">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <pzz-builder-dough-selector :doughs="doughs" @pizzaUpdate="pizzaUpdate" />

      <pzz-builder-size-selector :sizes="sizes" @pizzaUpdate="pizzaUpdate" />

      <pzz-builder-ingredients-selector
        :ingredients="ingredients"
        :sauces="sauces"
        @pizzaUpdate="pizzaUpdate"
      />

      <div class="content__pizza">
        <pzz-builder-title-input :title="title" @pizzaUpdate="pizzaUpdate" />

        <pzz-builder-pizza-view v-bind="choice" @pizzaUpdate="pizzaUpdate" />
        <pzz-builder-price-counter v-bind="choice" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

import PzzBuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import PzzBuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import PzzBuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import PzzBuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import PzzBuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import PzzBuilderTitleInput from "@/modules/builder/components/BuilderTitleInput.vue";

export default {
  name: "Builder",
  components: {
    PzzBuilderDoughSelector,
    PzzBuilderSizeSelector,
    PzzBuilderIngredientsSelector,
    PzzBuilderPizzaView,
    PzzBuilderPriceCounter,
    PzzBuilderTitleInput,
  },
  computed: {
    ...mapState("Builder", [
      "title",
      "doughs",
      "sizes",
      "sauces",
      "ingredients",
    ]),
    ...mapGetters("Builder", ["choice"]),
  },
  methods: {
    ...mapMutations("Builder", {
      pizzaUpdate: UPDATE_CHOICE,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
