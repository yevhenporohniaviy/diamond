<template>
  <div class="container-fluid" id="experience_home">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 d-flex justify-content-center align-items-center flex-column order-1 order-md-0">
            <div class="description-exper ">
              <div class="title mb-5" data-aos="fade-up">
                {{widget.data.title.en}}
              </div>
              <div class="text mb-5" data-aos="fade-up">
               {{widget.data.description.en}}
              </div>

              <div v-if="widget.data.first_button_url.isExternal">
                <a :href="widget.data.first_button_url.en" class="link_exper" data-aos="fade-up">{{widget.data.first_button_text.en}}</a>
              </div>
              <div v-else>
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.first_button_url.en } }" class="link_exper" data-aos="fade-up">
                  {{widget.data.first_button_text.en}}
                </nuxt-link>
              </div>

            </div>
          </div>
          <div class="col-12 col-md-6 text-center order-0 order-md-1">
            <div class="img-exper" data-aos="fade-up">
              <img class="img-fluid" :src="`${baseUrl}${widget.data.image.en}`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


  export default{
    props: {
      widget: Object,
    },
    data() {
      return {


      }
    },
    methods:{

    }

  }
</script>

