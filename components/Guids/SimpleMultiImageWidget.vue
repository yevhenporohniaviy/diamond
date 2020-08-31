

<template>
  <div class="col-12 col-md-8 offset-md-2 my-5 mb-4">
    <div class="row">
      <div  class="guid-content-description">
        <div class="guid-single-img-description">

          <div class="type">{{widget.title}}</div>
          <div class="title">{{widget.subtitle}}</div>
          <div class="description" v-html="widget.description"></div>

          <div class="row">
            <div class="col-12 col-md-6 p-0">
              <div class="section-multi-one-title">{{widget.other_images[0].title}}</div>
              <img :src="baseUrl + widget.other_images[0].image" class="img-fluid">
            </div>
            <div class="col-12 col-md-6">
              <div class="tips-img">
              <div class="d-flex">
                <div class="col-10 tips-desc d-flex" v-html="widget.content_text">

                </div>
                <div class="col-2 hooks-img d-flex">
                  <div class="row">
                    <div class="hooks">
                      <img src="~assets/img/guids/hook.png" >
                    </div>
                    <div class="img">
                      <img :src="baseUrl + widget.other_images[1].image" class="img-fluid">
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
                          <img :src="baseUrl+widget.other_images[1].image" class="img-fluid tips-img-cover">
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
