

export default {
  actions:{

    async fetchListOrder({commit}) {
      return await this.$axios.$get('/api/users/orders')
        .then((resp) => {
          commit('setListOrder', resp);
          return resp;
        })
        .catch(error => {
          return error.data;
        });
    },
    async fetchOrderItem({commit}, params) {
      return await this.$axios.$get('/api/users/orders/' + params )
        .then((resp) => {
          commit('setItemOrder', resp);
          return resp;
        })
        .catch(error => {
          return error.data;
        });
    },

  },
  mutations: {
    setListOrder (state, order){
      state.order = order
    },
    setItemOrder(state, item){
      state.order_item = item
    },


  },
  getters:{
    isAuthenticated(state) {
      return state.loggedIn
    },
    loggedInUser(state) {
      return state.user
    },

    listOrder(state){
      return state.order
    },
    itemOrder(state){
      return state.order_item
    }
  },
  state:{

    order: {},
    order_item: {}
  }
}


