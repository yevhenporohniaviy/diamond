<template>
  <div>
    <div class="container-fluid" id="header-component">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-6 col-md-3 d-flex align-items-center">
                  <div class="d-flex justify-content-center align-items-center">
                    <LogoDefault class="d-none d-xl-block header-logo" />
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <LogoHome class="d-block d-xl-none" />
                      <div @click="showMenu = !showMenu">
                        <BurgerIconHome class="d-block d-xl-none" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-9 ">
                  <div class="row justify-content-end">
                    <div class="menu-component d-flex align-items-center px-2">
                      <!--Menu list start -->
                      <MenuHome :main_menu="mainMenuList" />
                      <!--Menu list end-->
                      <div @click="showMenu = !showMenu">
                        <BurgerIconHome class="d-none d-xl-block" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showMenu"
      width="100%"
      :show-close="true"
      custom-class="MenuModal"
    >
      <DialogMenuComponent
        :extend_menu="extendMenuList"
        :foot_menu="footMenuList"
      />
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import DialogMenuComponent from "./MenuComponent/DialogMenuComponent";
import LogoHome from "./MenuComponent/Icons/Logo";
import LogoTextHome from "./MenuComponent/Icons/LogoText";
import LogoDefault from "./MenuComponent/Icons/LogoDefault";
import MenuHome from "./MenuComponent/Menu";
import BurgerIconHome from "./MenuComponent/Icons/BurgerIcon";
import SearchIconHome from "./MenuComponent/Icons/SearchIcon";
import PhoneIconHome from "./MenuComponent/Icons/PhoneIcon";
import ProfileIconHome from "./MenuComponent/Icons/ProfileIcon";
import SavedIconHome from "./MenuComponent/Icons/SavedIcon";
import BagIconHome from "./MenuComponent/Icons/BagIcon";

export default {
  components: {
    //header
    LogoHome,
    LogoTextHome,
    LogoDefault,
    MenuHome,
    DialogMenuComponent,
    BurgerIconHome,
    //menu
    SearchIconHome,
    PhoneIconHome,
    ProfileIconHome,
    SavedIconHome,
    BagIconHome
  },
  data() {
    return {
      showMenu: false,
      activeIndex: "1"
    };
  },
  methods: {

    handleScroll() {
      if (window.scrollY > 0) {
        $("#header-component").css({
          position: "fixed",
          "background-color": "white"
        });
      } else {
        $("#header-component").css({
          position: "absolute",
          "background-color": "rgba(255, 255, 255, 0.6)"
        });
      }
    }
  },
  computed: {
    ...mapGetters(["mainMenuList", "extendMenuList", "footMenuList"])
  },
  created() {
    this.$store.dispatch("fetchMainMenu");
    this.$store.dispatch("fetchExtendMenu");
    this.$store.dispatch("fetchFootMenu");
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  watch: {
    $route(to, from) {
      this.showMenu = false;
    }
  }
};
</script>
