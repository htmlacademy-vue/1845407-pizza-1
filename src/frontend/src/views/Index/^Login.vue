<template>
  <div class="sign-form">
    <button
      class="button button--transparent close close--white"
      @click.prevent="close"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </button>
    <div class="sign-form__title">
      <h1 class="title title--small">
        Авторизуйтесь на сайте
      </h1>
    </div>
    <form
      action=""
      method="post"
      @submit.prevent="sign_in"
    >
      <div class="sign-form__input">
        <app-input-field
          ref="email"
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          required
          autofocus
        >
          <span>E-mail</span>
        </app-input-field>
      </div>

      <div class="sign-form__input">
        <app-input-field
          v-model="password"
          type="password"
          name="password"
          placeholder="***********"
          required
        >
          <span>Пароль</span>
        </app-input-field>
      </div>
      <button
        type="submit"
        class="button"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import AppInputField from "@/common/components/AppInputField";

import { mapActions } from "vuex";
import { SIGN_IN } from "@/modules/auth/store";
import {
  auth,
  skipAuthenticated,
} from "@/middlewares";

export default {
  name: "Login",
  middlewares: [auth, skipAuthenticated],
  components: { AppInputField },
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
      this.$emit("close", this.from.path);
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
@import "~@/assets/scss/blocks/close.scss";
@import "~@/assets/scss/layout/sign-form.scss";

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
