<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="title"
      @input="$emit('pizzaUpdate', { title: $event.target.value })"
    />
  </label>
</template>

<script>
export default {
  name: "PzzBuilderTitleInput",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
