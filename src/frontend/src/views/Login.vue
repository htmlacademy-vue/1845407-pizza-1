<template>
  <div class="sign-form">
    <button
      class="button button--transparent close close--white"
      @click.prevent="close"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </button>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="" method="post" @submit.prevent="sign_in">
      <div class="sign-form__input">
        <base-input-field
          ref="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          required
          autofocus
          v-model="email"
        >
          <span>E-mail</span>
        </base-input-field>
      </div>

      <div class="sign-form__input">
        <base-input-field
          type="password"
          name="password"
          placeholder="***********"
          required
          v-model="password"
        >
          <span>Пароль</span>
        </base-input-field>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import BaseInputField from "@/common/components/InputField";

import { mapActions } from "vuex";
import { SIGN_IN } from "@/store/modules/auth.store";

export default {
  name: "Login",
  components: { BaseInputField },
  data() {
    return {
      email: "",
      password: "",
      from: null,
    };
  },
  methods: {
    ...mapActions("Auth", [SIGN_IN]),
    async sign_in() {
      try {
        await this[SIGN_IN](this.$data);
        this.close();
      } catch {
        this.password = "";
      }
    },
    close() {
      this.$emit("close", this.from);
    },
  },
  beforeRouteEnter(to, from, next) {
    // запоминаем откуда был переход на форму логина,
    // что бы после авторизации вернуть обратно
    next((vm) => (vm.from = from));
  },
};
</script>

<style lang="scss" scoped>
.sign-form {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: fit-content;
  transform: unset;
}
</style>
