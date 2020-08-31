<template>

  <div>

    <div class="container group-filters">
      <div class="row">
        <div class="col-12 d-none d-md-block" >
          <div class="row filter_list" :class="{ activeshow: isShowFilters }">
            <div class="col-md-2 filter_item" v-for="(filt, index) in filts" :key="index">
              <component v-bind:is="`${filt.alias}Component`"
                         :filter_item="filt"
                         :newIndex='newRangeIndex[filt.alias]'
                         @change="selectValue"
                         @change-number="selectNumber">
              </component>
            </div>
          </div>
          <div class="row more-filters" >
            <div class="col-md-3 col-12 ">
              <div class="show-more" @click="resetFilters"> RESET FILTERS</div>
            </div>
            <div class="col-md-3 col-12 ">
              <div class="row justify-content-center">
                <el-checkbox class="checked" :true-label=1 :false-label=0 v-model="filters.video360" @change="checked360">DIAMONDS WITH 360˚</el-checkbox>
              </div>
            </div>
            <div class="col-md-3 col-12 ">
              <div class="row justify-content-center">
                <el-checkbox class="checked" v-model="filters.checked100" @change="eyeclean100">100% EYECLEAN DIAMONDS</el-checkbox>
              </div>
            </div>

            <div class="col-md-3 col-12 ">
              <div class="show-more" @click="toggle()">SHOW ADVANCED FILTERS
                <CaretWhite :class="{ activerevers: isShowFilters }"/>
              </div>
            </div>
          </div>
        </div>
        <div class="d-block d-md-none more-filters-mobile" >
          <div class="show-more" @click="toggle()"> FILTERS</div>
        </div>
        <div class="container d-block d-md-none"  id="advance-fliters">

          <div class="row" v-show="isShowFilters">
            <b-card no-body>
              <div class="d-flex  justify-content-between align-items-center p-3" @click="isShowFilters = false">
                <div class="reset-filters " @click="resetFilters()"> RESET FILTERS  </div>
                <div class="advance-fliters-close"><Close/></div>
              </div>
              <b-tabs card>
                <div class="diamonds-view pt-4 mx-3">
                  <div class="col-7">
                    <div class="row">
                      <el-checkbox class="checked" :true-label=1 :false-label=0 v-model="filters.video360">DIAMONDS WITH 360˚</el-checkbox>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="row">
                      <el-checkbox class="checked" v-model="filters.checked100" @change="eyeclean100">100% EYECLEAN DIAMONDS</el-checkbox>
                    </div>
                  </div>
                </div>
                <b-tab :title=" i === 0 ? 'FILTERS' : 'ADVANCED FILTERS'" v-for="(i, index) in articleGroups" :key="index">

                  <div class="advanced-filter-item" v-for="(filt, index) in filts.slice(i * itemsPerRow, (i + 1 ) * itemsPerRow)" :key="index">
                    <component v-bind:is="`${filt.alias}ComponentMb`"
                               :filter_item="filt"
                               :newIndex='newRangeIndex[filt.alias]'
                               @change="selectValueMobile"
                               @change-number="selectNumberMobile"
                    >
                    </component>
                  </div>
                </b-tab>

              </b-tabs>
            </b-card>

            <div class="apply-btn-mob" @click="apllyFilter()">apply</div>
          </div>
        </div>
      </div>
    </div>

    <no-ssr>
      <div class="container position-relative" v-if="allDiamonds.data.length">
        <img src="~assets/img/oval-bg.png" class="position-absolute bg-oval">
        <div class="col-md-12 " id="info-list-diamond">
          <div class="row">
            <div class="col-12 mt-5 mb-xs-4">


              <div class="d-flex justify-content-between align-items-center">
                <div class="sort">
                  <span @click="showModalSort = !showModalSort">sort by</span>
                  <el-dialog v-if="$device.isMobile"
                             :visible.sync="showModalSort"
                             width="100%"
                             center>
                    <div class="d-flex flex-column sort-radio-mobile justify-content-center align-items-center">
                      <div class="sort-radio-mobile-title">sort by</div>
                      <el-radio v-model="filters.sort" v-for="(item, index) in options"  @change="sortFilter"
                                :key="index"
                                :label="item.label"
                                :value="item.value"><strong>Price</strong> - {{item.label}}</el-radio>

                    </div>
                  </el-dialog>
                  <el-select v-model="filters.sort" placeholder="Select" default-first-option v-if="$device.isDesktop" size="mini"
                             @change="sortFilter">
                    <el-option class="text-center"
                               v-for="(item, index) in options"
                               :key="index"
                               :label="item.label"
                               :value="item.value" ><strong>Price</strong> - {{item.label}}
                    </el-option>
                  </el-select>
                </div>
                <div class="count" >
                  Results: <span v-if="allDiamonds.total" >{{Number(allDiamonds.total).toLocaleString() | price}} </span>
                </div>
              </div>
            </div>

            <div class="col-12 mb-5">
              <hr class="mb-4 mt-3 d-none d-md-block">
              <div class="row justify-content-center" v-if="loading_data">
                <div
                  class="loading_search_result my-5 d-flex justify-content-center align-items-center"
                >
                  <img src="~assets/img/4V0b.gif" class="img-fluid" />
                </div>
              </div>
              <div v-else>
                <div class="row diamond-list" v-if="allDiamonds.data.length" >
                  <DiamondItem v-for="post in allDiamonds.data"
                               :key="post._id"
                               :post="rebuildDiamond(post)"
                               @clicked="onClickChild"
                               @clicked-video="onClickVideo"
                               :visible_center="sameSelectCenter(rebuildDiamond(post))"
                               :visible_side_first="sameSelectSideFirst(rebuildDiamond(post))"
                               :visible_side_second="sameSelectSideSecond(rebuildDiamond(post))"
                  />
                </div>
                <div class="row justify-content-center" v-else >
                  <div class="loading_search_result my-5 d-flex justify-content-center align-items-center">not found</div>
                </div>
              </div>
              <div class="container text-center">
                <div class="load_more d-flex justify-content-center align-items-center" v-if="allDiamonds.next_page_url" @click="getList(++filters.page)">
                  <p id="loadmore_buttom">Load More Diamonds </p>
                </div>
              </div>


              <el-dialog
                :visible.sync="showModal"
                center
                custom-class="modalDiamond">
                <Modal :data="element"></Modal>
              </el-dialog>
              <el-dialog
                :visible.sync="showModalVideo"
                center
                custom-class="modalVideo">
                <ModalVideo :data="video"/>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
      <div class="row diamond-list " v-else>
        <div class="not-specify text-center">no specified diamonds</div>
      </div>
    </no-ssr>
    <Compare id="compare_diamonds" />


      <Choose/>



    <div class="container my-5">
      <div class="row">
        <div class="banner position-relative">
          <img class="img-fluid img-bg" src="~assets/img/HERO_darkblue.png">
          <div class="description position-absolute">
            <div class="tag mb-5" data-aos="fade-up">#DIAMONDEMPORIUM</div>
            <div class="title my-5" data-aos="fade-up">Be inspired.</div>
            <div class="sub-title mt-5" data-aos="fade-up">
              Check our latest pictures and our instagram account to<br>
              find inspiration.
            </div>
            <div class="d-flex justify-content-center inspired">
              <a href="#" class=" text-center " data-aos="fade-up">
                GET INSPIRED
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PairBlock @firstSideFilter="getFilterSideStone"/>
    <el-dialog
      :visible.sync="errorPair"
      center
      :show-close="false"
      custom-class="errorPair">
      <div class="container">
        <div class="col-12 col-md-12">
          <div class="title mt-3 col-12 col-md-8 offset-md-2">
            Sorry
          </div>
          <div class="description text-center mb-4">
            The first diamond you selected does not have a matching pair,<br>
            please choose another diamond
          </div>
          <div class="d-flex justify-content-center">
            <el-button @click="errorPair = false" class="close-btn">Cancel</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="errorPairEmpty"
      center
      :show-close="false"
      custom-class="errorPair">
      <div class="container">
        <div class="col-12 col-md-12">
          <div class="title mt-3 col-12 col-md-8 offset-md-2">
            Sorry
          </div>
          <div class="description text-center mb-4">
            The first diamond you selected does not have a matching pair,<br>
            please choose another diamond
          </div>
          <div class="d-flex justify-content-center">
            <el-button @click="errorPairEmpty = false" class="close-btn">Cancel</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>


