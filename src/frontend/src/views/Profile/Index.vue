<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">
        Мои данные
      </h1>
    </div>

    <profile-info />

    <div
      v-for="address in addresses"
      :key="address.id"
      class="layout__address"
    >
      <component
        :is="address.id !== edit ? 'ProfileAddressItem' : 'ProfileAddressForm'"
        :address="address"
        @toggleEdit="toggleEdit"
        @updateList="updateList"
      />
    </div>

    <div class="layout__button">
      <button
        v-if="edit != null"
        type="button"
        class="button button--border"
        data-test="newAddress"
        @click.prevent="addAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import isNull from "lodash/isNull";
import reject from "lodash/reject";

import ProfileInfo from "@/modules/profile/components/ProfileInfo";
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";

import { mapState, mapGetters } from "vuex";
import {
  auth,
  allowAuthenticated,
} from "@/middlewares";

export default {
  name: "Profile",
  components: { ProfileInfo, ProfileAddressItem, ProfileAddressForm },
  layout: "LayoutSidebar",
  middlewares: [auth, allowAuthenticated],
  data() {
    return {
      addresses: [],
      edit: false,
    };
  },

  computed: {
    ...mapState("Auth", ["account"]),
    ...mapGetters("Auth", ["newAddress"]),
  },

  async created() {
    this.addresses = await this.$api.addresses.query();
  },

  methods: {
    toggleEdit(addressId) {
      this.edit = addressId;

      // подчищаем форму нового адреса в свернутом состоянии
      if (!isNull(this.edit)) {
        const index = this.addresses.findIndex(({ id }) => id === null);
        this.addresses.splice(index, ~index ? 1 : 0);
      }
    },

    addAddress() {
      this.updateList({
        ...this.newAddress,
        userId: this.account.id,
      })
    },

    updateList(address) {
      const index = this.addresses.findIndex(({ id }) => id === address.id);
      this.addresses.splice(
        ~index ? index : this.addresses.length,
        ~index ? 1 : 0,
        address
      );

      this.addresses = reject(this.addresses, "_destroyed");

      this.toggleEdit(isNull(address.id) ? null : false);
    },
  },
};
</script>
