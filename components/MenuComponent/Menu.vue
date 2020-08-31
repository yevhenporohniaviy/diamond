<template>
  <div>
    <el-menu :default-active="activeIndex" class="d-flex justify-content-center align-items-center" mode="horizontal"  background-color="transparent">
      <sub-menu-elements :menu.sync="menu"></sub-menu-elements>
      <el-menu-item index="6" class="main-icon-homepage" >
          <div @click="isHidden = true">
            <SearchIconHome />
        </div>
      </el-menu-item>
      <div v-if="isHidden" >
        <div  class="search-form-menu">
          <div class="input-group group">
            <div class="input-group-prepend" >
              <button class="btn " @click="searchValue" ><img src="~assets/img/search_icon2.png" class="img-fluid w-25"></button>
            </div>
            <form @submit="searchValue" class="form-search-value">
              <input type="text" class="form-control" id="search-value" name="search-value" v-model="search" aria-describedby="basic-addon1" >
            </form>
            <div class="close-search" @click="closeSearch">
              <img src="~assets/img/default/close-search.png" class="img-fluid">
            </div>

          </div>
        </div>
      </div>
      <el-menu-item index="7" class="main-icon-homepage position-relative d-none d-md-block"  >
        <el-popover
          popper-class="phone-menu"
          placement="bottom"
          :visible-arrow="false"
          v-model="visible">
          <div class="information-phone">
            <div class="border-line"></div>
            <div class="box">
              <div class="aus-number">Aus <span>1300 899 432</span></div>
              <div class="line">
              </div>
              <div class="int-number">Int. <a href="tel:+612 9261 2272">+612 9261 2272</a></div>
            </div>
          </div>
          <PhoneIconHome slot="reference"/>
        </el-popover>

      </el-menu-item>
      <el-menu-item index="7" class="main-icon-homepage position-relative d-block d-md-none" >

        <a href="tel:+612 9261 2272"><PhoneIconHome /></a>

      </el-menu-item>
      <el-menu-item index="8" class="main-icon-homepage" >

        <el-popover
          popper-class="user-menu"
          placement="bottom"
          :visible-arrow="false"
          v-model="visible_user">
            <is-online v-if="isAuthenticated" />
            <is-offline v-else/>
          <ProfileIconHome slot="reference"/>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="9" class="main-icon-homepage">

        <el-tooltip class="el-tooltip" effect="light" content="favorites" placement="top-start">
          <nuxt-link to="/favorites" class="text-decoration-none">
          <SavedIconHomeAdded v-if="typeof favorites_list !== 'undefined' && favorites_list.length > 0"/>
          <SavedIconHome v-else/>
          </nuxt-link>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="10" class="main-icon-homepage">

        <el-tooltip class="el-tooltip" effect="light" content="bag" placement="top-start">

        <nuxt-link to="/shopping-bag" class="text-decoration-none">
          <BagIconHomeAdded v-if="typeof shopping_list !== 'undefined' && shopping_list.length > 0"/>
          <BagIconHome v-else/>
        </nuxt-link>

        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="11" class="d-none d-xl-block">
        <nuxt-link to="/dynamic-pages/contact_us" class="text-decoration-none">
          CONTACT US
        </nuxt-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import SearchIconHome from './Icons/SearchIcon'
  import PhoneIconHome from './Icons/PhoneIcon'
  import ProfileIconHome from './Icons/ProfileIcon'
  import SavedIconHome from './Icons/SavedIcon'
  import SavedIconHomeAdded from './Icons/SavedAddIcon.vue'
  import BagIconHome from './Icons/BagIcon'
  import BagIconHomeAdded from './Icons/BagAddedIcon'
  import BurgerIconHome from './Icons/BurgerIcon'
  import SubMenuElements from './SubMenuElements'
  import isOnline from './isOnline'
  import isOffline from './isOffline'
  import {mapGetters} from 'vuex'

  export default {
    props: {
      main_menu: Object
    },
    components: {
      isOffline,
      isOnline,
      SearchIconHome,
      PhoneIconHome,
      ProfileIconHome,
      SavedIconHome,
      BagIconHome,
      BagIconHomeAdded,
      BurgerIconHome,
      SubMenuElements,
      SavedIconHomeAdded
    },
    data() {
      return {
        isHidden: false,
        visible: false,
        visible_user: false,
        activeIndex: '1',
        toggle : false,
        search: '' ,
      };
    },

    methods:{
      closeSearch(){
        this.isHidden = false
        this.search = ''
      },
       searchValue(event){
         if(this.search === ""){
           event.preventDefault();
         }else{
           event.preventDefault();
           this.$store.dispatch('fetchSearch', { params: {query: this.search , page: 1} , alias: 'product'})
           this.isHidden = false
           this.search = ''
           this.$router.push({path: '/search'})
         }
      },
    },
    computed:{
      ...mapGetters(['shopping_list','favorites_list','isAuthenticated']),
      allItems () {
        return this.main_menu.menu_items || []
      },
      rootItems () {
        return this.allItems.filter((item) => {
          return item.parent_id === null
        })
      },
      menu () {
        return (this.rootItems.length  ) ? function menuBuilder (data) {

            return data.map((item) => {

              return {
                id: item.id,
                alias: item.alias,
                title: item.title,
                is_active: item.is_active,
                parent_id: item.parent_id,
                content_item: item.content_item,
                content_type: item.content_type,
                content: item.content,
                children: menuBuilder(item.sub_menu)
              }
            })
          }(this.rootItems)
          : null
      }
    }

  }
