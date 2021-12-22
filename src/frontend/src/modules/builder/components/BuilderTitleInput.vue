<template>
  <base-input-field
    name="pizza_name"
    :value="name"
    placeholder="Введите название пиццы"
    @input="onInputTitle"
  >
    <span class="visually-hidden">Название пиццы</span>
  </base-input-field>
</template>

<script>
import BaseInputField from "@/common/components/InputField";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/modules/builder/store";

export default {
  name: "BuilderTitleInput",
  components: { BaseInputField },
  computed: {
    ...mapState("Builder", ["name"]),
  },
  methods: {
    ...mapActions("Builder", [UPDATE_CHOICE]),
    onInputTitle(name) {
      this[UPDATE_CHOICE]({ name });
    },
  },
};
</script>

<style lang="scss" scoped></style>
