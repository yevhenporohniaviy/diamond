export default {
  actions: {
    async fetchDynamicPage({ commit } , params) {
      return await this.$axios.$get(`/api/settings/pages/alias/${params}`) //alias/{params}
        .then((guid) => {

          commit('updateDynamicPage', guid);
          return guid;
        })
        .catch(error => {
          return error.guid.data;
        });
    },
    async fetchMeta({ commit } , params) {
      return await this.$axios.$get(`/api/settings/pages/metadata/${params}`) //alias/{params}
        .then((meta) => {

          commit('updateMetaDynamicPage', meta);
          return meta;
        })
        .catch(error => {
          return error.meta.data;
        });
    }
  },
  mutations: {
    updateDynamicPage(state, guid) {
      state.guid = guid
    },
    updateMetaDynamicPage(state, meta) {
      state.guid_meta = meta
    },

  },
  getters:{
    itemGuid(state){
      return state.guid
    },
    itemMeta(state){
      return state.guid_meta
    },
  },
  state: {
    guid: {},
    guid_meta: {},
  }
}
