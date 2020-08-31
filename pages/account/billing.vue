<template>
  <div class="container">
    <div class="col-12 col-md-6 offset-md-3">
      <div class="row mt-5 justify-content-center">
        <div class="col-12 col-md-6">
          <div class="title text-center">
            BILLING ADDRESS
          </div>
          <form id="billingFrom" @submit.prevent="sendBilling">
            <div class="input-group">
              <span class="demo-input-label" for="address">ADDRESS</span>
              <el-input name="address" v-model="billing.address"></el-input>
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="city">CITY</span>
              <el-input name="city" v-model="billing.city"></el-input >
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="country">Country</span>
              <el-input name="country" v-model="billing.country"></el-input>
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="state">State/territory</span>
              <el-input name="state" v-model="billing.state"></el-input>
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="postcode">Postcode</span>
              <el-input name="postcode" v-model="billing.postcode"></el-input>
            </div>
            <button type="submit" class="save-changes" >
              SAVE ADDRESS CHANGES
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from'vuex'

  export default {
    name: 'Billing',
    layout: 'account',
    data() {
      return {
        active: false,
        loading: false,
        jewellery: {},
        billing: {}
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser']),

    },
    methods:{
      sendBilling(){

        this.$axios.$post('/api/users/billings', this.billing)
          .then((response) => {

            this.$notify({
              title: 'Success',
              message:'Your profile details have been changed',
              type: 'success'
            });
            return response;

          })
          .catch((error) =>  {
            console.log(error)
            return error

          });
      },
      setFields() {

        if(this.$auth.loggedIn){
          this.billing = Object.assign({} , this.billing, this.$auth.user.billing)
        }

      }

    },
    created() {
      this.setFields();
    }
  }
</script>
<style lang="scss">
  .title{
    color: #24354f;
    font-family: lato-bold;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3.1px;
    text-transform: uppercase;
  }

  #billingFrom{
    margin: 40px 0 ;
    .input-group{
      margin-bottom: 50px;
      span{
        opacity: 0.61;
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
      }
      input{
        border: none;
        border-bottom: 2px solid #e8f2fa;
        border-radius: 0;

        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
        font-weight: 400;
      }
    }
    .save-changes{
      margin-top: 40px;
      background-color: #24354f;
      border-radius: 0;
      padding: 14px;
      width: 100%;

      color: #ffffff;
      font-family: lato-reg;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
  }
  #PayFrom{
    margin: 58px 0 ;
    .input-group{
      margin-bottom: 20px;
      span{
        opacity: 0.61;
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
      }
      input{
        border: none;
        border-bottom: 2px solid #e8f2fa;
        border-radius: 0;

        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
        font-weight: 400;
      }
    }
    .save-changes{
      margin-top: 40px;
      background-color: #24354f;
      border-radius: 0;
      padding: 14px;
      width: 100%;

      color: #ffffff;
      font-family: lato-reg;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
  }

</style>
