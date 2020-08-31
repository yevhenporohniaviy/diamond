<template>
  <div>
    <HomeHeader/>
      <nuxt class="head-space"/>
    <Footer/>
    <div id="podium-widget"/>
  </div>
</template>
<script>
  import HomeHeader from '~/components/HomeHeader.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      HomeHeader,
      Footer
    }
  }
</script>

