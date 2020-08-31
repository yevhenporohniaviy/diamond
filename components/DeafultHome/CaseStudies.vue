<template>
  <div class="container-fluid" id="case_studies">
    <div class="">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="title-case mb-4">{{widget.title.en}}</div>
            <div class="d-flex justify-content-center">
              <div class="col-12 col-md-5">
                <div class="sub-title-case">
                  {{widget.subtitle.en}}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="container-fluid p-0 ">
        <slick id="carouselCase" ref="slick" :options="slickOptions">
          <div class=" slide" v-for="item in widget.slides" :key="item.id">
            <img class="img-fluid w-100" style="outline:none;" :src="item.image+'?h=400&w=500&fit=crop'">
          </div>
        </slick>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      widget: Object,
    },

    data() {
      return {
        slickOptions: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          focusOnSelect: true,
          centerMode: true,
          centerPadding: 0,
          dots: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        },
      }
    }
  }
</script>