</script>

<style lang="scss">
  .search-form-menu{
    position: absolute;
    top: 12px;
    width: 385px;
    right: 0;
    z-index: 9;
    background-color: #fff;
    @media(max-width: 525px){
      width: 215px;
      left: -55px;
    }
    .close-search{
      position: absolute;
      top: 0;
      right: 0;
      width: 50px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .input-group-prepend{
      position: absolute;
      height:100%;
    }
    .form-search-value{
      width: 100%;
      padding-left: 50px;
    }
    button{

      padding: 0;
      border: none;
      border-bottom: 1px solid #e8f2fa;
      border-radius: 0;
      &:hover,
      &:active,
      &:focus{
        border-color: #e8f2fa;
        box-shadow: none;
        outline: none;
        background-color: transparent;
      }
    }
    input{
      border: none;
      border-bottom: 1px solid #e8f2fa;
      border-radius: 0;
      &:hover,
      &:active,
      &:focus{
        border-color: #e8f2fa!important;
        box-shadow: none;
        outline: none;
        background-color: transparent;
      }
    }
  }
  .phone-menu,
  .user-menu{
    margin-top: 25px!important;
    padding: 0;
    .information-phone{

      height: 52px;
      box-shadow: 0 5px 12px rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      .border-line{
        width: 94px;
        height: 2px;
        background-color: #cae3f6;
        margin: 0 auto;
      }
      .line{
        height: 2px;
        background-color: #cae3f6;
      }
      .box{
        .line{
          width: 1px;
          height: 19px;
          border: 1px solid #24354f;
          opacity: 0.15;
        }
        display: flex;
        justify-content: space-between;
        align-items: center ;
        .aus-number{

          padding: 0 10px;
          display: flex;
          align-items: center;
          color: #24354f;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1.11px;
          line-height: 47px;
          text-transform: none;
          span{
            margin-left: 10px;
            color: #24354f;
            font-family: lato-reg;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 1.3px;
            line-height: 47px;
            text-transform: uppercase;
          }
        }
        .int-number{
          padding: 0 10px;
          display: flex;
          align-items: center;
          color: #24354f;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1.11px;
          line-height: 47px;
          text-transform: none;
          a{
            text-decoration: none;
            margin-left: 10px;
            color: #24354f;
            font-family: lato-reg;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 1.3px;
            line-height: 47px;
            text-transform: uppercase;
          }
        }
      }
    }
  }
  // Fixed Outline
  .el-tooltip {
    outline: none;
  }
</style>
