<template>

      <div class="item" @mouseover="mouseOver" @mouseleave="mouseOut">
        <div class="img-block text-center">
          <div class="video" v-if="post.item_details.video ">
            <div class="video-icon" @click="preView(post)">
              <img src="~assets/img/360.png" class="img-fluid">
            </div>
          </div>
          <!--<div class="more-actions">-->
            <!--<div class="pair">-->
              <!--<el-tooltip class="" effect="light" content="PAIR WITH ..." placement="top" >-->
                <!--<el-popover-->
                  <!--popper-class="pairWithPopper"-->
                  <!--placement="bottom"-->
                  <!--title="pair with ..."-->
                  <!--width="180"-->
                  <!--trigger="hover">-->
                  <!--<div>-->
                    <!--<ul>-->
                      <!--<li @click="addDiamondToPair(post)">-->
                        <!--<button>-->
                          <!--engagement-->
                        <!--</button>-->
                      <!--</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                  <!--<el-button slot="reference"><img class="img-fluid" src="~assets/img/pair_with-1.png" ></el-button>-->
                <!--</el-popover>-->

              <!--</el-tooltip>-->
            <!--</div>-->
            <!--<div class="compare">-->
              <!--<el-tooltip class="" effect="light" content="COMPARE" placement="top">-->
                <!--<el-button>-->
                  <!--<img class="img-fluid" src="~assets/img/compare_detail.png"  @click="addToCart(post)">-->
                <!--</el-button>-->
              <!--</el-tooltip>-->
            <!--</div>-->
            <!--<div class="view" @click="preView(post)">-->
              <!--<el-tooltip effect="light" content="QUICK VIEW" placement="top">-->
                <!--<el-button>-->
                  <!--<img class="img-fluid" src="~assets/img/view.svg">-->
                <!--</el-button>-->
              <!--</el-tooltip>-->
            <!--</div>-->
          <!--</div>-->
          <nuxt-link :to="{name: 'diamonds-list-id', params: { id: post.item_id} }">
              <img class="img-fluid my-4 diamond-img"  :src=" post.item_details.images.main+'?h=280&w=280&fit=cover'"  v-show="!active">
              <img class="img-fluid my-4 diamond-img"  :src=" post.item_details.images.side+'?h=280&w=280&fit=cover'"  v-show="active"  >


          <img class="logo d-none d-md-block" style="margin: 0 auto;" src="~assets/img/emblem-product.png">


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
            <!-- Cut -->
            <span>{{ returnCutTitle(post.item_details.cut) }}</span>
          </div>
        </div>

        <div class="social-block d-flex justify-content-center">


          <div class="save" @click="addToFavorites(post)" v-if="isAuthenticated"><img src="~assets/img/like.png"  > save</div>
          <nuxt-link class="save" to="/favorites/auth/login" v-else><img src="~assets/img/like.png" class="img-fluid" > save</nuxt-link>

          <span class="share-line">|</span>
          <div class="share">
            <img src="~assets/img/share.png" class="img-fluid">
            <social-sharing :url="'diamonds-list/'+post.item_id"
                            inline-template>
              <div>
                <network network="facebook">
                  <i class="fa fa-facebook"></i> Share
                </network>
              </div>
            </social-sharing>
          </div>
        </div>
      </div>

</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
      props:{
        post: Object
      },

    data () {
      return {
        redirectPair: true,
        meta_title_component: 'Diamond component',
        active:false,
      }
    },
    computed: {
      ...mapGetters(['compare_list','isAuthenticated']),
      compare() {
        return this.compare_list || []
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      // Check Cut
      returnCutTitle(value) {
        switch(value) {
          case 'Excellent': return 'EX'
            break;
          case 'Good': return 'G'
            break;
          case 'Very Good': return 'VG'
            break;
          case 'Ideal': return 'DE'
            break;
          case 'Fair': return 'F'
            break;
          case 'Poor': return 'P'
          break;
          default: return '-'

        }
      },
      addToFavorites(item){
        let diamond = {
          item_details: item.item_details,
          item_id: item.item_id,
          item_type: item.item_type
        }
        this.$store.dispatch("addToFavorites", diamond)
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
      addDiamondToPair(diamond) {
        let redirect_pair = {
          id: 'engagement_rings',
          name: 'categories-pair-id',
          stone_shape: diamond.item_details.shape,
          carats: diamond.item_details.caratSize
        }
        this.$emit('click-pair', redirect_pair)
        this.$store.dispatch('addDiamondToPair', diamond);
      },
      addToCart(diamond) {
        this.$store.commit('addToCart', diamond);
        let arr = this.compare
        this.$router.push({path: this.$route.path, query: { compare: [arr] } })
      },
      preVideo(post){
        this.$emit('clicked-video', post)
      },
      preView(post) {
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



