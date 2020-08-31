<template>
  <div class="container">
    <div class="col-12 col-md-6 offset-md-3 my-5 mb-4">
      <div class="row">
        <div class="guid-content-description">
          <div class="type">{{widget.title}}</div>
          <div class="title">{{widget.subtitle}}</div>
          <div class="description" v-html="widget.description"></div>

        </div>
      </div>
    </div>

    <div class="col-12 text-center" v-if="widget.other_images.length > 1">
      <div class="default-guid-img-description" v-if="widget.other_images" >
        <img
          class="img-fluid mx-4"

          :src="baseUrl + img.image"
          v-for="(img, index) in widget.other_images"
          :class="img.shadow === 1 ? 'guid-img-description' : ''"
          :key="index">

      </div>
      <Flickity :options="flickityOptions"
                class="flickity-guid-img-description my-5"
                v-if="widget.other_images" >
        <div class="carousel-cell" v-for="(img, index) in widget.other_images" :key="index">
          <img class="img-fluid" :src="baseUrl + img.image" :class="img.shadow === 1 ? 'guid-img-description' : ''">
        </div>
      </Flickity>
    </div>
    <div class="col-12 text-center" v-else>
      <div class="default-guid-img-description-one" v-if="widget.other_images" >
        <img
          class="img-fluid"

          :src="baseUrl + img.image"
          v-for="(img, index) in widget.other_images"
          :class="img.shadow === 1 ? 'guid-img-description' : ''"
          :key="index">

      </div>
    </div>

    <div class="col-12 col-md-12 text-center my-5 mb-4">
      <div class="content-text-guid" v-html="widget.content_text"></div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'metals-component',
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
    }
  }
</script>
