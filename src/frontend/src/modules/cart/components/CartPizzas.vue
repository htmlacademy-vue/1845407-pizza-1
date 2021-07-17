<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2>Капричоза</h2>
          <ul>
            <li>30 см, на тонком тесте</li>
            <li>Соус: томатный</li>
            <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button type="button" class="counter__button counter__button--minus">
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" value="1" />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>782 ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
    <li class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Любимая пицца"
        />
        <div class="product__text">
          <h2>Любимая пицца</h2>
          <ul>
            <li>30 см, на тонком тесте</li>
            <li>Соус: томатный</li>
            <li>
              Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блючиз
            </li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button type="button" class="counter__button counter__button--minus">
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" value="2" />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>782 ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CartPizzas",
};
</script>
