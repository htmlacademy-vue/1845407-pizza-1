<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        to="/"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору
      <br>
      чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: <block-cost v-bind="{ pizzas, misc }" /></b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        :disabled="!pizzas.length"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import BlockCost from "@/common/components/BlockCost";
import { mapState } from "vuex";

export default {
  name: "CartFooter",
  components: { BlockCost },
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/footer.scss";
</style>
