<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="title"
      @input="pizzaUpdate({ title: $event.target.value })"
    />
  </label>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UPDATE_CHOICE } from "@/store/modules/builder.store";

export default {
  name: "PzzBuilderTitleInput",
  computed: {
    ...mapState("Builder", ["title"]),
  },
  methods: {
    ...mapActions("Builder", {
      pizzaUpdate: UPDATE_CHOICE,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
