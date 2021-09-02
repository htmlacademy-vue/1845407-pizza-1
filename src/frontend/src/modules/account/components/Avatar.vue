<template>
  <picture>
    <source type="image/webp" :srcset="source_srcset" />
    <img
      :src="img_src"
      :srcset="img_srcset"
      :alt="account.name"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileInfo",
  props: {
    width: {
      type: Number,
      default: 32,
    },
    height: {
      type: Number,
      default: 32,
    },
    small: {
      type: String,
      default: "1x",
    },
    big: {
      type: String,
      default: "2x",
    },
  },
  computed: {
    ...mapState("Auth", ["account"]),
    avatar() {
      const avatar = this.account.avatar;
      return {
        jpg: {
          "1x": avatar,
          "2x": avatar.replace(".jpg", "@2x.jpg"),
          "4x": avatar.replace(".jpg", "@4x.jpg"),
        },
        webp: {
          "1x": avatar.replace(".jpg", ".webp"),
          "2x": avatar.replace(".jpg", "@2x.webp"),
          "4x": avatar.replace(".jpg", "@4x.webp"),
        },
      };
    },
    source_srcset() {
      return `${this.avatar.webp[this.small]} 1x,
              ${this.avatar.webp[this.big]} 2x`;
    },
    img_src() {
      return this.avatar.jpg[this.small];
    },
    img_srcset() {
      return this.avatar.jpg[this.big];
    },
  },
};
</script>
