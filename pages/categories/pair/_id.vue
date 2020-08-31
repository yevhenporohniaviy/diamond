<template>
  <div>
    <div>
      <div class="container p-0">
        <el-row class="filters_category d-none d-md-block">
          <el-col class="d-flex">
            <component
              v-bind:is="`${allFiltersJewel.alias}Component`"
              :type_category="allFiltersJewel"
            ></component>

            <el-col
              class="filter_item"
              v-for="(filt, key, index) in allFiltersJewel.filters"
              :key="index"
            >
              <component
                v-bind:is="`${key}Component`"
                :widget="filt"
                :alias="allFiltersJewel.alias"
                @change="selectValue"
              ></component>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="d-block d-md-none more-filters-mobile">
        <div class="show-more" @click="toggle()">FILTERS</div>
      </div>
      <div class="d-block d-md-none" id="advance-fliters">
        <div v-show="isShowFilters">
          <div
            class="d-flex justify-content-end align-items-center p-3"
            @click="isShowFilters = false"
          >
            <div class="advance-fliters-close">x</div>
          </div>
          <el-col>
            <component
              v-bind:is="`${allFiltersJewel.alias}ComponentMb`"
              :type_category="allFiltersJewel"
            ></component>
            <el-col
              class="filter py-3"
              :class="'filter'+key"
              v-for="(filt, key, index) in allFiltersJewel.filters"
              :key="index"
              v-if="filt"
            >
              <component v-bind:is="`${key}ComponentMb`" :widget="filt" @change="selectValueApply"></component>
            </el-col>
          </el-col>
          <div class="apply-btn-mob" @click="apllyFilter()">apply</div>
        </div>
      </div>
    </div>

    <no-ssr>
      <div class="container position-relative" v-if="allCategory.data.length">
        <img src="~assets/img/oval-bg.png" class="position-absolute bg-oval" />
        <div class="col-md-12" id="info-list-diamond">
          <div class="row">
            <div class="col-12 mt-5">
              <div class="col-12 text-center">
                <div class="main-title-category">{{allFiltersJewel.title}} for HIM AND FOR HER</div>
                <div class="main-description-category">
                  As you make your declaration of love, select a timeless wedding
                  <br />ring design from our beautiful hand crafted collection.
                </div>
              </div>

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
                        @change="refreshSlot"
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
                    @change="refreshSlot"
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
                    v-if="allCategory.total"
                  >{{Number(allCategory.total).toLocaleString() | price}}</span>
                </div>
              </div>
            </div>
            <div class="col-12 mb-5">
              <hr class="mb-4 mt-3 d-none d-md-block" />
              <div class="row diamond-list" v-if="allCategory.data.length">
                <RingItem
                  v-for="(post) in allCategory.data"
                  :key="post._id"
                  :post="rebuildJewellery(post)"
                  :alias="allFiltersJewel.alias"
                  @clicked="onClickChild"
                  @show_modal="confirmModal"
                  :visible="sameSelect(rebuildJewellery(post))"
                />
              </div>
              <div class="row justify-content-center" v-else>
                <div
                  class="loading_search_result my-5 d-flex justify-content-center align-items-center"
                >not found</div>
              </div>
              <div class="container text-center">
                <div
                  class="load_more d-flex justify-content-center align-items-center"
                  v-if="allCategory.next_page_url"
                  @click="getList(++filters.page)"
                >
                  <p id="loadmore_buttom">Load More Rings</p>
                </div>
              </div>

              <el-dialog :visible.sync="showModal" center custom-class="modalDiamond">
                <Modal :data="element"></Modal>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
      <div class="row diamond-list" v-else>
        <div class="not-specify text-center">no specified rings</div>
      </div>
    </no-ssr>
    <CompareProduct
      id="compare_product"
      :alias="allFiltersJewel.alias"
      :show_modal="showModalConfirm"
    />

    <Choose />

    <PairBlock />
  </div>
</template>

<script>
import Choose from "~/components/Categories/choose-ring";

import CompareProduct from "~/components/CompareDiamonds/CompareProducts";

