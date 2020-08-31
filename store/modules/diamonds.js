
export default {

  actions: {
    setWidgetFindDiamond({commit}){
      return this.$axios.$get('api/settings/widgets/find_the_perfect_ring')
        .then((widget) => {
          commit('updateWidgetFind', widget);
          return widget;
        })
        .catch(error => {
          return error.data;
        });
    },
    setWidgetFindJewellery({commit}){
      return this.$axios.$get('api/settings/widgets/find_the_ideal_center_stone')
        .then((widget) => {
          commit('updateWidgetFind', widget);
          return widget;
        })
        .catch(error => {
          return error.data;
        });
    },
    saveQuery({commit}, obj){
      commit('setQuery', obj)
    },
    async fetchGst({commit}) {
      return await this.$axios.$get('/api/settings/prices/gst')
        .then((gst) => {
          commit('updateGst', gst);
          return gst;
        })
        .catch(error => {
          return error.data;
        });
    },
    async fetchDiamonds({commit}, params ) {
      return await this.$axios.$get('/api/diamonds', {params: params} )
        .then((diamonds) => {
          commit('updateDiamonds', diamonds);

          return diamonds;
        })
        .catch(error => {
          return error.data;
        });
    },
    async fetchDiamondsParams({commit}, params ) {

      return await this.$axios.$get('/api/diamonds', {params: params})
        .then((diamonds) => {
          commit('updateDiamondsParams', diamonds);
          return diamonds;
        })
        .catch(error => {
          console.warn(error)
        });
    },
    async fetchDiamond({commit}, params) {

      return await this.$axios.$get('/api/diamonds/num/' + params)
        .then((diamond) => {
          commit('updateDiamond', diamond);
          return diamond;
        })
        .catch(error => {
          return error.data;
        });
    }

  },
  mutations: {
    updateWidgetFind(state, widget){
      state.widget = widget
    },
    setQuery(state, query){
      state.diamonds_query = query || {}
    },
    updateGst(state,gst){
      state.gst = gst
    },
    updateDiamondsParams(state, diamonds) {
      state.diamonds = diamonds
    },
    updateDiamonds(state, diamonds) {
      let obj = {...diamonds}
      obj.data = [...state.diamonds.data, ...diamonds.data]
      state.diamonds = obj
    },
    updateDiamond(state, diamond) {
      state.diamond = diamond
    },
  },
  getters: {
    allDiamonds(state) {
      return state.diamonds
    },
    diamondItem(state) {
      return state.diamond
    },
    gstCount(state) {
      return state.gst
    },
    getWidgetFind(state){
      return state.widget
    }
  },
  state: {
    diamonds_query: {},
    widget: {},
    diamonds: {
      data: []
    },
    diamond: {},
    gst: ''
  }
}
