<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <button
          type="button"
          class="icon"
          @click.prevent="toggleEdit"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <base-address-string v-bind="address" />
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
import BaseAddressString from "@/common/components/AddressString";

export default {
  name: "ProfileAddressItem",
  components: { BaseAddressString },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    street() {
      return this.address.street || "";
    },
    building() {
      return (this.address.building && `д. ${this.address.building}`) || "";
    },
    flat() {
      return (this.address.flat && `кв. ${this.address.flat}`) || "";
    },
    partsJoined() {
      return [this.street, this.building, this.flat].filter(Boolean).join(", ");
    },
  },
  methods: {
    toggleEdit() {
      this.$emit("toggleEdit", this.address.id);
    },
  },
};
</script>
