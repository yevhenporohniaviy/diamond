<template>
  <div class="container">
    <div class="col-12 col-md-4 offset-md-4 block-form mt-4">

      <div class="title-forgot">If you need help resetting your password, we can help by sending you a link to reset it.
      </div>
      <form id="forgotUserPassword" @submit.prevent="forget_pass">

        <div class="input-group mt-3 mb-3">
          <el-input name="first_name" v-model="form.email" placeholder="Email"></el-input>
          <ul class="error-fields" v-if="error &&  Array.isArray(error.email) && error.email.length">
            <li v-for="(er, index) in error.email" :key="index">{{er}}</li>
          </ul>
        </div>
        <button type="submit" class="save-changes">
          next
        </button>
      </form>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      custom-class="forgotModal"
      width="30%"
      >
      <span class="title text-center d-flex justify-content-center align-items-center">Please check your email for instruction how to reset your password</span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>

  export default{

    name: 'Forgot',
    layout: 'auth',
    data() {
      return {
        dialogVisible: false,
        form:{
          email: '',
        },
        error: null
      }
    },

    methods:{

       forget_pass() {
        this.$axios.$post(`/auth/forgotPassword`, this.form)
          .then((resp) => {
            setTimeout(() => {
              this.$router.push('/')
            },1200);
            this.dialogVisible = true;
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
    },
  }
</script>

<style lang="scss">
  .forgotModal{
    border-bottom:4px solid #cae3f6;
    border-top:4px solid #cae3f6;
    .title{
      text-align: center;
      color: #24354f;
      font-family: lato-reg;
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
</style>
