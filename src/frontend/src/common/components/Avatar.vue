<template>
  <picture>
    <source
      type="image/webp"
      :srcset="`${webp[small]} 1x, ${webp[small]} 2x`"
    />
    <img
      :src="jpg[small]"
      :srcset="jpg[big]"
      :alt="alt"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<script>
export default {
  name: "BaseAvatar",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
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
    jpg() {
      return {
        "1x": this.src,
        "2x": this.src.replace(".jpg", "@2x.jpg"),
        "4x": this.src.replace(".jpg", "@4x.jpg"),
      };
    },
    webp() {
      return {
        "1x": this.src.replace(".jpg", ".webp"),
        "2x": this.src.replace(".jpg", "@2x.webp"),
        "4x": this.src.replace(".jpg", "@4x.webp"),
      };
    },
  },
};
</script>
