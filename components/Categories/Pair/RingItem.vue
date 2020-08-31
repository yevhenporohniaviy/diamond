<template>
  <div class="col-lg-4 col-xl-3 col-md-6 col-sm-4 col-12">
    <div
      data-aos="zoom-in"
      @mouseover="mouseOver"
      @mouseleave="mouseOut"
      v-if="post && variantsSort.ring_size"
    >
      <div class="category-item-default-pair item">
        <div
          class="img-block text-center"
          :class="post.item_details.images.main.margin ? '' : 'lifestyle'"
          v-show="!active"
        >
          <div class="more-actions">
            <div class="view" @click="preView(post, stone_shape, visible)">
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
            <div class="view" @click="preView(post, stone_shape, visible)">
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
        <div class="group-actions">
          <div class="col-12 col-md-12">
            <div class="row justify-content-between">
              <div class="col-6 col-md-6 pair-size-product">
                <div class="row">
                  <!--                  <el-popover-->
                  <!--                    placement="bottom"-->
                  <!--                    popper-class="popoverSize"-->
                  <!--                    width="200"-->
                  <!--                    trigger="click"-->
                  <!--                    :disabled="Object.keys(post.item_details.variants).length === 0">-->
                  <!--                    <div>-->
                  <!--                      <el-radio-group v-model="stone_shape" class="popover__list">-->
                  <!--                        <el-radio-->
                  <!--                          v-for="(item, index) in post.item_details.variants"-->
                  <!--                          v-if="item.alias === 'ring_size' "-->
                  <!--                          :key="index"-->
                  <!--                          @change="onChangeSize(item.pivot.price)"-->
                  <!--                          :label="{title: item.pivot.value.title , image:item.pivot.image, price: item.pivot.price , id: item.pivot.id}">-->
                  <!--                          Ring size : {{item.pivot.value.title}}-->
                  <!--                        </el-radio>-->

                  <!--                      </el-radio-group>-->
                  <!--                    </div>-->
                  <el-button
                    slot="reference"
                    class="select-size"
                    :class="Object.keys(stone_shape).length === 0 && 'icon'"
                  >
                    <div
                      v-if="Object.keys(stone_shape).length === 0"
                      @click="selectYourSize"
                    >select your size</div>
                    <div v-else>Ring size : {{stone_shape.value.title}}</div>
                  </el-button>
                  <!--                  </el-popover>-->
                </div>
              </div>

              <div class="col-6 col-md-6 pair-ring-product">
                <div class="row">
                  <button
                    class="select-ring"
                    @click="addDiamondToPair(post.item_details, stone_shape)"
                    :disabled="Object.keys(stone_shape).length === 0"
                    :class="[Object.keys(stone_shape).length === 0 && 'disabled', visible && 'selected']"
                  >
                    <div v-if="visible !== true">select this ring</div>
                    <div v-else>ring selected</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="ringSizeDialog" custom-class="ringSizeModal">
      <div class="container mb-4">
        <div class="col-12">
          <div class="title-modal text-center mb-5">select your RING size</div>
        </div>
        <div class="row">
          <div
            class="col-1 box p-0 d-flex justify-content-center align-items-center"
            v-for="item in variantsSort.ring_size"
            :key="item.id"
          >
            <el-radio
              class="item"
              @change="onChangeSize(item.price)"
              v-model="stone_shape"
              :value="item"
              :label="item"
            >{{`${item.value.prefix ? item.value.prefix : ''} ${item.value.title}`}}</el-radio>
          </div>
          <div class="col-1 box p-0 d-flex justify-content-center align-items-center">
            <el-radio
              class="item item-unsure"
              v-model="stone_shape"
              :value="unsure"
              :label="unsure"
              @change="onChangeSize('0')"
            >unsure</el-radio>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import Select from "~/components/Elements/Icons/SelectDiamond";
export default {
  props: {
    post: {
      type: Object
    },
    visible: Boolean
  },
  data() {
    return {
      unsure: {
        alias: "ring_size",
        id: 99,
        image: null,
        index: 100,
        price: 0,
        value: {
          index: 100,
          title: "unsure",
          value: "unsure",
        }
      },
      active: false,
      checked: true,
      stone_shape: {},
      activePrice: this.post.price,
      ringSizeDialog: false,
      variant_size: {}
    };
  },
  components: {
    Select
  },
  computed: {
    ...mapGetters(["gstCount"]),
    variantsSort() {
      let group = {};
      this.post.item_details.variants.forEach((elem, index) => {
        if (!group[elem.alias]) group[elem.alias] = [];
        group[elem.alias].push({
          id: elem.pivot.id,
          alias: elem.alias || "",
          image: elem.pivot.image || "",
          index: index || "",
          price: elem.pivot.price || "",
          value: elem.pivot.value || []
        });
      });

      return group;
    }
  },
  methods: {
    selectYourSize() {
      this.ringSizeDialog = true;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    onChangeSize(value) {
      this.$store.dispatch("fetchGst");
      if(value !== '0'){
        this.activePrice = value + this.post.price * this.gstCount
      }else{
        this.activePrice = 0
      }
     console.log( this.activePrice )
      this.ringSizeDialog = false;
    },
    addDiamondToPair(item, size) {
      this.$store.dispatch("fetchGst");
      item.stone_shape_select = size;
      let ring = {
        item_id: item.item_number,
        count: 1,
        price: this.activePrice || item.price,
        price_gst: this.activePrice || item.price * this.gstCount,
        item_type: "j",
        item_details: item
      };
      this.$store.dispatch("addDiamondToPair", ring);
    },
    preView(post, size, visible) {
      this.$store.dispatch("fetchGst");
      post.price = this.activePrice;
      post.price_gst = this.activePrice * this.gstCount;
      post.item_details.stone_shape_select = size;
      post.item_details.visible_selected = visible;

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

<style scoped lang="scss">
.popover {
  &__list {
    height: 200px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(#253650, 0.1);
      border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: rgba(#253650, 0.8);
      border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #253650;
      border-radius: 10px;
    }
  }
}
</style>
