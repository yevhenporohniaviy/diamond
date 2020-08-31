<template>
  <div>
    <HomeHeader/>
    <!--account header-->
    <div class="container position-relative" >
      <div class="row acc-banner">
        <div class="banner-save">
          <div class="title">Saved items</div>
          <div class="row justify-content-center">
            <div class=" col-md-7 col-12 description text-center mb-4">
              Login to view your saved items. Or sign up if you don’t already have an account. It only takes 1 minute!
            </div>
          </div>
          <div class="profile-tabs">
            <div class="link-box profile" >
              <NuxtLink  to="/favorites/auth/login">
                Login
              </NuxtLink>
              <NuxtLink  to="/favorites/auth/register">
                Sign up
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
    </div>
    <nuxt/>
    <MostPopular/>
    <Footer/>
  </div>
</template>
<script>
  import MostPopular from '~/components/Favorites/mostPopular.vue'
  import HomeHeader from '~/components/HomeHeader.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    data() {
      return {
        banner: this.$nuxt.$route.name

      }
    },
    components: {
      MostPopular,
      HomeHeader,
      Footer
    }
  }
</script>
<style lang="scss">
  .acc-banner{
    position: relative;
    background-color: #e8f2fa;
    background-image: url("~assets/img/acc-logo.svg");
    background-position: center;
    background-repeat: no-repeat;
    padding: 85px;
    @media(max-width: 768px){
      padding: 25px;
    }
    .banner-auth{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      .title{
        opacity: 0.85;
        color: #24354f;
        font-family: lato-reg;
        font-size: 36px;
        font-weight: 400;
        letter-spacing: 1.07px;
        line-height: 60px;
        margin-bottom: 20px;
        @media(max-width: 768px){
          font-size: 24px;
        }
      }
      .profile-tabs{
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        .link-box{
          margin: 0 20px;
          padding: 10px;
          padding-bottom: 20px;
          @media(max-width: 768px){
            margin: 0;
            padding: 0px;
            padding-bottom: 20px;
          }
          a{
            padding: 10px;
            padding-bottom: 20px;
            text-decoration: none;
            color: #24354f;
            font-family: lato-bold;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 3.1px;
            text-transform: uppercase;

            &.nuxt-link-active{
              color: #24354f;
              border-bottom:3px solid #24354f;
            }
          }
        }
      }
    }
  }
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>

