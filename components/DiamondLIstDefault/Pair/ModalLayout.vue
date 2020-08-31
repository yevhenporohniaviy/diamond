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
                        <iframe v-if="!loadVideo"
                          :src="activeSlideImage.length > 0 ? activeSlideImage : setSlider[0].data"
                          width="100%"
                          height="100%"
                          class="border-0"
                          scrolling="no"
                        ></iframe>
                        <div v-else >
                          <img src="~assets/img/gifload.gif" class="img-fluid" alt="Loading" />
                        </div>
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
                          class="img-fluid p-1"
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
                        @click="giaCertificateView(value.data)"
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
              <div class="first mt-2">
                AUD ${{formatPrice(data.price)}}
                <span>ex. GST</span>
              </div>
              <div class="second my-3">
                AUD ${{formatPrice(data.price_gst)}}
                <span>inc. GST</span>
              </div>
            </div>

            <div class="tech-info my-2">
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
            <div class="group-desc">
              <div class="item-information">
                <div class="title">REFERENCE NUMBER</div>
                <div class="text">{{data.item_details.referenceNum}}</div>
              </div>
              <div class="item-information">
                <div class="title">DEPTH</div>
                <div class="text">{{data.item_details.depthPercent}}%</div>
              </div>
              <div class="item-information">
                <div class="title">TABLE</div>
                <div class="text">{{data.item_details.tablePercent}}%</div>
              </div>
              <div class="item-information">
                <div class="title">POLISH</div>
                <div class="text">{{data.item_details.pol}}</div>
              </div>
              <div class="item-information">
                <div class="title">SYMMETRY</div>
                <div class="text">{{data.item_details.symetry}}</div>
              </div>
              <div class="item-information">
                <div class="title">FLUORESCENCE</div>
                <div class="text">{{data.item_details.fluorescence}}</div>
              </div>
              <div class="item-information">
                <div class="title">CERTIFICATION</div>
                <div
                  class="text"
                  @click="giaCertificateView(data.item_details.images.GIA)"
                >{{data.item_details.certification}}</div>
              </div>
            </div>
            <div class="btn-group" @click="addToPairDiamond(data)">
              <a href="#">
                <div
                  class="select-this-diamond"
                  v-if="data.item_details.visible_selected !== true"
                >select this diamond</div>
                <div
                  class="select-this-diamond"
                  :class=" data.item_details.visible_selected  && 'selected'"
                  v-else
                >this diamond is selected</div>
              </a>
            </div>

            <div class="group-sharing mt-5">
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
                    <div class="flick-image" v-if="videoExist">
                      <iframe v-if="!loadVideo"
                        :src="setSlider[0].data"
                        width="100%"
                        height="100%"
                        class="border-0"
                        scrolling="no"
                      ></iframe>
                      <div v-else >
                        <img src="~assets/img/gifload.gif" class="img-fluid" alt="Loading" />
                      </div>
                    </div>
                    <div class="flick-image" v-else>
                      <img :src="setSlider[0].data" class="img-fluid" />
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
                    <div
                      class="flick-image"
                      @click="giaCertificateView(data.item_details.images.GIA)"
                    >
                      <button class="report">VIEW REPORT</button>
                      <img src="~assets/img/GIA_stacked.png" class="img-fluid" />
                    </div>
                  </div>
                </Flickity>
              </div>
            </div>
            <div class="price">
              <div class="first mt-4">
                AUD ${{formatPrice(data.price)}}
                <span>ex. GST</span>
              </div>
              <div class="second my-2">
                AUD ${{formatPrice(data.price_gst)}}
                <span>inc. GST</span>
              </div>
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
            <div class="group-desc">
              <div class="item-information">
                <div class="title">REFERENCE NUMBER</div>
                <div class="text">{{data.item_details.referenceNum}}</div>
              </div>
              <div class="item-information">
                <div class="title">DEPTH</div>
                <div class="text">{{data.item_details.depthPercent}}%</div>
              </div>
              <div class="item-information">
                <div class="title">TABLE</div>
                <div class="text">{{data.item_details.tablePercent}}%</div>
              </div>
              <div class="item-information">
                <div class="title">POLISH</div>
                <div class="text">{{data.item_details.pol}}</div>
              </div>
              <div class="item-information">
                <div class="title">SYMMETRY</div>
                <div class="text">{{data.item_details.symetry}}</div>
              </div>
              <div class="item-information">
                <div class="title">FLUORESCENCE</div>
                <div class="text">{{data.item_details.fluorescence}}</div>
              </div>
              <div class="item-information">
                <div class="title">CERTIFICATION</div>
                <div
                  class="text"
                  @click="giaCertificateView(data.item_details.images.GIA)"
                >{{data.item_details.certification}}</div>
              </div>
            </div>
            <div class="btn-group" @click="addToPairDiamond(data)">
              <a href="#">
                <div
                  class="select-this-diamond"
                  v-if="data.item_details.visible_selected !== true"
                >select this diamond</div>
                <div
                  class="select-this-diamond"
                  :class=" data.item_details.visible_selected  && 'selected'"
                  v-else
                >this diamond is selected</div>
              </a>
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
    <el-dialog :visible.sync="dialogVisible" append-to-body custom-class="modalGia">
      <div class="header-gia-pop">
        <div class="title">GIA Certified</div>
        <span class="close-btn" @click="dialogVisible = false">
          <Close />
        </span>
      </div>
      <div class="body-gia-pop" v-if="data.item_details.images">
        <div v-if="data.item_details.images.GIA !== null" class="w-100 h-100">
          <img
            :src="data.item_details.images.GIA"
            width="100%"
            class="certificate_gia"
            v-if="data.item_details.images.GIA.endsWith('.jpg') || data.item_details.images.GIA.endsWith('.jpeg') || data.item_details.images.GIA.endsWith('.png')"
          />
          <embed :src="gia_image" width="100%" class="certificate_gia" v-else />
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
    <!-- Share Modal -->
    <el-dialog :visible.sync="showSharing"
               center
               :show-close="false"
               custom-class="modalSharing">
      <ModalSharing :data="data.item_id" :type="data.item_type" @close-sharing="closeSharing"/>
    </el-dialog>

  </div>
