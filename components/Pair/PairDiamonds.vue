<template>
  <div>
    <div id="pair-component-mobile">
      <div class="select_mobile_pairing">
        <div class="col-12">
          <div class="row">
            <div class="col-4">
              <div
                class="side-1"
                :class="status_pair_block === 'side_first' ? 'active': ''"
                v-if="ring_pair.item_details && ring_pair.item_details.sidestones_info.nubmer_of_stones > 0"
                @click="switchArrayType(type='side_first')"
              >
                <div class="box-diamond" v-if="side_first_diamond.item_details">
                  <img :src="side_first_diamond.item_details.images.main+'?w=45'" class="img-fluid" />
                </div>
                <div class="box-diamond-empty" v-else>SELECT 1 ST DIAMOND</div>
              </div>
            </div>
            <div class="col-4">
              <div
                class="center"
                :class="status_pair_block === 'center' ? 'active': ''"
                @click="switchArrayType(type='center')"
              >
                <div class="box-diamond" v-if="center_diamond.item_details">
                  <img :src="center_diamond.item_details.images.main+'?w=45'" class="img-fluid" />
                </div>
                <div class="box-diamond-empty" v-else>SELECT CENTER DIAMOND</div>
              </div>
            </div>
            <div class="col-4">
              <div
                class="side-2"
                :class="status_pair_block === 'side_second' ? 'active': ''"
                v-if="multiSecondSelect"
                @click="switchArrayType(type='side_second')"
              >
                <div class="box-diamond" v-if="side_second_diamond.item_details">
                  <img
                    :src="side_second_diamond.item_details.images.main+'?w=45'"
                    class="img-fluid"
                  />
                </div>
                <div class="box-diamond-empty" v-else>SELECT 2 ND DIAMOND</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="show-pair-select" @click="dialogPair = true">finish pairing</button>
      <el-dialog
        top="0"
        title="summary"
        custom-class="pairComponentMobile"
        :visible.sync="dialogPair"
        width="100%"
      >
        <div class="d-flex flex-column">
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <div class="diamond-item-pair" v-if="Object.keys(ring_pair).length">
                  <div class="header row justify-content-between">
                    <div class="col-6">
                      <div class="title">Your setting:</div>
                    </div>
                    <div class="col-6">
                      <div @click="removeProductRing" class="change">change</div>
                    </div>
                  </div>

                  <div class="content my-3">
                    <div class="d-flex">
                      <div class="content-img">
                        <img
                          :src="baseUrl + ring_pair.item_details.images.main.image+'?w=45'"
                          class="img-fluid"
                        />
                      </div>
                      <div class="content-info ml-2">
                        <div class="ref-number">REF. {{ring_pair.item_id}}</div>
                        <div class="title">{{ring_pair.item_details.title}} diamond</div>
                      </div>
                    </div>
                    <div class="content-price">${{ring_pair.price}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="diamond-item-pair" v-if="center_diamond.item_details">
                    <div class="header row justify-content-between">
                      <div class="col-6">
                        <div class="title">your diamond:</div>
                      </div>
                      <div class="col-6">
                        <div
                          @click="removeProductDiamond(type='center'), switchArrayType(type='center')"
                          class="change"
                        >change</div>
                      </div>
                    </div>

                    <div class="content my-3">
                      <div class="d-flex">
                        <div class="content-img">
                          <img
                            :src="center_diamond.item_details.images.main+'?w=45'"
                            class="img-fluid"
                          />
                        </div>
                        <div class="content-info ml-2">
                          <div class="ref-number">REF. {{center_diamond.item_id}}</div>
                          <div
                            class="title"
                          >{{center_diamond.item_details.caratSize | toDecimalNumber}} {{center_diamond.item_details.shape}} diamond</div>
                        </div>
                      </div>
                      <div class="content-price">${{center_diamond.price}}</div>
                    </div>
                    <div class="content-special mx-4 mb-4">
                      <div class="info-block d-flex justify-content-between">
                        <div class="info-box">
                          <span>carat</span>
                          <span>{{center_diamond.item_details.caratSize | toDecimalNumber}}</span>
                        </div>
                        <div class="info-box">
                          <span>COLOUR</span>
                          <span>{{center_diamond.item_details.color}}</span>
                        </div>
                        <div class="info-box">
                          <span>CLARITY</span>
                          <span>{{center_diamond.item_details.clarity}}</span>
                        </div>
                        <div class="info-box ollla">
                          <span>CUT</span>
                          <span>{{ returnCutTitle(center_diamond.item_details.cut) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="diamond-item-pair" v-if="side_first_diamond.item_details">
                    <div class="header row justify-content-between">
                      <div class="col-6">
                        <div class="title">your diamond:</div>
                      </div>
                      <div class="col-6">
                        <div
                          @click="removeProductDiamond(type='side_first'), switchArrayType(type='side_first')"
                          class="change"
                        >change</div>
                      </div>
                    </div>

                    <div class="content my-3">
                      <div class="d-flex">
                        <div class="content-img">
                          <img
                            :src="side_first_diamond.item_details.images.main+'?w=45'"
                            class="img-fluid"
                          />
                        </div>
                        <div class="content-info ml-2">
                          <div class="ref-number">REF. {{side_first_diamond.item_id}}</div>
                          <div
                            class="title"
                          >{{side_first_diamond.item_details.caratSize | toDecimalNumber}} {{side_first_diamond.item_details.shape}} diamond</div>
                        </div>
                      </div>
                      <div class="content-price">${{side_first_diamond.price}}</div>
                    </div>
                    <div class="content-special mx-4 mb-4">
                      <div class="info-block d-flex justify-content-between">
                        <div class="info-box">
                          <span>carat</span>
                          <span>{{side_first_diamond.item_details.caratSize | toDecimalNumber}}</span>
                        </div>
                        <div class="info-box">
                          <span>COLOUR</span>
                          <span>{{side_first_diamond.item_details.color}}</span>
                        </div>
                        <div class="info-box">
                          <span>CLARITY</span>
                          <span>{{side_first_diamond.item_details.clarity}}</span>
                        </div>
                        <div class="info-box">
                          <span>CUT</span>
                          <span>{{ returnCutTitle(side_first_diamond.item_details.cut) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="diamond-item-pair" v-if="side_second_diamond.item_details">
                    <div class="header row justify-content-between">
                      <div class="col-6">
                        <div class="title">your diamond:</div>
                      </div>
                      <div class="col-6">
                        <div
                          @click="removeProductDiamond(type='side_second'), switchArrayType(type='side_second')"
                          class="change"
                        >change</div>
                      </div>
                    </div>

                    <div class="content my-3">
                      <div class="d-flex">
                        <div class="content-img">
                          <img
                            :src="side_second_diamond.item_details.images.main+'?w=45'"
                            class="img-fluid"
                          />
                        </div>
                        <div class="content-info ml-2">
                          <div class="ref-number">REF. {{side_second_diamond.item_id}}</div>
                          <div
                            class="title"
                          >{{side_second_diamond.item_details.caratSize | toDecimalNumber}} {{side_second_diamond.item_details.shape}} diamond</div>
                        </div>
                      </div>
                      <div class="content-price">${{side_second_diamond.price}}</div>
                    </div>
                    <div class="content-special mx-4 mb-4">
                      <div class="info-block d-flex justify-content-between">
                        <div class="info-box">
                          <span>carat</span>
                          <span>{{side_second_diamond.item_details.caratSize | toDecimalNumber}}</span>
                        </div>
                        <div class="info-box">
                          <span>COLOUR</span>
                          <span>{{side_second_diamond.item_details.color}}</span>
                        </div>
                        <div class="info-box">
                          <span>CLARITY</span>
                          <span>{{side_second_diamond.item_details.clarity}}</span>
                        </div>
                        <div class="info-box">
                          <span>CUT</span>
                          <span>{{ returnCutTitle(side_second_diamond.item_details.cut) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <div class="diamond-pair-total">
                  <div class="header-total row justify-content-between">
                    <div class="col-6">
                      <div class="title">total</div>
                    </div>
                    <div class="col-6">
                      <div class="price">${{totalPrice}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="group-buttons">
                <a
                  href="#"
                  class="enquiry"
                  :class="Object.entries(center_diamond).length !== 0 ? 'active' : 'disabled'"
                  @click="sendEnquiry"
                >ENQUIRY</a>
                <div
                  class="bag"
                  :class="Object.entries(center_diamond).length !== 0 ? 'active' : 'disabled'"
                  @click="addToBagPair"
                >add to bag</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <section class="container-fluid" id="pair-component">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-8 pair-items">
              <div class="row">
                <div>
                  <div class="step-title">
                    <span>STEP 1</span> SELECT A SETTING
                  </div>
                  <div class="item" v-if="ring_pair.item_details">
                    <div class="img-item" v-if="ring_pair.item_details.images">
                      <img
                        :src="baseUrl + ring_pair.item_details.images.main.image"
                        class="img-fluid"
                      />
                    </div>
                    <div class="info-item">
                      <div class="title">{{ring_pair.item_details.title}}</div>

                      <div v-if="ring_pair.item_details.metals_select">
                        <div class="description" v-if="ring_pair.item_details.metals_select.value">
                          <div>{{ring_pair.item_details.metals_select.value.title}}</div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="description" v-if="ring_pair.item_details.metal">
                          <div>{{ring_pair.item_details.metal.title}}</div>
                        </div>
                      </div>

                      <div v-if="ring_pair.item_details.stone_shape_select">
                        <div
                          class="description"
                          v-if="ring_pair.item_details.stone_shape_select.value"
                        >Ring size: {{ring_pair.item_details.stone_shape_select.value.title}}</div>
                      </div>
                      <div v-else>
                        <div
                          class="select-size"
                          v-for="(option,key, index) in setOptions(ring_pair.item_details.variants)"
                          :key="index"
                          v-if="key === 'ring_size'"
                        >
                          <div class="title-select">Ring size:</div>
                          <el-select
                            v-model="ring_size"
                            popper-class="select-shopp"
                            size="mini"
                            @change="handleChange(ring_pair, ring_size)"
                          >
                            <el-option
                              class="text-center"
                              v-for="(item, index) in option"
                              :key="index"
                              :label="`${item.value.prefix ? item.value.prefix  : ''} ${item.value.title}`"
                              :value="item"
                            ></el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                    <div @click="removeProductRing" class="remove_ring">
                      <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                    </div>
                  </div>
                  <div class="item-pair" v-else>
                    <nuxt-link
                      to="/categories/category/engagement_rings"
                      class="text-center text-decoration-none"
                    >
                      <img src="~assets/img/default/pair-img.png" class="img-fluid" />
                      <div class="text">select a setting</div>
                    </nuxt-link>
                  </div>
                </div>

                <div
                  class="with-title"
                  :class="multiEmpty ? 'mx-5' : ''"
                >{{ Object.entries(center_diamond).length !== 0 ? 'PAIRED WITH:' : 'PAIR WITH:'}}</div>
                <div>
                  <div class="step-title">
                    <span>STEP 2</span> SELECT A DIAMONDS
                  </div>
                  <div hidden>{{watchProviderDiamond}}</div>

                  <div
                    class="d-flex"
                    :class="multiFirstSelect ? 'multi-block1' : multiSecondSelect ? 'multi-block2' : '' "
                  >
                    <div
                      class="d-flex side-1"
                      :class="status_pair_block === 'side_first' ? 'active': ''"
                      v-if="ring_pair.item_details && ring_pair.item_details.sidestones_info.nubmer_of_stones > 0"
                      @click="switchArrayType(type='side_first')"
                    >
                      <div class="item-pair-diamond" v-if="side_first_diamond.item_details">
                        <div class="img-item">
                          <img :src="side_first_diamond.item_details.images.main" class="img-fluid" />
                        </div>
                        <div class="info-item">
                          <div
                            class="ref-number"
                          >REF. {{side_first_diamond.item_details.referenceNum}}</div>
                          <div
                            class="title"
                          >{{side_first_diamond.item_details.caratSize | toDecimalNumber}} {{side_first_diamond.item_details.shape}} diamond</div>
                          <div class="description">
                            L {{side_first_diamond.item_details.MeasLength}}mm x
                            W {{side_first_diamond.item_details.MeasWidth}}mm x
                            H {{side_first_diamond.item_details.MeasDepth}}mm
                          </div>
                        </div>
                        <div class="remove_ring" @click="removeProductDiamond(type='side_first')">
                          <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                        </div>
                      </div>
                      <div class="item-pair" v-else>
                        <img src="~assets/img/default/pair-img-diamond.png" class="img-fluid" />
                        <div class="text">SELECT 1 ST DIAMOND</div>
                      </div>
                    </div>
                    <div
                      class="d-flex center"
                      :class="status_pair_block === 'center' ? 'active': ''"
                      @click="switchArrayType(type='center')"
                    >
                      <div class="item-pair-diamond" v-if="center_diamond.item_details">
                        <div class="img-item">
                          <img :src="center_diamond.item_details.images.main" class="img-fluid" />
                        </div>
                        <div class="info-item">
                          <div class="ref-number">REF. {{center_diamond.item_details.referenceNum}}</div>
                          <div
                            class="title"
                          >{{center_diamond.item_details.caratSize | toDecimalNumber}} {{center_diamond.item_details.shape}} diamond</div>
                          <div class="description">
                            L {{center_diamond.item_details.MeasLength}}mm x
                            W {{center_diamond.item_details.MeasWidth}}mm x
                            H {{center_diamond.item_details.MeasDepth}}mm
                          </div>
                        </div>
                        <div class="remove_ring" @click="removeProductDiamond(type='center')">
                          <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                        </div>
                      </div>
                      <div class="item-pair" v-else>
                        <img src="~assets/img/default/pair-img-diamond.png" class="img-fluid" />
                        <div class="text">SELECT CENTER DIAMOND</div>
                      </div>
                    </div>
                    <div
                      class="d-flex side-2"
                      :class="status_pair_block === 'side_second' ? 'active': ''"
                      v-if="multiSecondSelect"
                      @click="switchArrayType(type='side_second')"
                    >
                      <div class="item-pair-diamond" v-if="side_second_diamond.item_details">
                        <div class="img-item">
                          <img
                            :src="side_second_diamond.item_details.images.main"
                            class="img-fluid"
                          />
                        </div>
                        <div class="info-item">
                          <div
                            class="ref-number"
                          >REF. {{side_second_diamond.item_details.referenceNum}}</div>
                          <div
                            class="title"
                          >{{side_second_diamond.item_details.caratSize | toDecimalNumber}} {{side_second_diamond.item_details.shape}} diamond</div>
                          <div class="description">
                            L {{side_second_diamond.item_details.MeasLength}}mm x
                            W {{side_second_diamond.item_details.MeasWidth}}mm x
                            H {{side_second_diamond.item_details.MeasDepth}}mm
                          </div>
                        </div>
                        <div class="remove_ring" @click="removeProductDiamond(type='side_second')">
                          <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                        </div>
                      </div>
                      <div class="item-pair" v-else>
                        <img src="~assets/img/default/pair-img-diamond.png" class="img-fluid" />
                        <div class="text">SELECT 2 ND DIAMOND</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 pair-price">
              <div class="row justify-content-end">
                <div @click="removeProductRing" class="close-pair-component">
                  <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                </div>
                <div class="col-12 col-md-11">
                  <div class="info-price mb-4 mt-2">
                    <div class="title">
                      <div v-if="Object.entries(center_diamond).length !== 0">Setting + Diamond</div>
                      <div v-else>Setting</div>
                      <span>Price ex. GST</span>
                    </div>
                    <div class="price">AUD ${{totalPrice}}</div>
                  </div>
                  <div class="group-buttons mb-3">
                    <a
                      v-if="Object.entries(center_diamond).length !== 0"
                      href="#"
                      class="enquiry active"
                      @click="sendEnquiry"
                    >ENQUIRY</a>
                    <a v-else href="#" class="enquiry disabled">ENQUIRY</a>
                    <a
                      v-if="Object.entries(center_diamond).length !== 0"
                      href="#"
                      class="bag active"
                      @click="addToBagPair"
                    >add to bag</a>
                    <a v-else href="#" class="bag disabled">add to bag</a>
                  </div>
                  <div class="group-social">
                    <nuxt-link class="m-2" to="/favorites/auth/login">
                      <img src="~assets/img/like.png" class="m-1" />save
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <el-dialog
      :visible.sync="showModalBag"
      center
      :show-close="false"
      custom-class="modalShoppingBag"
    >
      <ModalBagPair @cont_shop="continueShopping" @redir_shop="redirectShop" />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalBagPair from "~/components/Shopping/ModalBagPair";

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      active: false,
      showModalBag: false,

      ring_size: {},
      dialogPair: false,
    };
  },
  components: {
    ModalBagPair
  },
  computed: {
    ...mapGetters([
      "ring_pair",
      "center_diamond",
      "side_first_diamond",
      "side_second_diamond",
      "status_pair_block"
    ]),
    watchProviderDiamond() {
      if (Object.entries(this.$store.getters.side_first_diamond).length !== 0) {
        if (
          this.$store.getters.side_first_diamond.item_details.provider ===
          "rapnet"
        ) {
          console.log("test");
          this.$store.dispatch("switchArrayDiamond", "side_second");
          this.$store.dispatch("addDiamond", this.side_first_diamond);
          return false;
        }
        return false;
      }
    },
    totalPrice() {
      let price_ring = this.$store.getters.ring_pair.price || 0;
      let price_center = this.$store.getters.center_diamond.price || 0;
      let price_side_first = this.$store.getters.side_first_diamond.price || 0;
      let price_side_second =
        this.$store.getters.side_second_diamond.price || 0;
      let price_size = this.ring_size.price || 0;

      return (
        price_ring +
        price_size +
        price_center +
        price_side_first +
        price_side_second
      );
    },
    multiFirstSelect() {
      return (
        this.ring_pair.item_details &&
        this.ring_pair.item_details.sidestones_info.nubmer_of_stones === 1
      );
    },
    multiSecondSelect() {
      return (
        this.ring_pair.item_details &&
        this.ring_pair.item_details.sidestones_info.nubmer_of_stones === 2
      );
    },
    multiEmpty() {
      return (
        this.ring_pair.item_details &&
        this.ring_pair.item_details.sidestones_info.nubmer_of_stones === 0
      );
    }
  },

  filters: {
    price: function(value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    ...mapActions(["removeProductRing", "removeProductDiamond"]),
    returnCutTitle(value) {
      switch (value) {
        case "Exellent":
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
      }
    },
    switchArrayType(type) {
      this.$store.dispatch("switchArrayDiamond", type);

      if (type === "side_first") {
        let count = {};
        if (Object.entries(this.center_diamond).length !== 0) {
          count = this.center_diamond.item_details.caratSize;
        }
        let filter = {
          forsidestone: {
            carat: count
          }
        };
        this.$emit("firstSideFilter", filter);
      } else if (
        type === "side_second" &&
        Object.entries(this.side_first_diamond).length !== 0
      ) {
        let filter = {
          account_id: [this.side_first_diamond.item_details.account_id],
          shape: [this.side_first_diamond.item_details.shape],
          colours: [this.side_first_diamond.item_details.color],
          certification: this.side_first_diamond.item_details.certification,
          clarity: [this.side_first_diamond.item_details.clarity],
          cut: [this.side_first_diamond.item_details.cut],
          width: this.side_first_diamond.item_details.MeasWidth,
          length: this.side_first_diamond.item_details.MeasLength
        };
        this.$emit("firstSideFilter", filter);
      } else {
        let reset = (this.filters = {
          page: 1,
          sort: null,
          shape: []
        });
        this.$store.dispatch("fetchDiamondsParams", reset);
      }
    },

    setOptions(values) {
      if (Array.isArray(values)) {
        let group = {};
        values.forEach((elem, index) => {
          if (!group[elem.alias]) group[elem.alias] = [];
          group[elem.alias].push({
            id: elem.pivot.id,
            alias: elem.alias || "",
            image: elem.pivot.image || "",
            price: elem.pivot.price || "",
            value: elem.pivot.value || []
          });
        });
        return group;
      } else {
        return values;
      }
    },

    sendEnquiry() {
      this.$store.dispatch("cleareEnquiry");
      let numbers = [
        this.ring_pair,
        this.center_diamond,
        this.side_first_diamond,
        this.side_second_diamond
      ];

      this.$store.dispatch("sendEnquiry", numbers);
      this.$nuxt.$router.push({ path: "/dynamic-pages/contact_us" });
    },
    continueShopping(value) {
      this.$store.dispatch("clearModalPair");
      this.showModalBag = value;
    },
    redirectShop(value) {
      this.$store.dispatch("clearModalPair");
      this.showModalBag = value;
      this.$nuxt.$router.push({ name: "shopping-bag" });
    },
    handleChange(item, value) {
      item.item_details.stone_shape_select = value;

      this.$store.dispatch("addSelectSize", {
        item_id: item.item_id,
        stone_shape_select: item.item_details.stone_shape_select
      });
      this.$store.dispatch("addSelectPrice", {
        item_id: item.item_id,
        price: item.price
      });
    },
    addToBagPair() {
      this.$store.dispatch("clearModalPair");

      this.$forceUpdate();
      let list = [this.ring_pair, this.center_diamond];
      if (Object.keys(this.side_first_diamond).length) {
        list.push(this.side_first_diamond);
      }
      if (Object.keys(this.side_second_diamond).length) {
        list.push(this.side_second_diamond);
      }
      this.$store.dispatch("addToBagPair", list);
      console.log("asd");
      this.showModalBag = true;
    },
    removeProductRing() {
      this.$store.dispatch("removeProductRing");
      this.$store.dispatch("removeFromStateAll");
      this.$nuxt.$router.push({
        name: "categories-category-id",
        params: { id: "engagement_rings" }
      });
    },
    removeProductDiamond(item) {
      this.$store.dispatch("removeFromState", item);

      if (item === "side_first") {
        let reset = (this.filters = {
          page: 1,
          sort: null,
          shape: []
        });
        this.$store.dispatch("fetchDiamondsParams", reset);
      }
    }
  },
  watch: {},
  created() {
    this.$forceUpdate();
  }
};
</script>

<style lang="scss">
.pair-items {
  .side-1,
  .side-2,
  .center {
    &.active {
      .item-pair {
        opacity: 1;
      }
    }
    .item-pair {
      opacity: 0.5;
    }
  }
}
.errorPair {
  border-top: 4px solid #cae3f6;
  border-bottom: 4px solid #cae3f6;
  width: 40%;
  @media (max-width: 525px) {
    width: 100%;
  }
  .el-dialog__header {
    padding: 0;
  }
  .description {
    margin-top: 50px;
    color: #24354f;
    font-family: lato-reg;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.31px;
    line-height: 24px;
  }
  .close-btn {
    color: #6daee2;
    border: none;
    font-family: lato-bold;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3.1px;
    text-transform: uppercase;
    &:hover,
    &:focus,
    &:active {
      background-color: transparent;
      outline: none;
      box-shadow: none;
    }
  }
  .title {
    color: #24354f;
    font-family: lato-bold;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3.62px;
    text-transform: uppercase;
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #cae3f6;

    width: 260px;
    margin: 0 auto;
  }
}
</style>

