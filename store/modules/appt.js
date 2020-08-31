export default {
  actions: {
    setNameUser({commit}, str){
      commit('nameUser', str)
    },
    setEnquireAbout({commit}, str){
      commit('updateEnquireAbout', str)
    },
    async fetchApptHeader({ commit }) {
      return await this.$axios.$get(`/api/settings/widgets/appointment_header`)
        .then((header) => {
          commit('updateApptHeader', header);
          return header;
        })
        .catch(error => {
          return error.header.data;
        });
    },
    async fetchAppt({ commit }) {
      return await this.$axios.$get(`/api/appointments/steps`)
        .then((appt) => {
          commit('updateAppt', appt);
          return appt;
        })
        .catch(error => {
          return error.appt.data;
        });
    }
  },
  mutations: {
    nameUser(state, user) {
      state.name_user = user
    },
    updateEnquireAbout(state, enqur) {
      state.enquery_about = enqur
    },
    updateAppt(state, appt) {
      state.appt = appt
    },
    updateApptHeader(state, header) {
      state.header = header
    },
  },
  getters:{
    user_name(state) {
      return state.name_user || ''
    },
    user_enquery(state) {
      return state.enquery_about || ''
    },

  },
  state: {
    name_user: '',
    enquery_about: '',
    appt: [],
    header: {},
  }
}
