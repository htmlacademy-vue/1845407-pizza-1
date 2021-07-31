<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <pzz-profile-info />

    <div v-for="address in addresses" :key="address.id" class="layout__address">
      <component
        :is="address.id != edit ? 'ProfileAddressItem' : 'ProfileAddressForm'"
        :address="address"
        @toggleEdit="toggleEdit(address.id)"
        @updateList="updateList"
      />
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click.prevent="
          updateList({
            id: null,
            name: '',
            street: '',
            building: '',
            flat: '',
            comment: '',
          })
        "
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import isNull from "lodash/isNull";

import PzzProfileInfo from "@/modules/profile/components/ProfileInfo.vue";
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem.vue";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm.vue";

export default {
  name: "Profile",
  components: { PzzProfileInfo, ProfileAddressItem, ProfileAddressForm },
  data() {
    return {
      addresses: [],
      edit: false,
    };
  },
  methods: {
    toggleEdit(addressId) {
      this.edit = this.edit != addressId && addressId;

      // подчищаем форму нового адреса в свернутом состоянии
      if (!isNull(this.edit)) {
        const index = this.addresses.findIndex(({ id }) => id === null);
        this.addresses.splice(index, ~index ? 1 : 0);
      }
    },
    updateList(address) {
      const index = this.addresses.findIndex(({ id }) => id === address.id);
      this.addresses.splice(
        ~index ? index : this.addresses.length,
        ~index ? 1 : 0,
        address
      );

      this.addresses = this.addresses.filter(({ _destroyed }) => !_destroyed);

      this.toggleEdit(isNull(address.id) ? null : false);
    },
  },
  async created() {
    this.addresses = await this.$api.addresses.query();
  },
};
</script>

<style lang="scss">
.user {
  flex-wrap: wrap;
}
</style>
