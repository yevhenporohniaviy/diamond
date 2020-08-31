<template>
  <div>
    <div class="container">
      <div class="row acc-banner">
        <div class="banner">
          <nuxt-link to="/account/order-history" class="back-btn">
            <span>
              <img src="~assets/img/Combined_Shape.png">
            </span>
            BACK TO ORDER HISTORY</nuxt-link>
          <div class="title">Order details</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="col-md-10 py-5">
          <div class="row" >
            <div class="col-md-8">
              <div class="table-order-details">
                <div class="row ">
                  <div class="order-details order-numb col-md-6 col-12">
                    <div class="title">order no.</div>
                    <div class="value">{{itemOrder.order_number}}</div>
                  </div>
                  <div class="order-details order-data col-md-6 col-12">
                    <div class="title">order date</div>
                    <div class="value"> {{itemOrder.created_at | moment(" Do MMMM YYYY")}}</div>
                  </div>
                  <div class="order-details order-status col-md-6 col-12">
                    <div class="title">status</div>
                    <div class="value" v-if="itemOrder.paid === 0">in transit</div>
                    <div class="value" v-else >paid</div>
                  </div>
                  <div class="order-details order-deliver col-md-6 col-12">
                    <div class="title">est.delivery</div>
                    <div class="value">-</div>
                  </div>
                  <div class="order-details order-to col-md-6 col-12">
                    <div class="title">to</div>
                    <div class="value">{{itemOrder.first_name}} {{itemOrder.last_name}}</div>
                  </div>
                  <div class="order-details order-email col-md-6 col-12">
                    <div class="title">email</div>
                    <div class="value">{{itemOrder.email}}</div>
                  </div>
                  <div class="order-details order-phone col-md-6 col-12">
                    <div class="title">phone </div>
                    <div class="value">{{itemOrder.phone_number}}</div>
                  </div>
                  <div class="order-details order-shipping col-md-6 col-12">
                    <div class="title">shipping address</div>
                    <div class="value">
                      <span v-for="(item, index) in itemOrder.shipping" :key="index">
                        {{item}}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
              <div class="table-shopping-bag" >
                <div class="table-head-bag py-4 d-none d-md-block">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-5 text-center">
                        <div class="title-head-bag">PRODUCT</div>
                      </div>
                      <div class="col-md-2 text-center">
                        <div class="title-head-bag">UNIT PRICE</div>
                      </div>
                      <div class="col-md-2 text-center">
                        <div class="title-head-bag">QUANTITY</div>
                      </div>
                      <div class="col-md-2 text-center">
                        <div class="title-head-bag">SUBTOTAL</div>
                      </div>
                      <div class="col-md-1 text-center">
                        <div class="title-head-bag"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-content-bag">

                  <div class="col-md-12 " v-for="item in itemOrder.items" :key="item.id" >
                    <OrderCard :card="item"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="table-summary">
                <div class="table-head-summary py-3">
                  <div class="col-md-12">
                    <div class="row justify-content-center">
                      <div class="title-head-summary">ORDER SUMMARY</div>
                    </div>
                  </div>
                </div>
                <div class="table-summary-content p-4">
                  <div class="col-md-12 ">
                    <div class="d-flex justify-content-between pb-2">
                      <div class="info-summary-title">
                        SHIPPING
                      </div>
                      <div class="info-summary-description">free</div>
                    </div>
                    <div class="d-flex justify-content-between pb-2">
                      <div class="info-summary-title">
                        INSURANCE FEE
                      </div>
                      <div class="info-summary-description">free</div>
                    </div>
                    <div class="d-flex justify-content-between pb-2">
                      <div class="info-summary-title">
                        SUBTOTAL
                      </div>
                      <div class="info-summary-description">
                        aud $ {{formatPrice(itemOrder.total_price)}}
                      </div>
                    </div>
                    <div class="d-flex justify-content-between pb-3">
                      <div class="info-summary-title">
                        GST
                      </div>
                      <div class="info-summary-description">
                        aud $ {{formatPrice(subTotalGst)}}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="info-total">
                      <div class="d-flex justify-content-between">
                        <div class="title-total">Total </div>
                        <div class="title-price">AUD ${{formatPrice(totalPrice)}}</div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">



                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import OrderCard from '~/components/Orders/OrderCard'
  import CaretGor from '~/components/Elements/Icons/CaretGor'

  export default {
    components: {
      OrderCard,
      CaretGor
    },
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
    methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },

    },
    computed: {
      ...mapGetters(['itemOrder','gstCount','itemMeta']),


      totalPrice(){
        return this.itemOrder.total_price * this.gstCount
      },
      subTotalGst(){
        return this.totalPrice - this.itemOrder.total_price
      },
    },

    created() {
      this.$store.dispatch('fetchOrderItem', this.$route.params.id);
      this.$store.dispatch('fetchMarkup');
      this.$store.dispatch('fetchGst');
      this.$store.dispatch('fetchMeta','order_history_detail');

    },

  }


</script>

<style lang="scss">
  .table-order-details{
    .order-details{
      margin-bottom: 60px;
      .title{
        opacity: 0.6;
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 20px;
      }
      .value{
        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
      }

    }
  }
  .acc-banner{
    .banner{
      .back-btn{
          position: absolute;
        left: 0;
        color: #24354f;
        font-family: lato-bold;
        font-size: 12px;

        letter-spacing: 1px;
        text-transform: uppercase;
        text-decoration: none;
        span{
          margin-right: 10px;
        }
        @media(max-width: 525px){
          display: none;
        }
      }
    }
  }
</style>

