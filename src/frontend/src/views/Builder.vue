<template>
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
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  ADD_TO_CART,
  LOAD_CHOICE,
  RESET_CHOICE,
} from "@/store/modules/builder.store";

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
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Builder", ["choice"]),
  },
  methods: {
    ...mapActions("Builder", {
      addToCart: ADD_TO_CART,
      loadChoice: LOAD_CHOICE,
      resetChoice: RESET_CHOICE,
    }),
  },
  created() {
    if (this.$route.query.id) {
      // загрузить конфигурацию пиццы в билдер
      const index = this.pizzas.findIndex(
        ({ id }) => id === this.$route.query.id
      );
      if (~index) {
        this.loadChoice(this.pizzas[index]);
      } else {
        this.$router.replace({ name: "builder" });
      }
    }
  },
  destroyed() {
    if (this.choice.id) {
      this.resetChoice();
    }
  },
};
</script>

<style lang="scss" scoped></style>
