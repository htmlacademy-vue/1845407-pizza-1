<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <base-radio-button
          v-for="{ name, type, checked, description } in dough"
          :key="type"
          class="dough__input"
          :class="`dough__input--${type}`"
          name="dough"
          :value="type"
          :checked="checked"
          @change="onChangeDough"
        >
          <b>{{ name }}</b>
          <span>{{ description }}</span>
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
  name: "PzzBuilderDoughSelector",
  components: { BaseRadioButton },
  computed: {
    ...mapState("Builder", ["dough"]),
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    onChangeDough(type) {
      let dough = this.dough.map((item) => ({
        ...item,
        checked: false,
      }));
      const checked = find(dough, { type });
      if (checked) {
        Object.assign(checked, { checked: true });
        this[UPDATE_CHOICE]({ dough });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
