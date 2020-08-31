<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="col-12 col-md-4">

        <form id="updatePassFrom" @submit.prevent="changePassword">
          <div class="input-group">
            <span class="demo-input-label" for="old_password">Old password</span>
            <el-input name="old_password" type="password" v-model="form.old_password" v-validate="'required'"></el-input>
            <ul class="error-fields" v-if="errors.has('old_password')">
              <li>{{errors.first('old_password')}}</li>
            </ul>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.old_password) && error.old_password.length">
              <li v-for="(er, index) in error.old_password" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="input-group">
            <span class="demo-input-label" for="new_password">New password</span>
            <el-input name="password" type="password" v-model="form.password" v-validate.lazy="'required'" ref="password"></el-input>
            <ul class="error-fields" v-if="errors.has('password')">
              <li>{{errors.first('password')}}</li>
            </ul>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.password) && error.password.length">
              <li v-for="(er, index) in error.password" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="input-group">
            <span class="demo-input-label" for="confirm_password">Confirm new password</span>
            <el-input name="password_confirm" type="password" v-model="form.password_confirm" v-validate="'required|confirmed:password'" ></el-input>
            <ul class="error-fields" v-if="errors.has('password_confirm')">
              <li>{{errors.first('password_confirm')}}</li>
            </ul>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.password_confirm) && error.password_confirm.length">
              <li v-for="(er, index) in error.password_confirm" :key="index">{{er}}</li>
            </ul>
          </div>

          <div class="button-submit">
            <button type="submit" class="save-changes  text-center" >
              SAVE NEW PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    name: 'Password',
    layout: 'account',
    data() {
      return {
       form:{},
       error: null
      }
    },
    methods: {

      changePassword(){
        this.$validator.validateAll()
          .then((valid) => {
            if(valid){
              this.$axios.$post('/api/users/change_password', this.form)
                .then(() => {
                  this.$notify({
                    title: 'Success',
                    message: 'Your password has been changed.',
                    type: 'success'
                  });
                  this.$router.push('/')
                })
                .catch(error => {
                    this.error = error.response.data.errors
                });
            }
          });

      }
    }
  }
</script>
<style lang="scss">
  #updatePassFrom{
    margin: 40px 0;
    .error-fields{
      list-style: none;
      margin-top: 10px;
      padding: 0;
      li{
        color: #24354f;
        font-family: lato-bold;
        font-size: 12px;
      }
    }
    .input-group{
      width: 300px;
      margin: 0 auto;
      margin-bottom: 60px;

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
        padding: 0;
        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
        font-weight: 400;
      }
    }
    .button-submit{
      width: 300px;
      margin: 0 auto;
      .save-changes{

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

  }


</style>