</template>
<script>
import Caret from "~/components/Elements/Icons/Caret-black";
import Add from "~/components/Elements/Icons/AddPair";
import DetailLogoEmblem from "~/components/Elements/Icons/DetailLogoEmblem";
import Close from "~/components/Elements/Icons/CloseIcon";
import ModalSharing from '~/components/ModalSharing';

import { mapGetters } from "vuex";

// Share Modal Component

export default {
  name: "LayoutsModal",

  props: {
    data: Object
  },
  data() {
    return {
      loadVideo:false,
      gia_image: null,
      flickityOptions: {
        prevNextButtons: false,
        pageDots: true
      },
      videoExist: false,
      visible: false,
      shapeClass: "",
      activeSlideImage: "",
      dialogVisible: false,
      showSharing:false
    };
  },
  components: {
    Caret,
    Add,
    DetailLogoEmblem,
    Close,
    ModalSharing
  },
  filters: {
    price: function(value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),

    setSlider() {
      return this.getSlider();
    }
  },
  methods: {
    hiddeLoad(){
      this.loadVideo = true
      setTimeout(() => {
        this.loadVideo = false
      }, 2000)
    },
    openSharing(){
      this.showSharing = true
    },
    closeSharing(){
      this.showSharing = false
    },
    async giaCertificateView(gia) {
      let n = gia.includes(".pdf");

      if (n) {
        await this.$axios
          .$get(`api/diamonds/put_to_bucket?certificate=${gia}`)
          .then(resp => {
            this.dialogVisible = true;
            this.gia_image = resp;
            return resp;
          })
          .catch(error => {
            return error.data;
          });
      } else {
        this.gia_image = gia;
        this.dialogVisible = true;
      }
    },
    addToFavorites(item) {
      let value = {
        item_details: item.item_details,
        item_id: item.item_id,
        item_type: item.item_type
      };

      this.$store.dispatch("addToFavorites", value);
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
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addToPairDiamond(diamond) {
      this.$emit("status", diamond);
      this.$store.dispatch("addToPairDiamond", diamond);
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
  },
  created() {
    this.hiddeLoad();
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
