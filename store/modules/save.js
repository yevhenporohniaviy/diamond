
export default {
  actions: {

    async fetchListPopular({commit}) {
      return await this.$axios.$get('/api/settings/popular' )
        .then((resp) => {
          commit('addPopularList', resp)
          return resp;
        })
        .catch(error => {
          return error
        });
    },
    async addToFavorites({commit}, obj) {
      return await this.$axios.$post('/api/users/favorites', obj )
        .then((resp) => {
          return resp;
        })
        .catch(error => {
          return error.resp.data;
        });
    },

    async fetchListFavorites({commit}) {
      return await this.$axios.$get('/api/users/favorites' )
        .then((resp) => {
          commit('addFavoritesList', resp)
        })
        .catch(error => {
          return error.resp.data;
        });
    },
    async removeFromFavoritesList({commit}, item) {
        return await this.$axios.$delete(`/api/users/favorites/${item.id}` )
        .then((resp) => {
          commit('removeFavorites', item)
        })
        .catch(error => {
          return error.resp.data;
        });
    }

  },
  mutations: {
    addPopularList(state, item) {
      state.list_popular = item.data
    },
    addFavoritesList(state, item) {
      state.list_favorites = item.data
    },
    removeFavorites(state, item) {
      let index = state.list_favorites.indexOf(item);

      if (index > -1) {
        state.list_favorites.splice(index, 1);
      }
    }
  },
  getters:{
    favorites_list(state) {
      return state.list_favorites || []
    },
    popular_list(state) {
      return state.list_popular || []
    }

  },
  state: {
    list_favorites:[],
    list_popular:[]
  }
}
