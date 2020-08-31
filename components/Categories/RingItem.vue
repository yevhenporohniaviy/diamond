<template>
  <div class="col-lg-4 col-xl-3 col-md-6 col-sm-4 col-12">
    <div class="category-item-default"
      data-aos="zoom-in"
      @mouseover="mouseOver"
      @mouseleave="mouseOut"
      v-if="post"
    >
      <div class="item">
        <div
          class="img-block text-center"
          :class="post.item_details.images.main.margin ? '' : 'lifestyle'"
          v-show="!active"
        >
          <div class="more-actions">
            <div class="compare" v-if="post.item_details.have_center_stone">
              <el-tooltip
                class
                effect="light"
                content="select a diamond"
                placement="top"
                v-if="alias !== 'wedding_bands'"
              >
                <el-button @click="addToPairDiamond(post)">
                  <Select />
                </el-button>
              </el-tooltip>
            </div>
            <div class="compare">
              <el-tooltip class effect="light" content="COMPARE" placement="top">
                <el-button>
                  <img
                    class="img-fluid"
                    src="~assets/img/compare_detail.png"
                    @click="addToEngagement(post, alias)"
                  />
                </el-button>
              </el-tooltip>
            </div>
            <div class="view" @click="preView(post)">
              <el-tooltip effect="light" content="QUICK VIEW" placement="top">
                <el-button>
                  <img class="img-fluid" src="~assets/img/view.svg" />
                </el-button>
              </el-tooltip>
            </div>
          </div>
          <nuxt-link :to="{name: 'categories-id', params: { id: post.item_details.id} }">
            <img
              class="img-fluid"
              :src="baseUrl+post.item_details.images.main.image+'?h=350&w=350&fit=crop'"
              v-if="post.item_details.images.main.margin"
            />
            <img
              class="img-fluid"
              :src="baseUrl+post.item_details.images.main.image+'?h=305&w=350&fit=crop'"
              v-else
            />
            <img class="logo mb-3" style="margin: 0 auto;" src="~assets/img/emblem-product.png" />
            <div class="title">{{post.item_details.title}}</div>
            <div class="price mb-1">
              AUD ${{formatPrice(post.price)}}
              <span class="ml-1">ex. GST</span>
            </div>
          </nuxt-link>
        </div>
        <div
          class="img-block text-center"
          :class="post.item_details.images.side.margin ? '' : 'lifestyle'"
          v-show="active"
        >
          <div class="more-actions">
            <div class="compare" v-if="post.item_details.have_center_stone">
              <el-tooltip
                class
                effect="light"
                content="select a diamond"
                placement="top"
                v-if="alias !== 'wedding_bands'"
              >
                <el-button @click="addToPairDiamond(post)">
                  <Select />
                </el-button>
              </el-tooltip>
            </div>
            <div class="compare">
              <el-tooltip class effect="light" content="COMPARE" placement="top">
                <el-button>
                  <img
                    class="img-fluid"
                    src="~assets/img/compare_detail.png"
                    @click="addToEngagement(post, alias)"
                  />
                </el-button>
              </el-tooltip>
            </div>
            <div class="view" @click="preView(post)">
              <el-tooltip effect="light" content="QUICK VIEW" placement="top">
                <el-button>
                  <img class="img-fluid" src="~assets/img/view.svg" />
                </el-button>
              </el-tooltip>
            </div>
          </div>
          <nuxt-link :to="{name: 'categories-id', params: { id: post.item_details.id} }">
            <img
              class="img-fluid"
              :src="baseUrl+post.item_details.images.side.image+'?h=350&w=350&fit=crop'"
              v-if="post.item_details.images.side.margin"
            />
            <img
              class="img-fluid"
              :src="baseUrl+post.item_details.images.side.image+'?h=305&w=350&fit=crop'"
              v-else
            />
            <img class="logo mb-3" style="margin: 0 auto;" src="~assets/img/emblem-product.png" />
            <div class="title">{{post.item_details.title}}</div>
            <div class="price mb-1">
              AUD ${{formatPrice(post.price)}}
              <span class="ml-1">ex. GST</span>
            </div>
          </nuxt-link>
        </div>

        <div class="social-block d-flex justify-content-center">
          <div class="save" @click="addToFavorites(post)" v-if="isAuthenticated">
            <img style="width:10px;height:10px" src="~assets/img/like.png" class="img-fluid" /> save
          </div>
          <nuxt-link class="save" to="/favorites/auth/login" v-else>
            <img style="width:10px;height:10px" src="~assets/img/like.png" class="img-fluid" /> save
          </nuxt-link>
          <span class="share-line">|</span>
          <div class="share d-flex" @click="openSharing">
            <img src="~assets/img/share.png" style="width:10px;height:10px" class="img-fluid" />
              <div>
                Share
              </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showSharing"
               center
               :show-close="false"
               custom-class="modalSharing"
               >
      <ModalSharing :data="post.item_details.id" :type="post.item_type" @close-sharing="closeSharing"/>
    </el-dialog>
  </div>
</template>
<script>
import Select from "~/components/Elements/Icons/SelectDiamond";
import { mapActions, mapGetters } from "vuex";

// Share Modal Component
import ModalSharing from '~/components/ModalSharing';

export default {
  props: {
    post: {
      type: Object
    },
    alias: String
  },
  data() {
    return {
      showSharing:false,
      active: false,
      loading: false,
      jewellery: {}
    };
  },
  components: {
    Select,
    ModalSharing
  },
  computed: {
    ...mapGetters(["gstCount", "isAuthenticated"]),
    comparedId() {
      return this.$store.state.compare_products.setId;
    },
    comparedJewellery() {
      return this.$store.state.compare_products.jewellery;
    }
  },
  methods: {
    openSharing(){
      this.showSharing = true
    },
    closeSharing(){
      this.showSharing = false
    },

    ...mapActions(["addToEngagement", "addToPairDiamond"]),
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      this.$emit("click-pair", redirect_pair);
      this.$store.dispatch("addToPairDiamond", item);
    },
    addToEngagement(item, alias) {
      if (
        this.comparedJewellery[alias] &&
        this.comparedJewellery[alias].find(
          product => product.item_id === item.item_id
        )
      ) {
        this.$emit("show_modal", true);
      }
      this.$store.commit("addToEngagement", { item: item, alias: alias });

      this.$emit("show_modal", false);

      let arr = this.comparedId[this.$route.params.id];
      this.$router.push({ path: this.$route.path, query: { compare: [arr] } });
    },
    preView(post) {
      this.$emit("clicked", post);
    },
    mouseOver: function() {
      this.active = true;
    },
    mouseOut: function() {
      this.active = false;
    }
  }
};
</script>

<style lang="scss">
  .ring-item-wrapper {
    width: 100%;
  }
</style>
