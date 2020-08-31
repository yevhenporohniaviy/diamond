export default {
  actions: {
    async fetchFilters({ commit }) {
      return await this.$axios.$get('/api/diamonds/filters')
        .then((filters) => {
          commit('updateFilters', filters);
          return filters;
        })
        .catch(error => {
          return error.filters.data;
        });
    },
    async fetchFiltersJewel({ commit }, id) {
      return await this.$axios.$get(`/api/jewellery/categories/${id}/filters`)
        .then((filtjewel) => {
          commit('updateFiltersJewel', filtjewel);
          return filtjewel;
        })
        .catch(error => {
          return error.filtjewel.data;
        });
    }
  },
  mutations: {
    updateFilters(state, filters) {
      state.filters = filters
    },
    updateFiltersJewel(state, filtjewel) {
      state.filtjewel = filtjewel
    },
  },
  getters:{
    allFilters(state){
      return state.filters
    },
    allFiltersJewel(state){
      return state.filtjewel
    }
  },
  state: {
    filters: [],
    filtjewel: {}
  }
}
