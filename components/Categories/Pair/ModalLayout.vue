<template>
  <div class="category-detail">
    <div class="modal-lay" id="category-detail-body">
      <div class="col-12">
        <div class="row">
          <div class="col-6 d-xl-block d-none">
            <div class>
              <b-tabs align="center" end class="images-category-content">
                <b-tab title active>
                  <div class="row">
                    <div class="col-12 pr-0">
                      <div class="main-image" v-if="data.item_details.images">
                        <img
                          v-if="activeImage !== null"
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
                          v-if="activeImage !== null"
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
                    <div class="col-12" style="padding:0; margin-left: 15px;">
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

                <div class="card-description my-4">
                  <div class="description">{{data.item_details.description}}</div>
                </div>
                <b-tabs class="mt-3 tabs-category-detail-info" align="center">
                  <b-tab>
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
                        AUD ${{formatPrice(data.price) }}
                        <span>ex. GST</span>
                      </div>
                      <div class="text-price-second">
                        AUD ${{formatPrice(data.price_gst)}}
                        <span>inc. GST</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="btn-group">
                  <button
                    class="select_setting"
                    @click="addDiamondToPair(data, data.item_details.stone_shape_select)"
                    :disabled="Object.keys(data.item_details.stone_shape_select).length === 0"
                    :class="[Object.keys(data.item_details.stone_shape_select).length === 0 && 'disabled', data.item_details.visible_selected === true ?  'selected' : '']"
                  >
                    <div v-if="data.item_details.visible_selected !== true">select this setting</div>
                    <div v-else>ring selected</div>
                  </button>
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
              <slick id="carouselJewel" :options="slickOptionsMobile">
                <div class="slide">
                  <img
                    class="img-fluid w-100"
                    style="outline:none;"
                    :src="activeImage ? activeImage : baseUrl+data.item_details.images.main.image"
                  />
                </div>
                <div class="slide">
                  <img
                    class="img-fluid w-100"
                    style="outline:none;"
                    :src="baseUrl+data.item_details.images.side.image"
                  />
                </div>
                <div
                  class="slide"
                  v-for="(item,index) in data.item_details.images.others"
                  :key="index"
                >
                  <img class="img-fluid w-100" style="outline:none;" :src="baseUrl+item.image" />
                </div>
              </slick>
            </div>
          </div>
          <div class="col-12 p-0">
            <div class="detail-body-mobile d-flex justify-content-center flex-column">
              <div class="description-category my-4">{{data.item_details.description}}</div>

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
                      AUD ${{formatPrice(data.price) }}
                      <span>ex. GST</span>
                    </div>
                    <div class="text-price-second">
                      AUD ${{formatPrice(data.price_gst)}}
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

              <div class="btn-group">
                <div
                  class="add"
                  @click="addDiamondToPair(data, data.item_details.stone_shape_select)"
                  :disabled="Object.keys(data.item_details.stone_shape_select).length === 0"
                  :class="[Object.keys(data.item_details.stone_shape_select).length === 0 && 'disabled', data.item_details.visible_selected === true ?  'selected' : '']"
                >
                  <div v-if="data.item_details.visible_selected !== true">select this setting</div>
                  <div v-else>ring selected</div>
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

                    <div>Share</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Share Modal -->
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
import { mapGetters } from "vuex";

// Share Modal Component



// Slider

export default {
  name: "LayoutsModal",

  props: {
    data: Object
  },
  data() {
    return {
      showSharing:false,
      activeImage: null,
      marginImage: "",
      activePrice: "",
      back_link: "",
      valueHand: "",
      metals_item: {},
      stone_shape: {},
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow:
          "<button type='button' class='slick-prev pull-left'></button>",
        nextArrow:
          "<button type='button' class='slick-next pull-right'></button>"
      },
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
    ...mapGetters(["gstCount", "isAuthenticated"])
  },
  methods: {
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

      this.$store
        .dispatch("addToFavorites", value)
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
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addDiamondToPair(item, size) {
      item.stone_shape_select = size;
      this.$store.dispatch("addDiamondToPair", item);
    },
    onChangeMain(image) {
      this.activePrice = this.data.price;
      this.activeImage = this.baseUrl + image.image;
      this.marginImage = image.margin;
    },
    onChangeSize(event) {
      this.activePrice = event.price;
    },

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
// .VueCarousel-navigation-next {
//   right: 0 ;
//   z-index: 99;
// }
</style>
