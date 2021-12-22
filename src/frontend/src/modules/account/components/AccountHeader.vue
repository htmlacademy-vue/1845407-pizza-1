<template>
  <div class="header__user">
    <template v-if="isLogged">
      <router-link to="/profile">
        <base-avatar-block
          :src="account.avatar"
          :alt="account.name"
          :size="32"
        />
        <span>{{ account.name }}</span>
      </router-link>
      <router-link
        to="/"
        class="header__logout"
        @click.native="logout"
      >
        <span>Выйти</span>
      </router-link>
    </template>
    <template v-else>
      <router-link
        to="/login"
        class="header__login"
      >
        <span>Войти</span>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { SIGN_OUT } from "@/modules/auth/store";

import BaseAvatarBlock from "@/common/components/AvatarBlock";

export default {
  name: "AccountHeader",
  components: { BaseAvatarBlock },
  computed: {
    ...mapState("Auth", ["account"]),
    ...mapGetters("Auth", ["isLogged"]),
  },
  methods: {
    ...mapActions("Auth", [SIGN_OUT]),
    async logout() {
      await this[SIGN_OUT]();
    },
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
