<template>

    <div class="col-md-3 col-12 ">
    <div data-aos="zoom-in" @mouseover="mouseOver" @mouseleave="mouseOut" v-if="post" >
      <div class="jewellery-item-default item">

        <div class="img-block text-center " :class="post.item_details.images.main.margin ? '' : 'lifestyle'" v-show="!active">
          <div class="more-actions">

            <div class="view" @click="preView(post)">
              <el-tooltip effect="light" content="QUICK VIEW" placement="top">
                <el-button>
                  <img class="img-fluid"  src="~assets/img/view.svg">
                </el-button>
              </el-tooltip>
            </div>
          </div>
          <nuxt-link :to="{name: 'categories-id', params: { id: post.item_details.id} }" >
            <img class="img-fluid"  :src="baseUrl+post.item_details.images.main.image+'?h=350&w=350&fit=crop'"  v-if="post.item_details.images.main.margin">
            <img class="img-fluid"  :src="baseUrl+post.item_details.images.main.image+'?h=305&w=350&fit=crop'"  v-else>
            <img class="logo mb-3" style="margin: 0 auto;" src="~assets/img/emblem-product.png">
            <div class="title">{{post.item_details.title}}</div>
            <div class="price mb-1"><div>AUD ${{formatPrice(post.price)}}</div><span class="ml-1">ex. GST</span></div>
          </nuxt-link>
        </div>
        <div class="img-block text-center" :class="post.item_details.images.side.margin ? '' : 'lifestyle'" v-show="active">
          <div class="more-actions">

            <div class="view" @click="preView(post)">
              <el-tooltip effect="light" content="QUICK VIEW" placement="top">
                <el-button>
                  <img class="img-fluid"  src="~assets/img/view.svg">
                </el-button>
              </el-tooltip>
            </div>
          </div>
          <nuxt-link :to="{name: 'categories-id', params: { id: post.item_details.id} }" >
            <img class="img-fluid"  :src="baseUrl+post.item_details.images.side.image+'?h=350&w=350&fit=crop'"  v-if="post.item_details.images.side.margin">
            <img class="img-fluid"  :src="baseUrl+post.item_details.images.side.image+'?h=305&w=350&fit=crop'"  v-else>
            <img class="logo mb-3" style="margin: 0 auto;" src="~assets/img/emblem-product.png">
            <div class="title">{{post.item_details.title}}</div>
            <div class="price mb-1">AUD ${{formatPrice(post.price)}}<span class="ml-1">ex. GST</span></div>
          </nuxt-link>
        </div>
        <div class="social-block d-flex justify-content-center">


          <div class="save" @click="addToFavorites(post)" v-if="isAuthenticated"><img src="~assets/img/like.png" style="width:10px;height:10px"> save</div>
          <nuxt-link class="save" to="/favorites/auth/login" v-else><img src="~assets/img/like.png" style="width:10px;height:10px" class="img-fluid" > save</nuxt-link>

          <span class="share-line">|</span>
          <div class="share d-flex" @click="openSharing">
            <img src="~assets/img/share.png" style="width:10px;height:10px" class="img-fluid">

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
                 custom-class="modalSharing">
        <ModalSharing :data="post.item_details.id" :type="post.item_type" @close-sharing="closeSharing"/>
      </el-dialog>
    </div>

</template>
<script>
  import Select from '~/components/Elements/Icons/SelectDiamond'
  import {mapActions, mapGetters} from 'vuex'
  import ModalSharing from '~/components/ModalSharing';

  export default {
      props:{
        post:{
          type: Object
        },
        alias: String
      },
    data () {
      return {
        showSharing:false,

        active:false,
        loading: false,
        jewellery:{}
      }
    },
    components:{
      Select,
      ModalSharing
    },
    filters: {
      price: function (value) {
        return value.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
      comparedJewellery() {
        return this.$store.state.compare_products.jewellery
      }
    },
    methods: {
      openSharing(){
        this.showSharing = true
      },
      closeSharing(){
        this.showSharing = false
      },
      ...mapActions(['addToEngagement', 'addToPair']),
      addToFavorites(item){
        let value = {
          item_details: item.item_details,
          item_id: item.item_id,
          item_type: item.item_type
        }

        this.$store.dispatch('addToFavorites', value);
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      addToPairDiamond(item) {
        let redirect_pair = {
          name: 'diamonds-pair',
          shape: item.item_details.stone_shape
        }
        this.$emit('click-pair', redirect_pair)
        this.$store.dispatch('addToPairDiamond', item);
      },
      addToEngagement(item, alias) {
        if(this.comparedJewellery[alias] && this.comparedJewellery[alias].find(product => product.id === item.id) ){

          this.$emit('show_modal', true)

        }
        this.$store.commit('addToEngagement', {item: item, alias: alias});
        this.$emit('show_modal', false)

      },
      preView(post) {
        this.$emit('clicked', post)
      },
      mouseOver: function(){
        this.active = true;
      },
      mouseOut:function(){
        this.active=false;
      },
    }
  }
</script>


