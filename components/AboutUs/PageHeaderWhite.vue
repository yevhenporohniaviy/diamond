<template>
  <section id="header-about">
    <div class="container">
      <div class="col-12 col-md-12">
        <div class="row justify-content-center">
          <div class=" diamond-emporium-exp">
            <span data-aos="fade-up">{{widget.title}}</span>
            <div class="title" data-aos="fade-up">
             {{widget.subtitle}}
            </div>
          </div>
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
    data() {
      return {

      }
    },
    components: {
    }
  }
</script>
