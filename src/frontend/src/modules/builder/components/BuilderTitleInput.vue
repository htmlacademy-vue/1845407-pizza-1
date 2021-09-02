<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="name"
      @input="onInputTitle({ name: $event.target.value })"
    />
  </label>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

export default {
  name: "PzzBuilderTitleInput",
  computed: {
    ...mapState("Builder", ["name"]),
  },
  methods: {
    ...mapActions("Builder", {
      onInputTitle: UPDATE_CHOICE,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
