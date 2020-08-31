<template>
  <div class="d-flex justify-content-center">
    <div class=" col-12">
      <div class="container-form-checkout">
        <div class="checkout-title mb-5">Sign in</div>

        <form id="userInfoOrder" @submit.prevent="login">
          <div class="input-form">
            <el-input
              id="email"
              name="email"
              v-model="form.email"
              placeholder="Email"></el-input >
          </div>
          <div class="input-form">
            <el-input
              id="password"
              name="password"
              type="password"
              v-model="form.password"
              placeholder="Password"></el-input >
          </div>
          <button type="submit" class="save-changes mb-5">
            login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    props: {

    },
    data() {
      return {
        form:{
          password: '',
          email: '',
        },
        error: null
      }
    },
    methods:{

      async login() {
        try {
          this.$auth.loginWith('local', {data: this.form})
            .then(() => {

              this.$router.push('/checkout')
            })
            .catch(error => {
            });

        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },

  }
</script>

<style lang="scss">
  .save-changes{
    margin-top: 50px;
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
  .forget-pass{
    opacity: 0.61;
    color: #24354f;
    font-family: lato-reg;
    font-size: 12px;
    font-weight: 400;
  }
</style>
