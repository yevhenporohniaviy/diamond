<template>
  <div class="category-detail">
    <div class="container-fluid" id="category-detail-header">
      <div class="navigation">
        <a :href="back_link" class="back-btn">
          <span>
            <img src="~assets/img/Combined_Shape.png" />
          </span>back
        </a>
        <img class="big" src="~assets/img/DE_conture.png" />
        <img class="small" src="~assets/img/DE_conture_2.png" />
      </div>
    </div>
    <div v-if="loading" class="loading d-flex justify-content-center align-items-center my-5">
      <img src="../../assets/img/4V0b.gif" alt="Loading" />
    </div>
    <div v-else><div class="container" id="category-detail-body">
      <div class="col-12 offset-0 col-xl-10 offset-xl-1">
        <div class="row">
          <div class="col-md-6 col-12 d-xl-block d-none">
            <div class="col-12 offset-0 col-xl-10 offset-xl-2">
              <b-tabs align="center" end class="images-category-content">
                <b-tab title="ring view" active>
                  <div class="row">
                    <div class="col-12 pr-0">
                      <div class="main-image" v-if="itemJewellery.images">
                        <img
                          v-if="activeImage.length > 0"
                          :src=" activeImage"
                          class="img-fluid"
                          :class="marginImage ? 'margin-image': ''"
                        />
                        <img
                          v-else
                          :src="baseUrl + itemJewellery.images.main.image"
                          class="img-fluid"
                          :class="itemJewellery.images.main.margin ? 'margin-image':'' "
                        />
                        <div
                          class="icon-logo"
                          v-if="activeImage.length > 0"
                          :class="marginImage ? '': 'logo-margin'"
                        >
                          <img src="~assets/img/Logo_foot.png" />
                        </div>
                        <div
                          class="icon-logo"
                          v-else
                          :class="itemJewellery.images.main.margin ? '':'logo-margin' "
                        >
                          <img src="~assets/img/Logo_foot.png" />
                        </div>
                      </div>
                    </div>
                    <div class="col-12" style="padding:0;margin-left: 15px;">
                      <carousel
                        navigation-next-label
                        navigation-prev-label
                        :loop="true"
                        :perPage="3"
                        :scrollPerPage="true"
                        :navigationEnabled="true"
                        :paginationEnabled="false"
                        v-if="itemJewellery.images"
                      >
                        <slide
                          v-for="(item, key) in itemJewellery.images"
                          :key="key"
                          v-if="key !== 'others' || item.other"
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
                          v-for="(item, index) in itemJewellery.images.others"
                          :key="index"
                          v-if="itemJewellery.images"
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
                <b-tab title="on hand view" v-if="itemJewellery.images">
                  <div class="category-hand" v-if="itemJewellery.images.on_hand">
                    <div class="category-hand-image">
                      <img :src="baseUrl+valueHand" class="img-fluid image-hand" v-if="valueHand" />
                      <img
                        :src="baseUrl+itemJewellery.images.on_hand[0]"
                        class="img-fluid image-hand"
                        v-else
                      />
                    </div>
                    <div class="category-hand-image-slider">
                      <vue-slider
                        v-model="valueHand"
                        :tooltip="'none'"
                        :data="itemJewellery.images.on_hand"
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
          <div class="col-md-6 col-12 d-xl-block d-none">
            <div class>
              <div class="category-info">
                <div class="card-description">
                  <div class="title">{{itemJewellery.title}}</div>
                </div>
                <div class="ref-number">
                  <div class>
                    Reference no.
                    <span>{{itemJewellery.item_number}}</span>
                  </div>
                </div>
                <b-tabs class="mt-3 tabs-category-detail-info" align="center">
                  <b-tab title="OVERVIEW" active>
                    <div class="description-category mb-4 mt-4">{{itemJewellery.description}}</div>

                    <div class="col-12">
                      <div class="row" v-if="itemJewellery.variants">
                        <div v-for="(option, key) in itemJewellery.variants" :key="key" class="m-1">
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
                    <div class="pair text-center">
                      <div v-if="itemJewellery.have_center_stone">
                        <button
                          class="pair-button"
                          slot="reference"
                          @click="addToPairDiamond(itemJewellery, variants)"
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
                  </b-tab>
                  <b-tab title="DETAILS">
                    <div class="group-desc">
                      <div class="item-information">
                        <div class="title">METAL</div>

                        <div class="text" v-if="itemJewellery.metal">
                          {{itemJewellery.metal.prefix ? itemJewellery.metal.prefix : ' '}}
                          {{itemJewellery.metal.title ? itemJewellery.metal.title : ' '}}
                        </div>
                        <div class="text" v-else>-</div>
                      </div>
                      <div class="item-information">
                        <div class="title">PRONG METAL</div>
                        <div class="text" v-if="itemJewellery.metal">
                          {{itemJewellery.metal.prefix ? itemJewellery.metal.prefix : ' '}}
                          {{itemJewellery.metal.title ? itemJewellery.metal.title : ' '}}
                        </div>
                        <div class="text" v-else>-</div>
                      </div>
                      <div class="item-information" v-if="itemJewellery.width">
                        <div class="title">WIDTH</div>
                        <div
                          class="text"
                          v-if="itemJewellery.width.min === 0 && itemJewellery.width.max === 0"
                        >-</div>
                        <div
                          class="text"
                          v-else
                        >{{itemJewellery.width.min}} - {{itemJewellery.width.max}}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">DIAMOND OPTIONS</div>
                        <div class="text text-right">
                          <span v-for="(item, key) in itemJewellery.stone_shape" :key="key">{{item}}</span>
                        </div>
                      </div>
                      <div class="item-information">
                        <div class="title">CARAT RANGE</div>
                        <div
                          class="text"
                          v-if="itemJewellery.carat_stone_from === 0 && itemJewellery.carat_stone_to === 0"
                        >-</div>
                        <div
                          class="text"
                          v-else
                        >{{valueFloat(itemJewellery.carat_stone_from)}} - {{valueFloat(itemJewellery.carat_stone_to)}}</div>
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
                        AUD ${{formatPrice(totalPrice)}}
                        <span>ex. GST</span>
                      </div>
                      <div class="text-price-second">
                        AUD ${{formatPrice(totalPrice * this.gstCount)}}
                        <span>inc. GST</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="remark mt-3">
                  <div
                    class="text"
                  >Book an appointment with one of our consultants to help you choose a diamond best suited to your budget.</div>
                </div>
                <div class="btn-group">
                  <div class="w-100">
                    <div class="enqu" @click="sendEnquiry(itemJewellery)">ENQUIRy</div>
                  </div>
                  <div class="w-100">
                    <div class="add" @click="addToBag(itemJewellery, variants)">ADD TO BAG</div>
                  </div>
                </div>
                <div class="group-sharing">
                  <div class="like" @click="addToFavorites(itemJewellery)" v-if="isAuthenticated">
                    <img src="~assets/img/like.png" /> save
                  </div>
                  <nuxt-link class="like" to="/favorites/auth/login" v-else>
                    <img src="~assets/img/like.png" class="img-fluid" /> save
                  </nuxt-link>
                  <div class="block-line"></div>
                  <div class="share d-flex" @click="openSharing">
                    <img src="~assets/img/share.png" class="img-fluid" />

                      <div>Share</div>

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
                  <div class="title">{{itemJewellery.title}}</div>
                  <div class="ref-number">
                    <div class>
                      Reference no.
                      <span>{{itemJewellery.item_number}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 p-0">
              <div class="slider-detail-images" v-if="itemJewellery.images">
                <div class="emblema-de">
                  <DetailLogoEmblem />
                </div>
                <slick id="carouselJewel" :options="slickOptionsMobile">
                  <div class="slide">
                    <img
                      class="img-fluid w-100"
                      style="outline:none;"
                      :src="activeImage ? activeImage : baseUrl+itemJewellery.images.main.image"
                      :class="itemJewellery.images.main.margin ? 'margin-img': ''"
                    />
                  </div>
                  <div class="slide">
                    <img
                      class="img-fluid w-100"
                      style="outline:none;"
                      :src="baseUrl+itemJewellery.images.side.image"
                      :class="itemJewellery.images.side.margin ? 'margin-img': ''"
                    />
                  </div>
                  <div class="slide" v-for="(item,index) in itemJewellery.images.others" :key="index">
                    <img class="img-fluid w-100" style="outline:none;" :src="baseUrl+item.image"  :class="item.margin ? 'margin-img': ''"/>
                  </div>
                </slick>
              </div>
            </div>
            <div class="col-12">
              <div class="detail-body-mobile d-flex justify-content-center flex-column">
                <div class="description-category mb-4">{{itemJewellery.description}}</div>
                <div class="d-flex justify-content-between" v-if="itemJewellery.variants">
                  <div v-for="(option, key) in itemJewellery.variants" :key="key">
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
                      <div class="field-size" v-if="variants.ring_size" @click="setRingValue(option)">
                        <div class="text">{{getTitleSize(variants.ring_size)}}</div>
                        <div class="icon">
                          <img src="~assets/img/size-ring-select.png" class="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pair text-center">
                  <div v-if="itemJewellery.have_center_stone">
                    <button
                      class="pair-button"
                      slot="reference"
                      @click="addToPairDiamond(itemJewellery, variants)"
                    >
                      <div>
                        <div class="title-btn">
                        <span class="add">
                          <AddDiamond />
                        </span>
                          select A DIAMOND
                          <span class="caret-pair">
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
                          <span class="caret-pair">
                          <Caret />
                        </span>
                        </div>
                      </nuxt-link>
                    </button>
                  </div>
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
                        AUD ${{formatPrice(totalPrice)}}
                        <span>ex. GST</span>
                      </div>
                      <div class="text-price-second">
                        AUD ${{formatPrice(totalPrice * this.gstCount)}}
                        <span>inc. GST</span>
                      </div>
                    </div>
                  </div>
                  <div class="item-information">
                    <div class="title">METAL</div>
                    <div
                      class="text"
                      v-if="itemJewellery.metal"
                    >{{itemJewellery.metal.prefix ? itemJewellery.metal.prefix : ' '}}{{itemJewellery.metal.title ? itemJewellery.metal.title : ' '}}</div>
                    <div class="text" v-else>-</div>
                  </div>
                  <div class="item-information">
                    <div class="title">PRONG METAL</div>
                    <div
                      class="text"
                      v-if="itemJewellery.metal"
                    >{{itemJewellery.metal.prefix ? itemJewellery.metal.prefix : ' '}}{{itemJewellery.metal.title ? itemJewellery.metal.title : ' '}}</div>
                    <div class="text" v-else>-</div>
                  </div>
                  <div class="item-information" v-if="itemJewellery.width">
                    <div class="title">WIDTH</div>
                    <div class="text">{{itemJewellery.width.min}} - {{itemJewellery.width.max}}</div>
                  </div>
                  <div class="item-information">
                    <div class="title">DIAMOND OPTIONS</div>
                    <div class="text text-right">
                      <span v-for="(item, key) in itemJewellery.stone_shape" :key="key">{{item}}</span>
                    </div>
                  </div>
                  <div class="item-information" v-if="itemJewellery.stones_carats">
                    <div class="title">CARAT RANGE</div>
                    <div
                      class="text"
                      v-if="itemJewellery.carat_stone_from === 0 && itemJewellery.carat_stone_to === 0"
                    >-</div>
                    <div
                      class="text"
                      v-else
                    >{{valueFloat(itemJewellery.carat_stone_from)}} - {{valueFloat(itemJewellery.carat_stone_to)}}</div>
                  </div>
                </div>
                <div class="remark mt-3">
                  <img src="~assets/img/Fill_1.png" />
                  <div class="text">Free secure priority worldwide shipping</div>
                </div>
                <div class="group-sharing">
                  <div class="like" @click="addToFavorites(itemJewellery)" v-if="isAuthenticated">
                    <img src="~assets/img/like.png" /> save
                  </div>
                  <nuxt-link class="like" to="/favorites/auth/login" v-else>
                    <img src="~assets/img/like.png" class="img-fluid" /> save
                  </nuxt-link>
                  <div class="block-line"></div>
                  <div class="share d-flex" @click="openSharing">
                    <img src="~assets/img/share.png" class="img-fluid" />

                      <div>Share</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-block d-lg-none">
        <div class="action-btns-group">
          <div class="w-100">
            <div class="enqu" @click="sendEnquiry(itemJewellery)">ENQUIRy</div>
          </div>
          <div class="w-100">
            <div class="add" @click="addToBag(itemJewellery, variants)">ADD TO BAG</div>
          </div>
        </div>
      </div></div>
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
            <img src="~assets/img/default/redirect_to_diamond.png" class="img-fluid w-100" />
          </div>

          <div class="col-md-8 col-12 d-flex justify-content-center align-items-center my-4">
            {{params_pair}}
            <nuxt-link
              class="redirect_link_pair"
              :to="{name: 'diamonds-pair', params: {  shape: [ ...params_pair ] } } "
            >START PAIRING</nuxt-link>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Share Modal -->
    <el-dialog :visible.sync="showSharing"
               center
               :show-close="false"
               custom-class="modalSharing">
      <ModalSharing :data="itemJewellery.id" :type="'j'" @close-sharing="closeSharing"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalBag from "~/components/Shopping/ModalBag";
import ModalSharing from '~/components/ModalSharing';

import Tooltip from "~/components/Elements/Icons/Tooltip";
import AddDiamond from "~/components/Elements/Icons/AddPairDiamond";
import Caret from "~/components/Elements/Icons/Caret-black";
import DetailLogoEmblem from "~/components/Elements/Icons/DetailLogoEmblem";

// Share Modal Component

export default {
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
        infinite: false,
        arrows: true,
        prevArrow:
          "<button type='button' class='slick-prev pull-left'></button>",
        nextArrow:
          "<button type='button' class='slick-next pull-right'></button>"
      },
      variants: {},
      activeImage: "",
      activePrice: "",
      marginImage: "",
      back_link: "",
      totalPrice: "",
      showModalBag: false,
      ringSizeDialog: false,
      flickityOptions: {
        prevNextButtons: false,
        pageDots: true
      },
      redirectPairModal: false,
      valueHand: "",
      variant_size: {},
      loading:false,
      params_pair: []
      // Share Modal Variables
    };
  },

  head() {
    return {
      title: `${this.itemJewellery.title ? this.itemJewellery.title : ""}`,
      titleTemplate: `%s - ${
        this.itemJewellery.item_number ? this.itemJewellery.item_number : ""
      }`,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: `${this.itemJewellery.title ? this.itemJewellery.title : ""}`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${this.itemJewellery.title ? this.itemJewellery.title : ""}`
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.itemJewellery.images
            ? this.baseUrl + this.itemJewellery.images.main
            : ""
        },
        {
          hid: "og:image:url",
          property: "og:image:url",
          content: this.itemJewellery.images
            ? this.baseUrl + this.itemJewellery.images.main
            : ""
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.itemJewellery.images
            ? this.baseUrl + this.itemJewellery.images.main
            : ""
        },
        { hid: "og:image:height", property: "og:image:height", content: "200" },
        { hid: "og:image:width", property: "og:image:width", content: "200" }
      ]
    };
  },
  components: {
    Tooltip,
    AddDiamond,
    Caret,
    DetailLogoEmblem,
    ModalBag,
    ModalSharing
  },
  methods: {
    openSharing(){
      this.showSharing = true
    },
    closeSharing(){
      this.showSharing = false
    },
    ...mapActions(["fetchItemJewellery"]),
    addToFavorites(item) {
      let jewellery = {
        item_id: item.item_number,
        item_type: "j",
        item_details: item
      };
      this.$store
        .dispatch("addToFavorites", jewellery)
        .then(resp => {
          this.$notify({
            title: "Success",
            message: "This item has been added to favorites ",
            type: "success"
          });
        })
        .catch(error => {
          this.$notify({
            title: "Attention",
            message: "This item has been already saved",
            type: "warning"
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

    continueShopping(value) {
      this.showModalBag = value;
    },
    sendEnquiry(enqueryNumber) {
      let jewellery = {
        item_id: enqueryNumber.item_number
      };
      this.$store.dispatch("cleareEnquiry");
      this.$store.dispatch("sendEnquiry", jewellery);
      this.$nuxt.$router.push({ path: "/dynamic-pages/contact_us" });
    },
    addToBag(item, values) {
      item.selected_variants = [];
      if (values.metals) {
        let value = JSON.parse(values.metals);
        item.metals_select = value;

        item.selected_variants.push(value.id);
      }
      if (values.ring_size) {
        let value = JSON.parse(values.ring_size);
        item.stone_shape_select = value;

        item.selected_variants.push(value.id);
      }
      let bag_item = {
        item_id: item.item_number,
        count: 1,
        price: this.totalPrice || item.price,
        price_gst: this.totalPrice * this.gstCount,
        item_type: "j",
        item_details: item
      };
      this.$store.commit("addToBag", bag_item);
      this.showModalBag = true;
    },
    addToPairDiamond(item, values) {
      item.selected_variants = [];
      if (values.metals) {
        let value = JSON.parse(values.metals);
        item.metals_select = value;
        item.selected_variants.push(value.id);
      }
      if (values.ring_size) {
        let value = JSON.parse(values.ring_size);
        item.stone_shape_select = value;
        item.selected_variants.push(value.id);
      }
      let ring = {
        item_id: item.item_number,
        count: 1,
        price: this.totalPrice || item.price,
        price_gst: this.totalPrice * this.gstCount,
        item_type: "j",
        item_details: item
      };
      this.redirectPairModal = true;
      this.$store.dispatch("addToPairDiamond", ring);
    },
    onChangeMain(image) {
      this.activeImage = this.baseUrl + image.image;

      this.marginImage = image.margin;
    },
    activeSelect(e) {
      if (e[0].alias !== "ring_size") {
        let img = JSON.parse(this.variants.metals);
        this.activeImage = this.baseUrl + img.image;
        this.marginImage = true;
      }
      this.ringSizeDialog = false;
      this.$forceUpdate();
    },
    variantsReplace(value) {
      var str = value;
      return str.split("_").join(" ");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    setTotalPrice() {
      let list_values = Object.values(this.variants);
      let price = 0;
      list_values.forEach(elem => {
        price += JSON.parse(elem).price;
      });
      this.totalPrice = price;
    },
    getTitleSize(value) {
      let title = JSON.parse(value);
      return title.value.title;
    },
    capitalizeFirst() {

      const items = this.itemJewellery.stone_shape;
      if(Array.isArray(items) && items.length){
        this.params_pair = items.map(day => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase())
      }
    }
  },
  computed: {
    ...mapGetters(["itemJewellery", "gstCount", "isAuthenticated"]),

  },
  updated() {
    this.setTotalPrice();
  },
  created() {
    this.loading = true
    this.$store.dispatch("fetchItemJewellery", this.$route.params.id)
      .then(response => {
        Object.keys(response.variants).map(key => {
          this.variants[key] = JSON.stringify(response.variants[key][0]);
        });
        this.loading = false
        this.$forceUpdate();
      });
    this.$store.dispatch("fetchGst");
    this.capitalizeFirst();
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.back_link = from.path;
    });
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
.ringSizeModal {
  border-top: 4px solid #cae3f6;
  border-bottom: 4px solid #cae3f6;
  width: 50%;
  @media (max-width: 525px) {
    width: 100%;
  }
  .title-modal {
    color: #24354f;
    font-family: lato-bold;
    font-size: 12px;
    letter-spacing: 3.1px;
    text-transform: uppercase;
  }
  .box {
    margin-right: 13px;
    margin-left: 13px;
    margin-bottom: 13px;
    .item {
      width: 47px;
      border-radius: 4px;
      border: 1px solid #cae3f6;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      .el-radio__input {
        display: none;
      }
      .el-radio__label {
        padding: 0;
        color: #24354f;
        font-family: lato-bold;
        font-size: 12px;
        text-transform: uppercase;
      }
      &.is-checked {
        background: #6daee2;
        border: 1px solid #6daee2;
        .el-radio__label {
          color: #ffffff;
        }
      }
    }
    .item-unsure{
      width: 60px;
      border-radius: 4px;
      border: 1px solid #cae3f6;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      .el-radio__input {
        display: none;
      }
      .el-radio__label {
        padding: 0;
        color: #24354f;
        font-family: lato-bold;
        font-size: 12px;
        text-transform: uppercase;
      }
      &.is-checked {
        background: #6daee2;
        border: 1px solid #6daee2;
        .el-radio__label {
          color: #ffffff;
        }
      }
    }
  }
}

.VueCarousel-navigation-next::after {
  content: url("~assets/img/slider-arrow.png");
  right: 15px
}
.VueCarousel-navigation-prev::after {
  content: url("~assets/img/slider-arrow-left.png");
}
</style>
