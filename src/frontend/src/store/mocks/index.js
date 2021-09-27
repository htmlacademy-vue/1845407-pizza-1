import cloneDeep from "lodash/cloneDeep";

import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";

import { mutations } from "@/store";

const state = () => ({
  notifications: [],
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
