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
    <div class="col-12 col-md-12">
      <div class="row ">
        <div class="col-12 col-md-8 d-flex justify-content-center">
          <img :src="baseUrl + widget.main_image" class="img-fluid">
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-center align-items-center">
          <div class="graphic-description" v-html="widget.content_text">

          </div>
        </div>
      </div>
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
