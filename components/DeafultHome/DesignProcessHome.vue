<template>
  <div class="container-fluid" id="design_proc_section">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="design_proc-box">
              <img :src="`${baseUrl}${widget.data.image.en}`" class="img-fluid" data-aos="zoom-in">
            </div>

          </div>
          <div class="col-12 col-md-6">
            <div class="design_proc-description" >
              <div class="title" data-aos="fade-up">{{widget.data.title.en}}</div>
              <div class="description" data-aos="fade-up">
                {{widget.data.description.en}}
              </div>

              <a :href="widget.data.first_button_url.en" class="link-design-proc" data-aos="zoom-in" v-if="widget.data.first_button_url.isExternal">{{widget.data.first_button_text.en}}</a>

              <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.first_button_url.en } }" class="link-design-proc" data-aos="zoom-in" v-else>
                {{widget.data.first_button_text.en}}
              </nuxt-link>

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
