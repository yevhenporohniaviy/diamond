<template>
  <div class="container-fluid" id="curated_links">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center" >
            <div class="title">
                {{widget.data.title.en}}
            </div>
          </div>
          <div class="col-12 col-md-6 offset-md-3">
            <div class="row justify-content-center ">

              <!--<div class="col-12 d-block d-md-none" v-if="widget.data.first_button_url.en">-->
                <!--<a :href="widget.data.first_button_url.en" class="link-expert" v-if="widget.data.first_button_url.isExternal">-->
                  <!--<PhoneIconLinks class="mr-2"/>-->
                  <!--{{widget.data.first_button_text.en}}</a>-->
                <!--<nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.first_button_url.en } }"-->
                           <!--class="link-expert"-->
                           <!--v-else>-->
                  <!--<PhoneIconLinks class="mr-2"/>-->
                  <!--{{widget.data.first_button_text.en}}-->
                <!--</nuxt-link>-->
              <!--</div>-->

              <div class="col-12 d-block d-md-none mb-3 mb-xl-0" >
                <a href="tel:+612 9261 2272" class="link-expert" v-if="widget.data.first_button_url.isExternal">
                  <PhoneIconLinks class="mr-2"/>Talk to our expert</a>
              </div>
              <div class="col-12 col-xl-4 mb-3 mb-xl-0"  v-if="widget.data.second_button_url.en">

                <a :href="widget.data.second_button_url.en" class="link-appointment" v-if="widget.data.second_button_url.isExternal">

                  {{widget.data.second_button_text.en}}</a>

                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.second_button_url.en } }"
                           class="link-appointment"
                           v-else>

                  {{widget.data.second_button_text.en}}
                </nuxt-link>

              </div>

              <div class="col-12 col-xl-4 mb-3 mb-xl-0"  v-if="shopping_list && shopping_list.length>0">
                <a href="#" class="link-enqury" @click="sendEnquiryHome(shopping_list)">make an enqury</a>
              </div>
              <div class="col-12 col-xl-4 mb-3 mb-xl-0"  v-else>
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: 'contact_us', scroll: 'scroll'} }" class="link-enqury" >make an enqury</nuxt-link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PhoneIconLinks from '../MenuComponent/Icons/PhoneIcon'
  import {mapGetters} from 'vuex'

  export default{
    props: {
      widget: Object,
    },
    computed:{
      ...mapGetters(['shopping_list']),
    },
    methods:{
      sendEnquiryHome(value){
        this.$store.dispatch('cleareEnquiry');
        this.$store.dispatch('sendEnquiryHome', value);
        this.$nuxt.$router.push({name: 'dynamic-pages-id', params: { id: 'contact_us', scroll: 'scroll'} });

      }
    },
    components: {
      PhoneIconLinks
    }
  }
</script>
