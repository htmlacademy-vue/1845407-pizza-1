<template>
  <div class="sign-form">
    <router-link :to="{ name: 'builder' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="test.html" method="post" @submit.prevent="sign_in">
      <div class="sign-form__input">
        <base-input-field
          ref="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          :required="true"
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
          :required="true"
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
        await this.$router.replace(this.from.fullPath);
      } catch {
        this.password = "";
      }
    },
  },
  mounted() {
    // при входе на страницу ставим фокус на email-инпуте
    this.$refs.email.$refs.input.focus();
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
