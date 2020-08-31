<template>

  <div id="MenuModalContent" class="container-fluid" >
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-6 col-md-3 d-flex align-items-center">
                <div class="d-flex justify-content-center align-items-center">
                  <LogoHome />
                  <LogoTextHome class="d-none d-xl-block"/>
                </div>
              </div>
              <div class="col-6 col-md-9 ">
                <div class="row justify-content-end">
                  <div class="address-text-menu d-none d-md-block" >
                    Level 2, Suite 201, 185 Elizabeth St,
                    Sydney NSW 2000
                  </div>
                  <div class="menu-homepage d-flex align-items-center px-2">

                    <el-menu :default-active="activeIndex" class="" mode="horizontal"  background-color="transparent">

                      <el-menu-item index="6" class="main-icon-homepage" >
                        <div @click="isHidden = true">
                          <SearchIconHome />
                        </div>
                      </el-menu-item>
                      <div v-if="isHidden" >
                        <div class="search-form-menu">
                          <div class="input-group group">
                            <div class="input-group-prepend" >
                              <button class="btn " @click="searchValue" ><img src="~assets/img/search_icon2.png" class="img-fluid w-25"></button>
                            </div>
                            <input type="text" class="form-control" id="search-value" name="search-value" v-model="search" aria-describedby="basic-addon1" >
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
                          <is-online v-if="isAuthenticated" ></is-online>
                          <is-offline v-else ></is-offline>
                          <ProfileIconHome slot="reference"/>
                        </el-popover>
                      </el-menu-item>



                      <el-menu-item index="9" class="main-icon-homepage">

                        <el-tooltip class="" effect="light" content="favorites" placement="top-start">
                          <nuxt-link to="/favorites" class="text-decoration-none">
                            <SavedIconHomeAdded v-if="typeof favorites_list !== 'undefined' && favorites_list.length > 0"/>
                            <SavedIconHome v-else/>
                          </nuxt-link>
                        </el-tooltip>
                      </el-menu-item>

                      <el-menu-item index="10" class="main-icon-homepage">

                        <el-tooltip class="" effect="light" content="bag" placement="top-start">

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
                </div>
              </div>
              <div class="col-12 d-block d-md-none"><hr style="border-color:#b6d3eb;" class="mt-0"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">

      <!--buttons start-->
      <el-row type="flex" class="row-bg desctop_version" justify="center" >
        <el-col :span="6" class="d-flex justify-content-end">
          <div class="group-messagenger ">
            <nuxt-link to="/appt">
              <div class="app" ><CaretGor class="mr-3"/> BOOK APPT.</div>
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="5" class="d-flex justify-content-center">
          <div class="group-messagenger">
            <nuxt-link to="/get_inspired">
              <div class="get">
                <CaretGor class="mr-3"/> GET INSPIRED</div>
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="6" class="d-flex justify-content-start">
          <div class="group-messagenger">
            <a href="#">
              <div class="say"><img src="~assets/img/say_hi.png"> Say Hi in Messenger</div>
            </a>
          </div>
        </el-col>
      </el-row>
      <!--buttons end-->

      <!--descktop start-->
      <div class="desctop_version">
        <div class="col-10 offset-md-1">
          <hr>
          <div class="row">

            <div class="col-4" v-for="item in menuDiamond" :key="item.id">
              <div class="list-title">{{item.title}}</div>
              <ul class="menu-list">
                <li v-for="content in item.content" v-bind:key="content.id" class="d-flex justify-content-right">

                  <nuxt-link :to="{name: 'diamonds', params: {  shape: [content.value ] } , query: {  shape: [content.value ] } }" class="item-list-menu">
                    <div class="diamond-img" v-if="content">
                      <img :src="baseUrl+content.image.main" class="img-icon-menu main img-fluid" >
                      <img :src="baseUrl+content.image.hover" class="img-icon-menu hover img-fluid" >
                    </div>
                    {{content.title}}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div class="col-4" v-for="item in menuBridal" :key="item.id">
                <div class="list-title">{{item.title}}</div>
                <div v-for="content in item.children" :key="content.id" class="mb-4">
                  <div class="list-title-categori">{{content.title}}</div>
                  <ul class="menu-list">

                    <li v-for="subcontent in content.children" v-bind:key="subcontent.id" class="d-flex justify-content-right">

                      <nuxt-link class="item-list-menu"
                        :to="{name: 'categories-category-id', params: filterQuery(content.alias, subcontent.content_item) } ">
                      <div class="diamond-img" v-if="subcontent.content">
                        <img :src="baseUrl+subcontent.content.image.main" class="img-icon-menu main img-fluid" >
                        <img :src="baseUrl+subcontent.content.image.hover" class="img-icon-menu hover img-fluid" >
                      </div>
                      {{subcontent.title}}

                      </nuxt-link>
                    </li>
                  </ul>
                </div>

            </div>

            <div class="col-4" v-for="item in menuJewel" :key="item.id">
              <div class="list-title">{{item.title}}</div>
              <ul class="menu-list">
                <li v-for="children in item.children" v-bind:key="children.id" class="d-flex justify-content-right">

                  <nuxt-link class="item-list-menu"
                    :to="{name: 'categories-category-id', params: {id: children.content.alias} } ">
                  <div class="diamond-img"  v-if="children.content">
                    <img :src="baseUrl+children.content.image.main" class="img-icon-menu main img-fluid" >
                    <img :src="baseUrl+children.content.image.hover" class="img-icon-menu hover img-fluid" >
                  </div>
                  {{children.title}}
                  </nuxt-link>
                </li>
              </ul>
              <div class="preview-img">
                <div class="preview-img-button">
                  <nuxt-link to="/categories/category/engagement_rings" class="link">CUSTOM MADE</nuxt-link>
                </div>
                <img src="~assets/img/test.png" class="img-fluid">
              </div>
            </div>
            <div class="col-4" v-if="!menuJewel">
              <div class="list-title">Fine Jewellery</div>
              <ul class="menu-list">
                <li v-for="item in fineJewel" v-bind:key="item.id" class="d-flex justify-content-right">

                  <nuxt-link class="item-list-menu"
                             :to="{name: 'jewellery', params: {scroll: item.scroll} } ">
                    <div class="diamond-img">
                      <img :src="baseUrl+item.main" class="img-icon-menu main img-fluid" >
                      <img :src="baseUrl+item.hover" class="img-icon-menu hover img-fluid" >
                    </div>
                    {{item.title}}
                  </nuxt-link>
                </li>
              </ul>
              <div class="preview-img">
                <div class="preview-img-button">
                  <nuxt-link to="/categories/category/engagement_rings" class="link">CUSTOM MADE</nuxt-link>
                </div>
                <img src="~assets/img/test.png" class="img-fluid">
              </div>
            </div>

          </div>
        </div>
        <div class="col-10 offset-md-1">
          <hr>
          <div class="row">

            <div class="col-4" v-for="item in menuFoot" :key="item.id" >

              <div class="sub-menu-title">{{item.title}}</div>
              <ul class="sub-menu-list">
                <li v-for="content in item.children" :key="content.id">

                  <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: content.content.alias } }">
                    {{content.title}}
                  </nuxt-link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--descktop end-->


      <!--mobile start-->
      <div class="menu-footer mobile_version" >
        <el-collapse accordion >
          <el-collapse-item :name="item.id" v-for="item in menuDiamond" :key="item.id">
            <template slot="title">
              {{item.title}}
            </template>
            <ul class="menu-list">
              <li  class="d-flex justify-content-right" v-show="menuDiamond">
                <nuxt-link :to="{name: 'diamonds', params: {  shape: [] } , query: {  shape: [] } }" class="item-list-menu">
                  <div class="diamond-img-diamonds-icon" >
                    <img :src="baseUrl+allShape.image.main" class="img-icon-menu main img-fluid" >
                    <img :src="baseUrl+allShape.image.hover" class="img-icon-menu hover img-fluid" >
                  </div>
                 {{allShape.title}}
                </nuxt-link>
              </li>
              <li  class="d-flex justify-content-right" v-for="content in item.content" v-bind:key="content.id">

                <nuxt-link :to="{name: 'diamonds', params: {  shape: [content.value ] } , query: {  shape: [content.value ] }}" class="item-list-menu">
                  <div class="diamond-img-diamonds-icon" v-if="content">

                    <img :src="baseUrl+content.image.main" class="img-icon-menu main img-fluid" >
                    <img :src="baseUrl+content.image.hover" class="img-icon-menu hover img-fluid" >
                  </div>
                  {{content.title}}
                </nuxt-link>
              </li>
            </ul>
          </el-collapse-item>

          <div  v-for="item in menuBridal" :key="item.id" >
            <el-collapse-item :name="content.id" v-for="content in item.children" :key="content.id">

                <template slot="title">
                  {{content.title}}
                </template>
                <ul class="menu-list">
                  <li  class="d-flex justify-content-right" v-show="menuBridal" v-if="content.alias !== 'wedding_bands'">

                    <nuxt-link :to="{name: 'categories-category-id', params: { id: content.alias}}" class="item-list-menu">
                      <div class="diamond-img" >

                      </div>
                      View All
                    </nuxt-link>
                  </li>
                  <li  class="d-flex justify-content-right" v-for="subcontent in content.children" v-bind:key="subcontent.id">

                  <nuxt-link class="item-list-menu" :to="{name: 'categories-category-id', params: filterQuery(content.alias, subcontent.content_item) } ">
                    <div class="diamond-img" v-if="subcontent.content">
                      <img :src="baseUrl+subcontent.content.image.main" class="img-icon-menu main img-fluid" >
                      <img :src="baseUrl+subcontent.content.image.hover" class="img-icon-menu hover img-fluid" >
                    </div>
                    {{subcontent.title}}
                  </nuxt-link>
                  </li>
                </ul>

            </el-collapse-item>
          </div>
          <el-collapse-item :name="item.id" v-for="item in menuJewel" :key="item.id">
            <template slot="title">
              {{item.title}}
            </template>
            <ul class="menu-list">
              <li  class="d-flex justify-content-right" v-show="menuJewel" >

                <nuxt-link :to="{name: 'jewellery' }" class="item-list-menu">
                  <div class="diamond-img" >

                  </div>
                  View All
                </nuxt-link>
              </li>
              <li  class="d-flex justify-content-right" v-for="content in item.children" v-bind:key="content.id">
                <nuxt-link class="item-list-menu" :to="{name: 'categories-category-id', params: {id: content.content.alias} } ">
                  <div class="diamond-img" v-if="content.content">
                    <img :src="baseUrl+content.content.image.main" class="img-icon-menu main img-fluid" >
                    <img :src="baseUrl+content.content.image.hover" class="img-icon-menu hover img-fluid" >
                  </div>
                  {{content.title}}
                </nuxt-link>
              </li>

            </ul>
          </el-collapse-item>
          <el-collapse-item v-if="!menuJewel">
            <template slot="title">
              Fine Jewellery
            </template>
            <ul class="menu-list">
              <li  class="d-flex justify-content-right"  v-for="item in fineJewel" :key="item.id">
                <nuxt-link class="item-list-menu" :to="{name: 'jewellery', params: {scroll: scroll} } ">
                  <div class="diamond-img">
                    <img :src="baseUrl+item.main" class="img-icon-menu main img-fluid" >
                    <img :src="baseUrl+item.hover" class="img-icon-menu hover img-fluid" >
                  </div>
                  {{item.title}}
                </nuxt-link>
              </li>

            </ul>
          </el-collapse-item>
          <el-collapse-item :name="item.id" v-for="item in menuFoot" :key="item.id">
            <template slot="title">
              {{item.title}}
            </template>
            <ul class="menu-list">
              <li  class="d-flex justify-content-right" v-for="content in item.children" :key="content.id">

                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: content.content.alias } }" class="item-list-menu">
                  {{content.title}}
                </nuxt-link>

              </li>
            </ul>
          </el-collapse-item>


        </el-collapse>

        <div class="item-auth" v-if="isAuthenticated">

          <div class="item-link">
            <nuxt-link to="/account/profile">ACCOUNT DETAILS
            </nuxt-link>
          </div>
          <div class="item-link" @click="logOut" >LOGOUT</div>
        </div>
        <div class="item-auth" v-else>

          <div class="item-link">
            <nuxt-link to="/auth/login">LOGIN
            </nuxt-link>
          </div>
          <div class="item-link" >
            <nuxt-link to="/auth/register">CREATE ACCOUNT</nuxt-link></div>
        </div>
        <div id="footer_menu" >
          <section id="first-path">
              <div class="row flex-column">
                <div class="col-12">
                    <div class="group-messagenger-menu">
                      <a href=""><div class="say"><img src="~assets/img/say_hi.png"> Say Hi</div></a>
                      <nuxt-link to="/dynamic-pages/contact_us"><div class="contact">contact us</div></nuxt-link>
                    </div>
                </div>
                <div class="col-12">
                  <div class="contact-info_mobile">
                    <div class="logo_icon">
                      <img src="~assets/img/Logo_foot.png">
                    </div>
                    <div class="content">
                      <div class="address-title">SYDNEY SHOWROOM</div>
                      <div class="address-text">
                        Level 2, Suite 201, 185 Elizabeth St,<br>
                        Sydney NSW 2000
                      </div>
                      <div class="address-numbers">
                        Open today  9am - 5:30pm<br>
                        1300 899 432   ~   +612 9261 2272<br>
                      </div>
                      <div class="address-email">
                        <a href="">info@diamondemporium.com.au</a>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="col-12 mb-4">
                  <div class="group-messagenger-menu">
                    <nuxt-link to="/appt"><div class="appt">book appt.</div></nuxt-link>
                    <nuxt-link to="/get_inspired"><div class="inspired">GET INSPIRED</div></nuxt-link>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </div>
      <!--mobile end-->

    </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import LogoHome from './Icons/Logo'
  import LogoTextHome from './Icons/LogoText'
  import SearchIconHome from './Icons/SearchIcon'
  import PhoneIconHome from './Icons/PhoneIcon'
  import ProfileIconHome from './Icons/ProfileIcon'
  import SavedIconHome from './Icons/SavedIcon'
  import BagIconHome from './Icons/BagIcon'
  import CaretGor from '~/components/Elements/Icons/CaretGor'
  import BagIconHomeAdded from './Icons/BagAddedIcon'
  import isOnline from './isOnline'
  import isOffline from './isOffline'

  export default {
    props: {
      extend_menu: Object,
      foot_menu: Object
    },
    components: {
      isOffline,
      isOnline,
      LogoHome,
      LogoTextHome,
      SearchIconHome,
      PhoneIconHome,
      ProfileIconHome,
      SavedIconHome,
      BagIconHome,
      CaretGor,
      BagIconHomeAdded
    },
    data() {
      return {
        isHidden: false,
        visible: false,
        visible_user: false,
        activeIndex: '1',
        toggle : false,
        search: '' ,

        fineJewel:[
          {
            id:1,
            title: 'Dress Rings',
            scroll: 'dress_rings',
            main: '/glide/Categories/dress_ring.png',
            hover: '/glide/Categories/dress_ring_hover.png'
          },
          {
            id:2,
            title: 'Earrings',
            scroll: 'earrings',
            main: '/glide/Categories/earring.png',
            hover: '/glide/Categories/earring_hover.png'
          },
          {
            id:3,
            title: 'Bracelets',
            scroll: 'bracelets',
            main: '/glide/Categories/bracelets.png',
            hover: '/glide/Categories/bracelets_hover.png'
          },
          {
            id:4,
            title: 'Pendant',
            scroll: 'pendant',
            main: '/glide/Categories/pendant.png',
            hover: '/glide/Categories/pendant_hover.png'
          }
        ],
        allShape: {
          index: 99,
          value: 'All',
          title: 'All',
          image: {
            main: "/glide/Diamonds/shape/All.png",
            hover: "/glide/Diamonds/shape/All_hover.png",
            filter: "/glide/Diamonds/shape/All_filter.png"
          }
        }
      }
    },
    methods:{
      async logOut(){
        await this.$auth.logout();
      },
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
      filterQuery(id, item){
       if(id === 'engagement_rings'){
         return {
           id: id,
           page: 1,
           styles : [item]
         }
       }
         return {
           id: id,
           page: 1,
           subcategories : [item]
         }
       }

    },
    computed:{
      ...mapGetters(['shopping_list','isAuthenticated','favorites_list']),
      itemDiamond () {
        return this.extend_menu.menu_items || []
      },
      rootDiamond () {
        return this.itemDiamond.filter((item) => {
          return item.content_type === 'filters'
        })
      },
      menuDiamond () {
        return (this.rootDiamond.length ) ? function menuBuilder (data) {

            return data.map((item) => {
              return {
                id: item.id,
                alias: item.alias,
                title: item.title,
                is_active: item.is_active,
                parent_id: item.parent_id,
                content_item: item.content_item,
                content_type: item.content_type,
                content: item.content.values
              }
            })
          }(this.rootDiamond)
          : null
      },

      allBridal () {
        return this.extend_menu.menu_items || []
      },
      rootBridal () {
        return this.allBridal.filter((item) => {
          return item.parent_id === null && item.content_type !== 'filters' && item.alias === 'bridal'
        })
      },
      menuBridal () {
        return (this.rootBridal.length ) ? function menuBuilder (data) {

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
          }(this.rootBridal)
          : null
      },
      allJewel () {
        return this.extend_menu.menu_items || []
      },
      rootJewel () {
        return this.allJewel.filter((item) => {
          return item.parent_id === null && item.content_type !== 'filters' && item.alias === 'jewellery'
        })
      },
      menuJewel () {
        return (this.rootJewel.length ) ? function menuBuilder (data) {

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
          }(this.rootJewel)
          : null
      },

      allFoot () {
        return this.foot_menu.menu_items || []
      },
      rootFoot () {
        return this.allFoot.filter((item) => {
          return item.parent_id === null && item.content_type !== 'filters'
        })
      },
      menuFoot () {
        return (this.rootFoot.length ) ? function menuBuilder (data) {

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
          }(this.rootFoot)
          : null
      },

    }
  }

</script>


<style lang="scss">
  .item-list-menu{
    .img-icon-menu{
      &.main{
        display: block;
      }
      &.hover{
        display: none;
      }
    }
    &:hover{
      color:#F0BDB8;
      .img-icon-menu{
        &.main{
          display: none;
        }
        &.hover{
          display: block;
        }
      }
    }
  }

</style>
