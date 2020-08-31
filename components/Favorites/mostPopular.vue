<template>
  <div>
    <section id="list-favorites" class="list-popular">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-6 text-center">
            <div class="title-most">See what’s popular</div>
          </div>
          <div class="col-12 col-md-9 most-list">

            <div class="row" v-if="typeof popular_list !== 'undefined' && popular_list.length > 0">

              <div class="col-6 col-md-4 " v-for="item in popular_list" :key="item.id">

                <div class="card-favorites">
                  <div class="diamond-card" v-if="item.referenceNum">

                    <div class="diamond-image" v-if="item.images">
                      <img :src="item.images.main+'?h=178'" class="img-fluid my-4">
                    </div>
                    <div class="info-diamond d-flex justify-content-center align-items-center flex-column">
                      <img class="logo" src="~assets/img/emblem-product.png">
                      <div class="price mt-3 mb-1">AUD ${{formatPrice(item.price)}}<span class="ml-1">ex. GST</span></div>
                      <div class="info-size">
                        L {{item.MeasLength}}mm x
                        W {{item.MeasWidth}}mm x
                        H {{item.MeasDepth}}mm
                      </div>
                    </div>
                    <div class="d-none d-md-block">
                      <div class="detailinfo-diamond d-flex justify-content-between">
                        <div class="info-box">
                          <span>carat</span>
                          <span>{{item.caratSize | toDecimalNumber}}</span>
                        </div>
                        <div class="info-box">
                          <span>COLOUR</span>
                          <span>{{item.color}}</span>
                        </div>
                        <div class="info-box">
                          <span>CLARITY</span>
                          <span>{{item.clarity}}</span>
                        </div>
                        <div class="info-box">
                          <span>CUT</span>
                          <span>{{item.cut ? item.cut : '-'}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="share d-flex justify-content-center align-items-center" @click="openSharing(item.referenceNum, 'd')">
                      <img src="~assets/img/share.png" class="img-fluid">

                      <i class="fa fa-facebook"></i> Share
                    </div>


                  </div>

                  <div class="jewellery-card" v-if="item.item_number">
                    <div class="jewellery-image" v-if="item.images">
                      <img :src="baseUrl + item.images.main.image+'?h=238'" class="img-fluid">
                    </div>
                    <div class="info-jewellery d-flex justify-content-center align-items-center flex-column">
                      <img class="logo" src="~assets/img/emblem-product.png">
                      <div class="name">{{item.title}}</div>
                      <div class="price">AUD ${{formatPrice(item.price)}}<span class="ml-1">ex. GST</span></div>
                    </div>
                    <div class="share d-flex justify-content-center align-items-center"  @click="openSharing(item.id, 'd')">
                      <img src="~assets/img/share.png" class="img-fluid">
                      <i class="fa fa-facebook"></i> Share
                    </div>

                  </div>

                  <div class="instagram-card" v-if="item.feed_item_id">
                    <div class="instagram-image" v-if="item.data.images">
                      <img :src="item.data.images.standard_resolution.url" class="img-fluid">
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Share Modal -->
      <el-dialog :visible.sync="showSharing"
                 center
                 :show-close="false"
                 custom-class="modalSharing">
        <ModalSharing :data="this.data.id" :type="this.data.type" @close-sharing="closeSharing"/>

      </el-dialog>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ModalSharing from '~/components/ModalSharing';

  // Share Modal Component

  export default {
    data() {
      return {

        showSharing: false,
        data: {}
      }
    },
    components: {
      ModalSharing
    },
    methods:{
      openSharing(id, type){
        this.data = {
          id: id,
          type: type
        }

        this.showSharing = true
      },
      closeSharing(){
        this.showSharing = false
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
    },
    mounted() {

    },
    computed: {
      ...mapGetters(['popular_list','isAuthenticated']),
    },
    created() {
      this.$store.dispatch('fetchListPopular')
    }
  }


</script>
<style lang="scss">
  .list-popular{
    margin-top: 100px;
    margin-bottom: 50px;
  }
  .most-list{
    border-top: 1px solid #cae3f6;
    margin-top: 20px;
    padding-top: 40px;
  }
  .title-most{
    opacity: 0.85;
    color: #24354f;
    font-family: lato-reg;
    font-size: 36px;
    letter-spacing: 1.07px;
    line-height: 60px;
  }
</style>
