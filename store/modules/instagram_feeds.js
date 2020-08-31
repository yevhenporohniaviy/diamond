
export default {
  actions: {
    async fetchInstagramFeeds({commit}, params) {
      console.log(params)
      return await this.$axios.$get('/api/settings/instagram',{params: params})
        .then((list_favorites) => {

          commit('updateFeeds', list_favorites);
          return list_favorites;
        })
        .catch(error => {
          return error
        });
    },
    async fetchInstagramHomepage({commit}) {
      return await this.$axios.$get(`/api/settings/instagram?limit=4`)
        .then((feeds_home) => {
          commit('updateFeedsHome', feeds_home);
          return feeds_home;
        })
        .catch(error => {
          return error
        });
    },

  },
  mutations: {
    updateFeeds(state, list_favorites) {

      let obj = {...list_favorites}
      obj.data = [...state.list_favorites.data, ...list_favorites.data]
      state.list_favorites = obj
    },
    updateFeedsHome(state, feeds_home){
      state.feeds_home = feeds_home
    }
  },
  getters:{
    allFeeds(state) {
      return state.list_favorites
    },
    allFeedsHome(state){
      return state.feeds_home
    }
  },
  state: {
    list_favorites: {
      data: []
    },
    feeds_home: [],
    page: 1,
  }
}
