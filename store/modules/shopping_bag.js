
export default {
  actions: {
    setCheckoutData({commit}, obj){
      commit('saveCheckoutData', obj)
    },
    addSelectPrice({commit}, obj){
      commit('modifyItemPrice', obj)
    },
    addSelectSize({commit}, obj){
      commit('modifyItemSize', obj)
    },
    addQuantity({commit}, obj) {
      commit('modifyItem', obj)
    },
    removeItem({commit}, obj){
      commit('removeFromBag', obj)
    },
    addToListBag({commit}, obj){
      commit('addToListBag', obj)
    },
    addToBag({commit}, obj){
      commit('addToBag', obj)
    },
    addToBagPair({commit}, obj){
      commit('addToBagPair', obj)
    },
    clearShop({commit}){
      commit('clear')
    },
    clearModalPair({commit}){
      commit('clearPairList')
    },
    async fetchShoppingUpdate({commit} ,items) {
      console.log(items)
        return await this.$axios.$post(`/api/users/shopping/body_cart`, {items: items })

          .then((resp) => {
            console.log(resp)
            commit('updateCurrentList', resp);
            return resp;
          })
          .catch(error => {
            return error.resp.data;
          });
    },
    async fetchMarkup({commit} ) {
        return await this.$axios.$get(`/api/diamonds/markup`)

          .then((resp) => {
            commit('updateMarkup', resp);
            return resp;
          })
          .catch(error => {
            return error.resp.data;
          });
    },

  },
  mutations: {
    saveCheckoutData(state, resp){
      state.checkout = resp
    },
    updateCurrentList(state, resp){
      state.items_bag = resp
    },
    updateMarkup(state, resp){
      state.markup = resp
    },
    addToListBag(state, item) {
      let found = state.items_bag.find(product => product.item_id === item.item_id);
      if (!found) {
        item.item_details.status_item = false;
        state.items_bag.push(item);
        state.status_item = false;
        return
      }
      item.item_details.status_item = true;
      state.status_item = true;
      return

    },
    modifyItemSize(state, item){

      let elem = state.items_bag.find(el => el.referenceNum === item.itemId )
      if (elem !== undefined) {
        elem = {...elem.item_details.stone_shape_select, ...item.data}
      }
    },
    modifyItemPrice(state, item){

      let elem = state.items_bag.find(el => el.referenceNum === item.itemId )
      if (elem !== undefined) {
        elem = {...elem.price, ...item.data}
      }
    },
    modifyItem(state, item) {
      let elem = state.items_bag.find(el => el.referenceNum === item.itemId )

      if (elem !== undefined) {
        elem = {...elem.count, ...item.data}
      }
    },
    addToBag(state, item){

      state.item_bag = item
      this.dispatch("addToListBag", item)
    },
    addToBagPair(state, item){

      item.map(value => {
        if(!Array.isArray(value)){
          let found = state.pair_array.find(product => product.item_id === value.item_id);
          if (!found) {
            state.pair_array.push(value)
          }
          this.dispatch("addToListBag", value)

        }else{
          value.map(item =>{
            let found = state.pair_array.find(product => product.item_id === item.item_id);
            if (!found) {
              state.pair_array.push(item)
            }
            this.dispatch("addToListBag", item)
          })
        }
      })

    },
    removeFromBag(state, item) {
      let index = state.items_bag.indexOf(item);

      if (index > -1) {
        state.items_bag.splice(index, 1);
      }
    },
    clear(state){
      state.items_bag = []
      state.checkout = {}

    },
    clearPairList(state){

      state.pair_array = []

    }
  },
  getters:{
    shopping_list(state) {
      return state.items_bag || []
    },
    status_item(state){
      return state.status_item
    },
    shopping_item(state){
      return state.item_bag
    },
    shopping_pair(state){
      return state.pair_array

    },
    markupValue(state){
      return state.markup
    },
    checkout(state){

      return state.checkout
    }

  },
  state: {
    checkout : {},
    items_bag: [],
    item_bag: {},
    product_bag: [],
    status_item:false,
    markup: [],
    pair_array : [],
  }
}
