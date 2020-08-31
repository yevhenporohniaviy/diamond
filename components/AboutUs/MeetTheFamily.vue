<template>
  <section id="section-meet-family">
    <div class="container">
      <div class="family-head">
        <div class="title-family" data-aos="fade-up">{{widget.title}}</div>
        <img class="logo-family img-fluid" src="~assets/img/logo-meet-friend.png">
      </div>
    </div>
    <div class="container d-none d-md-block">
      <div class="col-12 col-md-10 offset-md-1 ">
        <div class="row">
          <div class="col-12 gallery-family">
            <div class="row justify-content-center">
              <div :class="'image-family-'+ getIndex(index)" data-aos="fade-up" v-for="(img,index) in widget.other_images" :key="index">
                <img :src="baseUrl+img.image">
              </div>

            </div>
          </div>
          <div class="col-12  gallery-family">
            <div class="row justify-content-center">

            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid p-0 d-block d-md-none">

      <Flickity :options="flickityOptions" id="flickity-tab" data-aos="fade-up">
        <div class="carousel-cell" v-for="(img,index) in widget.other_images" :key="index">
          <div class=""><img :src="baseUrl+img.image"></div>
        </div>
      </Flickity>

    </div>
  </section>
</template>


<script>


  export default {
    props: {
      widget: Object,
    },
    data() {
      return {
        flickityOptions: {
          prevNextButtons: false,
          pageDots: true,
          initialIndex: 1,

        },
      }
    },
    methods: {
      getIndex(index){
        if(index % 4 > 0 ){
          return index % 4
        }
        return 0
      }
    }
  }
</script>
