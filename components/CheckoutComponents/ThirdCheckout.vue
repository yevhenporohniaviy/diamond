<template>
  <div class="d-flex justify-content-center">
    <div class=" col-12">
      <div class="container-form-checkout">
        <div class="checkout-title mb-5">SIGNING UP</div>

        <form id="userInfoOrder" @submit.prevent="register">
          <div class="input-form">
            <el-input
              id="first_name"
              name="first_name"
              v-model="form.first_name"
              placeholder="First name"></el-input >
          </div>
          <div class="input-form">
            <el-input
              id="last_name"
              name="last_name"
              v-model="form.last_name"
              placeholder="Last name"></el-input >
          </div>
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
              type="password"
              name="password"
              v-model="form.password"
              placeholder="Password"></el-input >
          </div>
          <div class="input-form">
            <el-input
              id="confirm_password"
              type="password"
              name="confirm_password"
              v-model="form.confirm_password"
              placeholder="Confirm password"></el-input >
          </div>

          <button type="submit" class="save-changes">
            sign up
          </button>
        </form>
        <div class="already my-4 text-center">
          I ALREADY HAVE AN ACCOUNT
        </div>
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

      async register() {
        try {
          await this.$axios.post('/auth/register', this.form);

          this.$auth.loginWith('local', {data: this.form});

          this.$router.push('/success');
        } catch (e) {

          this.error = e.response.data.errors
        }
      },

    },

  }
</script>

<style lang="scss">
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
  .forget-pass{
    opacity: 0.61;
    color: #24354f;
    font-family: lato-reg;
    font-size: 12px;
    font-weight: 400;
  }
  .already{
    opacity: 0.6;
    color: #24354f;
    font-family: lato-reg;
    font-size: 12px;
    text-transform: uppercase;
  }
</style>
