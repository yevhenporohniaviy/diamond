export default {
  actions: {
    async fetchFaq({ commit }) {
      return await this.$axios.$get(`/api/settings/pages/faq`)
        .then((faq) => {
          commit('updateFaq', faq);
          return faq;
        })
        .catch(error => {
          return error.faq.data;
        });
    }
  },
  mutations: {
    updateFaq(state, faq) {
      state.faq = faq
    },
  },
  getters:{
    listFaq(state){
      return state.faq
    },
  },
  state: {
    faq: {}
  }
}