import CaretWhite from "~/components/Elements/Icons/Caret-white";
import engagement_ringsComponent from "~/components/Categories/Filters/engagement_ringsComponent";
import wedding_bandsComponent from "~/components/Categories/Filters/wedding_bandsComponent";
import metalsComponent from "~/components/Categories/Filters/metalsComponent";
import pricesComponent from "~/components/Categories/Filters/pricesComponent";
import stone_shapeComponent from "~/components/Categories/Filters/stone_shapeComponent";
import stylesComponent from "~/components/Categories/Filters/stylesComponent";
import subcategoriesComponent from "~/components/Categories/Filters/subcategoriesComponent";

import engagement_ringsComponentMb from "~/components/Categories/FiltersMobile/engagement_ringsComponentMb";
import wedding_bandsComponentMb from "~/components/Categories/FiltersMobile/wedding_bandsComponentMb";
import metalsComponentMb from "~/components/Categories/FiltersMobile/metalsComponentMb";
import pricesComponentMb from "~/components/Categories/FiltersMobile/pricesComponentMb";
import stone_shapeComponentMb from "~/components/Categories/FiltersMobile/stone_shapeComponentMb";
import stylesComponentMb from "~/components/Categories/FiltersMobile/stylesComponentMb";
import subcategoriesComponentMb from "~/components/Categories/FiltersMobile/subcategoriesComponentMb";

import PairBlock from "~/components/Pair/PairRings";
import Modal from "~/components/Categories/Pair/ModalLayout";
import RingItem from "~/components/Categories/Pair/RingItem";

import Caret from "~/components/Elements/Icons/Caret-black";

import "vue-slider-component/theme/antd.css";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategoriesPair",
  props: {
    type: Object
  },
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
      eventModal: false,
      scrollToTop: true,
      itemsPerRow: 6,
      checked360: false,
      checked100: false,
      loading: false,
      showModal: false,
      showModalSort: false,
      showModalConfirm: false,
      isShowFilters: false,
      filters: {
        id: this.$route.params.id,
        page: 1,
        sort: null
      },
      element: {},
      options: [
        {
          value: "asc",
          label: "Low to high"
        },
        {
          value: "desc",
          label: "High to low"
        }
      ]
    };
  },
  components: {
    CompareProduct,
    RingItem,
    Modal,
    Choose,
    Caret,
    CaretWhite,
    PairBlock,
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
    subcategoriesComponentMb
  },

  methods: {
    ...mapActions([
      "fetchCategory",
      "fetchFiltersJewel",
      "fetchCategoryParams"
    ]),
    rebuildJewellery(item) {
      let price = item.price;
      let jewellery = {
        item_id: item.item_number,
        count: 1,
        price: price,
        price_gst: price * this.gstCount,
        item_type: "j",
        item_details: item
      };
      return jewellery;
    },
    apllyFilter() {
      this.isShowFilters = false;

      this.$store.dispatch("fetchCategoryParams", this.filters);
    },
    getList(page) {
      this.filters.page = page || 1;

      this.$store.dispatch("fetchCategory", this.filters);
    },
    refreshSlot() {
      this.filters.page = 1;
      this.loading = true;

      this.$store.dispatch("fetchCategoryParams", this.filters).finally(() => {
        this.loading = false;
        this.showModalSort = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    },
    toggle: function() {
      this.isShowFilters = !this.isShowFilters;
    },
    selectValue(value) {
      this.filters[value.alias] = value.values;
      this.filters.page = 1;

      this.$router.push({ path: this.$route.path, query: this.filters });
      this.$store.dispatch("fetchCategoryParams", this.filters);
    },
    selectValueApply(value) {
      this.filters[value.alias] = value.values;

      this.filters.page = 1;

      this.$store.dispatch("fetchCategoryParams", this.filters);
    },
    onClickChild(post) {
      this.element = Object.assign({}, post);
      this.showModal = true;
    },
    confirmModal(event) {
      this.showModalConfirm = event;
    },
    sameSelect(obj) {
      return this.list_ring.item_id === obj.item_id;
    }
  },
  computed: {
    ...mapGetters([
      "allCategory",
      "allFiltersJewel",
      "list_ring",
      "gstCount",
      "itemMeta"
    ])
  },

  filters: {
    price: function(value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  async asyncData({ params, store }) {
    await store.dispatch("fetchFiltersJewel", params.id);
    await store.dispatch("fetchCategoryParams", params);
  },
  created() {
    this.$store.dispatch("fetchGst");
    this.$store.dispatch("fetchMeta", this.$route.params.id);
  }
};
</script>

