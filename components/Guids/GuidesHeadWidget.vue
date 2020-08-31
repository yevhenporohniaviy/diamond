<template>

  <div class="container p-0" id="header-guid">

    <div class="guid-banner">
      <img class="guid-banner-bg img-fluid" :src="baseUrl + widget.main_image">
      <div class="guid-banner-filter"></div>
      <div class="col-12 col-md-12 guid-banner-description">
        <div class="title-type" >{{widget.title}}</div>
        <div class="title">{{widget.subtitle}}</div>
        <div class="col-12 col-md-8 offset-md-2">
          <div class="description" v-html="widget.description"></div>

        </div>
        <div class="diamonds-preview" :class="widget.other_images.length > 4 ? 'more-than-four-preview' : ''">
          <ul class="d-flex justify-content-center align-content-center">
            <li v-for="(imgs, index) in widget.other_images" :key="index" :class="widget.other_images.length >= 4 ? 'more-than-four' : ''">
              <p>{{imgs.title}}</p>
              <img class="img-fluid" :src="baseUrl + imgs.image + '?h=100'">
            </li>
          </ul>
          <Flickity :options="flickityOptions" class="flickity-tab">
            <div class="carousel-cell" v-for="(imgs, index) in widget.other_images" :key="index">
              <p style="margin-bottom: -10px">{{imgs.title}}</p>
              <img class="img-fluid" :src="baseUrl + imgs.image + '?h=100'">
            </div>
          </Flickity>
        </div>
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
