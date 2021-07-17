<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li class="additional-list__item sheet">
        <p class="additional-list__description">
          <img
            src="img/cola.svg"
            width="39"
            height="60"
            alt="Coca-Cola 0,5 литра"
          />
          <span>Coca-Cola 0,5 литра</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              value="2"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>56 ₽</b>
          </div>
        </div>
      </li>
      <li class="additional-list__item sheet">
        <p class="additional-list__description">
          <img src="img/sauce.svg" width="39" height="60" alt="Острый соус" />
          <span>Острый соус</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              value="2"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>30 ₽</b>
          </div>
        </div>
      </li>
      <li class="additional-list__item sheet">
        <p class="additional-list__description">
          <img
            src="img/potato.svg"
            width="39"
            height="60"
            alt="Картошка из печи"
          />
          <span>Картошка из печи</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              value="2"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>56 ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CartAdditional",
};
</script>
