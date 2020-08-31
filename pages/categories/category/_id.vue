<template>
  <div>

      <div v-if="allFiltersJewel.filters !== 'Not specified'">
        <div class="container p-0">
          <el-row class="filters_category d-none d-md-block">
            <el-col class="d-flex" >
              <component v-bind:is="`${allFiltersJewel.alias}Component`" :type_category="allFiltersJewel"/>
              <el-col class="filter_item" v-for="(filt, key, index) in allFiltersJewel.filters" :key="index" >

                <component v-bind:is="`${key}Component`"
                           :widget="filt"
                            :alias="allFiltersJewel.alias"
                           @change="selectValue"
                />
              </el-col>
            </el-col>
          </el-row>
        </div>
        <div class="d-block d-md-none more-filters-mobile" >
          <div class="show-more" @click="toggle()"> FILTERS</div>
        </div>
        <div class="d-block d-md-none"
             id="advance-fliters">
          <div v-show="isShowFilters">
            <div class="d-flex justify-content-end align-items-center p-3" @click="isShowFilters = false">
              <div class="advance-fliters-close">x</div>
            </div>
            <el-col>
              <component v-bind:is="`${allFiltersJewel.alias}ComponentMb`" :type_category="allFiltersJewel"/>
              <el-col class="filter py-3"
                      :class="'filter'+key" v-for="(filt, key, index) in allFiltersJewel.filters"
                      :key="index"
                      v-if="filt">
                <component v-bind:is="`${key}ComponentMb`"
                           :widget="filt"
                           @change="selectValueApply"
                ></component>
              </el-col>
            </el-col>
            <div class="apply-btn-mob" @click="apllyFilter()">apply</div>

          </div>
        </div>
      </div>
    <div v-else>
     <div class="d-flex justify-content-center align-items-center main-title-category">
       {{allFiltersJewel.filters}} filters
     </div>
    </div>

    <no-ssr>
      <div class="container position-relative">
        <img src="~assets/img/oval-bg.png"
             class="position-absolute bg-oval">
        <div class="col-md-12 "
             id="info-list-diamond">
          <div class="row">
            <div class="col-12 mt-5">
              <div class="col-12 text-center">
                <div class="main-title-category">{{allFiltersJewel.title}} for HIM AND FOR HER </div>
                <div class="main-description-category">As you make your declaration of love, select a timeless wedding<br>
                  ring design from our beautiful hand crafted collection.</div>
              </div>

              <div class="d-flex justify-content-between align-items-center ">
                <div class="sort">
                  <span @click="showModalSort = !showModalSort">sort by</span>
                  <el-dialog v-if="$device.isMobile"
                             :visible.sync="showModalSort"
                             width="100%"
                             center>
                    <div class="d-flex flex-column sort-radio-mobile justify-content-center align-items-center">
                      <div class="sort-radio-mobile-title">sort by</div>
                      <el-radio v-model="filters.sort" v-for="(item, index) in options" @change="refreshSlot"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        <strong>Price</strong> - {{item.label}}</el-radio>

                    </div>
                  </el-dialog>
                  <el-select v-model="filters.sort" placeholder="Select" default-first-option v-if="$device.isDesktop" size="mini"
                             @change="refreshSlot">
                    <el-option class="text-center"
                               v-for="(item, index) in options"
                               :key="index"
                               :label="item.label"
                               :value="item.value" ><strong>Price</strong> - {{item.label}}
                    </el-option>
                  </el-select>
                </div>
                <div class="count" >
                  Results: <span v-if="allCategory.total" >{{Number(allCategory.total).toLocaleString() | price}} </span>
                </div>
              </div>
            </div>
            <div class="col-12 mb-5">
              <hr class="mb-4 mt-3 d-none d-md-block">


                <div class="row diamond-list" v-if="allCategory.data.length">
                  <RingItem v-for="(post) in allCategory.data"
                            :key="post._id"
                            :post="rebuildJewellery(post)"
                            :alias="allFiltersJewel.alias"
                            @clicked="onClickChild"
                            @show_modal="confirmModal"
                            @click-pair="redirectPair"
                            />
                </div>
                <div class="row justify-content-center" v-else >
                  <div class="loading_search_result my-5 d-flex justify-content-center align-items-center">not found</div>
                </div>

              <div class="container text-center">
                <div class="load_more d-flex justify-content-center align-items-center" v-if="allCategory.next_page_url" @click="getList(++filters.page)">
                  <p id="loadmore_buttom">Load More Rings </p>
                </div>
              </div>

              <el-dialog
                :visible.sync="showModal"
                center
                custom-class="modalDiamond">
                <Modal :show-modal="showModal"  :data="element" @click_shop="onAddToBag"/>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>
    <div id="start-compare"></div>
     <CompareProduct
       id="compare_product"
       :alias="allFiltersJewel.alias"
       :show_modal="showModalConfirm"
       @click_shop="onAddToBag" />

    <Choose/>


    <el-dialog
      :visible.sync="showModalBag"
      center
      :show-close="false"
      custom-class="modalShoppingBag">
      <ModalBag @cont_shop="continueShopping"/>
    </el-dialog>
    <el-dialog
      :visible.sync="redirectPairModal"
      center
      :show-close="false"
      custom-class="redirectPairModal">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <div class="welcome_pair mb-4">
              WELCOME TO PAIRING
            </div>
          </div>
          <div class="col-12 d-flex justify-content-center align-items-center p-0">
            <img src="~assets/img/default/redirect_to_diamond.png" class="img-fluid w-100">
          </div>

          <div class="col-md-8 col-12 d-flex justify-content-center align-items-center my-4">
            <nuxt-link  class="redirect_link_pair" :to="{name: redirect.name, params: {  shape: [ ...redirect.shape ] } } " >
              START PAIRING
            </nuxt-link>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- Share Modal -->

  </div>
