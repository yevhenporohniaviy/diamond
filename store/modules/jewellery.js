export default {
  actions: {
    async fetchJewellery({ commit }) {
      return await this.$axios.$get('/api/jewellery/categories')
        .then((jewellery) => {
          commit('updateJewellery', jewellery);
          return jewellery;
        })
        .catch(error => {
          return error.jewellery.data;
        });
    },
    async fetchItemJewellery({ commit } , params) {
      return await this.$axios.$get(`/api/jewellery/by_id/${params}`)
        .then((jewItem) => {
          commit('updateItemJewellery', jewItem);
          return jewItem;
        })
        .catch(error => {
          return error.jewItem.data;
        });
    }
  },
  mutations: {
    updateJewellery(state, jewellery) {
      state.jewellery = jewellery
    },
    updateItemJewellery(state, jewItem) {
      state.jewItem = jewItem
    },
  },
  getters:{
    allJewellery(state){
      return state.jewellery
    },
    itemJewellery(state){
      return state.jewItem
    }
  },
  state: {
    jewellery: [],
    jewItem:{}


  }
}
