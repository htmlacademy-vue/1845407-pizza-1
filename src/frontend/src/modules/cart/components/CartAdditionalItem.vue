<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="image" width="39" height="60" :alt="name" />
      <span>{{ name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <base-item-counter
        class="additional-list__counter"
        name="addition[count]"
        :value="count"
        :min="0"
        @input="$emit('onChangeCount', $event.target.value)"
      />
      <div class="additional-list__price">
        <b>{{ cost }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/ItemCounter.vue";

export default {
  name: "CartAdditionalItem",
  components: { BaseItemCounter },
  props: {
    name: String,
    image: String,
    count: Number,
    price: Number,
  },
  computed: {
    cost() {
      return this.count * this.price;
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-list__item {
  flex-grow: 1;
  margin-right: unset;

  & + & {
    margin-left: 15px;
  }
}
</style>
