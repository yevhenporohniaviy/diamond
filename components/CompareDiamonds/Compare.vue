<template>
  <section>
    <div class="container p-0" v-if="list_cart.length > 0">
      <div class="col-12">
        <div class="row">
          <div class="header-comparison">
            <div
              class="title"
              @click="show = !show"
              :class="show && 'active'"
              v-scroll-to="{
                   el: 'body',
                    offset: 0 }"
            >
              <CompareDiamond />
              <span>VIEW DIAMOND COMPARISON</span>

              <el-tooltip effect="light" content="expand" placement="top">
                <Caret />
              </el-tooltip>
            </div>
            <div class="cancel" @click="dialogVisible = true">CANCEL</div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="col-12" id="show-compare-detail" v-if="show">
          <div class="row">
            <div class="body-comparison d-flex">
              <div class="options">
                <div class="de-selected">{{list_cart.length}} DIAMONDS SELECTED</div>
                <div class="wtf">THE 4 C’s</div>
                <div class="short-list">
                  <ul>
                    <li>SHAPE</li>
                    <li>CUT</li>
                    <li>CARAT</li>
                    <li>COLOUR</li>
                    <li>CLARITY</li>
                    <li>DEPTH</li>
                    <li>TABLE</li>
                    <li>POLISH</li>
                    <li>SYMMETRY</li>
                    <li>GIRDLE</li>
                    <li>FLUORESCENCE</li>
                    <li>MEASUREMENTS</li>
                    <li>CERTIFICATION</li>
                  </ul>
                </div>
              </div>
              <div class="cards" v-if="list_cart">
                <div class="item-card-selected" v-for="(item) in list_cart" :key="item.item_id">
                  <div
                    class="remove-compare"
                    @click="dialogVisible = true"
                    v-if="list_cart.length === 1"
                  >
                    <img src="~assets/img/remove_compare.png" class="img-fluid" />
                  </div>

                  <div class="remove-compare" @click="removeFromCart(item)" v-else>
                    <img src="~assets/img/remove_compare.png" class="img-fluid" />
                  </div>
                  <div class="header">
                    <img class="img-fluid de-image" :src="item.item_details.images.main" />
                    <div class="de-title">
                      <div class="price">
                        AUD ${{formatPrice(item.price)}}
                        <span class="ml-1">ex. GST</span>
                      </div>
                      <div class="info-size">
                        L {{item.item_details.MeasLength}}mm x
                        W {{item.item_details.MeasWidth}}mm x
                        H {{item.item_details.MeasDepth}}mm
                      </div>
                    </div>
                  </div>
                  <div class="info-block d-flex justify-content-between">
                    <div class="info-box">
                      <span>carat</span>
                      <span>{{item.item_details.caratSize ? setDecimalNumber(item.item_details.caratSize) : '-' }}</span>
                    </div>
                    <div class="info-box">
                      <span>COLOUR</span>
                      <span>{{item.item_details.color ? item.item_details.color : '-'}}</span>
                    </div>
                    <div class="info-box">
                      <span>CLARITY</span>
                      <span>{{item.item_details.clarity ? item.item_details.clarity : '-'}}</span>
                    </div>
                    <div class="info-box">
                      <span>CUT</span>
                      <span>{{item.item_details.cut ? item.item_details.cut : '-'}}</span>
                    </div>
                  </div>
                  <div class="action-group-btn">
                    <div class="detail">
                      <nuxt-link
                        class="detail-button"
                        :to="{name: 'diamonds-list-id', params: { id: item.item_id} }"
                      >
                        <div class="title-btn">
                          <span class="add">
                            <img class="img-fluid" src="~assets/img/view.svg" />
                          </span>
                          VIEW DETAILS
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="pair text-center">
                      <el-popover
                        placement="bottom"
                        width="200"
                        trigger="hover"
                        popper-class="pair-popver"
                      >
                        <div>
                          <ul>
                            <li @click="addDiamondToPair(item)">
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
                  </div>
                  <div class="short-list">
                    <ul>
                      <li>{{item.item_details.shape ? item.item_details.shape : '-'}}</li>
                      <li>{{item.item_details.cut ? item.item_details.cut : '-'}}</li>
                      <li>{{item.item_details.caratSize ? setDecimalNumber(item.item_details.caratSize) : '-'}}</li>
                      <li>{{item.item_details.color ? item.item_details.color : '-'}}</li>
                      <li>{{item.item_details.clarity ? item.item_details.clarity : '-'}}</li>
                      <li>{{item.item_details.depthPercent ? item.item_details.depthPercent + '%' : '-'}}</li>
                      <li>{{item.item_details.tablePercent ? item.item_details.tablePercent + '%' : '-'}}</li>
                      <li>{{item.item_details.pol ? item.item_details.pol : '-'}}</li>
                      <li>{{item.item_details.symetry ? item.item_details.symetry : '-'}}</li>
                      <li>-</li>
                      <li>{{item.item_details.fluorescence ? item.item_details.fluorescence : '-'}}</li>
                      <li>
                        {{item.item_details.MeasWidth}} x
                        {{item.item_details.MeasDepth}} x
                        {{item.item_details.MeasLength}}
                      </li>
                      <li>{{item.item_details.certification ? item.item_details.certification : '-'}}</li>
                    </ul>
                  </div>
                  <div class="add-bag">
                    <div class="bag-button" @click="addToBag(item)">
                      <div class="title-btn">ADD TO BAG</div>
                    </div>
                  </div>
                  <div class="social-block d-flex justify-content-center">
                    <div class="save" @click="addToFavorites(item)" v-if="isAuthenticated">
                      <img src="~assets/img/like.png" class="img-fluid" /> save
                    </div>
                    <nuxt-link class="save" to="/favorites/auth/login" v-else>
                      <img src="~assets/img/like.png" class="img-fluid" /> save
                    </nuxt-link>

                    <span>|</span>
                    <div class="share d-flex" @click="openSharing(item.item_id , item.item_type)">
                      <img src="~assets/img/share.png" class="img-fluid" />

                        <div>
                          Share
                        </div>

                    </div>
                  </div>
                </div>
                <div class="item-card">
                  <div class="title">SELECT ANOTHER TO COMPARE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <el-dialog :visible.sync="dialogVisible" custom-class="confirmLeave">
      <div class="container">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="title mt-3 col-12">LEAVE Diamond COMPARISON</div>
          <div class="description text-center">Are you sure you want to leave ?</div>
          <div class="social-action">
            <div
              class="leave-btn"
              @click="cancelFromCart(); dialogVisible = false; show = false"
            >YES, LEAVE</div>
            <div class="stay-btn" type="primary" @click="dialogVisible = false">Stay</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="status" custom-class="confirmLeave" :show-close="false">
      <div class="container">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="title mt-3 col-12">Diamond COMPARISON</div>
          <div class="description text-center">This diamond has already been added to comparison</div>
          <div class="social-action">
            <div class="leave-btn" @click="closeModal()">close</div>
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
              :to="{name: redirect.name, params: { id: redirect.id, filter: { stone_shape: [ ...redirect.stone_shape ] , carats: redirect.carats} } } "
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
      <ModalSharing :data="this.dataSharing.id" :type="this.dataSharing.type" @close-sharing="closeSharing"/>
    </el-dialog>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Add from "~/components/Elements/Icons/AddPair";
