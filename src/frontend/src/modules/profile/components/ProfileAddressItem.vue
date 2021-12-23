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
    <block-address v-bind="address" />
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
import BlockAddress from "@/common/components/BlockAddress";

export default {
  name: "ProfileAddressItem",
  components: { BlockAddress },
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
  },

  methods: {
    toggleEdit() {
      this.$emit("toggleEdit", this.address.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/icon.scss";
  @import "~@/assets/scss/blocks/address-form.scss";
</style>
