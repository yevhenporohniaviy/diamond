<template>
    <div class="col-lg-4 col-xl-3 col-md-6 col-sm-4 col-12 default-diamond-item-pair" data-aos="zoom-in" @mouseover="mouseOver" @mouseleave="mouseOut" v-if="post">
      <div class="item">

        <div class="img-block text-center">
          <div class="video" v-if="post.item_details.video && post.item_details.video !== ''">
            <div class="video-icon" @click="preVideo(post.item_details)">
              <img src="~assets/img/360.png" class="img-fluid">
            </div>
          </div>
          <div class="more-actions">

            <div class="view" @click="preView(post,visible_center,visible_side_first, visible_side_second)">
              <el-tooltip effect="light" content="QUICK VIEW" placement="top">

                <el-button>

                  <img class="img-fluid"  src="~assets/img/view.svg">
                </el-button>
              </el-tooltip>
            </div>
          </div>

              <img class="img-fluid my-4 diamond-img"  :src="post.item_details.images.main+'?h=280&w=280&fit=cover'"  v-show="!active">
              <img class="img-fluid my-4 diamond-img"  :src="post.item_details.images.side+'?h=280&w=280&fit=cover'"  v-show="active">

          <img class="logo d-none d-md-block" style="margin: 0 auto;" src="~assets/img/emblem-product.png">
          <nuxt-link :to="{name: 'diamonds-list-id', params: { id: post.item_id} }">

          <div class="price mt-3 mb-1">AUD ${{formatPrice(post.price)}}<span class="ml-1">ex. GST</span></div>
            <div class="info-size">
              L {{post.item_details.MeasLength}}mm x
              W {{post.item_details.MeasWidth}}mm x
              H {{post.item_details.MeasDepth}}mm
            </div>
          </nuxt-link>


        </div>

        <div class="info-block d-flex justify-content-between">
          <div class="info-box">
            <span>carat</span>
            <span>{{post.item_details.caratSize | toDecimalNumber}}</span>
          </div>
          <div class="info-box">
            <span>COLOUR</span>
            <span>{{post.item_details.color}}</span>
          </div>
          <div class="info-box">
            <span>CLARITY</span>
            <span>{{post.item_details.clarity}}</span>
          </div>
          <div class="info-box">
            <span>CUT</span>
            <span v-if="post.item_details.cut != 'Excellent'">{{post.item_details.cut ? post.item_details.cut : '-'}}</span>
            <span v-else>Excel.</span>

          </div>
        </div>

        <div class="social-block d-flex justify-content-center">

          <button class="select-ring"  @click="addToPairDiamond(post)"
                  :class="{selected: visible_center || visible_side_first || visible_side_second}">

            <div v-if="visible_center || visible_side_first || visible_side_second "> this diamond is selected </div>
            <div v-else>select this diamond</div>
          </button>
        </div>
      </div>
    </div>
</template>
<script>

  export default {
      props:{
        post:{
          type: Object
        },
        visible_center: Boolean,
        visible_side_first: Boolean,
        visible_side_second: Boolean,
      },
    data () {
      return {
        active:false,
      }
    },

    methods: {

      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      addToPairDiamond(diamond) {
        this.$store.dispatch('addDiamond', diamond);
      },

      preVideo(post){
        this.$emit('clicked-video', post)
      },
      preView(post,visible_cent, visible_sid_first, visible_sid_second) {
        post.item_details.visible_selected = visible_sid_first || visible_sid_second || visible_cent;
        this.$emit('clicked', post)
      },
      mouseOver: function(){
        this.active = true;
      },
      mouseOut:function(){
        this.active=false;
      }
    }
  }
</script>

