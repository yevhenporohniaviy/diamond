<template>
    <div>
      <div class=" acc-banner">
        <div class="banner-orders">
          <div class="title">Order history</div>

        </div>
      </div>

      <div class="container mb-5">
        <div class="row justify-content-center flex-column align-items-center">
            <div class="col-md-6 col-12 order-container mt-5" v-for="item in listOrder.data" :key="item.id">
              <div class="row">
                <div class="col-7 general-information">

                    <div class="d-flex justify-content-between align-items-center">
                      <div class="inf-title">ORDER NO.</div>  <div class="inf-values">{{item.order_number}}</div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="inf-title">ORDER DATE </div>   <div class="inf-values"> {{item.created_at | moment(" Do MMM YYYY") }}</div>

                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="inf-title">STATUS </div>
                      <div class="inf-values" v-if="item.paid === 0">in transit</div>
                      <div class="inf-values" v-else >paid</div>

                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="inf-title">EST. DELIVERY </div>   <div class="inf-values">  -</div>

                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="inf-title"> NO. OF ITEMS </div> <div class="inf-values">  {{item.items_count}}</div>
                    </div>

                  </div>

                <div class="col-5 general-controller">
                  <div class="row justify-content-center align-items-center flex-column">
                    <img src="~assets/img/default/DE_logo.png" class="img-fluid">
                      <div class="price">aud ${{formatPrice(item.total_price)}}</div>
                      <nuxt-link :to="{name: 'account-order-history-id', params: { id: item.id} }" class="detail-order">
                        view order details
                      </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import {mapGetters} from 'vuex'

  export default{
    middleware: 'guest',

    head() {
      return {
        title: this.itemMeta.meta_title ? this.itemMeta.meta_title : '',
        meta: [
          {hid: 'og:title', property: 'og:title', content:  this.itemMeta.meta_title ? this.itemMeta.meta_title : '' },
          {hid: 'og:description', property: 'og:description', content:  this.itemMeta.meta_description ? this.itemMeta.meta_description : ''},
          {hid: 'og:image', property: 'og:image', content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:url ', property: 'og:image:url', content:  this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:image:width', property: 'og:image:width', content: '200'},
        ]
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(['listOrder','itemMeta']),
    },
    methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },

    },
    created() {
      this.$store.dispatch('fetchListOrder');
      this.$store.dispatch('fetchMeta','order_history');
    }
  }
</script>

<style lang="scss">
  .banner-orders{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    .title{
      opacity: 0.85;
      color: #24354f;
      font-family: lato-reg;
      font-size: 36px;
      font-weight: 400;
      letter-spacing: 1.07px;
      line-height: 60px;
      margin-bottom: 20px;
      @media(max-width: 767px){
        font-size: 20px;
      }
    }

  }
  .order-container{

    border: 1px solid #cae3f6;
    .general-information{
      padding: 30px 40px;
      .inf-title{
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
        line-height: 30px;
        text-transform: uppercase;
      }
      .inf-values{
        color: #24354f;
        font-family: lato-bold;
        font-size: 12px;
        letter-spacing: 1px;
        line-height: 30px;
        text-transform: uppercase;
      }
    }
    .general-controller{
      background-color: #e8f2fa;
      display: flex;
      justify-content: center;
      align-items: center;
      .price{
        color: #27344e;
        font-family: lato-bold;
        font-size: 20px;
        letter-spacing: 1.67px;
        text-transform: uppercase;
        margin: 20px auto;
      }
      .detail-order{
        width: 240px;
        height: 48px;
        background-color: #24354f;

        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-family: lato-reg;
        font-size: 14px;
        letter-spacing: 1.17px;
        text-transform: uppercase;
        text-decoration: none;
      }

    }
  }
</style>
