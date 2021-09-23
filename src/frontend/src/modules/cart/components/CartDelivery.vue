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
            v-for="item in selectAddresses"
            :key="item.value"
            :value="item.value"
          >
            {{ item.value }}
          </option>
        </select>
      </label>

      <base-input-field
        type="tel"
        name="address[phone]"
        :value="phone"
        class="input--big-label"
        placeholder="+7 999-999-99-99"
        @input="changePhone"
      >
        <span>Контактный телефон:</span>
      </base-input-field>

      <div class="cart-form__address" v-if="!isNullAddress">
        <span class="cart-form__label">{{ addressValue(address) }}:</span>

        <div class="cart-form__input">
          <base-input-field
            name="address[street]"
            :value="address.street"
            required
            :disabled="disabled"
            @input="changeAddress({ street: $event })"
          >
            <span>Улица*</span>
          </base-input-field>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input-field
            name="address[building]"
            :value="address.building"
            required
            :disabled="disabled"
            @input="changeAddress({ building: $event })"
          >
            <span>Дом*</span>
          </base-input-field>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input-field
            name="address[flat]"
            :value="address.flat"
            :disabled="disabled"
            @input="changeAddress({ flat: $event })"
          >
            <span>Квартира</span>
          </base-input-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isNull from "lodash/isNull";

import BaseInputField from "@/common/components/InputField";
import { mapState, mapGetters, mapActions } from "vuex";
import { UPDATE_CART } from "@/store/modules/cart.store";
import { LOAD_ADDRESSES } from "@/store/modules/auth.store";

export default {
  name: "CartDelivery",
  components: { BaseInputField },
  computed: {
    ...mapState("Cart", ["phone", "address"]),
    ...mapGetters("Auth", ["deliveryAddresses", "newAddress"]),
    disabled() {
      return !!this.address?.id;
    },
    selectAddresses() {
      return this.deliveryAddresses.map((item) => ({
        ...item,
        value: this.addressValue(item),
      }));
    },
    isNullAddress() {
      return isNull(this.address);
    },
  },
  methods: {
    ...mapActions("Cart", [UPDATE_CART]),
    ...mapActions("Auth", [LOAD_ADDRESSES]),
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
  async created() {
    this[LOAD_ADDRESSES]();
  },
};
</script>
