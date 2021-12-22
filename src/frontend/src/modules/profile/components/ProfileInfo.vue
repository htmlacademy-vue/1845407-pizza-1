<template>
  <div class="user">
    <base-avatar-block
      :src="account.avatar"
      :alt="account.name"
      :size="72"
    />
    <div class="user__name">
      <span>{{ account.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ account.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BaseAvatarBlock from "@/common/components/AvatarBlock";

export default {
  name: "ProfileInfo",
  components: { BaseAvatarBlock },
  computed: {
    ...mapState("Auth", ["account"]),
  },
};
</script>

<style lang="scss" scoped>
  .user__phone {
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    line-height: 19px;
    width: 100%;
    margin-top: 20px;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/scss/blocks/user.scss";

  .user {
    flex-wrap: wrap;
  }
</style>
