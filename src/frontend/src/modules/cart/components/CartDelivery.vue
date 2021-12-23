<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="addressSelector"
          class="select"
          :value="addressValue(address)"
          @change="selectAddress"
        >
          <option
            v-for="(item, index) in deliveryAddresses"
            :key="index"
            :value="addressValue(item)"
          >
            {{ addressValue(item) }}
          </option>
        </select>
      </label>

      <app-input-field
        type="tel"
        name="address[phone]"
        :value="phone"
        class="input--big-label"
        placeholder="+7 999-999-99-99"
        @input="changePhone"
      >
        <span>Контактный телефон:</span>
      </app-input-field>

      <div
        v-if="!isNullAddress"
        class="cart-form__address"
      >
        <span class="cart-form__label">{{ addressValue(address) }}:</span>

        <div class="cart-form__input">
          <app-input-field
            name="address[street]"
            :value="address.street"
            required
            :disabled="disabled"
            @input="changeAddress({ street: $event })"
          >
            <span>Улица*</span>
          </app-input-field>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <app-input-field
            name="address[building]"
            :value="address.building"
            required
            :disabled="disabled"
            @input="changeAddress({ building: $event })"
          >
            <span>Дом*</span>
          </app-input-field>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <app-input-field
            name="address[flat]"
            :value="address.flat"
            :disabled="disabled"
            @input="changeAddress({ flat: $event })"
          >
            <span>Квартира</span>
          </app-input-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isNull from "lodash/isNull";

import AppInputField from "@/common/components/AppInputField";
import { mapState, mapGetters, mapActions } from "vuex";
import { UPDATE_CART } from "@/modules/cart/store";
import { UPDATE_ADDRESSES } from "@/modules/auth/store";

export default {
  name: "CartDelivery",
  components: { AppInputField },
  computed: {
    ...mapState("Cart", ["phone", "address"]),
    ...mapGetters("Auth", ["deliveryAddresses", "newAddress"]),
    disabled() {
      return !isNull(this.address?.name);
    },
    isNullAddress() {
      return isNull(this.address);
    },
  },
  async created() {
    this[UPDATE_ADDRESSES]();
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    ...mapActions("Auth", [UPDATE_ADDRESSES]),
    selectAddress(event) {
      const address = this.deliveryAddresses[event.target.selectedIndex];
      this.changeAddress(address);
    },
    changeAddress(data) {
      const address = isNull(data)
        ? data
        : { ...this.newAddress, ...this.address, ...data };
      this[UPDATE_CART]({ address });
    },
    changePhone(phone) {
      this[UPDATE_CART]({ phone });
    },
    addressValue(address) {
      switch (address?.name) {
        case undefined:
          return "Заберу сам";
        case null:
          return "Новый адрес";
        default:
          return address.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/select.scss";
@import "~@/assets/scss/blocks/cart-form.scss";
</style>
