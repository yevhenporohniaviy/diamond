<template>
  <div class="d-flex justify-content-center">

    <div class="col-md-6 col-12">
      <div class="container-form-checkout">
        <div class="checkout-title mb-5">CHECKOUT AS</div>
        <div class="checkout-alerm mb-1">* indicates mandatory field </div>
        <form id="userInfoOrder" v-if="loggedInUser">
          <div class="input-form">
            <el-input
              id="first_name"
              name="first_name"
              v-model="fields_form.first_name"
              placeholder="First name*"
              v-validate.lazy="'required'"></el-input >
            <span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
          </div>
          <div class="input-form">
            <el-input
              id="last_name"
              v-model="fields_form.last_name"
              placeholder="Last name*"
              name="last_name"
              v-validate.lazy="'required'"></el-input>
            <span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
          </div>
          <div class="input-form">
            <el-input
              id="email"
              v-model="fields_form.email"
              placeholder="Email address*"
              name="email"
              type="email"
              v-validate.lazy="'required|email|confirmed:confirm_email'"></el-input>
            <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
          </div>
          <div class="input-form">
            <el-input
              type="email"
              id="confirm_email"
              v-model="confirm_email"
              placeholder="Confirm email address*"
              name="confirm_email"
              ref="confirm_email"></el-input>
          </div>
          <div class="input-form">
            <el-input
              id="phone_number"
              v-model="fields_form.phone_number"
              name="phone_number"
              placeholder="Phone number*"
              v-validate.lazy="'required'"></el-input>
            <span v-show="errors.has('phone_number')" class="form-control-feedback">{{ errors.first('phone_number') }}</span>
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
        confirm_email: '',
        fields_form: {

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
             console.log(result)
              this.$emit('changeAttributes', {result: result, fields_form: this.fields_form})
            })
        }
      }
    },
    created () {
      let userData = {
        first_name : this.loggedInUser.first_name,
        last_name : this.loggedInUser.last_name,
        email : this.loggedInUser.email,
        phone_number : this.loggedInUser.phone_number,
      }
      this.fields_form = Object.assign({}, this.fields_form,userData )


    }
  }
</script>
