<template>
  <div>
    <HomeHeader/>
    <!--account header-->
    <div class="container position-relative head-space">
      <div class="row banner-auth">
        <div class="auth-route">
          <div class="profile-tabs">
            <div class="link-box profile" >
              <nuxt-link  to="/auth/login">
                Login
              </nuxt-link>
            </div>
            <div class="link-box password">
              <nuxt-link  to="/auth/register">
                Sign up
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
  import HomeHeader from '~/components/HomeHeader.vue'
  import Footer from '~/components/Footer.vue'
  import { mapGetters} from 'vuex'

  export default {
    head() {
      return {
        title: this.itemMeta.meta_title ? this.itemMeta.meta_title : '',
        meta: [
          {hid: 'og:title', property: 'og:title', content:  this.itemMeta.meta_title ? this.itemMeta.meta_title : '' },
          {hid: 'og:description', property: 'og:description', content:  this.itemMeta.meta_description ? this.itemMeta.meta_description : ''},
          {hid: 'og:image', property: 'og:image', content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:url ', property: 'og:image:url', content:  this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:image:width', property: 'og:image:width', content: '200'},
        ]
      }
    },
    data() {
      return {
      }
    },
    components: {
      HomeHeader,
      Footer
    },
    computed: {
      ...mapGetters(['itemMeta']),

    },
    created() {
      this.$store.dispatch('fetchMeta', 'authorization' );


    }
  }
</script>
<style lang="scss">
  .block-form{
    .title-forgot{
      text-align: center;
      color: #24354f;
      font-family: lato-reg;
      font-size: 18px;
      letter-spacing: 1px;
    }
    width: 400px;
    margin: 0 auto;
    @media(max-width: 767px){
      width: 100%;
    }
  }
  .social-registration-group{
    display: flex;
    justify-content: center;
    .facebook-registration{
      display: flex;
      align-items: center;
      box-shadow: 0 -1px 0 #cae3f6;
      background-color: #fff;
      border:1px solid #24354f;
      color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.4px;
      line-height: 24px;
      text-transform: uppercase;
      text-decoration: none;
      padding: 12px 40px;
      @media(max-width:767px){
        padding: 12px 30px;
      }
      img{
        margin-right: 10px;
      }
    }
  }
  #registrationUser,
  #forgotUserPassword,
  #changeUserPassword,
  #loginUser{
    margin: 40px 0 ;
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
    .forgot{
      cursor: pointer;
      text-decoration: none;
      opacity: 0.6;
      color: #24354f;
      font-family: lato-reg;
      font-size: 12px;
      font-weight: 400;
    }
    .already{
      text-align: center;
      a{
        opacity: 0.6;
        color: #24354f;
        font-family: lato-reg;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
        text-decoration: none;
      }
    }
    .input-group{
      margin-bottom: 20px;
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

        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
        font-weight: 400;
        padding: 0px;
        padding-bottom: 20px;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
        }
        &::-moz-placeholder { /* Firefox 19+ */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
        }
        &:-ms-input-placeholder { /* IE 10+ */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
        }
        &:-moz-placeholder { /* Firefox 18- */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
        }
      }
    }
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
  }
  .banner-auth{
    position: relative;
    background-color: #e8f2fa;
    background-image: url("~assets/img/acc-logo.svg");
    background-position: center;
    background-repeat: no-repeat;
    padding: 85px;
    @media(max-width: 768px){
      padding: 25px;
    }
    .auth-route{
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
</style>

