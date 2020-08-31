<template>
  <div class="position-relative">
      <div id="diamond-detail-page">
        <div id="diamond-detail-header">
          <div class="navigation">
            <nuxt-link :to="back_link" class="back-btn">
              <span>
                <img src="~assets/img/Combined_Shape.png" /> </span
              >back
            </nuxt-link>
            <img class="big" src="~assets/img/DE_conture.png" />
            <img class="small" src="~assets/img/DE_conture_2.png" />
          </div>
        </div>
        <div v-if="loading" class="loading js-loading">
          <img src="../../assets/img/4V0b.gif" alt="Loading" />
        </div>
        <div v-else>
          <div class="diamond-detail-body d-none d-lg-block">
            <div class="container">
              <div class="col-12 offset-0 col-xl-10 offset-xl-1">
                <div class="row">
                  <div class="col-6">
                    <div class="detail-body-images">
                      <div class="container" v-if="diamondItem.images">
                        <div class="row">
                          <div class="col-12 offset-0 col-xl-10 offset-xl-2">
                            <div class="row">
                              <div class="col-12">
                                <div class="video-image" v-if="videoExist">
                                  <iframe v-if="!loadVideo"
                                    :src="
                                      activeSlideImage.length > 0
                                        ? activeSlideImage
                                        : setSlider[0].data
                                    "
                                    width="100%"
                                    height="100%"
                                    class="border-0 iframe-video-diamonds-360"
                                    scrolling="no"
                                  ></iframe>
                                  <div v-else >
                                    <img src="../../assets/img/gifload.gif" class="img-fluid" alt="Loading" />
                                  </div>
                                  <div class="icon-logo">
                                    <img src="~assets/img/DE_logo_prod.png" />
                                  </div>
                                </div>
                                <div
                                  class="main-image"
                                  :class="shapeClass"
                                  v-else
                                >
                                  <img
                                    :src="
                                      activeSlideImage.length > 0
                                        ? activeSlideImage
                                        : setSlider[0].data
                                    "
                                    class="img-fluid"
                                  />
                                  <div class="size_front">
                                    <div class="width">
                                      Width:
                                      <br />
                                      {{ diamondItem.MeasWidth }}mm
                                    </div>
                                    <div class="height">
                                      Length:
                                      <br />
                                      {{ diamondItem.MeasLength }}mm
                                    </div>
                                  </div>
                                  <div class="size_side">
                                    <div class="depth">
                                      Depth:
                                      <br />
                                      {{ diamondItem.depthPercent }}%
                                    </div>
                                    <div class="table-w">
                                      Table:
                                      {{ diamondItem.tablePercent }}%
                                    </div>
                                  </div>
                                  <div class="illustration">
                                    All Pictures shown are for illustration
                                    purpose only.
                                  </div>
                                  <div class="icon-logo">
                                    <img src="~assets/img/DE_logo_prod.png" />
                                  </div>
                                </div>
                              </div>

                              <div
                                v-if="setSlider"
                                v-for="(value, index) in setSlider"
                                :key="index"
                                class="col-3"
                              >
                                <div
                                  class="support-images"
                                  v-if="value.type === 'video'"
                                >
                                  <img
                                    src="~assets/img/diamonds/icon-hd.png"
                                    @click="
                                      activeSlide(
                                        value.data,
                                        value.type,
                                        value.position
                                      )
                                    "
                                    class="img-fluid p-1"
                                  />
                                </div>
                                <div
                                  class="support-images"
                                  v-else-if="value.type === 'main'"
                                >
                                  <img
                                    :src="value.data"
                                    @click="
                                      activeSlide(
                                        value.data,
                                        value.type,
                                        value.position
                                      )
                                    "
                                    class="img-fluid"
                                  />
                                </div>
                                <div
                                  class="support-images"
                                  v-else-if="value.type === diamondItem.shape"
                                >
                                  <img
                                    :src="value.data"
                                    @click="
                                      activeSlide(
                                        value.data,
                                        value.type,
                                        value.position
                                      )
                                    "
                                    class="img-fluid"
                                  />
                                </div>
                                <div
                                  class="support-images report_doc"
                                  @click="giaCertificateView(value.data)"
                                  v-else-if="value.type === 'gia'"
                                >
                                  <button class="report">VIEW REPORT</button>
                                  <img
                                    src="~assets/img/GIA_stacked.png"
                                    class="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-10 offset-md-2 text-center">
                            <div class="body-images-info mt-4">
                              <div class="title">
                                WE ARE COMMITTED TO ONLY SUPPLYING OUR DIAMONDS
                                FROM ETHICAL SOURCES
                              </div>
                              <nuxt-link
                                :to="{
                                  name: 'dynamic-pages-id',
                                  params: { id: 'conflict_free_diamonds' }
                                }"
                                class="read_more_btn mt-2"
                              >
                                <img
                                  src="~assets/img/read_star.png"
                                  class="mx-1"
                                />
                                READ MORE
                              </nuxt-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="detail-body-info">
                      <div class="card-description">
                        <div class="title">
                          {{ diamondItem.caratSize | toDecimalNumber }}
                          {{ diamondItem.shape }} diamond
                        </div>
                        <div class="size">
                          L {{ diamondItem.MeasLength }}mm x W
                          {{ diamondItem.MeasWidth }}mm x H
                          {{ diamondItem.MeasDepth }}mm
                        </div>
                      </div>
                      <div class="price">
                        <div class="first mt-4">
                          AUD ${{ formatPrice(currentMarkup) }}
                          <span>ex. GST</span>
                        </div>
                        <div class="second mt-2">
                          AUD ${{ formatPrice(currentMarkup * this.gstCount) }}
                          <span>inc. GST</span>
                        </div>
                      </div>
                      <div class="pair text-center">
                        <el-popover
                          placement="bottom"
                          width="200"
                          trigger="click"
                          popper-class="pair-popver"
                        >
                          <div>
                            <ul>
                              <li @click="addDiamondToPair(diamondItem)">
                                <button>engagement rings</button>
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
                      <div class="tech-info">
                        <div class="item-information">
                          <div class="title">CARAT</div>
                          <div class="text">
                            {{ diamondItem.caratSize | toDecimalNumber }}
                          </div>
                        </div>
                        <div class="item-information">
                          <div class="title">COLOUR</div>
                          <div class="text">{{ diamondItem.color }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">CLARITY</div>
                          <div class="text">{{ diamondItem.clarity }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">CUT</div>
                          <div class="text">
                            {{ returnCutTitle(diamondItem.cut) }}
                          </div>
                        </div>
                      </div>
                      <div class="btn-group">
                        <div class="w-100">
                          <div class="enqu" @click="sendEnquiry(diamondItem)">
                            ENQUIRY
                          </div>
                        </div>
                        <div class="w-100">
                          <div class="add" @click="addToBag(diamondItem)">
                            ADD TO BAG
                          </div>
                        </div>
                      </div>
                      <div class="remark mt-3">
                        <img src="~assets/img/Fill_1.png" />
                        <div class="text">
                          Free secure priority worldwide shipping
                        </div>
                      </div>
                      <div class="group-desc">
                        <div class="item-information">
                          <div class="title">REFERENCE NUMBER</div>
                          <div class="text">{{ diamondItem.referenceNum }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">CUT</div>
                          <div class="text">{{ diamondItem.cut }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">POLISH</div>
                          <div class="text">{{ diamondItem.pol }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">SYMMETRY</div>
                          <div class="text">{{ diamondItem.symetry }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">TABLE</div>
                          <div class="text">{{ diamondItem.tablePercent }}%</div>
                        </div>
                        <div class="item-information">
                          <div class="title">DEPTH</div>
                          <div class="text">{{ diamondItem.depthPercent }}%</div>
                        </div>
                        <div class="item-information">
                          <div class="title">FLUORESCENCE</div>
                          <div class="text">{{ diamondItem.fluorescence }}</div>
                        </div>
                        <div class="item-information">
                          <div class="title">CERTIFICATION</div>
                          <div
                            class="text"
                            style="cursor: pointer;text-decoration:underline"
                            @click="giaCertificateView(diamondItem.images.GIA)"
                          >
                            {{ diamondItem.certification }}
                          </div>
                        </div>
                      </div>
                      <div class="group-sharing">
                        <div
                          class="like"
                          @click="addToFavorites(diamondItem)"
                          v-if="isAuthenticated"
                        >
                          <img src="~assets/img/like.png" /> save
                        </div>
                        <nuxt-link class="like" to="/favorites/auth/login" v-else>
                          <img src="~assets/img/like.png" class="img-fluid" />
                          save
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

          <div class="diamond-detail-body-mobile d-block d-lg-none">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div
                    class="detail-body-mobile d-flex justify-content-center flex-column"
                  >
                    <div class="card-description">
                      <div class="title">
                        {{ diamondItem.caratSize | toDecimalNumber }}
                        {{ diamondItem.shape }} diamond
                      </div>
                      <div class="size">
                        L {{ diamondItem.MeasLength }}mm x W
                        {{ diamondItem.MeasWidth }}mm x H
                        {{ diamondItem.MeasDepth }}mm
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="slider-detail-images" v-if="diamondItem.images">
                    <div class="emblema-de">
                      <DetailLogoEmblem />
                    </div>

                    <slick id="carouselJewel"  class="diamondCarousel" :options="slickOptionsMobile">
                      <div class="slide">
                        <div v-if="videoExist">
                          <iframe v-if="!loadVideo"
                            :src="setSlider[0].data"
                            width="100%"
                            height="100%"
                            class="border-0 iframe-video-diamonds-360"
                            scrolling="no"
                          ></iframe>
                          <div v-else class="d-flex justify-content-center align-items-center">
                            <img src="../../assets/img/gifload.gif" alt="Loading" class="img-fluid"/>
                          </div>
                        </div>
                        <div v-else>
                          <img :src="setSlider[0].data" class="img-fluid w-100" />
                        </div>
                      </div>
                      <div
                        class="carousel-cell slide"
                        v-if="diamondItem.images.lines"
                      >
                        <div
                          class="flick-image position-relative"
                          :class="diamondItem.shape.toLowerCase()"
                        >
                          <img
                            :src="diamondItem.images.lines.front"
                            class="img-fluid w-100"
                          />
                          <div class="size_front">
                            <div class="width">
                              Width:
                              <br />
                              {{ diamondItem.MeasWidth }}
                            </div>
                            <div class="height">
                              Length:
                              <br />
                              {{ diamondItem.MeasLength }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="carousel-cell slide"
                        v-if="diamondItem.images.lines"
                      >
                        <div
                          class="flick-image position-relative"
                          :class="diamondItem.shape.toLowerCase()"
                        >
                          <img
                            :src="diamondItem.images.lines.side"
                            class="img-fluid w-100"
                          />
                          <div class="size_side">
                            <div class="depth">
                              Depth:
                              <br />
                              {{ diamondItem.depthPercent }}%
                            </div>
                            <div class="table-w">
                              Table:{{ diamondItem.tablePercent }}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="slide" v-if="diamondItem.images.GIA !== null">
                        <div
                          class="flick-image"
                          @click="giaCertificateView(diamondItem.images.GIA)"
                        >
                          <img
                            src="~assets/img/GIA_stacked.png"
                            class="img-fluid w-100"
                          />
                        </div>
                      </div>
                    </slick>
                  </div>
                </div>
                <div class="col-12">
                  <div
                    class="detail-body-mobile d-flex justify-content-center flex-column"
                  >
                    <div class="price">
                      <div class="first mt-4">
                        AUD ${{ formatPrice(currentMarkup) }}
                        <span>ex. GST</span>
                      </div>
                    </div>
                    <div class="pair text-center">
                      <el-button class="pair-button" @click="dialogPair = true">
                        <div class="title-btn">
                          <span class="add">
                            <Add />
                          </span>
                          pair with ...
                        </div>
                      </el-button>
                      <el-dialog
                        :show-close="false"
                        custom-class="pairMobileSelect"
                        :visible.sync="dialogPair"
                        width="100%"
                      >
                        <div class="container-pair-select">
                          <div class="head-pair-select">
                            <div class="title">PAIR WITH - SELECT A PRODUCT</div>
                            <div
                              class="close-pair-select"
                              @click="dialogPair = false"
                            >
                              <img
                                src="~assets/img/close-pair-mob.png"
                                class="img-fluid"
                              />
                            </div>
                          </div>
                          <div
                            class="pair-select"
                            @click="addDiamondToPair(diamondItem)"
                          >
                            <img
                              src="~assets/img/solitaire.png"
                              class="img-fluid"
                            />
                            engagement rings
                          </div>
                          <div
                            class="emblem-pair-select d-flex justify-content-center align-items-center"
                          >
                            <img
                              src="~assets/img/emblem-pair.png"
                              class="img-fluid"
                            />
                          </div>
                        </div>
                      </el-dialog>
                    </div>
                    <div class="tech-info">
                      <div class="item-information">
                        <div class="title">CARAT</div>
                        <div class="text">
                          {{ diamondItem.caratSize | toDecimalNumber }}
                        </div>
                      </div>
                      <div class="item-information">
                        <div class="title">COLOUR</div>
                        <div class="text">{{ diamondItem.color }}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">CLARITY</div>
                        <div class="text">{{ diamondItem.clarity }}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">CUT</div>
                        <div class="text">
                          {{ returnCutTitle(diamondItem.cut) }}
                        </div>
                      </div>
                    </div>
                    <div class="group-desc">
                      <div class="item-information">
                        <div class="title">REFERENCE NUMBER</div>
                        <div class="text">{{ diamondItem.referenceNum }}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">DEPTH</div>
                        <div class="text">{{ diamondItem.depthPercent }}%</div>
                      </div>
                      <div class="item-information">
                        <div class="title">TABLE</div>
                        <div class="text">{{ diamondItem.tablePercent }}%</div>
                      </div>
                      <div class="item-information">
                        <div class="title">POLISH</div>
                        <div class="text">{{ diamondItem.pol }}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">SYMMETRY</div>
                        <div class="text">{{ diamondItem.symetry }}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">FLUORESCENCE</div>
                        <div class="text">{{ diamondItem.fluorescence }}</div>
                      </div>
                      <div class="item-information">
                        <div class="title">CERTIFICATION</div>
                        <div
                          class="text"
                          style="cursor: pointer;"
                          @click="giaCertificateView(diamondItem.images.GIA)"
                        >
                          {{ diamondItem.certification }}
                        </div>
                      </div>
                    </div>
                    <div class="remark mt-3">
                      <img src="~assets/img/Fill_1.png" />
                      <div class="text">
                        Free secure priority worldwide shipping
                      </div>
                    </div>
                    <div class="group-sharing">
                      <div
                        class="like"
                        @click="addToFavorites(diamondItem)"
                        v-if="isAuthenticated"
                      >
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
      </div>
      <div class="d-block d-lg-none">
        <div class="action-btns-group">
          <div class="w-100">
            <div class="enqu" @click="sendEnquiry(diamondItem)">ENQUIRY</div>
          </div>
          <div class="w-100">
            <div class="add" @click="addToBag(diamondItem)">ADD TO BAG</div>
          </div>
        </div>
      </div>
      <!-- Share Modal -->


      <el-dialog :visible.sync="dialogVisible" custom-class="modalGia">
        <div class="header-gia-pop">
          <div class="title">GIA Certified</div>
          <span class="close-btn" @click="dialogVisible = false">
            <Close />
          </span>
        </div>
        <div class="body-gia-pop" v-if="diamondItem.images">
          <div v-if="diamondItem.images.GIA !== null" class="w-100 h-100">
            <img
              :src="diamondItem.images.GIA"
              width="100%"
              class="certificate_gia"
              v-if="
                diamondItem.images.GIA.endsWith('.jpg') ||
                  diamondItem.images.GIA.endsWith('.jpeg') ||
                  diamondItem.images.GIA.endsWith('.png')
              "
            />
            <embed
              :src="gia_image"
              width="100%"
              class="certificate_gia"
              v-else
            />
          </div>
        </div>
        <div class="footer-gia-pop">
          <div class="text" v-if="diamondItem.images">
            <div v-if="diamondItem.images.GIA !== null">
              <a :href="diamondItem.images.GIA" download
                >Click here to download the certificate</a
              >
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
            <div
              class="col-12 d-flex justify-content-center align-items-center"
            >
              <div class="welcome_pair mb-4">WELCOME TO PAIRING</div>
            </div>
            <div
              class="col-12 d-flex justify-content-center align-items-center p-0"
            >
              <img
                src="~assets/img/default/redirect_to_ring.png"
                class="img-fluid w-100"
              />
            </div>

            <div
              class="col-md-8 col-12 d-flex justify-content-center align-items-center my-4"
            >
              <nuxt-link
                class="redirect_link_pair"
                :to="{
                  name: 'categories-pair-id',
                  params: {
                    id: 'engagement_rings',
                    stone_shape: [...diamondItem.shape],
                    carats: diamondItem.caratSize
                  }
                }"
                >START PAIRING</nuxt-link
              >
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="showSharing"
                 center
                 :show-close="false"
                 custom-class="modalSharing">
        <ModalSharing :data="diamondItem.referenceNum" :type="'d'" @close-sharing="closeSharing"/>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Caret from "~/components/Elements/Icons/Caret-black";
import Add from "~/components/Elements/Icons/AddPair";
import DetailLogoEmblem from "~/components/Elements/Icons/DetailLogoEmblem";
import Close from "~/components/Elements/Icons/CloseIcon";
import ModalBag from "~/components/Shopping/ModalBag";

// Share Modal Component
import ModalSharing from '~/components/ModalSharing';

export default {
  data() {
    return {
      loadVideo: true,
      showSharing:false,
      gia_image: null,
      name: null,
      back_link: "",
      sharingLink: `https://dev.diamond.cyberchisel.com/diamonds-list/`,
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
      videoExist: false,
      flickityOptions: {
        prevNextButtons: false,
        pageDots: true
      },
      activeSlideImage: "",
      showModalBag: false,
      dialogVisible: false,
      redirectPairModal: false,
      shapeClass: "",
      dialogPair: false,
      // Share Modal Variables
      loading: false
    };
  },
  head() {
    return {
      title: `${this.diamondItem.shape ? this.diamondItem.shape : ""} diamond`,
      titleTemplate: `%s - ${
        this.diamondItem.referenceNum ? this.diamondItem.referenceNum : ""
      }`,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: `${
            this.diamondItem.shape ? this.diamondItem.shape : ""
          } diamond`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${
            this.diamondItem.shape ? this.diamondItem.shape : ""
          } diamond`
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.diamondItem.images ? this.diamondItem.images.main : ""
        },
        {
          hid: "og:image:url ",
          property: "og:image:url",
          content: this.diamondItem.images ? this.diamondItem.images.main : ""
        },
        { hid: "og:image:height", property: "og:image:height", content: "200" },
        { hid: "og:image:width", property: "og:image:width", content: "200" }
      ]
    };
  },
  components: {
    Caret,
    Add,
    ModalBag,
    DetailLogoEmblem,
    Close,
    ModalSharing
  },
  methods: {
    hiddeLoad(){
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
      } else if ( gia === '-') {
        this.dialogVisible = false;
      }else{
        this.gia_image = gia;
        this.dialogVisible = true;
      }
    },
    returnCutTitle(value) {
      switch (value) {
        case "Excellent":
          return "EX";
          break;
        case "Good":
          return "G";
          break;
        case "Very Good":
          return "VG";
          break;
        case "Ideal":
          return "DE";
          break;
        case "Fair":
          return "F";
          break;
        case "Poor":
          return "P";
          break;
        default:
          return "-";
      }
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
    continueShopping(value) {
      this.showModalBag = value;
    },

    addToFavorites(item) {
      let diamond = {
        item_id: item.referenceNum,
        item_type: "d",
        item_details: item
      };
      diamond.item_details.price = this.currentMarkup;
      this.$store
        .dispatch("addToFavorites", diamond)
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
    addToBag(item) {
      let diamond = {
        item_id: item.referenceNum,
        count: 1,
        price: this.currentMarkup,
        price_gst: this.currentMarkup * this.gstCount,
        item_type: "d",
        item_details: item
      };
      this.$store.dispatch("addToBag", diamond);
      this.showModalBag = true;
    },
    addDiamondToPair(item) {
      let diamond = {
        item_id: item.referenceNum,
        count: 1,
        price: this.currentMarkup,
        price_gst: this.currentMarkup * this.gstCount,
        item_type: "d",
        item_details: item
      };
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
    },

    getSlider() {
      let slider = [];

      let video = {
        data: this.diamondItem.video,
        type: "video",
        position: "none"
      };
      if (this.diamondItem.images) {
        var image_main = {
          data: this.diamondItem.images.main,
          type: "main",
          position: "none"
        };
        var image_front = {
          data: this.diamondItem.images.lines.front,
          type: this.diamondItem.shape,
          position: "front"
        };
        var image_side = {
          data: this.diamondItem.images.lines.side,
          type: this.diamondItem.shape,
          position: "side"
        };
        var gia = {
          data: this.diamondItem.images.GIA,
          type: "gia",
          position: "none"
        };
      }
      if (this.diamondItem.video) {
        this.videoExist = true;
        slider.push(video, image_front, image_side, gia);
      } else {
        this.videoExist = false;
        slider.push(image_main, image_front, image_side, gia);
      }
      return slider;
    },

    reInit() {
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },

  },
  computed: {
    ...mapGetters([
      "diamondItem",
      "gstCount",
      "markupValue",
      "isAuthenticated"
    ]),
    setSlider() {
      return this.getSlider();
    },
    currentMarkup() {
      let price = this.diamondItem.price;
      let current_price =
        this.diamondItem.custom_price || this.diamondItem.price_aud;
      if (
        this.diamondItem.custom_price !== null &&
        this.diamondItem.custom_price > 0
      ) {
        //Convert custom price from aud into usd to get right margin and shipping price
        price =
          this.diamondItem.custom_price * (price / this.diamondItem.price_aud);
      }
      let value = price;
      this.markupValue.find(item => {
        if (item.from_price <= price && item.to_price >= price) {
          value =
            current_price / ((100 - item.percent.max) / 100) +
              item.shipping_price || 0;
        }
      });
      return Math.round(value);
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchDiamond", this.$route.params.id).then(res => {
      this.loading = false;
      this.hiddeLoad();
    });

    this.$store.dispatch("fetchMarkup");
    this.$store.dispatch("fetchGst");
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.back_link = from.fullPath;
    });
  }
};
</script>
<style lang="scss">
.pairMobileSelect {
  padding-left: 20px;
  padding-right: 20px;
  .el-dialog__header {
    display: none;
    padding: 0;
  }
  .container-pair-select {
    position: relative;
    padding-bottom: 150px;
    .emblem-pair-select {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .head-pair-select {
      border-bottom: 1px solid #dae9f5;
      .title {
        color: #253650;
        font-family: lato-bold;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1.2px;
        line-height: 18px;
        text-transform: uppercase;
        padding: 10px;
      }
      .close-pair-select {
        position: absolute;
        top: 5px;
        right: 10px;
      }
    }
    .pair-select {
      padding-top: 70px;
      justify-content: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      font-family: lato-bold;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1.44px;
      text-transform: uppercase;
      color: #253650;
      img {
        margin-bottom: 20px;
        width: 100px;
      }
    }
  }
}
</style>
<style scoped lang="scss">
.flick-image {
  &.round {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.cushion {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.princess {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.oval {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.pear {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.asscher {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.marquise {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.emerald {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.radiant {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.heart {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
      }
    }
  }
  &.trilliant {
    .size_front {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .width {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        bottom: 120px;
        left: 100px;
      }
      .height {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        position: absolute;
        top: 55px;
        left: 180px;
      }
    }
    .size_side {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      .table-w {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;

        //table
        top: 45px;
        right: 143px;
      }
      .depth {
        background: #fff;
        color: #000000;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;

        position: absolute;
        //depth
        bottom: 120px;
        left: 50px;
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
          left: 100px;
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
          top: 55px;
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

.iframe-video-diamonds-360 {
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-overflow: hidden;
  -webkit-overflow-scrolling: hidden;

  @media (max-width: 1200px) {
    position: relative;
    height: 360px;
    overflow: hidden;
  }
}

.loading {
  margin: 50px 0;
  display: flex;
  justify-content: center;
}
</style>