import Caret from "~/components/Elements/Icons/Caret-black";
import CompareDiamond from "~/components/Elements/Icons/CompareDiamond";
import ModalSharing from '~/components/ModalSharing';

// Share Modal Component

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      redirectPairModal: false,
      dialogVisible: false,
      show: false,
      active: false,
      redirect: {},
      showSharing:false,
      dataSharing:{}
    };
  },
  components: {
    Add,
    Caret,
    CompareDiamond,
    ModalSharing
  },
  computed: {
    ...mapGetters(["list_cart", "status", "compare_list", "isAuthenticated"]),

    compare() {
      return this.compare_list || [];
    }
  },
  methods: {
    openSharing(id, type){
      this.dataSharing = {
        id:id,
        type:type
      }
      this.showSharing = true
    },
    closeSharing(){
      this.showSharing = false
    },
    setDecimalNumber(number) {
      return parseFloat(number).toFixed(2);
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
      let redirect_pair = {
        id: "engagement_rings",
        name: "categories-pair-id",
        stone_shape: diamond.item_details.shape,
        carats: diamond.item_details.caratSize
      };
      this.redirect = Object.assign({}, redirect_pair);
      this.redirectPairModal = true;
      this.$store.dispatch("addDiamondToPair", diamond);
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
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
      let arr = this.compare;

      this.$router.push({ path: this.$route.path, query: { compare: [arr] } });
    },
    cancelFromCart() {
      this.$store.commit("cancelFromCart");
      let arr = this.compare;

      this.$router.push({ path: this.$route.path, query: { compare: [arr] } });
    },
    closeModal() {
      this.$store.commit("closeModal");
    }
  }
};
</script>


