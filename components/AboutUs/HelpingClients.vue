<template>
  <section id="section-our-refined">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 images-refined">
          <div class="column-image-bg"></div>
          <div class="column-images">
            <img class="img-fluid my-2" :src="baseUrl+widget.other_images[0].image" data-aos="fade-up">
            <img class="img-fluid my-2 d-none d-md-block" :src="baseUrl+widget.other_images[1].image"
                 data-aos="fade-up">
          </div>
        </div>
        <div class="col-12 col-md-5 text-refined" data-aos="fade-up">
          <div class="title">…helping clients say ‘I Do’ for decades</div>
          <div class="description-first " data-aos="fade-up" v-html="widget.description">

          </div>
          <div class="description-second" data-aos="fade-up" v-html="widget.content_text">

          </div>
          <div class="text-refined-bg" data-aos="fade-up"></div>
          <img class="img-fluid  text-refined-image my-2 d-block d-md-none " data-aos="fade-up"
               :src="baseUrl+widget.other_images[1].image">
        </div>
      </div>
    </div>
  </section>
</template>
<script>

  export default {

    props: {
      widget: Object,
    },
    components: {
    },
    data() {
      return {

      }
    }
  }
</script>
