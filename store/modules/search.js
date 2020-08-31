
export default {
  actions: {

    async fetchSearch({commit}, params) {

      return await this.$axios.$get(`/api/settings/search/${params.alias}`, params )
        .then((search) => {
          commit('setSearch', search)
          return search
        })
        .catch(error => {
          return error;
        });
    },
    async fetchSearchPagin({commit}, params) {

      return await this.$axios.$get(`/api/settings/search/${params.alias}`, params )
        .then((search) => {
          commit('setSearchPages', search)
          return search
        })
        .catch(error => {
          return error;
        });
    },
    clearStoreSearch({commit}) {
      commit('clearStore')
    },

  },
  mutations: {
    clearStore(state){
      state.results = [];
      state.total_result = 0;
      state.value_search = '';
    },
    setSearchPages(state, search) {
      let obj = {...search}
      obj = [...state.results, ...search.result.data]
      state.results = obj

      state.results_data = search.result;
      state.total_result = search.totalCount;
      state.value_search = search.query;

    },
    setSearch(state, search) {
      state.results = search.result.data;
      state.results_data = search.result;
      state.total_result = search.totalCount;
      state.value_search = search.query;
      state.value_search = search.query;

    }
  },
  getters:{
    result_search(state) {
      return state.results || []

    },
    total_results(state) {
      return state.total_result || 0

    },
    data_pagin(state){
      return state.results_data
    },
    value_search(state){
      return state.value_search
    }
  },
  state: {
    results_data: {},
    results:[],
    total_result: null,
    value_search: null,
  }
}
