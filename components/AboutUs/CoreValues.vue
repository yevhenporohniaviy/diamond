<template>
  <section id="section-core-values">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-7 core-text">
          <div class="title" data-aos="fade-up">{{widget.title}}</div>
          <div class="row">
            <div class="description-box">
              <div class="description" data-aos="fade-up" v-html="widget.content_text">

              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8 core-image" data-aos="fade-up">
          <img class="img-fluid" :src="baseUrl+widget.main_image" >
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
