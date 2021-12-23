<template>
  <app-input-field
    name="pizza_name"
    :value="name"
    placeholder="Введите название пиццы"
    @input="onInputTitle"
  >
    <span class="visually-hidden">Название пиццы</span>
  </app-input-field>
</template>

<script>
import AppInputField from "@/common/components/AppInputField";

import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/modules/builder/store";

export default {
  name: "BuilderTitleInput",
  components: { AppInputField },
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
