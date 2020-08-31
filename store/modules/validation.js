export default {
  actions: {
    setErrors({commit}, errors){
      commit('SET_VALIDATION_ERRORS', errors)
    },
    clearErrors({commit}){
      commit('SET_VALIDATION_ERRORS', {})
    }
  },
  mutations: {
    SET_VALIDATION_ERRORS(state, errors){
      state.errors = errors;
    }
  },
  getters: {
    errors(state){
      return state.errors;
    }
  },
  state: {
    errors: {}
  }
}
