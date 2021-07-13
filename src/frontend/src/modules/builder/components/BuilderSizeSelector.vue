<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <base-radio-button
          v-for="{ name, type, checked } of sizes"
          :key="type"
          class="diameter__input"
          :class="`diameter__input--${type}`"
          name="diameter"
          :value="type"
          :checked="checked"
          @changeChoice="onChangeSize($event.target.value)"
        >
          <span>{{ name }}</span>
        </base-radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "PzzBuilderSizeSelector",
  components: { BaseRadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChangeSize(choice) {
      let sizes = this.sizes.map((size) => ({ ...size, checked: false }));
      const index = sizes.findIndex(({ type }) => type === choice);
      if (~index) {
        sizes[index].checked = true;
        this.$emit("pizzaUpdate", { sizes: sizes });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
