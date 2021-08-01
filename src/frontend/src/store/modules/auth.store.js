export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_ACCOUNT = "SET_ACCOUNT";

export default {
  namespaced: true,
  state: () => ({
    account: undefined,
  }),
  getters: {
    isLogged({ account }) {
      return !!account;
    },
  },
  actions: {
    async [SIGN_IN]({ dispatch }, { email, password }) {
      const { token } = await this.$api.auth.login({ email, password });
      this.$jwt.saveToken(token);
      this.$api.auth.setAuthHeader();

      dispatch(SET_ACCOUNT);
    },
    async [SIGN_OUT]({ commit }) {
      try {
        await this.$api.auth.logout();
      } finally {
        this.$jwt.deleteToken();
        this.$api.auth.setAuthHeader();

        commit(SET_ACCOUNT);
      }
    },
    async [SET_ACCOUNT]({ dispatch, commit }) {
      try {
        const account = await this.$api.auth.whoAmI();
        commit(SET_ACCOUNT, account);
      } catch {
        dispatch(SIGN_OUT);
      }
    },
  },
  mutations: {
    [SET_ACCOUNT](state, account = undefined) {
      Object.assign(state, { account });
    },
  },
};
