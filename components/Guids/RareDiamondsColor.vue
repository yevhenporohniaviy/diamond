<template>

  <div class="container p-0" id="header-guid">

    <div class="guid-banner">
      <img class="guid-banner-bg img-fluid" :src="baseUrl + widget.main_image">
      <div class="guid-banner-filter"></div>
      <div class="col-12 col-md-8 guid-banner-description guid-banner-preview-color">
        <div class="title-type" >{{widget.title}}</div>
        <div class="title">{{widget.subtitle}}</div>
        <div class="description" v-html="widget.description"></div>
      </div>
      <div class="diamond-preview-color">
        <img :src="baseUrl+imgs.image" v-for="(imgs, index) in widget.other_images" :key="index" class="img-fluid">
      </div>
    </div>
    <a href="#" class="scroll-to-content" id="indicator-scroll" @click="scrollToBottom"><img src="~assets/img/guids/caret-scroll.png" class="img-fluid" ></a>
  </div>
</template>

<script>

  export default {
    name: 'header-component',
    props: {
      widget: Object,
    },
    data() {
      return {

        flickityOptions: {
          prevNextButtons: false,
          pageDots: false,
          adaptiveHeight: true,
        }
      }
    },
    methods:{
      scrollToBottom(){
        var options = {
          easing: 'ease-in',
        }
        this.$scrollTo( '#indicator-scroll', options)
      }
    }
  }
</script>
