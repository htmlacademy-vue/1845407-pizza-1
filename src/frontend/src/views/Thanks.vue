<template>
  <div class="popup">
    <button
      class="button button--transparent close"
      @click.prevent="close"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </button>
    <div class="popup__title">
      <h2 class="title">
        Спасибо за заказ
      </h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a
        href="#"
        class="button"
        @click.prevent="close"
      >Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { RESET_CART } from "@/store/modules/cart.store";

export default {
  name: "Thanks",
  computed: {
    ...mapGetters("Auth", ["isLogged"]),
  },
  methods: {
    ...mapActions("Cart", [RESET_CART]),
    close() {
      const name = this.isLogged ? "Orders" : "Builder";
      this.$emit("close", { name });
    },
  },
  destroyed() {
    this[RESET_CART]();
  },
};
</script>

<style lang="scss" scoped>
.popup {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: fit-content;
  transform: unset;
}
</style>
