export default {
  actions: {
    async setCompareListJewellery({commit}, arr) {

      let array = arr.query.compare.split(',');

      return await this.$axios.$get('/api/jewellery/by_numbers' ,{params: {compare: array } })
        .then((res) => {
          res.forEach(elem => {
              let jewellery  = {
                item_id: elem.item_number,
                count: 1,
                price: elem.price,
                price_gst: elem.price,
                item_type: 'j',
                item_details: elem
              }
              commit('addToEngagement', {item: jewellery, alias:arr.params.id});
          })
        })
        .catch(error => {
          console.log(error)
        });
    },
  },
  mutations: {
    addToEngagement(state, data) {
      console.log(data.alias)
      let found = state.jewellery[data.alias].find(product => product.item_id === data.item.item_id);

      if (!found) {

        if (!Array.isArray(state.setId[data.alias]) ){
          let obj = {}
          obj[data.alias] = []
          state.setId = {...state.setId, ...obj}
        }
        state.setId[data.alias].push(data.item.item_id);


        if (!Array.isArray(state.jewellery[data.alias]) ){
          let obj = {}
          obj[data.alias] = []
          state.jewellery = {...state.jewellery, ...obj}
        }
        state.jewellery[data.alias].push(data.item);

        return
      }

      state.cartStatus = true;
      return
    },

    removeFromEngagement(state, data) {
      let index = state.jewellery[data.alias].indexOf(data.item);
      let index_id = state.jewellery[data.alias].indexOf(data.item);

      if (index > -1) {
        state.jewellery[data.alias].splice(index, 1);
      }
      if (index > -1) {
        state.setId[data.alias].splice(index, 1);
      }
    },
    cancelFromEngagement(state, data){
      if (Array.isArray(state.setId[data.alias])){
        let obj = {}
        obj[data.alias] = []
        state.setId = {...state.setId, ...obj}
      }

      if (Array.isArray(state.jewellery[data.alias])){
        let obj = {}
        obj[data.alias] = []
        state.jewellery = {...state.jewellery, ...obj}
      }

    },
    closeModal(state){
      state.cartStatus = false;
    }


  },
  getters:{
    list_engagement(state) {
      return state.jewellery
    },
    status_engagement(state) {
      return state.cartStatus
    },
    compare_jewellery(state){
      return state.setId || []
    }

  },
  state: {
    jewellery: {
      engagement_rings: [],
      wedding_bands: []
    },
    setId: {

    },
    cartStatus: false
  }
}
