export default {
  actions: {
    addDiamondToPair({commit}, obj) {
      commit('addDiamondModule', obj)
    },
    removeProduct({commit}, obj) {
      commit('removeFromProduct', obj)
    },
    removeDiamond({commit}, obj) {
      commit('removeFromDiamond', obj)
    },
  },
  mutations: {
    addDiamondModule(state, item) {

      if(item.item_type === 'd') {
        state.pair.diamond = item;
        return
      }
        state.pair.ring = item;
    },

    removeFromProduct(state){
      state.pair.ring = {}
    },
    removeFromDiamond(state){
      state.pair.diamond = {}
    }
  },
  getters:{
    list_diamond(state){
      return state.pair.diamond || {}
    },
    list_ring(state){
      return state.pair.ring || {}
    }
  },
  state: {
    pair: {
      diamond : {},
      ring : {}
    },
    status: false
  }
}
