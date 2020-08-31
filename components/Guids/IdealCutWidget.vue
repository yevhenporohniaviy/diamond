<template>
<div>
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
  </div>
  <div class="container-fluid grade bg-grade my-5 ">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 ">
            <div class="tips">
              <img src="~assets/img/guids/tips-logo.svg" class="tips-logo">
              <div class="tips-title">
                {{ widget.title}}
              </div>
              <img src="~assets/img/guids/symbol.png" class="img-fluid tips-description-img">

              <div class="tips-description" v-html="widget.content_text">
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 tips-img">
            <div class="row">
              <img :src="baseUrl+widget.main_image" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid grade-mobile  my-5 ">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 tips-img-mobile">
            <div class="row justify-content-center">
              <img :src="baseUrl+widget.main_image" class="img-fluid tips-img-cover">
              <img src="~assets/img/guids/tips-logo.png" class="tips-logo">
              <div class="tips-content col-10">
                <img src="~assets/img/guids/synb.png" class="img-fluid tips-description-img">
                <div class="tips-description" v-html="widget.content_text">

                </div>
              </div>
            </div>
          </div>
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
