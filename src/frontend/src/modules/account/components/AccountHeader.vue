<template>
  <div class="header__user">
    <template v-if="isLogged">
      <router-link :to="{ name: 'profile' }">
        <avatar
          :src="account.avatar"
          :alt="account.name"
          :size="32"
        />
        <span>{{ account.name }}</span>
      </router-link>
      <router-link
        :to="{ name: 'builder' }"
        class="header__logout"
        @click.native="logout"
      >
        <span>Выйти</span>
      </router-link>
    </template>
    <template v-else>
      <router-link
        :to="{ name: 'login' }"
        class="header__login"
      >
        <span>Войти</span>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { SIGN_OUT } from "@/store/modules/auth.store";

import Avatar from "@/common/components/Avatar";

export default {
  name: "AccountHeader",
  components: { Avatar },
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
