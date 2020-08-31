<template>
  <div>
    <div class="container">
      <div class="row acc-banner">
        <div class="banner d-flex justify-content-center align-items-center flex-row">
          <div class="title d-none d-md-block">1.Checkout</div>
          <div class="arrow d-none d-md-block"><img src="~assets/img/arrow-bag.png" class="img-fluid"> </div>
          <div class="title font-weight-bold">2.Shipping</div>
        </div>
      </div>
    </div>
    <div class="container" >
      <div class="d-flex justify-content-center">
        <div class="col-md-10 py-5">
          <div class="row" v-if="!loading">
            <div class="col-md-8" >
              <div class="row" >
                <div class="col-md-6 col-12">
                  <div class="control-tab-shipping" >
                    <div class="title text-center">DELIVERY OR PICKUP?</div>
                    <button  v-on:click="currentTab = 'FirstCheckout'"  class="shipping-deliv" v-if="currentTab === 'FirstCheckout'" >

                      <img src="~assets/img/deliv-active.png" class="img-fluid"><span>delivery</span>
                    </button>
                    <button  v-on:click="currentTab = 'FirstCheckout'"  class="shipping-deliv-dis" v-else >

                      <img src="~assets/img/deliv-ddis.png" class="img-fluid"><span>delivery</span>
                    </button>
                    <div class="description mt-3  mb-5 text-center" v-if="currentTab === 'FirstCheckout'" >
                      Free secure priority worldwide shipping
                    </div>
                    <div class="description-disable mt-3 mb-5 text-center" v-else>
                      Free secure priority worldwide shipping
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="~assets/img/or.png" class="img-fluid">
                    </div>
                    <button  v-on:click="currentTab = 'SecondCheckout'" class="shipping-pick" v-if="currentTab === 'SecondCheckout'">
                      <img src="~assets/img/pick-active.png" class="img-fluid"> <span> pick up</span>
                    </button>
                    <button  v-on:click="currentTab = 'SecondCheckout'" class="shipping-pick-dis" v-else>
                      <img src="~assets/img/pick-dis.png" class="img-fluid"> <span> pick up</span>
                    </button>
                    <div class="description mt-3 text-center" v-if="currentTab === 'SecondCheckout'">
                      PICK UP IN OUR
                      SYDNEY STORE
                    </div>
                    <div class="description-disable mt-3 text-center" v-else>
                      PICK UP IN OUR
                      SYDNEY STORE
                    </div>
                  </div>

                </div>
                <div class="col-md-6 col-12">
                  <component
                    v-bind:is="currentTabComponent"
                    class="tab"
                    :isValidated="isValidated"
                    :fieldsAttributes="shipping"
                    @changeAttributesBilling="changeAttributesBilling"
                    @changeAttributesPick="changeAttributesPick"
                  ></component>
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
                    <div class="summary-submit" v-if="currentTab === 'FirstCheckout'">
                      <div class="proceed" @click="validateBeforeSubmit"><span>finalise order 1</span> <CaretGor/> </div>
                    </div>
                    <div class="summary-submit" v-else>
                      <div class="proceed" @click="validateBeforeSubmitPick"><span>finalise order 2</span> <CaretGor/> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex loading_search_result my-5 justify-content-center align-items-center flex-column" v-else>
            please wait,<br/>
            we are processing the request
            <img src="~assets/img/4V0b.gif" class="img-fluid">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import CaretGor from '~/components/Elements/Icons/CaretGor'
  import FirstCheckout from '~/components/ShippingComponents/FirstCheckout'
  import SecondCheckout from '~/components/ShippingComponents/SecondCheckout'


  export default {
    components: {
      FirstCheckout,
      SecondCheckout,

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

        shipping:{},
        isValidated: false,
        currentTab: 'FirstCheckout',
        loading: false
      }
    },
    methods: {
      ...mapActions(['clearShop',]),
      changeAttributesPick(item) {

        this.shipping = Object.assign({}, this.shipping, item.fields_form)
      },
      changeAttributesBilling(item) {

        this.isValidated = false
        this.shipping = Object.assign({}, this.shipping, item.fields_form)
        this.result = item.result
      },

      validateBeforeSubmit(e) {
        let vm = this
        this.isValidated = true
        setTimeout(() => {
          if (this.result) {
            this.checkout.shipping =  this.shipping
            this.loading = true
            this.$axios.post('/api/settings/orders', this.checkout)
              .then(function (response) {
                vm.$nuxt.$router.push({ name: 'order-placed', params: { checkout: response }});
                vm.$store.dispatch('clearShop');
              })
              .catch(function (error) {
                vm.$store.dispatch('clearShop');
                vm.$nuxt.$router.push({name: 'order-placed'});
                return error

              });
          }
        }, 100)
      },
      validateBeforeSubmitPick(e) {
        let vm = this
        setTimeout(() => {
          this.checkout.shipping =  this.shipping
          this.loading = true
            this.$axios.post('/api/settings/orders', this.checkout)
              .then(function (response) {
                vm.$nuxt.$router.push({ name: 'order-placed', params: { checkout: response }});
                vm.$store.dispatch('clearShop');
              })
              .catch(function (error) {

                vm.$store.dispatch('clearShop');
                vm.$nuxt.$router.push({ name: 'order-placed'});
                return error

              });
        }, 100)
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
    },

    computed: {
      ...mapGetters(['shopping_list','gstCount','checkout','isAuthenticated', 'loggedInUser','itemMeta']),
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
      this.$store.dispatch('fetchMeta', 'shipping' );
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
  .control-tab-shipping{
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

    .description{
      margin: 0 auto;
      width: 137px;
      color: #24354f;
      font-family: lato-reg;
      font-size: 10px;
      letter-spacing: 0.56px;
      line-height: 14px;
      text-transform: uppercase;
    }
    .description-disable{
      margin: 0 auto;
      width: 137px;
      opacity: 0.47;
      color: #24354f;
      font-family: lato-reg;
      font-size: 10px;
      letter-spacing: 0.56px;
      line-height: 14px;
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
    .shipping-deliv,
    .shipping-pick{
      img{
        margin-right: 20px;
      }
      margin: 0 auto;
      margin-top: 40px;
      width: 300px;
      height: 48px;
      background-color: #24354f;
      border: 1px solid #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-family: lato-reg;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
    .shipping-deliv-dis,
    .shipping-pick-dis{
      img{
        margin-right: 20px;
      }
      margin: 0 auto;
      margin-top: 40px;
      width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      color: #24354f;
      border: 1px solid #24354f;
      font-family: lato-reg;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
  }
</style>
