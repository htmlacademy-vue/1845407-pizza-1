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
import BaseInputField from "@/common/components/InputField.vue";

import { mapGetters, mapActions } from "vuex";
import { SIGN_IN } from "@/store/modules/auth.store.js";

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
  computed: {
    ...mapGetters("Auth", ["isLogged"]),
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
  async created() {
    await this.$nextTick();
    if (this.isLogged) await this.$router.replace(this.from.fullPath);
  },
  mounted() {
    // при входе на страницу ставим фокус на email-инпуте
    this.$refs.email.$refs.input.focus();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from;
    });
  },
};
</script>
