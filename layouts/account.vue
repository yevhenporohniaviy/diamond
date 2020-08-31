<template>
  <div>
    <HomeHeader/>
    <!--account header-->
    <div class="container position-relative head-space" >
      <div class="row acc-banner-account">
        <div class="banner">
          <div class="title">Account details</div>
          <div class="profile-tabs">
            <div class="link-box profile">
              <NuxtLink to="/account/profile">
                Profile
              </NuxtLink>
            </div>
            <div class="link-box  password">
              <NuxtLink to="/account/password">
                Password
              </NuxtLink>
            </div>
            <div class="link-box  billing">
              <NuxtLink to="/account/billing">
                Billing
              </NuxtLink>
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

    components: {
      HomeHeader,
      Footer
    },
    computed: {
      ...mapGetters(['itemMeta']),

    },
    created() {
      this.$store.dispatch('fetchMeta', 'account' );

    }
  }
</script>
<style lang="scss">
  .acc-banner-account{
    position: relative;
    background-color: #e8f2fa;
    background-image: url("~assets/img/acc-logo.svg");
    background-position: center;
    background-repeat: no-repeat;
    padding: 85px;
    @media(max-width: 768px){
      padding: 25px;
    }
    .banner{
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
        text-transform: none;
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
            opacity: 0.4;
            &.nuxt-link-active{
              color: #24354f;
              border-bottom:3px solid #24354f;
              opacity: 1;
            }
          }
        }
      }
    }
  }

</style>

