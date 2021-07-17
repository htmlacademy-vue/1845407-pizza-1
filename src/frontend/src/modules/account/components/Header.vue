<template>
  <div class="header__user">
    <template v-if="isLogged">
      <router-link :to="{ name: 'profile' }">
        <picture>
          <img
            :src="account.avatar"
            :alt="account.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ account.name }}</span>
      </router-link>
      <a href="#" class="header__logout" @click.prevent="logout({})">
        <span>Выйти</span>
      </a>
    </template>
    <template v-else>
      <router-link :to="{ name: 'login' }" class="header__login">
        <span>Войти</span>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { AUTHENTICATE } from "@/store/modules/auth.store.js";

export default {
  name: "PzzAccountHeader",
  computed: {
    ...mapState("Auth", ["account"]),
    ...mapGetters("Auth", ["isLogged"]),
  },
  methods: {
    ...mapActions("Auth", {
      logout: AUTHENTICATE,
    }),
  },
};
</script>

<style lang="scss">
.user__phone {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  width: 100%;
  margin-top: 20px;
}
</style>
