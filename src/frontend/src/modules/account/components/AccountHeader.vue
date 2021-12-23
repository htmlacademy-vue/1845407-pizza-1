<template>
  <div class="header__user">
    <template v-if="isLogged">
      <router-link to="/profile">
        <block-avatar
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

import BlockAvatar from "@/common/components/BlockAvatar";

export default {
  name: "AccountHeader",
  components: { BlockAvatar },
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
