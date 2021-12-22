<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <base-radio-button
      v-for="{ name, type, checked } of sauces"
      :key="type"
      class="radio ingridients__input"
      name="sauce"
      :value="type"
      :checked="checked"
      @change="onChangeSouse"
    >
      <span>{{ name }}</span>
    </base-radio-button>
  </div>
</template>

<script>
import find from "lodash/find";

import BaseRadioButton from "@/common/components/RadioButton";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/modules/builder/store";

export default {
  name: "BuilderSauceSelector",
  components: { BaseRadioButton },
  computed: {
    ...mapState("Builder", ["sauces"]),
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    onChangeSouse(type) {
      let sauces = this.sauces.map((item) => ({
        ...item,
        checked: false,
      }));
      let checked = find(sauces, { type });
      if (checked) {
        Object.assign(checked, { checked: true });
        this[UPDATE_CHOICE]({ sauces });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .ingridients__sauce {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    margin-bottom: 14px;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-right: 16px;
      margin-bottom: 10px;
    }
  }

  .ingridients__input {
    margin-right: 24px;
    margin-bottom: 10px;
  }
</style>