</template>


<script>


  import RingItem from '~/components/Categories/RingItem'
  import Modal from '~/components/Categories/ModalLayout'
  import Choose from '~/components/Categories/choose-ring'
  import ModalBag from '~/components/Shopping/ModalBag'

  import CompareProduct from '~/components/CompareDiamonds/CompareProducts'

  import CaretWhite from '~/components/Elements/Icons/Caret-white'
  import engagement_ringsComponent from '~/components/Categories/Filters/engagement_ringsComponent'
  import wedding_bandsComponent from '~/components/Categories/Filters/wedding_bandsComponent'
  import metalsComponent from '~/components/Categories/Filters/metalsComponent'
  import pricesComponent from '~/components/Categories/Filters/pricesComponent'
  import stone_shapeComponent from '~/components/Categories/Filters/stone_shapeComponent'
  import stylesComponent from '~/components/Categories/Filters/stylesComponent'
  import subcategoriesComponent from '~/components/Categories/Filters/subcategoriesComponent'

  import engagement_ringsComponentMb from '~/components/Categories/FiltersMobile/engagement_ringsComponentMb'
  import wedding_bandsComponentMb from '~/components/Categories/FiltersMobile/wedding_bandsComponentMb'
  import metalsComponentMb from '~/components/Categories/FiltersMobile/metalsComponentMb'
  import pricesComponentMb from '~/components/Categories/FiltersMobile/pricesComponentMb'
  import stone_shapeComponentMb from '~/components/Categories/FiltersMobile/stone_shapeComponentMb'
  import stylesComponentMb from '~/components/Categories/FiltersMobile/stylesComponentMb'
  import subcategoriesComponentMb from '~/components/Categories/FiltersMobile/subcategoriesComponentMb'



  import Caret from '~/components/Elements/Icons/Caret-black'

  import 'vue-slider-component/theme/antd.css'
  import {mapGetters} from 'vuex'

  // Share Modal Component

  export default {
    name: 'Categories',


    props: {
      type: Object
    },
    head() {
      return {
        title: this.itemMeta.meta_title ? this.itemMeta.meta_title : '',
        meta: [
          {hid: 'og:title', property: 'og:title', content:  this.itemMeta.meta_title ? this.itemMeta.meta_title : '' },
          {hid: 'og:description', property: 'og:description', content:  this.itemMeta.meta_description ? this.itemMeta.meta_description : ''},
          {hid: 'og:image', property: 'og:image', content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:url ', property: 'og:image:url', content:  this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:image:width', property: 'og:image:width', content: '200'},
        ]
      }
    },
    data() {
      return {

        redirectPairModal:false,
        eventModal: false,
        scrollToTop: true,
        itemsPerRow: 6,

        checked360: false,
        checked100: false,
        loading: false,
        showModal: false,
        showModalBag: false,
        showModalSort: false,
        showModalConfirm: false,
        isShowFilters: false,
        redirect:{},
        filters: {
          id: this.$route.params.id,
          page: 1,
          sort: null
        },
        element: {},
        options: [{
          value: 'asc',
          label: 'Low to high'
        }, {
          value: 'desc',
          label: 'High to low'
        }],
        showShareModal: false
      }
    },
    components: {
      ModalBag,
      CompareProduct,
      RingItem,
      Modal,
      Choose,
      Caret,
      CaretWhite,

      engagement_ringsComponent,
      wedding_bandsComponent,
      metalsComponent,
      pricesComponent,
      stone_shapeComponent,
      stylesComponent,
      subcategoriesComponent,
      engagement_ringsComponentMb,
      wedding_bandsComponentMb,
      metalsComponentMb,
      pricesComponentMb,
      stone_shapeComponentMb,
      stylesComponentMb,
      subcategoriesComponentMb,


    },

    methods: {

      continueShopping(value){

        this.showModalBag = value
      },
      onAddToBag(value){
        this.showModalBag = value
      },
      apllyFilter(){
        this.isShowFilters = false

        this.$store.dispatch('fetchCategoryParams', this.filters)
      },
      getList(page) {

        this.filters.page = page || 1
        this.$store.dispatch('fetchCategory', this.filters)
      },
      refreshSlot() {
        this.filters.page =  1
        this.$store.dispatch('fetchCategoryParams', this.filters)
          .finally(() => {
            this.showModalSort = false;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          })
      },
      toggle: function(){
        this.isShowFilters = !this.isShowFilters;
      },
      selectValue(value) {

        this.filters[value.alias] = value.values
        this.filters.page =  1

        this.$router.push({path: this.$route.path, query: this.filters})

        this.$store.dispatch('fetchCategoryParams', this.filters)
      },
      selectValueApply(value) {

        this.filters[value.alias] = value.values

        this.filters.page =  1


        this.$store.dispatch('fetchCategoryParams', this.filters)
      },

      rebuildJewellery(item){
        let price = item.price;

        let jewellery  = {
          item_id: item.item_number,
          count: 1,
          price: price,
          price_gst: price*this.gstCount,
          item_type: 'j',
          item_details: item
        }
        return jewellery
      },
      redirectPair(post){
        this.redirect = Object.assign({}, post)
        this.redirectPairModal = true
      },
      onClickChild(post) {

        this.element = Object.assign({}, post)
        this.showModal = true
      },
      confirmModal(event) {
       this.showModalConfirm = event
      },

    },
    computed: {
      ...mapGetters(['allCategory', 'allFiltersJewel','gstCount','itemMeta']),

    },

    filters: {
      price: function (value) {
        return value.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      }
    },
    watch: {
      $route(to) {
        this.$store.dispatch('saveQueryJewellery', this.filters)
      },
    },
    created(){
      this.$store.dispatch('fetchGst');
      this.$store.dispatch('fetchMeta', this.$route.params.id );
    },
    async asyncData({params, store }) {

      await store.dispatch('fetchFiltersJewel', params.id);
      await store.dispatch('fetchCategoryParams', params);

    },

    beforeRouteEnter (to, from, next) {

      next(vm => {
        vm.filters.id = to.params.id

        if(typeof sessionStorage.getItem('filters_jew') !== 'string'){

          let params_query = to.query || {};
          if(Object.entries(params_query).length === 0){
            vm.$store.dispatch('fetchCategory');
          }else {

            vm.filters = params_query
            vm.filters.id = to.params.id
            vm.$store.dispatch('saveQuery', vm.filters)
            vm.$store.dispatch('fetchCategoryParams', params_query );
          }
        }else{
          if(to.params.id === 'wedding_bands'){

            let params_redirect_wed_ = to.params

            vm.filters = params_redirect_wed_
            vm.filters.id = to.params.id

            vm.$router.replace({path: vm.$route.path, query: params_redirect_wed_})
            vm.$store.dispatch('fetchCategoryParams', params_redirect_wed_);
          }
          else{

            let params_redirect_eng =  to.params
            vm.filters = params_redirect_eng
            vm.filters.id = to.params.id

            vm.$router.replace({path: vm.$route.path, query: params_redirect_eng})
            vm.$store.dispatch('fetchCategoryParams', params_redirect_eng);
          }

        }

        vm.$store.dispatch('setCompareListJewellery', to);
      })
    }

  }
</script>


