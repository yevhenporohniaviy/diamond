<template>
  <div>
    <div class="container">
      <div class="row acc-banner">
        <div class="banner">
          <div class="title ">Thank you</div>
        </div>
      </div>
    </div>

    <div v-if="order">
      <div v-if="order.data">
        <div class="container" >

          <div class="d-flex justify-content-center">
            <div class="col-md-6 py-5">

              <div class="row justify-content-center flex-column align-items-center" >
                <img src="~assets/img/order-deliver.png" class="img-fluid mb-5" v-if="order.data.shipping.type === 'delivery'">
                <img src="~assets/img/order-pick.png" class="img-fluid mb-5" v-if="order.data.shipping.type === 'pick'">
                <div class="col-12 mb-5">
                  <div class="row" v-if="order.data.shipping.type === 'delivery'">
                    <div class="col-6 d-flex justify-content-center align-items-center">
                      <div class="box-number flex-column">
                        <div class="text  mb-3"> ORDER NO. </div>
                        <div class="number"> {{order.data.order_number}}</div>
                      </div>
                    </div>
                    <div class="col-6 d-flex justify-content-center align-items-center" >
                      <div class="box-number flex-column">
                        <div class="text mb-3">EST. DELIVERY </div>
                        <div class="date">  {{addWeeks}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="order.data.shipping.type === 'pick'">
                    <div class="col-12 d-flex justify-content-center align-items-center">
                      <div class="box-number flex-column">
                        <div class="text mb-3"> ORDER NO. </div>
                        <div class="number"> {{order.data.order_number}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="description-order text-center mb-4">
                  Your order has successfully been placed and we have emailed you a copy of the receipt.
                  <br>
                  <br>

                  You can also see your latest order updates and details in your Order History.
                </div>
                <div class="group-order-btn d-flex flex-column">
                  <button type="submit" class="continue-shop mb-4">
                    <nuxt-link to="/diamonds">CONTINUE SHOPPING <img src="~assets/img/cont-shop.png" class="img-fluid"> </nuxt-link>
                  </button>
                  <button type="submit" class="see-order" v-if="loggedInUser">
                    <nuxt-link to="/account/order-history">SEE ORDER HISTORY</nuxt-link>
                  </button>
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

  import {mapGetters} from'vuex'
  import moment from 'moment'

  export default {
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
        order : {}
      }
    },

    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser','itemMeta']),
      addWeeks()
        {
          const day = new Date();
          const date = new Date(day.setDate(day.getDate() + (4 * 7)));
          return moment(String(date)).format('Do MMMM YYYY')

        }
    },

    beforeRouteEnter (to, from, next) {

      next(vm => {

          vm.order = to.params.checkout
      });
    },
    created() {

      this.$store.dispatch('fetchMeta', 'order_placed' );
    }
  }


</script>
<style lang="scss">
  .description-order{
    width: 358px;
    height: 143px;
    color: #24354f;
    font-family: lato-reg;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 23px;
  }
  .box-number{
    width: 202px;
    height: 95px;
    border: 1px solid #cae3f6;
    display:flex ;
    justify-content: center;
  align-items: center;
    text-align: center;
    .text{
      opacity: 0.6;
      color: #24354f;
      font-family: lato-reg;
      font-size: 12px;
      text-transform: uppercase;
    }
    .number{
      color: #24354f;
      font-family: lato-reg;
      font-size: 18px;
      text-transform: uppercase;
    }
    .date{
      color: #24354f;
      font-family: lato-reg;
      font-size: 18px;
    }
  }
  .group-order-btn{
    .continue-shop{
      width: 294px;
      height: 48px;
      background-color: #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        color: #ffffff;
        font-family: lato-reg;
        font-size: 14px;
        letter-spacing: 1.17px;
        text-transform: uppercase;
        text-decoration: none;
      }
      img{
        margin-left: 10px;
      }
    }
    .see-order{
      width: 294px;
      height: 48px;
      border: 1px solid #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
    a{  color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
      text-decoration: none;
    }
    }
  }
</style>
