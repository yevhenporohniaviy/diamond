export default {
  actions: {
    addDiamond({commit}, obj) {
      commit('updateDiamond', obj)
    },
    switchArrayDiamond({commit}, bool) {
      commit('switchArray', bool)
    },
    removeFromState({commit}, bool) {
      commit('removeFromStateType', bool);
    },
    removeFromStateAll({commit}){
      commit('clearFromStateType');
    }
  },
  mutations: {
    updateDiamond(state, item) {
      switch(state.status) {
        case 'side_second':
          state.side_second = item;
        break
        case 'side_first':
          state.side_first = item;
        break
        case 'center':
          state.center = item;
          break
        default:
        break
      }
      if(state.status){
          state.side = item;
      }else{
          state.center = item;
      }
    },
    removeFromStateType(state, delet){
      switch(delet) {
        case 'side_second':
          state.side_second = {};
          break
        case 'side_first':
          state.side_first = {};
          break
        case 'center':
          state.center = {};
          break
        default:
          break
      }
    },
    switchArray(state, bool) {
      state.status = bool
    },
    clearFromStateType(state){
      state.center = {};
      state.side_first = {};
      state.side_second = {}
    }
  },
  getters: {
    center_diamond(state) {
      return state.center || {}
    },
    side_second_diamond(state){
      return state.side_second || {}
    },
    side_first_diamond(state){
      return state.side_first || {}
    },
    status_pair_block(state){
      return state.status
    }
  },
  state: {

    center: {},
    side_first: {},
    side_second: {},
    status: 'center'
  }
}
