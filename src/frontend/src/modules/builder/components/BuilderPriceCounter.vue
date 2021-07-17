<template>
  <div class="content__result">
    <p>Итого: {{ choice.price }} ₽</p>
    <button
      type="submit"
      class="button"
      :class="{ 'button--disabled': !ready }"
      :disabled="!ready"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PzzBuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["choice"]),
    ready() {
      return !!this.choice.ingredients.length && !!this.choice.title;
    },
  },
};
</script>

<style lang="scss" scoped></style>
