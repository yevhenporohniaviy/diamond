<template>
  <div>
    <div id="pair-component-mobile">
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
                <div class="diamond-item-pair" v-if="list_diamond.item_details">
                  <div class="header row justify-content-between">
                    <div class="col-6">
                      <div class="title">your diamond:</div>
                    </div>
                    <div class="col-6">
                      <div @click="removeDiamond" class="change">change</div>
                    </div>
                  </div>

                  <div class="content my-3">
                    <div class="d-flex">
                      <div class="content-img">
                        <img :src="list_diamond.item_details.images.main+'?w=45'" class="img-fluid" />
                      </div>
                      <div class="content-info ml-2">
                        <div class="ref-number">REF. {{list_diamond.item_id}}</div>
                        <div
                          class="title"
                        >{{list_diamond.item_details.caratSize | toDecimalNumber}} {{list_diamond.item_details.shape}} diamond</div>
                      </div>
                    </div>
                    <div class="content-price">${{list_diamond.price}}</div>
                  </div>
                  <div class="content-special mx-4 mb-4">
                    <div class="info-block d-flex justify-content-between">
                      <div class="info-box">
                        <span>carat</span>
                        <span>{{list_diamond.item_details.caratSize | toDecimalNumber}}</span>
                      </div>
                      <div class="info-box">
                        <span>COLOUR</span>
                        <span>{{list_diamond.item_details.color}}</span>
                      </div>
                      <div class="info-box">
                        <span>CLARITY</span>
                        <span>{{list_diamond.item_details.clarity}}</span>
                      </div>
                      <div class="info-box">
                        <span>CUT</span>
                        <span>{{list_diamond.item_details.cut}}</span>
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
                <div class="diamond-item-pair" v-if="Object.keys(list_ring).length">
                  <div class="header row justify-content-between">
                    <div class="col-6">
                      <div class="title">Your setting:</div>
                    </div>
                    <div class="col-6">
                      <div @click="removeProduct" class="change">change</div>
                    </div>
                  </div>

                  <div class="content my-3">
                    <div class="d-flex">
                      <div class="content-img">
                        <img
                          :src="baseUrl + list_ring.item_details.images.main.image+'?w=45'"
                          class="img-fluid"
                        />
                      </div>
                      <div class="content-info ml-2">
                        <div class="ref-number">REF. {{list_ring.item_id}}</div>
                        <div class="title">{{list_ring.item_details.title}} diamond</div>
                      </div>
                    </div>
                    <div class="content-price">${{list_ring.price}}</div>
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
                <a href="#" class="enquiry" @click="sendEnquiry">ENQUIRY</a>
                <div
                  class="bag"
                  @click="addToBagPair"
                  :class="Object.keys(list_ring).length ? 'active' : 'disabled'"
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
          <div class="row pair-items-wrapper">
            <div class="col-12 col-md-8 pair-items">
              <div class="row">
                <div>
                  <div class="step-title">
                    <span>STEP 1</span> - SELECT A DIAMOND
                  </div>
                  <div class="item" v-if="Object.keys(list_diamond).length">
                    <div class="img-item">
                      <img :src="list_diamond.item_details.images.main" class="img-fluid" />
                    </div>
                    <div class="info-item">
                      <div class="ref-number">REF. {{list_diamond.item_id}}</div>
                      <div
                        class="title"
                      >{{list_diamond.item_details.caratSize | toDecimalNumber}} {{list_diamond.item_details.shape}} diamond</div>
                      <div class="description">
                        L {{list_diamond.item_details.MeasLength}}mm x
                        W {{list_diamond.item_details.MeasWidth}}mm x
                        H {{list_diamond.item_details.MeasDepth}}mm
                      </div>
                    </div>
                    <div @click="removeDiamond" class="remove_ring">
                      <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                    </div>
                  </div>
                  <div class="item-pair" v-else>
                    <nuxt-link to="/diamonds" class="text-center text-decoration-none">
                      <img src="~assets/img/default/pair-img.png" class="img-fluid" />
                      <div class="text">select a diamond</div>
                    </nuxt-link>
                  </div>
                </div>
                <div
                  class="with-title mx-5"
                >{{ Object.keys(list_ring).length ? ' PAIRED WITH:': ' PAIR WITH:'}}</div>
                <div class>
                  <div class="step-title">
                    <span>STEP 2</span>
                  </div>
                  <div class="item" v-if="Object.keys(list_ring).length">
                    <div class="img-item">
                      <img
                        :src="baseUrl + list_ring.item_details.images.main.image"
                        class="img-fluid"
                      />
                    </div>
                    <div class="info-item">
                      <div class="title">{{list_ring.item_details.title}}</div>
                      <div
                        class="description"
                      >{{list_ring.item_details.metal.prefix}}{{list_ring.item_details.metal.title}}</div>
                      <div
                        class="description"
                        v-if="list_ring.item_details.stone_shape_select"
                      >ring size: {{list_ring.item_details.stone_shape_select.value.title}}</div>
                    </div>
                    <div @click="removeProduct" class="remove_ring">
                      <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                    </div>
                  </div>
                  <div class="item-pair" v-else>
                    <img src="~assets/img/default/pair-img.png" class="img-fluid" />
                    <div class="text">select a setting</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 pair-price">
              <div class="row justify-content-end">
                <div @click="removeDiamond" class="close-pair-component">
                  <img src="~assets/img/default/close-pair.png" class="img-fluid" />
                </div>
                <div class="col-12 col-md-11">
                  <div class="info-price mb-4 mt-2">
                    <div class="title">
                      <div v-if="!list_ring.price">Diamond</div>
                      <div v-else>Setting + Diamond</div>
                      <span>Price ex. GST</span>
                    </div>
                    <div class="price">AUD $ {{formatPrice(totalPrice)}}</div>
                  </div>
                  <div class="group-buttons mb-3">
                    <a
                      v-if="Object.keys(list_ring).length"
                      href="#"
                      class="enquiry active"
                      @click="sendEnquiry"
                    >ENQUIRY</a>
                    <a v-else href="#" class="enquiry disabled">ENQUIRY</a>
                    <div
                      v-if="Object.keys(list_ring).length"
                      class="bag active"
                      @click="addToBagPair"
                    >add to bag</div>
                    <div v-else class="bag disabled" @click="addToBagPair">add to bag</div>
                  </div>
                  <div class="group-social">
                    <button
                      class="m-2"
                      @click="addToFavorites(list_diamond, list_ring)"
                      v-if="isAuthenticated"
                    >
                      <img src="~assets/img/like.png" class="m-1" />save
                    </button>
                    <nuxt-link class="m-2" to="/favorites/auth/login" v-else>
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
import ModalBagPair from "~/components/Shopping/ModalBagPair";

