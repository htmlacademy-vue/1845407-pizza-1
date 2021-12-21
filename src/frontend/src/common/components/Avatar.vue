<template>
  <picture>
    <source
      type="image/webp"
      :srcset="`${webp[x.small]} 1x, ${webp[x.big]} 2x`"
    >
    <img
      :src="jpg[x.small]"
      :srcset="`${jpg[x.small]} 1x, ${jpg[x.big]} 2x`"
      :alt="alt"
      :width="size"
      :height="size"
    >
  </picture>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  computed: {
    x() {
      return this.size > 32
        ? { small: "2x", big: "4x" }
        : { small: "1x", big: "2x" };
    },
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
