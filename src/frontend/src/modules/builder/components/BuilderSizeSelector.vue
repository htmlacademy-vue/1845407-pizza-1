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
          @change="onChangeSize"
        >
          <span>{{ name }}</span>
        </base-radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import find from "lodash/find";

import BaseRadioButton from "@/common/components/RadioButton";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

export default {
  name: "PzzBuilderSizeSelector",
  components: { BaseRadioButton },
  computed: {
    ...mapState("Builder", ["sizes"]),
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    onChangeSize(type) {
      let sizes = this.sizes.map((item) => ({ ...item, checked: false }));
      const checked = find(sizes, { type });
      if (checked) {
        Object.assign(checked, { checked: true });
        this[UPDATE_CHOICE]({ sizes });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
