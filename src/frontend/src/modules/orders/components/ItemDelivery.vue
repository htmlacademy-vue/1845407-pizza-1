<template>
  <p class="order__address">Адрес доставки: {{ address || "Самовывоз" }}</p>
</template>

<script>
export default {
  name: "ItemDelivery",
  props: {
    street: String,
    building: String,
    flat: String,
  },
  computed: {
    address() {
      return [
        this.street,
        this.building && `д. ${this.building}`,
        this.flat && `кв. ${this.flat}`,
      ]
        .filter(Boolean)
        .join(", ");
    },
  },
};
</script>
