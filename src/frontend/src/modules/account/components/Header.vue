<template>
  <div class="header__user">
    <template v-if="isLogged">
      <router-link :to="{ name: 'profile' }">
        <avatar :width="32" :height="32" small="1x" big="2x" />
        <span>{{ account.name }}</span>
      </router-link>
      <a href="#" class="header__logout" @click.prevent="sign_out">
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
import { SIGN_OUT } from "@/store/modules/auth.store.js";

import Avatar from "@/modules/account/components/Avatar";

export default {
  name: "PzzAccountHeader",
  components: { Avatar },
  computed: {
    ...mapState("Auth", ["account"]),
    ...mapGetters("Auth", ["isLogged"]),
  },
  methods: {
    ...mapActions("Auth", [SIGN_OUT]),
    async sign_out() {
      await this[SIGN_OUT]();

      if (this.$router.currentRoute.name != "builder") {
        this.$router.push({ name: "builder" });
      }
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
