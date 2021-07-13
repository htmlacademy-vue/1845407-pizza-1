<template>
  <div class="header__user">
    <template v-if="isLogged">
      <a href="user-data.html" @click.prevent>
        <picture>
          <img
            :src="account.avatar"
            :alt="account.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ account.name }}</span>
      </a>
      <a href="#" class="header__logout" @click.prevent="$emit('onAuth', {})">
        <span>Выйти</span>
      </a>
    </template>
    <template v-else>
      <a href="#" class="header__login" @click.prevent="$emit('onAuth', user)">
        <span>Войти</span>
      </a>
    </template>
  </div>
</template>

<script>
import { isEmpty } from "lodash";

import user from "@/static/user.json";

export default {
  name: "PzzAccountHeader",
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLogged() {
      return !isEmpty(this.account);
    },
    user() {
      return user;
    },
  },
};
</script>

<style lang="scss"></style>
