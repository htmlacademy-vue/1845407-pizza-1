<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <base-radio-button
          v-for="{ name, type, checked, description } in doughs"
          :key="type"
          class="dough__input"
          :class="`dough__input--${type}`"
          name="dough"
          :value="type"
          :checked="checked"
          @changeChoice="onChangeDough($event.target.value)"
        >
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </base-radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "PzzBuilderDoughSelector",
  components: { BaseRadioButton },
  props: {
    doughs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChangeDough(choice) {
      let doughs = this.doughs.map((dough) => ({ ...dough, checked: false }));
      const index = doughs.findIndex(({ type }) => type === choice);
      if (~index) {
        doughs[index].checked = true;
        this.$emit("pizzaUpdate", { doughs: doughs });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
