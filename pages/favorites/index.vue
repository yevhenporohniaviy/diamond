<template>
  <div>
    <div class="container position-relative">
      <div class="row acc-banner">
        <div class="banner-save">
          <div class="title">Saved items</div>
          <div class="profile-tabs">
            <div class="link-box profile">
              <nuxt-link to="/favorites">all</nuxt-link>
              <nuxt-link to="/inspired">INSPIRATIONS</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="list-favorites" class="my-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-9">
            <div
              class="row"
              v-if="typeof favorites_list !== 'undefined' && favorites_list.length > 0"
            >
              <div class="col-6 col-md-4" v-for="item in favorites_list" :key="item.item_id">
                <div class="card-favorites">
                  <div class="diamond-card" v-if="item.item_type === 'd'">
                    <div class="remove" @click="removeFromFavorites(item)">
                      <img src="~assets/img/default/close-save.png" class="img-fluid" />
                    </div>
                    <div class="diamond-image" v-if="item.item_details.images">
                      <img :src="item.item_details.images.main+'?h=178'" class="img-fluid my-4" />
                    </div>
                    <div
                      class="info-diamond d-flex justify-content-center align-items-center flex-column"
                    >
                      <img class="logo" src="~assets/img/emblem-product.png" />
                      <div class="price mt-3 mb-1">
                        AUD ${{formatPrice(item.item_details.price)}}
                        <span class="ml-1">ex. GST</span>
                      </div>
                      <div class="info-size">
                        L {{item.item_details.MeasLength}}mm x
                        W {{item.item_details.MeasWidth}}mm x
                        H {{item.item_details.MeasDepth}}mm
                      </div>
                    </div>
                    <div class="d-none d-md-block">
                      <div class="detailinfo-diamond d-flex justify-content-between">
                        <div class="info-box">
                          <span>carat</span>
                          <span>{{item.item_details.caratSize | toDecimalNumber}}</span>
                        </div>
                        <div class="info-box">
                          <span>COLOUR</span>
                          <span>{{item.item_details.color}}</span>
                        </div>
                        <div class="info-box">
                          <span>CLARITY</span>
                          <span>{{item.item_details.clarity}}</span>
                        </div>
                        <div class="info-box">
                          <span>CUT</span>
                          <span>{{item.item_details.cut}}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="share d-flex justify-content-center align-items-center"
                      @click="openSharing(item.item_id, 'd')"
                    >
                      <img src="~assets/img/share.png" class="img-fluid" />

                      <i class="fa fa-facebook"></i> Share
                    </div>
                  </div>

                  <div class="jewellery-card" v-if="item.item_type === 'j'">
                    <div class="remove" @click="removeFromFavorites(item)">
                      <img src="~assets/img/default/close-save.png" class="img-fluid" />
                    </div>
                    <div class="jewellery-image" v-if="item.item_details.images">
                      <img
                        :src="baseUrl + item.item_details.images.main.image+'?h=238'"
                        class="img-fluid"
                      />
                    </div>
                    <div
                      class="info-jewellery d-flex justify-content-center align-items-center flex-column"
                    >
                      <img class="logo" src="~assets/img/emblem-product.png" />
                      <div class="name">{{item.item_details.title}}</div>
                      <div class="price">
                        AUD ${{formatPrice(item.item_details.price)}}
                        <span class="ml-1">ex. GST</span>
                      </div>
                    </div>
                    <div
                      class="share d-flex justify-content-center align-items-center"
                      @click="openSharing(item.item_details.id, 'j')">
                      <img src="~assets/img/share.png" class="img-fluid" />
                      <i class="fa fa-facebook"></i> Share
                    </div>
                  </div>

                  <div class="post-card" v-if="item.item_type === 'p'">
                    <div class="remove" @click="removeFromFavorites(item)">
                      <img src="~assets/img/default/close-save.png" class="img-fluid" />
                    </div>
                    <div class="post-image">
                      <img :src="item.item_details.images.main" class="img-fluid w-100" />
                    </div>
                  </div>


                </div>
              </div>
            </div>
            <div v-else>
              <div class="text-center my-5 no-save-items">You currently have no saved items.</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Share Modal -->
      <el-dialog :visible.sync="showSharing"
                 center
                 :show-close="false"
                 custom-class="modalSharing">
        <ModalSharing :data="this.dataSharing.id" :type="this.dataSharing.type" @close-sharing="closeSharing"/>
      </el-dialog>
    </section>
    <Vector></Vector>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vector from "~/components/Elements/Icons/Vector";

// Share Modal Component
import ModalSharing from '~/components/ModalSharing';

export default {
  middleware: "favorites",
  head() {
    return {
      title: this.itemMeta.meta_title ? this.itemMeta.meta_title : "",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.itemMeta.meta_title ? this.itemMeta.meta_title : ""
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.itemMeta.meta_description
            ? this.itemMeta.meta_description
            : ""
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ""
        },
        {
          hid: "og:image:url ",
          property: "og:image:url",
          content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ""
        },
        { hid: "og:image:height", property: "og:image:height", content: "200" },
        { hid: "og:image:width", property: "og:image:width", content: "200" }
      ]
    };
  },
  data() {
    return {
      dataSharing: {},
      showSharing: false
    };
  },
  components: {
    ModalSharing,
    Vector
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
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    removeFromFavorites(item) {
      this.$store.dispatch("removeFromFavoritesList", item);

    },


  },

  computed: {
    ...mapGetters(["favorites_list", "isAuthenticated", "itemMeta"])
  },
  created() {
    this.$store.dispatch("fetchListFavorites");
    this.$store.dispatch("fetchMeta", "favorites");
  }
};
</script>
