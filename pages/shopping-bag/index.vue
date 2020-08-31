<template>
  <div>
    <div class="container">
      <div class="row acc-banner">
        <div class="banner">
          <div class="title">My shopping bag</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="col-md-10 py-5">
          <div class="row" v-if="typeof shopping_list !== 'undefined' && shopping_list.length > 0">
            <div class="col-md-8">
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
                  <div class="col-md-12 " v-for="item in shopping_list" :key="item.id" >
                    <ShopCard :card="item"/>
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
                        aud $ {{formatPrice(subTotalPrice)}}
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
                        <div class="title-total">Total</div>
                        <div class="title-price">AUD ${{formatPrice(totalPrice)}}</div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">

                    <div class="summary-submit  mb-3">
                      <nuxt-link to="/checkout" class="proceed"> <span>PROCEED TO CHECKOUT</span><CaretGor/> </nuxt-link>
                    </div>
                    <div class="summary-enqury">
                      <a href="#" class="link-enqury" @click="sendEnquiryHome(shopping_list)"> <span>make an enqury</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center flex-column" v-else>
            <div class="icon-empty-bag my-5">
              <img class="img-fluid" src="~assets/img/default/bag_icon.png">
            </div>
            <div class="title-empty-bag">
              You currently have no items in your shopping bag.
            </div>
            <div class="continue-empty-bag">
              <nuxt-link to="/diamonds">
                CONTINUE SHOPPING
              </nuxt-link>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ShopCard from '~/components/Shopping/ShopCard'
  import CaretGor from '~/components/Elements/Icons/CaretGor'
  import shopping_bag from "../../store/modules/shopping_bag";

  export default {
    components: {
      ShopCard,
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
      sendEnquiryHome(value){
        this.$store.dispatch('cleareEnquiry');
        this.$store.dispatch('sendEnquiryHome', value);
        this.$nuxt.$router.push({ name: 'dynamic-pages-id', params : {id: 'contact_us'}});
      }
    },
    computed: {
      ...mapGetters(['shopping_list','gstCount','markupValue','itemMeta']),


      subTotalPrice(){
        let sum = 0;
        this.shopping_list.forEach((value) => {
           sum += value.price * value.count
        })
        return sum;
      },
      totalPrice(){
        return this.subTotalPrice * this.gstCount
      },
      subTotalGst(){
        return this.totalPrice - this.subTotalPrice
      },
      updatedShoppongList(){
        this.$store.dispatch('fetchShoppingUpdate', this.shopping_list);
        return null
      },


    },

    created() {
      this.$store.dispatch('fetchMarkup');
      this.$store.dispatch('fetchGst');
      this.$store.dispatch('fetchMeta', 'shopping_bag' );

    },

  }


</script>
