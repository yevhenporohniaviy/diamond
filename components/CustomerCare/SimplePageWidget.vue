<template>
  <div class="custome_care">

    <div class="container">
      <div class="row acc-banner">
        <div class="banner-head">
          <div class="title d-flex flex-column">
            <img :src="`${baseUrl}${widget.main_image}?h=40`" class="img-fluid" v-if="widget.main_image">
            <div class="title">{{widget.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-12 col-md-6 offset-md-3 my-5 ">
        <div class="subpage-desc" v-html="widget.content_text">
        </div>

        <div class="col-12 text-center emblem-de ">
          <Emblem/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Emblem from '~/components/Elements/Icons/EmblemBlog'

  export default {
    name: 'diamond-anatomy-component',
    props: {
      widget: Object,
    },
    components: {
      Emblem
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