import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      active: false,
      dialogPair: false,
      showModalBag: false,
    };
  },
  components: {
    ModalBagPair
  },
  computed: {
    ...mapGetters(["isAuthenticated", "list_ring", "list_diamond"]),

    totalPrice() {
      return (
        this.list_ring.price + this.list_diamond.price ||
        this.list_diamond.price
      );
    }
  },

  filters: {
    price: function(value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    ...mapActions(["removeProduct", "removeDiamond"]),
    addToFavorites(diamond, ring) {
      if (Object.entries(ring).length !== 0) {
        let itemRing = {
          item_details: ring.item_details,
          item_id: ring.item_id,
          item_type: ring.item_type
        };

        this.$store.dispatch("addToFavorites", itemRing)
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
      }

      if (Object.entries(diamond).length !== 0) {
        let itemDiamond = {
          item_details: diamond.item_details,
          item_id: diamond.item_id,
          item_type: diamond.item_type
        };

        this.$store.dispatch("addToFavorites", itemDiamond)
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
      }
    },
    sendEnquiry() {
      this.$store.dispatch("cleareEnquiry");
      let numbers = [this.list_ring, this.list_diamond];
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
    addToBagPair() {
      this.$forceUpdate();
      let list = [this.list_ring, this.list_diamond];

      this.$store.dispatch("addToBagPair", list);
      this.showModalBag = true;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    removeProduct(item) {
      this.$store.dispatch("removeProduct", item);
    },
    removeDiamond(item) {
      this.$store.dispatch("removeDiamond", item);
      this.$nuxt.$router.push({ path: "/diamonds" });
    }
  }
};
</script>

<style lang="scss">
.pair-items-wrapper {
  border-top: 1px solid #253650;
  border-left: 1px solid #253650;
}
</style>
