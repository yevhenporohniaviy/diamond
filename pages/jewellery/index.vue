<template>
  <div style="padding-top: 70px;">
    <div class="container-fluid" id="head-jewellery">
      <div class="row justify-content-center align-items-center">
        <div class="list-category d-flex justify-content-center align-items-center">
          <a
            href="#"
            class="category-title"
            v-for="(category,index) in allJewellery"
            :key="index"
            v-if="category.jewellery.length"
            @click="getPos(category.alias)"
          >{{category.title}}</a>
        </div>
      </div>
    </div>

    <div
      class="container type-category"
      data-aos="fade-up"
      v-for="(item,index) in allJewellery"
      :key="index"
      :id="item.alias"
    >
      <div v-if="item.jewellery.length">
        <div class="category">
          <img src="~assets/img/oval-bg.png" class="position-absolute bg-oval" />
          <div class="col-12 description-category mb-5">
            <div class="title">{{item.title}}</div>
            <div class="text">{{item.description}}</div>
          </div>
          <div class="row justify-content-center">
            <JewelleryItem
              v-for="(elem,index) in item.jewellery.slice(0, 4)"
              :key="index"
              :post="rebuildJewellery(elem)"
              @clicked="onClickChild"
              @click-pair="redirectPair"

            />
          </div>
          <div class="d-flex justify-content-center mb-5" v-if="index !== 3">
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog z-index="2012" :visible.sync="showModalJew" custom-class="modalDiamond" center>
      <Modal
        :data="element"
        @click_shop="onAddToBag">
      ></Modal>
    </el-dialog>

    <div class="container mt-5">
      <div class="row">
        <div class="banner position-relative">
          <img class="img-fluid img-bg" src="~assets/img/HERO_darkblue.png" />
          <div class="description position-absolute">
            <div class="tag my-5" data-aos="fade-up">#DIAMONDEMPORIUM</div>
            <div class="title my-5" data-aos="fade-up">Be inspired.</div>
            <div class="sub-title my-5" data-aos="fade-up">
              Check our latest pictures and our instagram account to find
              inspiration.
            </div>
            <div class="d-flex justify-content-center inspired">
              <a href="#" class="text-center" data-aos="fade-up">GET INSPIRED</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 text-center my-5">
      <Emblem />
    </div>
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
  </div>
</template>


<script>
import Modal from "~/components/JewelleryListDefault/ModalLayout";
import ModalBag from "~/components/Shopping/ModalBag";
import JewelleryItem from "~/components/JewelleryListDefault/JewelleryItem";

import Emblem from "~/components/Elements/Icons/EmblemBlog";
import { mapGetters, mapActions } from "vuex";

// Share Modal Component

export default {
  name: "JewelleryList",

  props: {
    type: Object
  },
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
      redirectPairModal: false,
      showModalBag: false,
      showModalJew: false,
      element: {},
      redirect: {},
    };
  },
  components: {
    JewelleryItem,
    Modal,
    Emblem,
    ModalBag,
  },
  computed: {
    ...mapGetters(["allJewellery", "gstCount", "itemMeta"])
  },
  methods: {


    // Share Modal
    ...mapActions(["fetchJewellery"]),
    redirectPair(post) {
      this.redirect = Object.assign({}, post);
      this.redirectPairModal = true;
    },
    rebuildJewellery(item) {
      let price = item.price;

      let jewellery = {
        item_id: item.item_number,
        count: 1,
        price: price,
        price_gst: price * this.gstCount,
        item_type: "j",
        item_details: item
      };
      return jewellery;
    },

    continueShopping(value) {
      this.showModalBag = value;
    },
    onAddToBag(value) {
      this.showModalBag = value;
    },
    onClickChild(post) {
      this.element = Object.assign({}, post);
      this.showModalJew = true;
    },
    getPos(value) {
      let element = document.getElementById(value);
      let headerOffset = 130;
      let elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPos(to.params.scroll)
    })
  },
  created() {
    this.$store.dispatch("fetchJewellery");
    this.$store.dispatch("fetchGst");
    this.$store.dispatch("fetchMeta", "jewellery");
  }
};
</script>
