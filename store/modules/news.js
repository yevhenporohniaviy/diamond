export default {
  actions: {
    async fetchNews({ commit } , params) {
      return await this.$axios.$get(`/api/settings/news/${params.type}?limit=6`)
        .then((news) => {
          commit('updateNews', news);
          return news;
        })
        .catch(error => {
          return error.news.data;
        });
    },
    async fetchNew({ commit } , params) {

      return await this.$axios.$get(`/api/settings/news/${params}?limit=3`)
        .then((item_new) => {
          console.log(item_new);
          commit('updateNew', item_new);
          return item_new;
        })
        .catch(error => {
          return error.item_new.data;
        });
    }
  },
  mutations: {
    updateNews(state, jewellery) {
      state.jewellery = jewellery
    },
    updateNew(state, item_new) {
      state.item_new = item_new
    },
  },
  getters:{

    itemNew(state){
      return state.item_new
    }
  },
  state: {
    news: [],
    item_new:{}


  }
}
