<template>
  <div class="container">

    <div class="col-12 col-md-4 offset-md-4 block-form">
      {{error}}
      <form id="changeUserPassword" @submit.prevent="save">

        <div class="input-group mb-5 mt-5">
          <el-input name="password" type="password" placeholder="New password" v-model="form.password" v-validate.lazy="'required'" ref="password" ></el-input>
          <ul class="error-fields" v-if="errors.has('password')">
            <li>{{errors.first('password')}}</li>
          </ul>
        </div>

        <div class="input-group">
          <el-input name="confirm_password" type="password" placeholder="Confirm new password" v-model="form.confirm_password" v-validate="'required|confirmed:password'"  ></el-input>
          <ul class="error-fields" v-if="errors.has('confirm_password')">
            <li>{{errors.first('confirm_password')}}</li>
          </ul>
        </div>

        <button type="submit" class="save-changes">
          Save new password
        </button>
      </form>
    </div>

  </div>
</template>

<script>

  export default{

    name: 'Login',
    layout: 'auth',
    data() {
      return {
        form:{
          password: '',
          confirm_password: ''
        },
        error: null
      }
    },
    methods:{
      async save() {
        this.$validator.validateAll()
          .then((valid) => {
            if(valid){
              this.$axios.$post(`/auth/resetPassword/email`, this.form)
                .then((resp) => {
                  this.$notify({
                    title: 'Success',
                    message: 'Your password has been changed.',
                    type: 'success'
                  });
                  this.$router.push('/')

                })
                .catch(error => {
                  this.error = error.response.data.errors
                  this.$notify({
                    title: 'Warning',
                    message: error.response.data.message,
                    type: 'warning'
                  });
                });
            }


          })
      }
    }
  }
</script>
