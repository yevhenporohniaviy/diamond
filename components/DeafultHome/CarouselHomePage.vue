<template>
  <section class="container-fluid">
    <div class="row">
      <div id="main-top-banner">
        <b-carousel
          id="banner-carousel"
          :interval="4000"
          v-model="sliderHome"
          indicators>
          <!-- Slides with custom text -->
          <b-carousel-slide v-for="item in widget.slides" :key="item.id">

            <img slot="img" class="img-fluid w-100" :src="item.image">
            <div class="container">
              <div class="caption" >
                <div class="title" :class="item.subtitle === 'white' ? 'white': ''">{{ filterForTitle(item.title) }}
                </div>
                <div v-if="item.has_link" class="description-link">
                  <a :href="item.external_url" class="description" :class="item.subtitle === 'white' ? 'white': ''" v-if="item.is_external">
                    {{item.btn_text}}
                  </a>
                </div>
              </div>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </section>
</template>

<script>
  export default{
    props: {
      widget: Object,
    },
    data() {
      return {
        sliderHome: 0,
        sliding: null
      }
    },
    methods: {
      filterForTitle(text) {
        if(text.indexOf('Diamonds like') == -1 && text.indexOf('nowhere else') == -1) {
          return text
        } else {
          return 'Diamonds like nowhere else.';
        }
      },
      // ckeck() {
      //   window.onload = function() { document.body.innerHTML = document.body.innerHTML.replace(/\u2028/g, ''); }
      // }
    }
  }
</script>

