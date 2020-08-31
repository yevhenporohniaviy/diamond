export default {
  actions: {
    addToPairDiamond({commit},obj) {
      commit('addProductModule', obj)
    },
    removeProductRing({commit}, obj) {
      commit('removePairRing', obj)
    },
    removeProductDiamond({commit}, obj) {
      commit('removePairDiamond', obj)
    },
  },
  mutations: {
      addProductModule(state, item) {

      if (item.item_type === 'j') {
          state.pair_diamonds.ring = item;
          return
      }

      state.pair_diamonds.diamond.push(item);
      if ( state.pair_diamonds.diamond.length > state.pair_diamonds.ring.item_details.count_center_stone)
        state.pair_diamonds.diamond.shift();
    },

    removePairRing(state){
      state.pair_diamonds.ring = {}
    },
    removePairDiamond(state, item) {

      let index = state.pair_diamonds.diamond.indexOf(item);

      if (index > -1) {
        state.pair_diamonds.diamond.splice(index, 1);
      }
    },

},
  getters:{
    diamonds_pair(state)
    {
      return state.pair_diamonds.diamond || []
    }
    ,
    ring_pair(state){
      return state.pair_diamonds.ring || {}
    }
  },
  state: {
    pair_diamonds: {
      diamond : [],
      ring : {}
    },
    status: false
  }
}
