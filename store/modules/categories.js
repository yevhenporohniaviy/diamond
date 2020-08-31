export default {
  actions: {
    saveQueryJewellery({commit}, obj){
      commit('setQueryJewellery', obj)
    },
    async fetchCategory({ commit }, payload ) {

      return await this.$axios.$get(`/api/jewellery/by_category/${payload.id}`, {params: payload})
        .then((category) => {
          commit('updateCategory', category);
          return category;
        })
        .catch(error => {
          return error.category.data;
        });
    },
    async fetchCategoryParams({ commit }, payload ) {

      return await this.$axios.$get(`/api/jewellery/by_category/${payload.id}`, {params: payload})
        .then((category) => {
          commit('updateCategoryParams', category);
          return category;
        })
        .catch(error => {
          return error.category.data;
        });
    },
  },
  mutations: {
    setQueryJewellery(state, query){
      if(query.id === 'engagement_rings'){
        state.jewellery_engagement_query = query || {}
      }else{
        state.jewellery_wedding_query = query || {}
      }


    },
    updateCategoryParams(state, category) {

      state.category = category
    },
    updateCategory(state, category) {

      let obj = {...category}
      obj.data = [...state.category.data, ...category.data]
      state.category = obj
    },
  },
  getters:{
    allCategory(state){
      return state.category
    }
  },
  state: {
    jewellery_engagement_query: {},
    jewellery_wedding_query: {},
    category: {
      data: []
    }
  }
}
