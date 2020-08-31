export default {
  actions: {
    async setCompareList({commit}, arr) {

      let array = arr.compare.split(',');
      return await this.$axios.$get('/api/diamonds/numbers' ,{params: {compare: array} })
        .then((res) => {
            res.forEach(elem => {
              let diamond  = {
                item_id: elem.referenceNum,
                count: 1,
                price: elem.custom_price || elem.price_aud,
                price_gst: elem.price_aud,
                item_type: 'd',
                item_details: elem
              }
              commit('addToCart', diamond);
            })
          })
        .catch(error => {
          console.log(error)
        });
    },
  },
  mutations: {
    addToCart(state, item) {

      let found = state.cart.find(product => product.item_id === item.item_id);

      if (!found) {
        state.cart.push(item);
        state.setId.push(item.item_id);
        state.cartStatus = false;
        return
      }
       state.cartStatus = true;
      return
    },

    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {
        state.cart.splice(index, 1);
        state.setId.splice(index, 1);
      }
    },
    cancelFromCart(state){
      state.cart = [];
      state.setId = [];
    },
    closeModal(state){
      state.cartStatus = false;
    }


  },
  getters:{
    list_cart(state) {
      return state.cart || []
    },
    status(state) {
      return state.cartStatus
    },
    compare_list(state){
      return state.setId || []
    }

  },
  state: {
    setId: [],
    cart: [],
    cartStatus: false
  }
}
