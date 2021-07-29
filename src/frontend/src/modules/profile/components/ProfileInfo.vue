<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="
          /public/img/users/user@2x.webp 1x,
          /public/img/users/user@4x.webp 2x
        "
      />
      <img
        src="/public/img/users/user@2x.jpg"
        srcset="/public/img/users/user5@4x.jpg"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>Василий Ложкин</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
};
</script>
