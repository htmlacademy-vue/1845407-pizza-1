<template>
  <main class="content">
    <form
      action="#"
      method="post"
      class="layout-form"
      @submit.prevent="addToCart"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">
          Конструктор пиццы
        </h1>

        <builder-dough-selector />

        <builder-size-selector />

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>
            <div class="sheet__content ingridients">
              <builder-sauce-selector />
              <builder-ingredients-selector />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <builder-title-input />

          <builder-pizza-view />
          <builder-price-counter />
        </div>
      </div>
    </form>
    <base-modal-window v-slot="modal">
      <router-view
        @close="modal.close"
      />
    </base-modal-window>
  </main>
</template>

<script>
import find from "lodash/find";

import { mapState, mapActions } from "vuex";
import { ADD_TO_CART, LOAD_CHOICE } from "@/modules/builder/store";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import BuilderTitleInput from "@/modules/builder/components/BuilderTitleInput";

export default {
  name: "Builder",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderSauceSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderTitleInput,
  },
  data() {
    return {
      edit: null,
    };
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Builder", [ADD_TO_CART, LOAD_CHOICE]),
    addToCart() {
      this[ADD_TO_CART]();
      if (this.edit) {
        this.$router.push("/cart");
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      // загрузить конфигурацию пиццы в билдер
      this.edit = find(this.pizzas, ["id", +this.$route.query.id]);
      if (this.edit) {
        this[LOAD_CHOICE](this.edit);
      } else {
        this.$router.replace("/");
      }
    }
  },
};
</script>
