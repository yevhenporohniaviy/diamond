<template>
  <div class="item item-search-product" @mouseover="mouseOver" @mouseleave="mouseOut" v-if="post">
    <div class="img-block text-center">
      <nuxt-link :to="{name: 'categories-id', params: { id: post.item_details.id}}">
        <img
          class="img-fluid"
          :src="baseUrl+post.item_details.images.main.image+'?h=350&w=350&fit=crop'"
          v-show="!active"
        />
        <img
          class="img-fluid"
          :src="baseUrl+post.item_details.images.side.image+'?h=350&w=350&fit=crop'"
          v-show="active"
        />
        <img
          class="logo d-none d-md-block mb-3"
          style="margin: 0 auto;"
          src="~assets/img/emblem-product.png"
        />
        <div class="title">{{post.item_details.title}}</div>
        <div class="price mb-1">
          AUD ${{formatPrice(post.price)}}
          <span class="ml-1">ex. GST</span>
        </div>
      </nuxt-link>
    </div>
    <div class="social-block d-flex justify-content-center">
      <div class="save" @click="addToFavorites(post)" v-if="isAuthenticated">
        <img src="~assets/img/like.png" /> save
      </div>
      <nuxt-link class="save" to="/favorites/auth/login" v-else>
        <img src="~assets/img/like.png" class="img-fluid" /> save
      </nuxt-link>

      <span class="share-line">|</span>
      <div class="share d-flex" @click="openShareModal(post.item_details.id)">
        <img src="~assets/img/share.png" class="img-fluid" />
        <social-sharing
          :url="'categories/'+post.item_id"
          inline-template
        >
          <div>Share</div>
        </social-sharing>
      </div>
    </div>
    <!-- Share Modal -->
    <ShareModal class="share-modal" borderNone="true" :showShareModal="showModal" @showShareModalValue="changeShareModal()" />
  </div>
</template>
<script>
import Select from "~/components/Elements/Icons/SelectDiamond";
import { mapActions, mapGetters } from "vuex";

// Share Modal Component
import ShareModal from "../ShareModal";

export default {
  props: {
    post: Object
  },
  data() {
    return {
      active: false,
      loading: false,
      jewellery: {},
      showModal: false
    };
  },
  components: {
    Select,
    ShareModal
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
    openShareModal(item) {
      console.log(item);
      sessionStorage.setItem("shareUrl", "categories/" + item);
      this.showModal = true;
    },
    changeShareModal() {
      this.showModal = false;
    },
    ...mapActions(["addToEngagement"]),
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
.item-search-product {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .share-modal {
    top: -170px;
    background-color: transparent;
  }

  .img-block {
    padding: 15px 35px !important;
  }
}
</style>
