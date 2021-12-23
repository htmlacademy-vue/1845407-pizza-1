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
        <app-input-field
          v-model="name"
          name="name"
          required
          placeholder="Введите название адреса"
        >
          <span>Название адреса*</span>
        </app-input-field>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <app-input-field
          v-model="street"
          name="street"
          required
          placeholder="Введите название улицы"
        >
          <span>Улица*</span>
        </app-input-field>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <app-input-field
          v-model="building"
          name="building"
          required
          placeholder="Введите номер дома"
        >
          <span>Дом*</span>
        </app-input-field>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <app-input-field
          v-model="flat"
          name="flat"
          placeholder="Введите № квартиры"
        >
          <span>Квартира</span>
        </app-input-field>
      </div>
      <div class="address-form__input">
        <app-input-field
          v-model="comment"
          name="comment"
          placeholder="Введите комментарий"
        >
          <span>Комментарий</span>
        </app-input-field>
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
import AppInputField from "@/common/components/AppInputField";

export default {
  name: "ProfileAddressForm",
  components: { AppInputField },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ...this.address,
    };
  },
  computed: {
    persisted() {
      return !!this.address.id;
    },
    formHeader() {
      return this.persisted ? "Изменить адрес" : "Добавить адрес";
    },
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

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/icon.scss";
  @import "~@/assets/scss/blocks/address-form.scss";
</style>
