export default {
  actions: {
    sendEnquiry({ commit }, obj){

      commit('updateEnquiry', obj);
    },
    cleareEnquiry({ commit }){
      commit('clearEnquiry');
    },
    sendEnquiryHome({ commit }, obj){
      commit('sendEnquiryHome', obj);
    }
  },
  mutations: {
    sendEnquiryHome(state, numbers){
      let found = state.enquiry.find(product => product.item_id === numbers.item_id);

      if (!found) {
        numbers.map(item =>{
          state.enquiry.push(item.item_id)
        })
      }

    },
    updateEnquiry(state, enquiry){

      if(Array.isArray(enquiry)){
        enquiry.map(value => {
          if(!Array.isArray(value)){
            state.enquiry.push(value.item_id)
          }else{
            value.map(item =>{
              state.enquiry.push(item.item_id)
            })
          }
        })
      }else{
        state.enquiry.push(enquiry.item_id)
      }
    },
    clearEnquiry(state){
      state.enquiry = []
    }

  },
  getters:{

    enquiry_number(state){
      return state.enquiry
      }
    },
  state: {
    enquiry: []
  }
}
