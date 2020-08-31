<template>
  <section>
    <div
      class="container p-0"
      v-if="typeof list_engagement[alias] !== 'undefined' && list_engagement[alias].length > 0"
    >
      <div class="col-12">
        <div class="row">
          <div class="header-comparison">
            <div
              class="title"
              @click="show = !show"
              :class="show ? 'active' : ''"
              v-scroll-to="{
                   el: 'body',
                    offset: 0 }"><CompareDiamond/><span>VIEW RING COMPARISON</span>

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

                <div class="de-selected">
                  {{list_engagement[alias].length}} products SELECTED
                </div>

              </div>
              <div class="cards" v-if="list_engagement">
                <div
                  class="item-card-selected"
                  v-for="item in list_engagement[alias]"
                  :key="item.item_id"
                >
                  <div
                    class="remove-compare"
                    @click="dialogVisible = true"
                    v-if="list_engagement[alias].length === 1"
                  >
                    <img src="~assets/img/remove_compare.png" class="img-fluid" />
                  </div>

                  <div class="remove-compare" @click="removeFromEngagement(item, alias)" v-else>
                    <img src="~assets/img/remove_compare.png" class="img-fluid" />
                  </div>
                  <div class="header">
                    <img
                      class="img-fluid de-image"
                      :src="baseUrl+item.item_details.images.main.image"
                    />
                    <div class="de-title">
                      <div class="title">
                        {{item.item_details.title}}
                      </div>
                      <div class="price">AUD ${{formatPrice(item.price)}}<span class="ml-1">ex. GST</span></div>
                    </div>
                  </div>
                  <div class="action-group-btn">
                    <div class="detail">
                      <nuxt-link
                        class="detail-button"
                        :to="{name: 'categories-id', params: { id: item.item_details.id} }"
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
                      <div class="pair-popver">
                        <el-button
                          class="pair-button"
                          slot="reference"
                          v-if="item.item_details.have_center_stone"
                          @click="addToPairDiamond(item)"
                        >
                          <div class="title-btn">
                            <span class="add">
                              <Add />
                            </span>
                            select a diamond
                          </div>
                        </el-button>
                        <el-button class="pair-button" slot="reference" v-else disabled>
                          <div class="title-btn">
                            <span class="add">
                              <Add />
                            </span>
                            select a diamond
                          </div>
                        </el-button>
                      </div>
                    </div>
                  </div>

                  <div class="add-bag">
                    <div class="bag-button">
                      <div class="title-btn" @click="addToBag(item)">ADD TO BAG</div>
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
                    <div class="share d-flex" @click="openSharing(item.item_details.id, item.item_type)">
                      <img src="~assets/img/share.png" class="img-fluid" />

                        <div>Share</div>
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
          <div class="title mt-3 col-12">LEAVE products COMPARISON</div>
          <div class="description text-center">Are you sure you want to leave ?</div>
          <div class="social-action">
            <div
              class="leave-btn"
              @click="cancelFromEngagement(alias); dialogVisible = false; show = false"
            >YES, LEAVE</div>
            <div class="stay-btn" type="primary" @click="dialogVisible = false">Stay</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showModalConfirm" custom-class="confirmLeave" :show-close="false">
      <div class="container">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="title mt-3 col-12">Products COMPARISON</div>
          <div class="description text-center">This product has already been added to comparison</div>
          <div class="social-action">
            <div class="leave-btn" @click="showModalConfirm = false">close</div>
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
              :to="{name: redirect.name, params: {  shape: [ ...redirect.shape ] } } "
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
import {  mapGetters } from "vuex";
import Add from "~/components/Elements/Icons/AddPair";
import Caret from "~/components/Elements/Icons/Caret-black";
import CompareDiamond from "~/components/Elements/Icons/CompareDiamond";

// Share Modal Component
import ModalSharing from '~/components/ModalSharing';

export default {
  props: {
    alias: String,
    show_modal: Boolean
  },
  data() {
    return {
      showSharing:false,
      redirect: {},
      redirectPairModal: false,
      showModalConfirm: false,
      dialogVisible: false,
      show: false,
      active: false,
      dataSharing:{},
    };
  },
  components: {
    Add,
    Caret,
    CompareDiamond,
    ModalSharing
  },
  computed: {
    ...mapGetters(["list_engagement", "gstCount", "isAuthenticated"]),
    comparedId() {
      return this.$store.state.compare_products.setId;
    }
  },
  watch: {
    show_modal() {
      this.showModalConfirm = this.show_modal;
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
    addToPairDiamond(item) {
      let arrShapes = item.item_details.stone_shape.map(day => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase())

      let redirect_pair = {
        name: "diamonds-pair",
        shape: arrShapes
      };
      this.redirect = Object.assign({}, redirect_pair);
      this.redirectPairModal = true;
      this.$store.dispatch("addToPairDiamond", item);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addToBag(bag_item) {
      this.$store.dispatch("addToBag", bag_item);
      this.$emit("click_shop", true);
    },
    removeFromEngagement(item, alias) {
      this.$store.commit("removeFromEngagement", { item: item, alias: alias });

      let arr = this.comparedId[this.$route.params.id];
      this.$router.push({ path: this.$route.path, query: { compare: [arr] } });
    },
    cancelFromEngagement(alias) {
      this.$store.commit("cancelFromEngagement", { alias: alias });

      let arr = this.comparedId[this.$route.params.id];
      this.$router.push({ path: this.$route.path, query: { compare: [arr] } });
    }
  }
};
</script>

