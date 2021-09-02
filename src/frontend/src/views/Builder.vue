<template>
  <main class="content">
    <form
      action="#"
      method="post"
      class="layout-form"
      @submit.prevent="addToCart"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <pzz-builder-dough-selector />

        <pzz-builder-size-selector />

        <pzz-builder-ingredients-selector />

        <div class="content__pizza">
          <pzz-builder-title-input />

          <pzz-builder-pizza-view />
          <pzz-builder-price-counter />
        </div>
      </div>
    </form>
    <div class="modal">
      <router-view name="modal" />
    </div>
  </main>
</template>

<script>
import find from "lodash/find";

import { mapState, mapGetters, mapActions } from "vuex";
import {
  ADD_TO_CART,
  LOAD_CHOICE,
  RESET_CHOICE,
} from "@/store/modules/builder.store";

import PzzBuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import PzzBuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import PzzBuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import PzzBuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import PzzBuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import PzzBuilderTitleInput from "@/modules/builder/components/BuilderTitleInput";

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
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Builder", ["choice"]),
  },
  methods: {
    ...mapActions("Builder", {
      addToCart: ADD_TO_CART,
      LOAD_CHOICE,
      RESET_CHOICE,
    }),
  },
  created() {
    if (this.$route.query.id) {
      // загрузить конфигурацию пиццы в билдер
      const choice = find(this.pizzas, ["id", this.$route.query.id]);
      if (choice) {
        this[LOAD_CHOICE](choice);
      } else {
        this.$router.replace({ name: "builder" });
      }
    }
  },
  destroyed() {
    if (this.choice.id) {
      this[RESET_CHOICE]();
    }
  },
};
</script>

<style lang="scss" scoped></style>
