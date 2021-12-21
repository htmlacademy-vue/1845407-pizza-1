<template>
  <div id="app">
    <app-notification />
    <app-header />
    <transition v-bind="layoutTransition">
      <component
        :is="layoutComponent"
        :class="layoutClass"
      />
    </transition>
  </div>
</template>

<script>
import kebabCase from "lodash/kebabCase";

const defaultLayout = "LayoutDefault";

export default {
  name: "App",
  data() {
    return {
      appTransition: {},
      layoutTransition: {},
    };
  },
  computed: {
    layoutComponent() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}`);
    },
    layoutClass() {
      const layout = this.$route.meta.layout || defaultLayout;
      return kebabCase(`${layout}`);
    },
  },
  watch: {
    $route(to, from) {
      switch (true) {
        case from.name == null:
          // при начальной загрузке приложения используем специальную анимацию
          // вместо слайдера для последующих переходов
          this.layoutTransition = {
            "enter-active-class":
              "animate__animated animate__fast animate__fadeIn",
          };
          break;
        case ["login", "thanks"].includes(to.name):
          // при открытии модали не нужно ни каких анимация на лейауте
          // сработают только анимации самой модали
          this.layoutTransition = {};
          break;
        case ["login", "thanks"].includes(from.name):
          this.layoutTransition = {
            // хитрая задержка что бы было видно анимацию закрытия модали
            mode: "out-in",
            "leave-active-class": "animate__animated animate__faster",
          };
          break;
        default:
          this.layoutTransition = {
            // типовая анимация смены роутов слайдером влево
            mode: "out-in",
            "enter-active-class":
              "animate__animated animate__fast animate__slideInLeft",
            "leave-active-class":
              "animate__animated animate__faster animate__slideOutRight",
          };
      }
    },
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "~animate.css";

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > main {
    flex-grow: 1;
  }

  .modal {
    z-index: 10;

    &:not(:empty):before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .close {
      /*background-color: transparent;*/
      /*border-color: transparent;*/

      &:before,
      &:after {
        /*background-color: currentColor;*/
      }
    }
  }
}
</style>
