<template>
  <div>
    <div class="container" >
      <div class="row acc-banner">
        <div class="banner">
          <div class="title">{{widget.title}}</div>
          <div class="group-btn-faq" v-if="$device.isDesktop">
            <div class="info" v-html="widget.description"></div>
            <div class="choice" v-show="widget.description && widget.buttons.length >0">or</div>
            <div v-if="widget.buttons" class="d-flex justify-content-center align-items-center">
              <div v-for="(btn, index) in widget.buttons" :key="index" >
                <div v-if="btn.button_external_url">
                  <a :href="btn.button_external_url" class="message">
                    <img :src="`${baseUrl}${btn.icon}?h=32?w=32`" class="img-fluid" v-show="btn.icon">
                    <span>{{btn.title}}</span>
                  </a>
                </div>
                <div v-else-if="btn.button_url">
                  <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: btn.button_url } }" class="message">
                    <img :src="`${baseUrl}${btn.icon}?h=32?w=32`" class="img-fluid" v-show="btn.icon">
                    {{btn.title}}
                  </nuxt-link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Emblem from '~/components/Elements/Icons/EmblemBlog'

  export default {

    props: {
      widget: Object,
    },
    components: {
      Emblem
    },
    data() {
      return {


      }
    }
  }
</script>

