<template>
  <div>
    <div class="container group-filters">
      <div class="row">
        <div class="col-12 d-none d-md-block">
          <div class="row filter_list" :class="{ activeshow: isShowFilters }">
            <div class="col-md-2 filter_item" v-for="(filt, index) in filts" :key="index">
              <component
                v-bind:is="`${filt.alias}Component`"
                :filter_item="filt"
                :newIndex="newRangeIndex[filt.alias]"
                @change="selectValue"
                @change-number="selectNumber"
              ></component>
            </div>
          </div>
          <div class="row more-filters">
            <div class="col-md-3 col-12">
              <div class="show-more" @click="resetFilters">RESET FILTERS</div>
            </div>
            <div class="col-md-3 col-12">
              <div class="row justify-content-center">
                <el-checkbox
                  class="checked"
                  :true-label="1"
                  :false-label="0"
                  v-model="filters.video360"
                  @change="checked360"
                >DIAMONDS WITH 360˚</el-checkbox>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="row justify-content-center">
                <el-checkbox
                  class="checked"
                  v-model="filters.checked100"
                  @change="checked100"
                >100% EYECLEAN DIAMONDS</el-checkbox>
              </div>
            </div>

            <div class="col-md-3 col-12">
              <div class="show-more" @click="toggle()">
                SHOW ADVANCED FILTERS
                <CaretWhite :class="{ activerevers: isShowFilters }" />
              </div>
            </div>
          </div>
        </div>
        <div class="d-block d-md-none more-filters-mobile">
          <div class="show-more" @click="toggle()">FILTERS</div>
        </div>
        <div class="container d-block d-md-none" id="advance-fliters">
          <div class="row" v-show="isShowFilters">
            <b-card no-body>
              <div
                class="d-flex justify-content-between align-items-center p-3"
                @click="isShowFilters = false"
              >
                <div class="reset-filters" @click="resetFilters()">RESET FILTERS</div>
                <div class="advance-fliters-close">
                  <Close />
                </div>
              </div>
              <b-tabs card>
                <div class="diamonds-view pt-4 mx-3">
                  <div class="col-7">
                    <div class="row">
                      <el-checkbox
                        class="checked"
                        :true-label="1"
                        :false-label="0"
                        v-model="filters.video360"
                        @change="checked360"
                      >DIAMONDS WITH 360˚</el-checkbox>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="row">
                      <el-checkbox
                        class="checked"
                        v-model="filters.checked100"
                      >100% EYECLEAN DIAMONDS</el-checkbox>
                    </div>
                  </div>
                </div>
                <b-tab
                  :title=" i === 0 ? 'FILTERS' : 'ADVANCED FILTERS'"
                  v-for="(i, index) in articleGroups"
                  :key="index"
                >
                  <div
                    class="advanced-filter-item"
                    v-for="(filt, index) in filts.slice(i * itemsPerRow, (i + 1 ) * itemsPerRow)"
                    :key="index"
                  >
                    <component
                      v-bind:is="`${filt.alias}ComponentMb`"
                      :filter_item="filt"
                      :newIndex="newRangeIndex[filt.alias]"
                      @change="selectValueMobile"
                      @change-number="selectNumberMobile"
                    ></component>
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
      <div class="container position-relative">
        <img src="~assets/img/oval-bg.png" class="position-absolute bg-oval" />
        <div class="col-md-12" id="info-list-diamond">
          <div class="row">
            <div class="col-12 mt-5 mb-xs-4">
              <div class="d-flex justify-content-between align-items-center">
                <div class="sort">
                  <span @click="showModalSort = !showModalSort">sort by</span>
                  <el-dialog
                    v-if="$device.isMobile"
                    :visible.sync="showModalSort"
                    width="100%"
                    center
                  >
                    <div
                      class="d-flex flex-column sort-radio-mobile justify-content-center align-items-center"
                    >
                      <div class="sort-radio-mobile-title">sort by</div>
                      <el-radio
                        v-model="filters.sort"
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                        <strong>Price</strong>
                        - {{item.label}}
                      </el-radio>
                    </div>
                  </el-dialog>
                  <el-select
                    v-model="filters.sort"
                    placeholder="Select"
                    default-first-option
                    v-if="$device.isDesktop"
                    size="mini"
                  >
                    <el-option
                      class="text-center"
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    >
                      <strong>Price</strong>
                      - {{item.label}}
                    </el-option>
                  </el-select>
                </div>
                <div class="count">
                  Results:
                  <span
                    v-if="allDiamonds.total"
                  >{{Number(allDiamonds.total).toLocaleString() | price}}</span>
                </div>
              </div>
            </div>

            <div class="col-12 mb-5">
              <hr class="mb-4 mt-3 d-none d-md-block" />


                <div class="row diamond-list" v-if="allDiamonds.data.length">
                  <DiamondItem
                    v-for="post in allDiamonds.data"
                    :key="post._id"
                    :post="rebuildDiamond(post)"
                    @clicked="onClickChild"
                    @clicked-video="onClickVideo"
                    @select-compare="onClickCompare"
                    @click-pair="redirectPair"
                  />
                </div>
                <div class="row justify-content-center" v-else>
                  <div
                    class="loading_search_result my-5 d-flex justify-content-center align-items-center"
                  >Not found</div>
                </div>

              <div class="container text-center">
                <div
                  class="load_more d-flex justify-content-center align-items-center"
                  v-if="allDiamonds.next_page_url"
                  @click="getList(++filters.page)"
                >
                  <p id="loadmore_buttom">Load More Diamonds</p>
                </div>
              </div>

              <el-dialog :visible.sync="showModal" center custom-class="modalDiamond">
                <Modal
                :data="element"
                @click_shop="onAddToBag">
                </Modal>
              </el-dialog>
              <el-dialog :visible.sync="showModalVideo" center custom-class="modalVideo">
                <ModalVideo :data="video" />
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>
    <div id="start-compare"></div>
    <Compare id="compare_diamonds" @click_shop="onAddToBag" />

    <Choose />

    <div class="container my-5">
      <div class="row">
        <div class="banner position-relative">
          <img class="img-fluid img-bg" src="~assets/img/HERO_darkblue.png" />
          <div class="description position-absolute">
            <div class="tag mb-5" data-aos="fade-up">#DIAMONDEMPORIUM</div>
            <div class="title my-5" data-aos="fade-up">Be inspired.</div>
            <div class="sub-title mt-5" data-aos="fade-up">
              Check our latest pictures and our instagram account to
              <br />find inspiration.
            </div>
            <div class="d-flex justify-content-center inspired">
              <nuxt-link to="/get_inspired" class="text-center" data-aos="fade-up">GET INSPIRED</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Modal Bag-->
    <el-dialog
      :visible.sync="showModalBag"
      center
      :show-close="false"
      custom-class="modalShoppingBag"
    >
      <ModalBag @cont_shop="continueShopping" />
    </el-dialog>

    <el-dialog
      :visible.sync="redirectPairModal"
      center
      :show-close="false"
      custom-class="redirectPairModal"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <div class="welcome_pair mb-4">WELCOME TO PAIRING</div>
          </div>
          <div class="col-12 d-flex justify-content-center align-items-center p-0">
            <img src="~assets/img/default/redirect_to_ring.png" class="img-fluid w-100" />
          </div>

          <div class="col-md-8 col-12 d-flex justify-content-center align-items-center my-4">
            <nuxt-link
              class="redirect_link_pair"
              :to="{name: redirect.name, params:  { id: redirect.id, stone_shape: [ ...redirect.stone_shape ] , carats: redirect.carats }  } "
            >START PAIRING</nuxt-link>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Share Modal -->
  </div>
