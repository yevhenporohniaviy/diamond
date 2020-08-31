<template>
  <div>
    <div class="container" id="body_info_response">
      <div class="row">
        <div class="col-md-6 col-sm-12 col-12 d-xl-block d-none">
          <div class="detail-body-images">
            <div class="container" v-if="data.item_details.images">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <div class="video-image" v-if="videoExist">
                        <iframe
                          :src="activeSlideImage.length > 0 ? activeSlideImage : setSlider[0].data"
                          width="100%"
                          height="100%"
                          class="border-0"
                          scrolling="no"
                        ></iframe>
                        <div class="icon-logo">
                          <img src="~assets/img/DE_logo_prod.png" />
                        </div>
                      </div>
                      <div class="main-image" :class="shapeClass" v-else>
                        <img
                          :src="activeSlideImage.length > 0 ? activeSlideImage : setSlider[0].data"
                          class="img-fluid"
                        />
                        <div class="size_front">
                          <div class="width">
                            Width:
                            <br />
                            {{data.item_details.MeasWidth}}
                          </div>
                          <div class="height">
                            Length:
                            <br />
                            {{data.item_details.MeasLength}}
                          </div>
                        </div>
                        <div class="size_side">
                          <div class="depth">
                            Depth:
                            <br />
                            {{data.item_details.depthPercent}}%
                          </div>
                          <div class="table-w">Table:{{data.item_details.tablePercent}}%</div>
                        </div>
                        <div
                          class="illustration"
                        >All Pictures shown are for illustration purpose only.</div>
                        <div class="icon-logo">
                          <img src="~assets/img/DE_logo_prod.png" />
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="setSlider"
                      v-for="(value,index) in setSlider"
                      :key="index"
                      class="col-3"
                    >
                      <div class="support-images" v-if="value.type === 'video'">
                        <img
                          src="~assets/img/diamonds/icon-hd.png"
                          @click="activeSlide(value.data, value.type, value.position)"
                          class="img-fluid"
                        />
                      </div>
                      <div class="support-images" v-else-if="value.type === 'main'">
                        <img
                          :src="value.data"
                          @click="activeSlide(value.data, value.type, value.position)"
                          class="img-fluid"
                        />
                      </div>
                      <div
                        class="support-images"
                        v-else-if="value.type === data.item_details.shape"
                      >
                        <img
                          :src="value.data"
                          @click="activeSlide(value.data, value.type, value.position)"
                          class="img-fluid"
                        />
                      </div>
                      <div
                        class="support-images report_doc"
                        @click="dialogVisible = true"
                        v-else-if="value.type === 'gia'"
                      >
                        <button class="report">VIEW REPORT</button>
                        <img src="~assets/img/GIA_stacked.png" class="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center">
                  <div class="body-images-info mt-4">
                    <div
                      class="title"
                    >WE ARE COMMITTED TO ONLY SUPPLYING OUR DIAMONDS FROM ETHICAL SOURCES</div>
                    <nuxt-link
                      :to="{name: 'dynamic-pages-id', params: { id: 'conflict_free_diamonds' } }"
                      class="read_more_btn mt-2"
                    >
                      <img src="~assets/img/read_star.png" class="mx-1" /> READ MORE
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-12 d-xl-block d-none">
          <div class="box-info">
            <div class="card-description">
              <div
                class="title mb-1"
              >{{data.item_details.caratSize | toDecimalNumber}} {{data.item_details.shape}} diamond</div>
              <div class="size">
                L {{data.item_details.MeasLength}}mm x
                W {{data.item_details.MeasWidth}}mm x
                H {{data.item_details.MeasDepth}}mm
              </div>
            </div>
            <div class="price">
              <div class="first mt-5">
                AUD ${{ formatPrice(data.price)}}
                <span>ex. GST</span>
              </div>
              <div class="second my-3">
                AUD ${{ formatPrice(data.price_gst)}}
                <span>inc. GST</span>
              </div>
            </div>

            <div class="pair text-center">
              <el-popover placement="bottom" width="200" trigger="hover" popper-class="pair-popver">
                <div>
                  <ul>
                    <li @click="addDiamondToPair(data)">
                      <button>engagement ring</button>
                    </li>
                  </ul>
                </div>
                <el-button class="pair-button" slot="reference">
                  <div class="title-btn">
                    <span class="add">
                      <Add />
                    </span>
                    pair with ...
                    <span class="caret-pair">
                      <Caret />
                    </span>
                  </div>
                </el-button>
              </el-popover>
            </div>
            <div class="tech-info my-5">
              <div class="item-tech">
                <div class="title">CARAT</div>
                <div class="text">{{data.item_details.caratSize | toDecimalNumber}}</div>
              </div>
              <div class="item-tech">
                <div class="title">COLOUR</div>
                <div class="text">{{data.item_details.color}}</div>
              </div>
              <div class="item-tech">
                <div class="title">CLARITY</div>
                <div class="text">{{data.item_details.clarity}}</div>
              </div>
              <div class="item-tech">
                <div class="title">CUT</div>
                <div class="text">{{data.item_details.cut ? data.item_details.cut : '-'}}</div>
              </div>
            </div>
            <div class="btn-group">
              <div class="w-100">
                <div class="enqu" @click="sendEnquiry(data)">ENQUIRY</div>
              </div>
              <div class="w-100">
                <div class="add" @click="addToBag(data)">ADD TO BAG</div>
              </div>
            </div>
            <div class="remark mt-4">
              <img src="~assets/img/Fill_1.png" />
              <div class="text">Free secure priority worldwide shipping</div>
            </div>
            <div class="group-sharing mt-5">
              <a href class="like">
                <img src="~assets/img/like.png" /> SAVE
              </a>
              <div class="block-line"></div>
              <div class="share d-flex" @click="openShareModal(item.item_number)">
                <img src="~assets/img/share.png" class="img-fluid" />
                <social-sharing
                  :url="''+data.item_id"
                  inline-template
                >
                  <div>Share</div>
                </social-sharing>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 d-xl-none d-block" id="mobileTable">
          <div class="box-info-mobile d-flex justify-content-center flex-column">
            <div class="card-description">
              <div
                class="title"
              >{{data.item_details.caratSize | toDecimalNumber}} {{data.item_details.shape}} diamond</div>
              <div class="size">
                L {{data.item_details.MeasLength}}mm x
                W {{data.item_details.MeasWidth}}mm x
                H {{data.item_details.MeasDepth}}mm
              </div>
            </div>
            <div class="slider-mobile">
              <div class="slider-detail-images" v-if="data.item_details.images">
                <div class="emblema-de">
                  <DetailLogoEmblem />
                </div>
                <Flickity :options="flickityOptions" id="flickity-tab">
                  <div class="carousel-cell">
                    <div class="flick-image">
                      <img :src="data.item_details.images.main" class="img-fluid" />
                    </div>
                  </div>
                  <div class="carousel-cell" v-if="data.item_details.images.lines">
                    <div class="flick-image" :class="data.item_details.shape.toLowerCase()">
                      <img :src="data.item_details.images.lines.front" class="img-fluid" />
                      <div class="size_front">
                        <div class="width">
                          Width:
                          <br />
                          {{data.item_details.MeasWidth}}
                        </div>
                        <div class="height">
                          Length:
                          <br />
                          {{data.item_details.MeasLength}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-cell" v-if="data.item_details.images.lines">
                    <div class="flick-image" :class="data.item_details.shape.toLowerCase()">
                      <img :src="data.item_details.images.lines.side" class="img-fluid" />
                      <div class="size_side">
                        <div class="depth">
                          Depth:
                          <br />
                          {{data.item_details.depthPercent}}%
                        </div>
                        <div class="table">Table:{{data.item_details.tablePercent}}%</div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-cell" v-if="data.item_details.images.GIA !== null">
                    <div class="flick-image" @click="dialogVisible = true">
                      <button class="report">VIEW REPORT</button>
                      <img src="~assets/img/GIA_stacked.png" class="img-fluid" />
                    </div>
                  </div>
                </Flickity>
              </div>
            </div>
            <div class="price">
              <div class="first mt-4">
                AUD ${{ formatPrice(data.price)}}
                <span>ex. GST</span>
              </div>
              <div class="second mt-2">
                AUD ${{ formatPrice(data.price_gst) }}
                <span>inc. GST</span>
              </div>
            </div>
            <div class="pair text-center">
              <el-popover placement="bottom" width="200" trigger="click" popper-class="pair-popver">
                <el-button class="pair-button" slot="reference">
                  <div class="title-btn">
                    <span class="add">
                      <Add />
                    </span>
                    pair with ...
                    <span class="caret-pair">
                      <Caret />
                    </span>
                  </div>
                </el-button>
              </el-popover>
            </div>
            <div class="tech-info">
              <div class="item-tech">
                <div class="title">CARAT</div>
                <div class="text">{{data.item_details.caratSize | toDecimalNumber}}</div>
              </div>
              <div class="item-tech">
                <div class="title">COLOUR</div>
                <div class="text">{{data.item_details.color}}</div>
              </div>
              <div class="item-tech">
                <div class="title">CLARITY</div>
                <div class="text">{{data.item_details.clarity}}</div>
              </div>
              <div class="item-tech">
                <div class="title">CUT</div>
                <div class="text">{{data.item_details.cut ? data.item_details.cut : '-'}}</div>
              </div>
            </div>
            <div class="btn-group">
              <div class="w-100">
                <div class="enqu" @click="sendEnquiry(data)">ENQUIRY</div>
              </div>
              <div class="w-100">
                <div class="add" @click="addToBag(data)">ADD TO BAG</div>
              </div>
            </div>
            <div class="remark mt-3">
              <img src="~assets/img/Fill_1.png" />
              <div class="text">Free secure priority worldwide shipping</div>
            </div>
            <div class="group-sharing">
              <a href class="like">
                <img src="~assets/img/like.png" /> SAVE
              </a>
              <div class="block-line"></div>
              <div class="share d-flex" @click="openShareModal(data.item_number)">
                <img src="~assets/img/share.png" class="img-fluid" />
                <social-sharing
                  :url="'diamonds-list/'+data.item_id"
                  inline-template
                >
                  <div>
                    Share
                  </div>
                </social-sharing>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body custom-class="modalGia">
      <div class="header-gia-pop">
        <div class="title">GIA Certified</div>
        <span class="close-btn" @click="dialogVisible = false">
          <Close />
        </span>
      </div>
      <div class="body-gia-pop" v-if="data.item_details.images">
        <div v-if="data.item_details.images.GIA !== null">
          <embed
            :src="data.item_details.images.GIA"
            width="100%"
            class="certificate_gia"
            type="application/pdf"
          />
        </div>
      </div>
      <div class="footer-gia-pop">
        <div class="text" v-if="data.item_details.images">
          <div v-if="data.item_details.images.GIA !== null">
            <a :href="data.item_details.images.GIA" download>Click here to download the certificate</a>
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
            <img src="~assets/img/default/redirect_to_ring.png" class="img-fluid w-100" />
          </div>

          <div class="col-md-8 col-12 d-flex justify-content-center align-items-center my-4">
            <nuxt-link
              class="redirect_link_pair"
              :to="{name: 'categories-pair-id', params: { id: 'engagement_rings' , filter: { stone_shape: [ ...data.item_details.shape ] , carats: data.item_details.caratSize} } } "
            >START PAIRING</nuxt-link>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- Share Modal -->
    <ShareModal
      :showShareModal="showModal"
      @showShareModalValue="changeShareModal()"/>
  </div>
</template>
<script>
import Caret from "~/components/Elements/Icons/Caret-black";
import Add from "~/components/Elements/Icons/AddPair";
import DetailLogoEmblem from "~/components/Elements/Icons/DetailLogoEmblem";
import Close from "~/components/Elements/Icons/CloseIcon";

// Share Modal Component
import ShareModal from '../ShareModal';

export default {
  name: "LayoutsModal",

  props: {
    data: Object
  },

  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: true
      },
      videoExist: false,
      shapeClass: "",
      activeSlideImage: "",
      dialogVisible: false,
      redirectPairModal: false,
      showModal: false
    };
  },
  components: {
    Caret,
    Add,
    DetailLogoEmblem,
    Close,
    ShareModal
  },
  computed: {
    setSlider() {
      return this.getSlider();
    }
  },
  methods: {
    openShareModal(item) {
      sessionStorage.setItem('shareUrl', 'diamonds-list/' + item);
      this.showModal = true;
    },
    changeShareModal() {
      this.showModal = false;
    },
    getSlider() {
      let slider = [];

      let video = {
        data: this.data.item_details.video,
        type: "video",
        position: "none"
      };
      if (this.data.item_details.images) {
        var image_main = {
          data: this.data.item_details.images.main,
          type: "main",
          position: "none"
        };
        var image_front = {
          data: this.data.item_details.images.lines.front,
          type: this.data.item_details.shape,
          position: "front"
        };
        var image_side = {
          data: this.data.item_details.images.lines.side,
          type: this.data.item_details.shape,
          position: "side"
        };
        var gia = {
          data: this.data.item_details.images.GIA,
          type: "gia",
          position: "none"
        };
      }
      if (this.data.item_details.video) {
        this.videoExist = true;
        slider.push(video, image_front, image_side, gia);
      } else {
        this.videoExist = false;
        slider.push(image_main, image_front, image_side, gia);
      }

      return slider;
    },

    sendEnquiry(enqueryNumber) {
      let diamond = {
        item_id: enqueryNumber.referenceNum,
        count: 1,
        price: enqueryNumber.price,
        price_gst: enqueryNumber.price,
        item_type: "d",
        item_details: enqueryNumber
      };
      this.$store.dispatch("cleareEnquiry");
      this.$store.dispatch("sendEnquiry", diamond);
      this.$nuxt.$router.push({ path: "/dynamic-pages/contact_us" });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addToBag(item) {
      this.$store.dispatch("addToBag", item);
      this.$emit("click_shop", true);
    },
    addDiamondToPair(diamond) {
      this.redirectPairModal = true;
      this.$store.dispatch("addDiamondToPair", diamond);
    },
    activeSlide(value, type, position) {
      if (type !== "video") {
        this.videoExist = false;
      } else {
        this.videoExist = true;
      }
      this.shapeClass = type.toLowerCase() + " " + position;
      this.activeSlideImage = value;
    }
  },
  watch: {
    data: function() {
      this.shapeClass = "";
      this.activeSlideImage = "";
    }
  }
};
</script>
<style scoped lang="scss">
.flick-image {
  &.round {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.cushion {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.princess {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.oval {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.pear {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.asscher {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.marquise {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.emerald {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.radiant {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.heart {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
  &.trilliant {
    .size_front {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 40px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 80px;
        right: 15px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: inherit;
      width: inherit;
      .table {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 20px;
        right: 25px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        top: 80px;
        right: 50px;
      }
    }
  }
}
.main-image {
  .size_front {
    display: none;
  }
  .size_side {
    display: none;
  }
  &.round {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 140px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 90px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 70px;
        }
      }
    }
  }
  &.cushion {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 150px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 90px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.princess {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 140px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 100px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.oval {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 170px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 100px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.pear {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 175px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 100px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.asscher {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 110px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 140px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 100px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 85px;
        }
      }
    }
  }
  &.marquise {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 170px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 110px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.emerald {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 170px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 110px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.radiant {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 160px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 90px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.heart {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 100px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 140px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 100px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
  &.trilliant {
    &.front {
      .size_front {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .width {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 120px;
          left: 220px;
        }
        .height {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 220px;
          left: 140px;
        }
      }
    }
    &.side {
      .size_side {
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        .table-w {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 85px;
          left: 190px;
        }
        .depth {
          background: #fff;
          color: #000000;
          font-family: lato-reg;
          font-size: 12px;
          letter-spacing: 1px;

          position: absolute;
          top: 200px;
          left: 80px;
        }
      }
    }
  }
}
</style>
