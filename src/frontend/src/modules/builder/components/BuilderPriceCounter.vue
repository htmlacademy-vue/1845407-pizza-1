<template>
  <div class="content__result">
    <p>Итого: {{ choice.price }} ₽</p>
    <button
      type="submit"
      class="button"
      :disabled="!ready"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import some from "lodash/some";

import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["choice"]),
    ready() {
      return some(this.choice.ingredients, "quantity") && !!this.choice.name;
    },
  },
};
</script>
