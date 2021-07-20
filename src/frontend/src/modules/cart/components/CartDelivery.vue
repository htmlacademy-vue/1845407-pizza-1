<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="delivery[type]" class="select">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <base-input-field
        type="tel"
        name="delivery[phone]"
        :value="delivery.phone"
        class="input--big-label"
        placeholder="+7 999-999-99-99"
        @input="changeDelivery({ phone: $event.target.value })"
      >
        <span>Контактный телефон:</span>
      </base-input-field>

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <base-input-field
            name="delivery[street]"
            :value="delivery.street"
            :required="true"
            @input="changeDelivery({ street: $event.target.value })"
          >
            <span>Улица*</span>
          </base-input-field>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input-field
            name="delivery[building]"
            :value="delivery.building"
            :required="true"
            @input="changeDelivery({ building: $event.target.value })"
          >
            <span>Дом*</span>
          </base-input-field>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input-field
            name="delivery[room]"
            :value="delivery.room"
            @input="changeDelivery({ room: $event.target.value })"
          >
            <span>Квартира</span>
          </base-input-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInputField from "@/common/components/InputField.vue";
import { mapState, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";

export default {
  name: "CartDelivery",
  components: { BaseInputField },
  computed: {
    ...mapState("Cart", ["delivery"]),
  },
  methods: {
    ...mapActions("Cart", {
      updateCart: UPDATE_CART,
    }),
    changeDelivery(part) {
      const delivery = { ...this.delivery, ...part };
      this.updateCart({ delivery });
    },
  },
};
</script>
