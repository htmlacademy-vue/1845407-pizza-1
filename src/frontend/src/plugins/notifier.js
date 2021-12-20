import notificationTypes from "@/common/enums/notificationTypes";
//import { ADD_NOTIFICATION } from "@/store";

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch("ADD_NOTIFICATION", {
      text,
      type: notificationTypes.INFO,
    });
  }

  success(text) {
    this.#store.dispatch("ADD_NOTIFICATION", {
      text,
      type: notificationTypes.SUCCESS,
    });
  }

  error(text) {
    this.#store.dispatch("ADD_NOTIFICATION", {
      text,
      type: notificationTypes.ERROR,
    });
  }

  warning(text) {
    this.#store.dispatch("ADD_NOTIFICATION", {
      text,
      type: notificationTypes.WARNING,
    });
  }
}
