<template>
  <div class="user">
    <avatar
      :src="account.avatar"
      :alt="account.name"
      width="72"
      height="72"
      small="2x"
      big="4x"
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

import Avatar from "@/common/components/Avatar";

export default {
  name: "ProfileInfo",
  components: { Avatar },
  computed: {
    ...mapState("Auth", ["account"]),
  },
};
</script>
