<template>
  <div class="d-flex justify-content-center">
    <div class=" col-12">
      <div class="container-form-checkout">
        <div class="checkout-title mb-5">CHECKOUT AS A GUEST</div>
        <div class="checkout-alerm mb-1">* indicates mandatory field </div>
        <form id="userInfoOrder" >
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
                    ref="email"
                    v-validate.lazy="'required|email'"></el-input>
          <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
          </div>
          <div class="input-form">
          <el-input
                    type="email"
                    id="confirm_email"
                    v-model="confirm_email"
                    placeholder="Confirm email address*"
                    name="confirm_email"
                    v-validate="'required|email|confirmed:email'"
                    ></el-input>
            <span v-show="errors.has('confirm_email')" class="form-control-feedback">{{ errors.first('confirm_email') }}</span>
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
  export default {

    props: {
      fieldsAttributes: Object,
      isValidated: Boolean
    },
    data() {
      return {
        confirm_email: '',
        fields_form: {}
      }
    },
    computed: {

    },
    watch:{
      isValidated (value) {
        if (value) {
          this.$validator.validateAll()
            .then((result) => {
              this.$emit('changeAttributes', {result: result, fields_form: this.fields_form})
            })
        }
      }
    },
    created () {
      this.fields_form = Object.assign({}, this.fields_form, this.fieldsAttributes)
    }
  }
</script>
