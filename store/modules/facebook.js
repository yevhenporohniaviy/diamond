export default {
  actions: {
    async loginFb({ commit }, params) {
      return await this.$axios.$get(`/auth/social/${params}`)
        .then((resp) => {
          console.log(resp)
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  mutations: {

  },
  getters:{

  },
  state: {


  }
}
