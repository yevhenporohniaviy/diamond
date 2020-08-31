<template>
  <section id="section-our-core">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <EmblemDiamond/>
          <div class="title" data-aos="fade-up">
            {{widget.title}}
          </div>
        </div>
        <div class="col-12 col-md-6 description" data-aos="fade-up" v-html="widget.content.left_text">

        </div>
        <div class="col-12 col-md-6 description" data-aos="fade-up" v-html="widget.content.right_text">

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import EmblemDiamond from '~/components/Elements/Icons/DiamondAbout'


  export default {
    props: {
      widget: Object,
    },
    data() {
      return {
      }
    },
    components: {
      EmblemDiamond
    }
  }
</script>
