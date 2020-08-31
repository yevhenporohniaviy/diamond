<template>
  <div class="category-detail">
    <div class="modal-lay" id="category-detail-body">
      <div class="col-12">
        <div class="row">
          <div class="col-6 d-xl-block d-none">
            <div class>
              <b-tabs align="center" end class="images-category-content">

                <b-tab title="ring view" active>

                  <div class="row">
                    <div class="col-12 pr-0">

                      <div class="main-image" v-if="  data.item_details.images">

                        <img
                          v-if="activeImage !== null && activeImage !== undefined"
                          :src=" activeImage"
                          class="img-fluid"
                          :class="marginImage ? 'margin-image': ''"
                        />
                        <img
                          v-else
                          :src="baseUrl + data.item_details.images.main.image"
                          class="img-fluid"
                          :class="data.item_details.images.main.margin ? 'margin-image':'' "
                        />
                        <div
                          class="icon-logo"
                          v-if=" activeImage !== null && activeImage !== undefined"
                          :class="marginImage ? '': 'logo-margin'"
                        >
                          <img src="~assets/img/Logo_foot.png" />
                        </div>
                        <div
                          class="icon-logo"
                          v-else
                          :class="data.item_details.images.main.margin ? '':'logo-margin' "
                        >
                          <img src="~assets/img/Logo_foot.png" />
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <carousel
                        navigation-next-label
                        navigation-prev-label
                        :loop="true"
                        :perPage="3"
                        :scrollPerPage="true"
                        :navigationEnabled="true"
                        :paginationEnabled="false"
                        v-if="data.item_details.images"
                      >
                        <slide
                          v-for="(item,key) in data.item_details.images"
                          :key="key"
                          v-if="key !=='others' || item.other"
                        >
                          <div class="support-images">
                            <img
                              :src="baseUrl+item.image"
                              class="img-fluid"
                              @click="onChangeMain(item)"
                            />
                          </div>
                        </slide>
                        <slide
                          v-for="(item, index) in data.item_details.images.others"
                          :key="index"
                          v-if="data.item_details.images"
                        >
                          <div class="support-images">
                            <img
                              :src="baseUrl+item.image"
                              class="img-fluid"
                              @click="onChangeMain(item)"
                            />
                          </div>
                        </slide>
                      </carousel>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="on hand view" v-if="data.item_details.images">
                  <div class="category-hand" v-if="data.item_details.images.on_hand">
                    <div class="category-hand-image">
                      <img :src="baseUrl+valueHand" class="img-fluid image-hand" v-if="valueHand" />
                      <img
                        :src="baseUrl+data.item_details.images.on_hand[0]"
                        class="img-fluid image-hand"
                        v-else
                      />
                    </div>
                    <div class="category-hand-image-slider">
                      <vue-slider
                        v-model="valueHand"
                        :tooltip="'none'"
                        :data="data.item_details.images.on_hand"
                      ></vue-slider>
                      <div class="category-hand-image-slider-title">
                        <div>Lighter</div>
                        <div>Darker</div>
                      </div>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
          <div class="col-6 d-xl-block d-none">
            <div class>
              <div class="category-info">
                <div class="card-description">
                  <div class="title">{{data.item_details.title}}</div>
                </div>
                <div class="ref-number">
                  <div class>
                    Reference no.
                    <span>{{data.item_details.item_number}}</span>
                  </div>
                </div>
                <b-tabs class="mt-3 tabs-category-detail-info" align="center">
                  <b-tab title="OVERVIEW" active>
                    <div class="description-category mb-4 mt-4">{{data.item_details.description}}</div>

                    <div class="col-12">
                      <div class="row" v-if="variantsSort">
                        <div v-for="(option, key) in variantsSort" :key="key" class="m-1">
                          <div :class="key+'options'" v-if="key !== 'ring_size'">
                            <div class="title">{{variantsReplace(key)}}</div>
                            <el-select
                              v-model="variants[key]"
                              popper-class="select-metal"
                              size="mini"
                              @change="activeSelect(option)"
                            >
                              <el-option
                                class="text-center"
                                v-for="(item, index) in option"
                                :label="`${item.value.prefix ? item.value.prefix  : ''} ${item.value.title}`"
                                :key="index"
                                :value="JSON.stringify(item)"
                              >{{`${item.value.prefix ? item.value.prefix : ''} ${item.value.title}`}}</el-option>
                            </el-select>
                          </div>
                          <div :class="key+'options'" v-else>
                            <div class="title">{{variantsReplace(key)}}</div>
                            <div
                              class="field-size"
                              v-if="variants.ring_size"
                              @click="setRingValue(option)"
                            >
                              <div class="text">{{getTitleSize(variants.ring_size)}}</div>
                              <div class="icon">
                                <img src="~assets/img/size-ring-select.png" class="img-fluid" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div hidden>{{setProps}}</div>

                    <div class="pair text-center">
                      <div class="pair text-center">
                        <div v-if="data.item_details.have_center_stone">
                          <button
                            class="pair-button"
                            slot="reference"
                            @click="addToPairDiamond(data, variants)"
                          >
                            <div>
                              <div class="title-btn">
                                <span class="add">
                                  <AddDiamond />
                                </span>
                                select A DIAMOND
                                <span
                                  class="caret-pair"
                                >
                                  <Caret />
                                </span>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div v-else>
                          <button class="pair-button disabled" slot="reference">
                            <nuxt-link to="#">
                              <div class="title-btn">
                                <span class="add">
                                  <AddDiamond />
                                </span>
                                select A DIAMOND
                                <span
                                  class="caret-pair"
                                >
                                  <Caret />
                                </span>
                              </div>
                            </nuxt-link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="DETAILS">
                    <div class="group-desc">
                      <div class="item-information">
                        <div class="title">METAL</div>
                        <div
                          class="text"
                          v-if="data.item_details.metal"
                        >{{data.item_details.metal.prefix ? data.item_details.metal.prefix : ' '}}{{data.item_details.metal.title ? data.item_details.metal.title : ' '}}</div>
                        <div class="text" v-else>-</div>
                      </div>
                      <div class="item-information">
                        <div class="title">PRONG METAL</div>

                        <div
                          class="text"
                          v-if="data.item_details.metal"
                        >{{data.item_details.metal.prefix ? data.item_details.metal.prefix : ' '}}{{data.item_details.metal.title ? data.item_details.metal.title : ' '}}</div>
                        <div class="text" v-else>-</div>
                      </div>
                      <div class="item-information" v-if="data.item_details.width">
                        <div class="title">WIDTH</div>
                        <div
                          class="text"
                        >{{data.item_details.width.min}} - {{data.item_details.width.max}}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">DIAMOND OPTIONS</div>
                        <div class="text text-right">
                          <span
                            v-for="(item, key) in data.item_details.stone_shape"
                            :key="key"
                          >{{item}}</span>
                        </div>
                      </div>
                      <div class="item-information">
                        <div class="title">CARAT RANGE</div>
                        <div
                          class="text"
                          v-if="data.item_details.carat_stone_from === 0 && data.item_details.carat_stone_to === 0"
                        >-</div>
                        <div
                          class="text"
                          v-else
                        >{{valueFloat(data.item_details.carat_stone_from)}} - {{valueFloat(data.item_details.carat_stone_to)}}</div>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
                <div class="group-desc">
                  <div class="item-information-price mt-5">
                    <div class="title-popup">
                      <el-popover
                        placement="top"
                        width="310"
                        popper-class="inform-popover"
                        trigger="hover"
                      >
                        <div>
                          <div class="title">Starting price does not include diamond</div>
                          <div class="content">
                            Price is for the ring setting only.
                            Pairing a diamond with this setting will change the price.
                          </div>
                        </div>
                        <div slot="reference">
                          <Tooltip />
                        </div>
                      </el-popover>
                      <span class="ml-2">
                        Setting only
                        <br />Price starting from
                      </span>
                    </div>

                    <div class="d-flex flex-column align-items-end">
                      <div class="text-price">
                        AUD ${{formatPrice(totalPrice) }}
                        <span>ex. GST</span>
                      </div>
                      <div class="text-price-second">
                        AUD ${{ formatPrice(totalPrice * this.gstCount) }}
                        <span>inc. GST</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="remark mt-3">
                  <div class="text">
                    Book an appointment with one of our consultants to
                    <br />help you choose a diamond best suited to your budget.
                  </div>
                </div>
                <div class="btn-group">
                  <div class="w-100">
                    <div class="enqu" @click="sendEnquiry(data)">ENQUIRy</div>
                  </div>
                  <div class="w-100">
                    <div class="add" @click="addToBag(data, variants)">ADD TO BAG</div>
                  </div>
                </div>
                <div class="group-sharing">
                  <div class="like" @click="addToFavorites(data)" v-if="isAuthenticated">
                    <img src="~assets/img/like.png" /> save
                  </div>
                  <nuxt-link class="like" to="/favorites/auth/login" v-else>
                    <img src="~assets/img/like.png" class="img-fluid" /> save
                  </nuxt-link>

                  <div class="block-line"></div>
                  <div class="share d-flex" @click="openSharing">
                    <img src="~assets/img/share.png" class="img-fluid" />

                      <div>
                        Share
                      </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-block d-xl-none" id="category-detail-body-mobile">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="detail-body-mobile d-flex justify-content-center flex-column">
              <div class="card-description">
                <div class="title">{{data.item_details.title}}</div>
                <div class="ref-number">
                  <div class>
                    Reference no.
                    <span>{{data.item_details.item_number}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 p-0">
            <div class="slider-detail-images" v-if="data.item_details.images">
              <div class="emblema-de">
                <DetailLogoEmblem />
              </div>

              <slick id="carouselJewel" ref="slick" :options="slickOptionsMobile">
                <div class=" slide">
                  <img class="img-fluid w-100" style="outline:none;"   :src="activeImage ? activeImage : baseUrl+data.item_details.images.main.image">
                </div>
                <div class=" slide" >
                  <img class="img-fluid w-100" style="outline:none;" :src="baseUrl+data.item_details.images.side.image">
                </div>
                <div class=" slide" v-for="(item,index) in data.item_details.images.others"
                     :key="index">
                  <img class="img-fluid w-100" style="outline:none;"  :src="baseUrl+item.image" >
                </div>
              </slick>
            </div>
          </div>
          <div class="col-12 p-0">
            <div class="detail-body-mobile d-flex justify-content-center flex-column">
              <div class="description-category mb-4">{{data.item_details.description}}</div>
              <div class="d-flex justify-content-between" v-if="variantsSort">
                <!--<div v-for="(option, key, index) in variantsSort" :key="index">-->
                <!--<div :class="key+'options'" v-if="option">-->
                <!--<div class="title">{{variantsReplace(key)}}</div>-->
                <!--<el-select v-model="variants[key]"-->
                <!--:placeholder="variants[key] ? variants[key].title : 'Select'"-->
                <!--@change="onChange(variants[key])"-->
                <!--popper-class="select-metal" size="mini">-->
                <!--<el-option class="text-center "-->
                <!--v-for="(item,index) in option"-->
                <!--:key="index"-->
                <!--:value="{title: `${item.pivot.value.prefix ? item.pivot.value.prefix  : ''} ${item.pivot.value.title}`, image: item.pivot.image, price: item.pivot.price}">-->
                <!--{{`${item.pivot.value.prefix ? item.pivot.value.prefix  : ''} ${item.pivot.value.title}`}}-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</div>-->
                <!--</div>-->
              </div>
              <div class="group-desc">
                <div class="item-information-price mt-3">
                  <div class="title-popup">
                    <el-popover
                      placement="top"
                      width="310"
                      popper-class="inform-popover"
                      trigger="click"
                    >
                      <div>
                        <div class="title">Starting price does not include diamond</div>
                        <div class="content">
                          Price is for the ring setting only.
                          Pairing a diamond with this setting will change the price.
                        </div>
                      </div>
                      <div slot="reference">
                        <Tooltip />
                      </div>
                    </el-popover>
                    <span class="ml-2">
                      Setting only
                      <br />Price starting from
                    </span>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <div class="text-price">
                      AUD ${{formatPrice(totalPrice) }}
                      <span>ex. GST</span>
                    </div>
                    <div class="text-price-second">
                      AUD ${{ formatPrice(totalPrice * this.gstCount) }}
                      <span>inc. GST</span>
                    </div>
                  </div>
                </div>
                <div class="item-information">
                  <div class="title">METAL</div>
                  <div
                    class="text"
                    v-if="data.item_details.metal"
                  >{{data.item_details.metal.prefix ? data.item_details.metal.prefix : ' '}}{{data.item_details.metal.title ? data.item_details.metal.title : ' '}}</div>
                  <div class="text" v-else>-</div>
                </div>
                <div class="item-information">
                  <div class="title">PRONG METAL</div>
                  <div
                    class="text"
                    v-if="data.item_details.metal"
                  >{{data.item_details.metal.prefix ? data.item_details.metal.prefix : ' '}}{{data.item_details.metal.title ? data.item_details.metal.title : ' '}}</div>
                  <div class="text" v-else>-</div>
                </div>
                <div class="item-information" v-if="data.item_details.width">
                  <div class="title">WIDTH</div>
                  <div
                    class="text"
                    v-if="data.item_details.width.min === 0 && data.item_details.width.max === 0"
                  >-</div>
                  <div
                    class="text"
                    v-else
                  >{{data.item_details.width.min}} - {{data.item_details.width.max}}</div>
                </div>
                <div class="item-information">
                  <div class="title">DIAMOND OPTIONS</div>
                  <div class="text text-right">
                    <span v-for="(item, key) in data.item_details.stone_shape" :key="key">{{item}}</span>
                  </div>
                </div>
                <div class="item-information">
                  <div class="title">CARAT RANGE</div>
                  <div
                    class="text"
                    v-if="data.item_details.carat_stone_from === 0 && data.item_details.carat_stone_to === 0"
                  >-</div>
                  <div
                    class="text"
                    v-else
                  >{{valueFloat(data.item_details.carat_stone_from)}} - {{valueFloat(data.item_details.carat_stone_to)}}</div>
                </div>
              </div>

              <div class="remark mt-3">
                <img src="~assets/img/Fill_1.png" />
                <div class="text">Free secure priority worldwide shipping</div>
              </div>
              <div class="btn-group">
                <div class="w-100">
                  <div class="enqu" @click="sendEnquiry(data)">ENQUIRy</div>
                </div>
                <div class="w-100">
                  <div class="add" @click="addToBag(data, variants)">ADD TO BAG</div>
                </div>
              </div>
              <div class="group-sharing">
                <div class="like" @click="addToFavorites(data)" v-if="isAuthenticated">
                  <img src="~assets/img/like.png" /> save
                </div>
                <nuxt-link class="like" to="/favorites/auth/login" v-else>
                  <img src="~assets/img/like.png" class="img-fluid" /> save
                </nuxt-link>
                <div class="block-line"></div>
                <div class="share d-flex" @click="openSharing">
                  <img src="~assets/img/share.png" class="img-fluid" />
                    <div>
                      Share
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="ringSizeDialog" custom-class="ringSizeModal">
      <div class="container mb-4">
        <div class="col-12">
          <div class="title-modal text-center mb-5">select your RING size</div>
        </div>
        <div class="row">
          <div
            class="col-1 box p-0 d-flex justify-content-center align-items-center"
            v-for="item in variant_size"
            :key="item.id"
          >
            <el-radio
              class="item"
              v-model="variants[item.alias]"
              :value="JSON.stringify(item)"
              :label="JSON.stringify(item)"
              @change="activeSelect(variant_size)"
            >{{`${item.value.prefix ? item.value.prefix : ''} ${item.value.title}`}}</el-radio>
          </div>
          <div class="col-1 box p-0 d-flex justify-content-center align-items-center">
            <el-radio
              class="item item-unsure"
              v-model="variants['ring_size']"
              :value="JSON.stringify(unsure)"
              :label="JSON.stringify(unsure)"
              @change="activeSelect(variant_size)"
            >unsure</el-radio>
          </div>

        </div>
      </div>
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
            <img src="~assets/img/default/redirect_to_diamond.png" class="img-fluid w-100" />
          </div>

          <div class="col-md-8 col-12 d-flex justify-content-center align-items-center my-4">


            <nuxt-link
              class="redirect_link_pair"
              :to="{name: 'diamonds-pair', params: {  shape: [ ...capitalizeFirst ] } } "
            >START PAIRING</nuxt-link>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showSharing"
               center
               :show-close="false"
               custom-class="modalSharing"
    >
      <ModalSharing :data="data.item_details.id" :type="data.item_type" @close-sharing="closeSharing"/>
    </el-dialog>
  </div>
</template>
<script>
import Tooltip from "~/components/Elements/Icons/Tooltip";
import AddDiamond from "~/components/Elements/Icons/AddPairDiamond";
import Caret from "~/components/Elements/Icons/Caret-black";
import DetailLogoEmblem from "~/components/Elements/Icons/DetailLogoEmblem";
import ModalSharing from '~/components/ModalSharing';

import { mapActions, mapGetters } from "vuex";

export default {
  name: "LayoutsModal",

  props: ["data", "showModal"],
  data() {
    return {
      unsure: {
        alias: "ring_size",
        id: 99,
        image: null,
        index: 100,
        price: 0,
        value: {
          index: 100,
          title: "unsure",
          value: "unsure",
        }
      },
      showSharing:false,
      activeImage: null,
      marginImage: "",
      valueHand: "",
      totalPrice: "",
      back_link: "",
      ringSizeDialog: false,
      variants: {},
      variant_size: {},
      slickOptionsMobile: {
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: 0,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      },
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow:
          "<button type='button' class='slick-prev pull-left'></button>",
        nextArrow:
          "<button type='button' class='slick-next pull-right'></button>"
      },

      redirectPairModal: false,

    };
  },
  components: {
    Tooltip,
    AddDiamond,
    Caret,
    DetailLogoEmblem,
    ModalSharing
  },
  filters: {
    price: function(value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    ...mapGetters(["gstCount", "isAuthenticated"]),
    capitalizeFirst() {
      return this.data.item_details.stone_shape.map(day => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase())
    },
    variantsSort() {
      let group = {};
      this.data.item_details.variants.forEach((elem, index) => {
        if (!group[elem.alias]) group[elem.alias] = [];
        group[elem.alias].push({
          id: elem.pivot.id,
          alias: elem.alias || "",
          image: elem.pivot.image || "",
          index: index || "",
          price: elem.pivot.price || "",
          value: elem.pivot.value || []
        });
      });

      return group;
    },
    setProps() {
      return this.setPropsMethod(this.variantsSort);
    }
  },
  methods: {
    ...mapActions(["addToPairDiamond"]),
    openSharing(){
      this.showSharing = true
    },
    closeSharing(){
      this.showSharing = false
    },

    addToFavorites(item) {
      let value = {
        item_details: item.item_details,
        item_id: item.item_id,
        item_type: item.item_type
      };

      this.$store.dispatch("addToFavorites", value)
        .then((resp) => {
          this.$notify({
            title: 'Success',
            message: 'This item has been added to favorites ',
            type: 'success'
          });
        })
        .catch(error => {
          this.$notify({
            title: 'Attention',
            message: 'This item has been already saved',
            type: 'warning'
          });
        });
    },
    valueFloat(value) {
      if (value) {
        let result = value;
        if (!Number.isInteger(result)) {
          Number.parseFloat(result);
        }
        return result.toFixed(2);
      }
    },
    setRingValue(value) {
      this.variant_size = Object.assign({}, value);
      this.ringSizeDialog = true;
      this.$forceUpdate();
    },
    getTitleSize(value) {
      let title = JSON.parse(value);
      return title.value.title;
    },
    setPropsMethod(elem) {
      let objKey = Object.keys(elem).map(key => {
        this.variants[key] = JSON.stringify(elem[key][0]);
      });
      this.$forceUpdate();
      return objKey;
    },

    setTotalPrice() {
      let list_values = Object.values(this.variants);
      let price = 0;
      list_values.forEach(elem => {
        price += JSON.parse(elem).price;
      });
      this.totalPrice = price;
    },
    activeSelect(e) {

      if (e[0].alias !== "ring_size") {
        let img = JSON.parse(this.variants.metals);
        this.activeImage = this.baseUrl + img.image;
        this.marginImage = true;
      }
      this.$forceUpdate();
    },
    sendEnquiry(enqueryNumber) {
      this.$store.dispatch("cleareEnquiry");
      this.$store.dispatch("sendEnquiry", enqueryNumber);
      this.$nuxt.$router.push({ path: "/dynamic-pages/contact_us" });
    },
    addToBag(item, values) {
      item.item_details.selected_variants = [];
      if (values.metals) {
        let value = JSON.parse(values.metals);
        item.item_details.metals_select = value;
        item.item_details.selected_variants.push(value.id);
      }
      if (values.ring_size) {
        let value = JSON.parse(values.ring_size);
        item.item_details.stone_shape_select = value;
        item.item_details.selected_variants.push(value.id);
      }
      item.price = this.totalPrice || item.price;
      item.price_gst = this.totalPrice * this.gstCount;
      this.$store.dispatch("addToBag", item);
      this.$emit("click_shop", true);
    },
    addToPairDiamond(item, values) {
      item.item_details.selected_variants = [];
      if (values.metals) {
        let value = JSON.parse(values.metals);
        item.item_details.metals_select = value;
        item.item_details.selected_variants.push(value.id);
      }
      if (values.ring_size) {
        let value = JSON.parse(values.ring_size);
        item.item_details.stone_shape_select = value;
        item.item_details.selected_variants.push(value.id);
      }
      item.price = this.totalPrice || item.price;
      item.price_gst = this.totalPrice * this.gstCount;
      this.redirectPairModal = true;
      this.$store.dispatch("addToPairDiamond", item);
    },
    onChangeMain(image) {
      this.activeImage = this.baseUrl + image.image;
      this.marginImage = image.margin;
    },
    variantsReplace(value) {
      var str = value;
      return str.split("_").join(" ");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

  },
  watch: {
    showModal() {
      this.variants = {};
      this.$forceUpdate();
    },
    data: function() {
      this.activeImage = this.data.item_details.activeImage;
    }
  },
  updated() {
    this.setTotalPrice();
  },
  created() {
    this.$store.dispatch("fetchGst");

  }
};
</script>
<style lang="scss">
.tab-pane {
  outline: none;
}
.slick-slide {
  margin: 0 9px;
}
/* the parent */
.slick-list {
  margin: 0 -9px;
}

.slick-prev {
  z-index: 999;
  transform: rotate(180deg);
  &:focus {
    outline: none;
  }
  width: 40px;
  background: none;
  border: none;
  position: absolute;
  left: -40px;
  top: 33%;
  &:before {
    content: url("~assets/img/slider-arrow.png");
  }
}
.slick-next {
  z-index: 999;
  &:focus {
    outline: none;
  }
  width: 40px;
  background: none;
  border: none;
  position: absolute;
  right: -45px;
  top: 33%;
  &:before {
    content: url("~assets/img/slider-arrow.png");
  }
}

</style>
