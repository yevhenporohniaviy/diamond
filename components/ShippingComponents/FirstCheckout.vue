<template>
  <div class="d-flex justify-content-center">
    <div class=" col-12">
      <div class="container-form-checkout">
        <div class="checkout-title mb-5">ENTER YOUR ADDRESS</div>
        <div class="checkout-alerm mb-1">* indicates mandatory field </div>
        <form id="userInfoOrder" >
          <div class="input-form">
            <el-input
              id="address"
              name="address"
              v-model="fields_form.address"
              placeholder="Address*"
              v-validate.lazy="'required'"></el-input >
            <span v-show="errors.has('address')" class="form-control-feedback">{{ errors.first('address') }}</span>
          </div>
          <div class="input-form">
          <el-input
                    id="country"
                    v-model="fields_form.country"
                    placeholder="Country*"
                    name="country"
                    v-validate.lazy="'required'"></el-input>
          <span v-show="errors.has('country')" class="form-control-feedback">{{ errors.first('country') }}</span>
          </div>
          <div class="input-form">
            <el-input
              id="state"
              v-model="fields_form.state"
              placeholder="State*"
              name="state"
              v-validate.lazy="'required'"></el-input>
            <span v-show="errors.has('state')" class="form-control-feedback">{{ errors.first('state') }}</span>
          </div>
          <div class="input-form">
            <el-input
              id="city"
              v-model="fields_form.city"
              placeholder="City*"
              name="city"
              v-validate.lazy="'required'"></el-input>
            <span v-show="errors.has('city')" class="form-control-feedback">{{ errors.first('city') }}</span>
          </div>
          <div class="input-form">
          <el-input
                    id="postcode"
                    v-model="fields_form.postcode"
                    name="postcode"
                    placeholder="Postcode*"
                    v-validate.lazy="'required'"></el-input>
          <span v-show="errors.has('postcode')" class="form-control-feedback">{{ errors.first('postcode') }}</span>
          </div>

          <div class="input-form">
            <el-input
              type="textarea"
              :rows="4"
              class="commetn-delive"
              id="comment"
              v-model="fields_form.comment"
              name="comment"
              placeholder="Add special delivery notes (optional)"
             ></el-input>
            <span v-show="errors.has('comment')" class="form-control-feedback">{{ errors.first('comment') }}</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex'

  export default {

    props: {
      fieldsAttributes: Object,
      isValidated: Boolean
    },
    data() {
      return {
        fields_form: {
          type: 'delivery'
        }
      }
    },
    computed: {
      ...mapGetters(['shopping_list','gstCount', 'loggedInUser']),

    },
    watch:{
      isValidated (value) {
        if (value) {
          this.$validator.validateAll()
            .then((result) => {
              this.$emit('changeAttributesBilling', {result: result, fields_form: this.fields_form})
            })
        }
      }
    },
    created () {
      if(this.loggedInUser && this.loggedInUser.billing !== null){
        let userBillingData = {

          address : this.loggedInUser.billing.address || '',
          city : this.loggedInUser.billing.city || '',
          country : this.loggedInUser.billing.country || '',
          postcode : this.loggedInUser.billing.postcode || '',
          state : this.loggedInUser.billing.state || '',

        }
        this.fields_form = Object.assign({}, this.fields_form, userBillingData )
      }


    }
  }
</script>

<style lang="scss">
  .commetn-delive{
    border-radius: 0;
    border: 1px solid #cae3f6;
    #comment{
      border: none;
      color: #24354f;
      font-family: lato-reg;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.86px;
      line-height: 24px;
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #24354f;
        font-family: lato-reg;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        color: #24354f;
        font-family: lato-reg;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        color: #24354f;
        font-family: lato-reg;
      }
      &:-moz-placeholder { /* Firefox 18- */
        color: #24354f;
        font-family: lato-reg;
      }
    }
  }
</style>
