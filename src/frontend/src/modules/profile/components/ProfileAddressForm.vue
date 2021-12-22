<template>
  <form
    action=""
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent="onSubmit"
  >
    <div class="address-form__header">
      <b>{{ formHeader }}</b>
      <div class="address-form__edit">
        <button
          type="button"
          class="icon icon-close"
          @click.prevent="$emit('toggleEdit', false)"
        >
          <span class="visually-hidden">Отмена</span>
        </button>
      </div>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <base-input-field
          name="name"
          v-model="name"
          required
          placeholder="Введите название адреса"
        >
          <span>Название адреса*</span>
        </base-input-field>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <base-input-field
          name="street"
          v-model="street"
          required
          placeholder="Введите название улицы"
        >
          <span>Улица*</span>
        </base-input-field>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <base-input-field
          name="building"
          v-model="building"
          required
          placeholder="Введите номер дома"
        >
          <span>Дом*</span>
        </base-input-field>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <base-input-field
          name="flat"
          v-model="flat"
          placeholder="Введите № квартиры"
        >
          <span>Квартира</span>
        </base-input-field>
      </div>
      <div class="address-form__input">
        <base-input-field
          name="comment"
          v-model="comment"
          placeholder="Введите комментарий"
        >
          <span>Комментарий</span>
        </base-input-field>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="persisted"
        type="button"
        class="button button--transparent"
        @click.prevent="onDestroy"
      >
        Удалить
      </button>
      <button
        type="submit"
        class="button"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
import BaseInputField from "@/common/components/InputField";

export default {
  name: "ProfileAddressForm",
  components: { BaseInputField },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    persisted() {
      return !!this.address.id;
    },
    formHeader() {
      return this.persisted ? "Изменить адрес" : "Добавить адрес";
    },
  },
  data() {
    return {
      ...this.address,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const address = this.persisted
          ? await this.$api.addresses.put(this.$data)
          : await this.$api.addresses.post(this.$data);
        this.$emit("updateList", { ...this.$data, ...address });
      } catch (e) {
        // continue regardless of error
      }
    },
    async onDestroy() {
      try {
        await this.$api.addresses.delete(this.id);
        this.$emit("updateList", { ...this.$data, _destroyed: true });
      } catch (e) {
        // continue regardless of error
      }
    },
  },
};
</script>

<style lang="scss">
.icon-close {
  background-image: url("~@/assets/img/close.svg");
}
</style>
