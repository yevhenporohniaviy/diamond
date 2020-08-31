<template>
  <div class="container">
    <div class="col-12 col-md-8 offset-md-2 my-5 mb-4">
      <div class="row">
        <div class="guid-content-description">
          <div class="type">{{widget.title}}</div>
        </div>
      </div>
    </div>

    <div class="col-12 text-center">
      <div class="default-guid-img-description" v-if="widget.other_images" >
        <div class="example-diamond-list" >
          <div class="example-item" :class="alias === 'diamond_clarity' ? 'clarity':''" v-for="(img, index) in widget.other_images"  :key="index">
            <div class="title mb-2">
              {{img.title}}
            </div>
            <img
              class="img-fluid example-img"
              :src="baseUrl + img.image"
              :class="img.shadow === 1 ? 'guid-img-description' : ''">
          </div>
        </div>
        <div class="example-line-description mt-4" v-if="alias === 'diamond_colour'">
        <ExampleLineColour/>
      </div>
        <div class="example-line-description mt-4" v-else>
          <ExampleLineClarity/>
        </div>
      </div>
      <Flickity :options="flickityOptions"
                class="flickity-guid-img-description my-5"
                v-if="widget.other_images" >
        <div class="carousel-cell" v-for="(img, index) in widget.other_images" :key="index">
          <div class="title mb-2">
            {{img.title}}
          </div>
          <img class="img-fluid" :src="baseUrl + img.image" :class="img.shadow === 1 ? 'guid-img-description' : ''">
          <div class="sub-title  mt-5 mb-2">
            {{img.subtitle}}
          </div>
          <div class="description mt-3 mb-2">
            {{img.description}}
          </div>
        </div>
      </Flickity>
    </div>

    <div class="col-12 col-md-12 text-center mb-4">
      <div class="content-text-guid" v-html="widget.content_text"></div>
    </div>
  </div>
</template>
<script>
  import ExampleLineColour from '~/components/Guids/ExampleLineColour.vue'
  import ExampleLineClarity from '~/components/Guids/ExampleLineClarity.vue'

  export default {
    name: 'example-component',
    props: {
      widget: Object,
      alias: String
    },
    data() {
      return {

        flickityOptions: {
          prevNextButtons: false,
          pageDots: false,
          adaptiveHeight: true,
        }
      }
    },
    components: {
      ExampleLineColour,
      ExampleLineClarity
    },
  }
</script>