<script>

  import FiltersComponents from '~/components/FiltersComponents'
  import PairBlock from '~/components/Pair/PairDiamonds'
  import ModalVideo from '~/components/DiamondLIstDefault/ModalVideo'

  import DiamondItem from '~/components/DiamondLIstDefault/Pair/DiamondItem'
  import Modal from '~/components/DiamondLIstDefault/Pair/ModalLayout'
  import Compare from '~/components/CompareDiamonds/Compare'
  import Caret from '~/components/Elements/Icons/Caret-black'
  import CaretWhite from '~/components/Elements/Icons/Caret-white'
  import Close from '~/components/Elements/Icons/CloseIcon'
  import Choose from '~/components/DiamondLIstDefault/choose-ring'

  import 'vue-slider-component/theme/antd.css'
  import {mapGetters} from 'vuex'

  export default {
    name: 'DiamondListPair',

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

        itemsPerRow: 6,
        loading_data: false,
        errorPairEmpty: false,
        errorPair: false,
        showModal: false,
        showModalVideo:false,
        showModalSort: false,
        isShowFilters: false,
        filters_side_first: {
          page: 1,
        },
        filters_side_second: {
          page: 1,
        },
        filters: {
          checked100: false,
          video360: 0,
          page: 1,
          sort: null,
          clarity:[]
        },
        options: [{
          value: 'asc',
          label: 'Low to high'
        }, {
          value: 'desc',
          label: 'High to low'
        }],
        element: {},
        video: {},
      }
    },
    components: {
      DiamondItem,
      Modal,
      Caret,
      CaretWhite,
      Compare,
      Close,
      Choose,
      PairBlock,
      ModalVideo,
      ...FiltersComponents
    },

    methods: {
      getFilterSideStone(values){
        if(this.status_pair_block === 'side_first'){

          this.filters_side_first = Object.assign(this.filters_side_first, values)
          this.loading_data = true;
          this.$store.dispatch('fetchDiamondsParams', this.filters_side_first).then(() => {
            this.loading_data = false;
          });
        }else if(this.status_pair_block === 'side_second'){
          this.filters_side_second = Object.assign(this.filters_side_second, values)
          this.loading_data = true;
          this.$store.dispatch('fetchDiamondsParams', this.filters_side_second).then((resp) => {
            if(resp.total === 1 ){
              this.errorPair = true;
              this.loading_data = false;
            }
            if(resp.total === 0){
              this.errorPairEmpty = true;
              this.loading_data = false;
            }
          })

        }else{
          this.loading_data = true;
          this.$store.dispatch('fetchDiamondsParams', this.filters).then(() => {
            this.loading_data = false;
          });
        }
      },
      checked360(){
        this.loading_data = true;
        this.$store.dispatch('fetchDiamondsParams', this.filters).then(() => {
          this.loading_data = false;
        });
      },
      eyeclean100(){

        if(this.filters.checked100){
          this.filters['clarity'] = [
            "VS2",
            "VS1",
            "VVS2",
            "VVS1",
            "IF",
            "FL"]
          this.$bus.$emit('setYeyClear');
        }else{
          this.filters['clarity'] = []
          this.$bus.$emit('removeYeyClear');
        }
        this.loading_data = true;
        this.$store.dispatch('fetchDiamondsParams', this.filters).then(() => {
          this.loading_data = false;
        });
      },
      rebuildDiamond(item){

        let price = item.price;
        let custom_price = item.custom_price || 0;
        let aud_price = item.price_aud || 0;
        let markUp = this.currentMarkup(price, custom_price, aud_price);
        let diamond  = {
          item_id: item.referenceNum,
          count: 1,
          price: markUp,
          price_gst: markUp*this.gstCount,
          item_type: 'd',
          item_details: item
        }
        return diamond
      },
      currentMarkup(price, custom, aud){

        let value = custom || aud;
        if (custom !== null) {

          //Convert custom price from aud into usd to get right margin and shipping price
          price = custom * (price / aud)
        }
        let current_price = custom || aud;
        this.markupValue.find(item => {
          if(item.from_price <= price && item.to_price >= price){

            value = (current_price /((100 - item.percent.max)/100)) + item.shipping_price || 0
          }
        })
        return Math.round(value)

      },


      toggle(){
        this.isShowFilters = !this.isShowFilters;
      },
      resetFilters(){

        let reset = this.filters = {
          page: 1,
          sort: null,
          shape: []
        }
        this.$bus.$emit('messageSent');
        this.$store.dispatch('fetchDiamondsParams', reset)
      },
      selectNumber(value) {

        this.filters[value.alias] = [...value.value];
        this.filters.page = 1
        this.loading_data = true;
        this.$store.dispatch('fetchDiamondsParams', this.filters).then(() => {
          this.loading_data = false;
        });
      },
      selectValue(value) {

        let element = this.filts
          .find((item) => item.alias === value.alias);
        let result = element.values
          .filter((val) => val.index >= value.value[0] && val.index <= value.value[1])
          .map((val) => val.value);
        this.filters[value.alias] = [...result];
        this.filters.page = 1
        this.loading_data = true;
        this.$store.dispatch('fetchDiamondsParams', this.filters).then(() => {
          this.loading_data = false;
        });

      },

      selectNumberMobile(value) {

        this.filters[value.alias] = [...value.value];
        this.filters.page = 1

      },
      selectValueMobile(value) {
        let element = this.filts
          .find((item) => item.alias === value.alias);
        let result = element.values
          .filter((val) => val.index >= value.value[0] && val.index <= value.value[1])
          .map((val) => val.value);
        this.filters[value.alias] = [...result];
        this.filters.page = 1


      },
      apllyFilter(){
        this.isShowFilters = false
        this.$store.dispatch('fetchDiamondsParams', this.filters)
      },

      onClickVideo(post){
        this.video = Object.assign({}, post)
        this.showModalVideo = true
      },
      getList(page) {
        if(this.status_pair_block === 'side_first'){
          this.filters_side_first.page = page || 1
          this.loading_data = true;
          this.$store.dispatch('fetchDiamonds', this.filters_side_first).then(() => {
            this.loading_data = false;
            let options = {
              easing: 'ease',
              offset: -900
            }
            setTimeout(() => {
              this.$scrollTo('#loadmore_buttom', options)
            },1000);
          });
        }else if(this.status_pair_block === 'side_second'){
          this.filters_side_second.page = page || 1
          this.loading_data = true;
          this.$store.dispatch('fetchDiamonds', this.filters_side_second).then(() => {
            this.loading_data = false;
            let options = {
              easing: 'ease',
              offset: -900
            }
            setTimeout(() => {
              this.$scrollTo('#loadmore_buttom', options)
            },1000);
          });
        }else{
          this.filters.page = page || 1
          this.loading_data = true;
          this.$store.dispatch('fetchDiamonds', this.filters).then(() => {
            this.loading_data = false;
            let options = {
              easing: 'ease',
              offset: -900
            }
            setTimeout(() => {
              this.$scrollTo('#loadmore_buttom', options)
            },1000);
          });
        }

      },
      onClickChild(post) {
        this.element = Object.assign({}, post)
        this.showModal = true
      },
      sortFilter() {
        this.filters.page = 1
        this.$store.dispatch('fetchDiamondsParams', this.filters)
          .finally(() => {

            this.showModalSort = false;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          })
      },
      sameSelectSideFirst(obj){
        if(this.side_first_diamond){
          return this.side_first_diamond.item_id === obj.item_id
        }
      },
      sameSelectSideSecond(obj){
        if(this.side_second_diamond){
          return this.side_second_diamond.item_id === obj.item_id
        }
      },
      sameSelectCenter(obj){
        if(this.center_diamond){
          return this.center_diamond.item_id === obj.item_id
        }

      }
    },
    computed: {
      ...mapGetters(['allDiamonds',
        'allFilters',
        'diamonds_pair',
        'status_pair_block',
        'center_diamond',
        'side_first_diamond',
        'side_second_diamond',
        'gstCount',
        'markupValue',
        'itemMeta']),
      articleGroups () {
        return Array.from(Array(Math.ceil(this.filts.length / this.itemsPerRow)).keys())
      },

      newRangeIndex() {
        let result = {};
        this.filts
          .filter((element) => Array.isArray(element.values) && element.values.length)
          .forEach((value) => {
            result[value.alias] = [0,value.values.length-1 + 0.5];
          })
        return result;
      },

    },
    filters: {
      price: function (value) {
        return value.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      }
    },

    async asyncData({params, store}) {
      await store.dispatch('fetchDiamondsParams' , params);
      const filtsDiamond = await store.dispatch('fetchFilters');
      return { filts: filtsDiamond};

    },
    created() {
      this.$store.dispatch('fetchMarkup');
      this.$store.dispatch('fetchGst');
      this.$store.dispatch('fetchMeta', 'diamonds_list_pair' );

    },


  }
</script>

