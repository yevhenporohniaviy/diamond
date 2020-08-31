<template>
  <div class="container-fluid" id="jewellery_section">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6"></div>
          <div class="col-12 col-md-6">
            <div class="jewellery-box">
              <img :src="`${baseUrl}${widget.data.image.en}`" class="img-fluid" data-aos="zoom-in">

              <div class="jewellery-description" >
                <div class="title" data-aos="fade-up"> {{widget.data.title.en}}</div>

                <div class="w-100" v-if="widget.data.first_button_url.isExternal">
                  <a :href="widget.data.first_button_url.en" class="link-design" >{{widget.data.first_button_text.en}}</a>
                </div>

                  <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.first_button_url.en } }" class="link-design" v-else>
                    {{widget.data.first_button_text.en}}
                  </nuxt-link>


              </div>
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

