export default {
  actions: {
    async fetchComponentsHome({ commit }) {
      return await this.$axios.$get(`/api/settings/homepage`)
        .then((home) => {
          commit('updateComponentsHome', home);
          return home;
        })
        .catch(error => {
          return error.home.data;
        });
    }
  },
  mutations: {
    updateComponentsHome(state, home) {
      state.home = home
    },
  },
  getters:{
    listComponentsHome(state){
      return state.home
    }
  },
  state: {
    home: [],
  }
}
