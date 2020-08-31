export default {
  actions: {
    async fetchMainMenu({ commit }) {
      return await this.$axios.$get(`api/settings/menu/main_menu`)
        .then((main_menu) => {
          commit('updateMainMenu', main_menu);
          return main_menu;
        })
        .catch(error => {
          return error.main_menu.data;
        });
    },
    async fetchExtendMenu({ commit }) {
      return await this.$axios.$get(`api/settings/menu/extend_main_menu`)
        .then((extend_menu) => {
          commit('updateExtendMenu', extend_menu);
          return extend_menu;
        })
        .catch(error => {
          return error.extend_menu.data;
        });
    },
    async fetchFootMenu({ commit }) {
      return await this.$axios.$get(`api/settings/menu/dynamic_pages_menu`)

        .then((foot_menu) => {
          commit('updateFootMenu', foot_menu);
          return foot_menu;
        })
        .catch(error => {
          return error.foot_menu.data;
        });
    },
    async fetchFooter({ commit }) {
      return await this.$axios.$get(`api/settings/widgets/footer`)

        .then((footer_menu) => {
          commit('updateFooter', footer_menu);
          return footer_menu;
        })
        .catch(error => {
          return error.footer_menu.data;
        });
    }
  },
  mutations: {
    updateMainMenu(state, main_menu) {
      state.main_menu = main_menu
    },
    updateExtendMenu(state, extend_menu) {
      state.extend_menu = extend_menu
    },
    updateFootMenu(state, foot_menu) {
      state.foot_menu = foot_menu
    },
    updateFooter(state, footer_menu) {
      state.footer_menu = footer_menu
    },

  },
  getters:{
    mainMenuList(state){
      return state.main_menu
    },
    extendMenuList(state){
      return state.extend_menu
    },
    footMenuList(state){
      return state.foot_menu
    },
    footerWidget(state){
      return state.footer_menu
    }
  },
  state: {
    main_menu: {},
    extend_menu: {},
    foot_menu: {},
    footer_menu: {}
  }
}