</template>


<script>
import FiltersComponents from "~/components/FiltersComponents";

import DiamondItem from "~/components/DiamondLIstDefault/DiamondItem";
import Modal from "~/components/DiamondLIstDefault/ModalLayout";
import Compare from "~/components/CompareDiamonds/Compare";

import ModalBag from "~/components/Shopping/ModalBag";
import ModalVideo from "~/components/DiamondLIstDefault/ModalVideo";

import Caret from "~/components/Elements/Icons/Caret-black";
import CaretWhite from "~/components/Elements/Icons/Caret-white";
import Close from "~/components/Elements/Icons/CloseIcon";
import Choose from "~/components/DiamondLIstDefault/choose-ring";

import "vue-slider-component/theme/antd.css";
import { mapGetters } from "vuex";

// Share Modal Component

export default {
  name: "DiamondList",

  head() {
    return {
      title: this.itemMeta.meta_title ? this.itemMeta.meta_title : "",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.itemMeta.meta_title ? this.itemMeta.meta_title : ""
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.itemMeta.meta_description
            ? this.itemMeta.meta_description
            : ""
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ""
        },
        {
          hid: "og:image:url ",
          property: "og:image:url",
          content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ""
        },
        { hid: "og:image:height", property: "og:image:height", content: "200" },
        { hid: "og:image:width", property: "og:image:width", content: "200" }
      ]
    };
  },
  data() {
    return {
      meta_title: "Diamond list",
      itemsPerRow: 6,
      redirectPairModal: false,

      showModal: false,
      showModalBag: false,
      showModalVideo: false,
      showModalSort: false,
      isShowFilters: false,
      filters: {
        checked100: false,
        video360: 0,
        page: 1,
        sort: null
      },
      options: [
        {
          value: "asc",
          label: "Low to high"
        },
        {
          value: "desc",
          label: "High to low"
        }
      ],
      redirect: {},
      element: {},
      video: {},
    };
  },
  components: {
    DiamondItem,
    Modal,
    Caret,
    CaretWhite,
    Compare,
    Close,
    Choose,
    ModalBag,
    ModalVideo,
    ...FiltersComponents,
  },
  filters: {
    price: function(value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {

    rebuildDiamond(item) {
      let price = item.price;
      let custom_price = item.custom_price || 0;
      let aud_price = item.price_aud || 0;
      let markUp = this.currentMarkup(price, custom_price, aud_price);
      let diamond = {
        item_id: item.referenceNum,
        count: 1,
        price: markUp,
        price_gst: markUp * this.gstCount,
        item_type: "d",
        item_details: item
      };
      return diamond;
    },
    currentMarkup(price, custom, aud) {
      let value = custom || aud;
      if (custom !== null && custom > 0) {
        //Convert custom price from aud into usd to get right margin and shipping price
        price = custom * (price / aud);
      }
      let current_price = custom || aud;
      this.markupValue.find(item => {
        if (item.from_price <= price && item.to_price >= price) {
          value =
            current_price / ((100 - item.percent.max) / 100) +
              item.shipping_price || 0;
        }
      });
      return Math.round(value);
    },
    continueShopping(value) {
      this.showModalBag = value;
    },
    onAddToBag(value) {
      this.showModalBag = value;
    },
    toggle() {
      this.isShowFilters = !this.isShowFilters;
    },

    redirectPair(post) {
      this.redirect = Object.assign({}, post);
      this.redirectPairModal = true;
    },
    onClickVideo(post) {
      this.video = Object.assign({}, post);
      this.showModalVideo = true;
    },
    onClickChild(post) {
      this.element = Object.assign({}, post);
      this.showModal = true;
    },
    onClickCompare(post){
      let arr = post;
      this.filters.compare = [arr]
      this.$router.replace({ path: this.$route.path, query: this.filters });
    },
    checked360() {
      this.$router.replace({ path: this.$route.path, query: this.filters });
      this.$store.dispatch("saveQuery", this.filters);
      this.$store.dispatch("fetchDiamondsParams", this.filters)
    },
    checked100() {
      if (this.filters.checked100) {
        this.filters.clarity = ["VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
        this.$bus.$emit("setYeyClear");
      } else {
        this.filters.clarity = [];
        this.$bus.$emit("removeYeyClear");
      }
      this.$router.replace({ path: this.$route.path, query: this.filters });

      this.$store.dispatch("saveQuery", this.filters);
      this.$store.dispatch("fetchDiamondsParams", this.filters)
    },
    resetFilters() {
      this.filters = {
        page: 1,
        sort: null,
        video360: 0,
        shape: [],
        checked100: false
      };
      this.$bus.$emit("messageSent");
      this.$router.replace({ path: this.$route.path, query: this.filters });

      this.$store.dispatch("saveQuery", this.filters);
      this.$store.dispatch("fetchDiamondsParams", this.filters)
    },
    selectNumber(value) {
      this.filters[value.alias] = [...value.value];
      this.filters.page = 1;
      this.$router.replace({ path: this.$route.path, query: this.filters });

      this.$store.dispatch("saveQuery", this.filters);
      this.$store.dispatch("fetchDiamondsParams", this.filters)
    },
    selectValue(value) {
      if (value.alias === "clarity") {
        if (value.value[0] >= 0 && value.value[0] < 1.5) {
          this.filters.checked100 = false;
        } else {
          this.filters.checked100 = true;
        }
      }
      let element = this.filts.find(item => item.alias === value.alias);
      let result = element.values
        .filter(
          val => val.index >= value.value[0] && val.index <= value.value[1]
        )
        .map(val => val.value);

      this.filters[value.alias] = [...result];
      this.filters.page = 1;
      this.$router.replace({ path: this.$route.path, query: this.filters });

      this.$store.dispatch("saveQuery", this.filters);
      this.$store.dispatch("fetchDiamondsParams", this.filters)
    },
    getList(page) {
      this.filters.page = page || 1;

      this.$store.dispatch("fetchDiamonds", this.filters)
    },
    selectNumberMobile(value) {
      this.filters[value.alias] = [...value.value];
      this.filters.page = 1;
      this.$router.replace({ path: this.$route.path, query: this.filters });

    },
    selectValueMobile(value) {
      let element = this.filts.find(item => item.alias === value.alias);
      let result = element.values
        .filter(
          val => val.index >= value.value[0] && val.index <= value.value[1]
        )
        .map(val => val.value);
      this.filters[value.alias] = [...result];
      this.filters.page = 1;
      this.$router.replace({ path: this.$route.path, query: this.filters });
    },
    apllyFilter() {
      this.isShowFilters = false;

      this.$store.dispatch("saveQuery", this.filters);
      this.$store.dispatch("fetchDiamondsParams", this.filters)
    }
  },

  computed: {
    ...mapGetters([
      "allDiamonds",
      "allFilters",
      "gstCount",
      "markupValue",
      "itemMeta"
    ]),

    articleGroups() {
      return Array.from(
        Array(Math.ceil(this.filts.length / this.itemsPerRow)).keys()
      );
    },
    newRangeIndex() {
      let result = {};
      this.filts
        .filter(
          element => Array.isArray(element.values) && element.values.length
        )
        .forEach(value => {
          result[value.alias] = [0, value.values.length - 1 + 0.5];
        });
      return result;
    }
  },

  async asyncData({ store }) {
    const filtsDiamond = await store.dispatch("fetchFilters");
    return { filts: filtsDiamond };
  },
  created() {
    this.$store.dispatch("fetchMarkup");
    this.$store.dispatch("fetchGst");
    this.$store.dispatch("fetchMeta", "diamonds_list");
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {

      if (
        Object.entries(to.query).length === 0 &&
        to.query.constructor === Object
      ) {
        if (typeof sessionStorage.getItem("filters") !== "string") {
          let redirect_query = {
            page: 1
          };
          vm.filters = redirect_query;
          vm.$router.push({ path: vm.$route.path, query: redirect_query })

          vm.$store.dispatch("saveQuery", redirect_query);
          vm.$store.dispatch("fetchDiamondsParams", redirect_query)
        } else {
          const obj_store = JSON.parse(sessionStorage.getItem("filters"))
            .diamonds.diamonds_query;

          if (Object.entries(obj_store).length === 0 && obj_store.constructor === Object)
          {
            let redirect_query = {
              page: 1
            };
            vm.filters = redirect_query;
            vm.$router.push({ path: vm.$route.path, query: redirect_query });

            vm.$store.dispatch("saveQuery", redirect_query);
            vm.$store.dispatch("fetchDiamondsParams", redirect_query)
          } else {
            let redirect_query = JSON.parse(sessionStorage.getItem("filters")).diamonds.diamonds_query;
            vm.filters = redirect_query;
            vm.$router.push({ path: vm.$route.path, query: redirect_query });

            vm.$store.dispatch("saveQuery", redirect_query);
            vm.$store.dispatch("fetchDiamondsParams", redirect_query)
          }
        }
      } else {


        let redirect_query = to.query;
        vm.filters = redirect_query;

        vm.$store.dispatch("saveQuery", redirect_query);
        vm.$store.dispatch("fetchDiamondsParams", redirect_query)
      }
    });
  }
};
</script>

<style>
#advance-fliters .card .card-header ul .nav-item .nav-link {
  outline: none;
}
#advance-fliters .card .card-header ul .nav-item .nav-link.active {
  outline: none;
}
</style>

