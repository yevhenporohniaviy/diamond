<template>
  <div>
    <div class="container">
      <div class="row acc-banner">
        <div class="banner d-flex justify-content-center align-items-center flex-row">
          <div class="title font-weight-bold">1.Checkout</div>
          <div class="arrow d-none d-md-block"><img src="~assets/img/arrow-bag.png" class="img-fluid"> </div>
          <div class="title d-none d-md-block">2.Shipping</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="col-md-10 py-5">
          <div class="row">
            <div class="col-md-8" v-if="!isAuthenticated">
              <div class="row" >
                <div class="col-md-6 col-12">
                  <div class="control-tab-checkout" v-if="currentTab === 'FirstCheckout'">
                    <div class="title text-center">ALREADY HAVE AN ACCOUNT?</div>
                    <button  v-on:click="currentTab = 'SecondCheckout'" class="checkout-login">
                      Sign in
                    </button>
                    <button  v-on:click="currentTab = 'ThirdCheckout'"  class="checkout-registr">
                      Create an account
                    </button>
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="~assets/img/or.png" class="img-fluid">
                    </div>
                    <button  v-on:click="currentTab = 'SecondCheckout'" class="checkout-login-fb">
                      <img src="~assets/img/facebook.png" class="img-fluid"><span>SIGN UP WITH FACEBOOK</span>
                    </button>
                  </div>
                  <div class="control-tab-checkout" v-if="currentTab === 'SecondCheckout'">
                    <div class="title">
                      ALREADY HAVE AN ACCOUNT <img src="~assets/img/Combined_Shape.png" class="img-fluid">
                    </div>
                  </div>
                  <div class="control-tab-checkout" v-if="currentTab === 'ThirdCheckout'">

                    <div class="title">
                      CREATE AN ACCOUNT <img src="~assets/img/Combined_Shape.png" class="img-fluid">
                    </div>
                  </div>

                </div>
                <div class="col-md-6 col-12">
                  <component
                    v-bind:is="currentTabComponent"
                    class="tab"
                    :isValidated="isValidated"
                    :fieldsAttributes="formAttributes"
                    @changeAttributes="changeAttributes"
                  ></component>
                </div>
              </div>
            </div>
            <div class="col-md-8" v-else>


                <first-checkout-user
                  :isValidated="isValidated"
                  :fieldsAttributes="formAttributes"
                  @changeAttributes="changeAttributes">
                </first-checkout-user>

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
                        aud ${{formatPrice(subTotalGst)}}
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
                    <div class="summary-submit">
                      <div class="proceed" @click="validateBeforeSubmit"><span>continue to </span> <CaretGor/> </div>
                    </div>
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
  import {mapActions, mapGetters} from 'vuex'
  import CaretGor from '~/components/Elements/Icons/CaretGor'
  import FirstCheckout from '~/components/CheckoutComponents/FirstCheckout'
  import ThirdCheckout from '~/components/CheckoutComponents/ThirdCheckout'
  import SecondCheckout from '~/components/CheckoutComponents/SecondCheckout'
  import FirstCheckoutUser from '~/components/CheckoutComponents/FirstCheckoutUser'


  export default {
    components: {
      FirstCheckout,
      SecondCheckout,
      ThirdCheckout,
      FirstCheckoutUser,
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

        formAttributes:{},
        isValidated: false,
        currentTab: 'FirstCheckout',
      }
    },
    methods: {
      ...mapActions(['clearShop',]),
      changeAttributes(item) {
        this.isValidated = false
        this.formAttributes = Object.assign({}, this.formAttributes, item.fields_form)
        this.result = item.result
      },

      validateBeforeSubmit(e) {
        console.log(e)
        let vm = this
        this.isValidated = true
        setTimeout(() => {
          if (this.result) {
            let checkoutData = {
              ...this.formAttributes,
              total_price: this.subTotalPrice,
              total_price_gst: this.totalPrice,
              paid: 0,
              itemAttributes: this.shopping_list
            }

            vm.$store.dispatch('setCheckoutData', checkoutData);
            vm.$nuxt.$router.push({ name: 'shipping'});
          }
        }, 100)
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
    },

    computed: {
      ...mapGetters(['shopping_list','gstCount','isAuthenticated', 'loggedInUser','itemMeta']),
      currentTabComponent: function () {
        return this.currentTab
      },
      subTotalPrice(){
        let sum = 0;
        this.shopping_list.forEach((value) => {
          sum += value.price * value.count
        })
        return sum;
      },
      subTotalGst(){
        return this.totalPrice - this.subTotalPrice
      },
      totalPrice(){
        return this.subTotalPrice * this.gstCount
      }
    },
    created() {
      this.$store.dispatch('fetchGst');
      this.$store.dispatch('fetchMeta', 'checkout' );

    }
  }


</script>

<style lang="scss">
  .acc-banner{
    .banner{
      .title{
        margin: 0 25px;
      }
    }
  }
  .control-tab-checkout{
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      color: #24354f;
      font-family: lato-bold;
      font-size: 14px;
      letter-spacing: 2.67px;
      line-height: 28px;
      text-transform: uppercase;
      img{
        transform: rotate(180deg);
        margin-left: 20px;
      }
    }
    .checkout-login{
      margin: 0 auto;
      margin-bottom: 20px;
      width: 300px;
      height: 48px;
      background-color: #24354f;
      border: 1px solid #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-family: lato-bold;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
    .checkout-registr{
      margin: 0 auto;
      margin-bottom: 40px;
      width: 300px;
      height: 48px;
      background-color: transparent;
      border: 1px solid #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #24354f;
      font-family: lato-bold;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
    .checkout-login-fb{

      img{
        margin-right: 20px;
      }
      margin: 40px auto;

      width: 300px;
      height: 48px;
      background-color: transparent;
      border: 1px solid #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #24354f;
      font-family: lato-bold;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
  }
</style>
