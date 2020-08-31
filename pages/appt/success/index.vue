<template>
  <div class="container-fluid">
    <div class="row justify-content-center no-thank-success-box">
      <div class="col-8">
        <div class="row justify-content-center text-center">
          <div class="no-thank-success">
            <img src="~assets/img/success-no.png" class="img-fluid">
            <div class="user my-4">Great, {{user}}!</div>
            <div class="description mb-5">
              Your appointment is confirmed and we have emailed you the details.<br>
              We look forward to seeing you!
            </div>
            <nuxt-link to="/" class="link">close</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
      }
    },
    methods:{
      userName(){
        if(Object.entries(this.$route.params).length !== 0){
          this.user = this.$route.params.data.first_name;
        }
      }
    },
    created() {
      this.userName()
    }
  }
</script>

<style lang="scss">
  .no-thank-success-box{

    background-color: #e8f2fa;
    .no-thank-success{
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .user{
        opacity: 0.59;
        color: #24354f;
        font-family: lato-reg;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
      .description{
        color: #24354f;
        font-family: lato-bold;
        font-size: 20px;
        letter-spacing: 0.56px;
        line-height: 32px;
      }
      .link{
        width: 200px;
        height: 48px;
        border: 1px solid #24354f;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #24354f;
        font-family: lato-reg;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 1.17px;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }

</style>
