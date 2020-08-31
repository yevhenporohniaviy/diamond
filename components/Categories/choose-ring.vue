<template>
  <div class="container mt-4" >
    <div class="pair-block"><p>{{getWidgetFind.title}}</p></div>
    <div class="help-choose" data-aos="fade-up">

      <div class="title">

        {{getWidgetFind.subtitle}}
      </div>
      <div class="sub-title mt-5" v-html="getWidgetFind.description">

      </div>
      <div class="d-flex justify-content-center browse-more">
        <div v-for="(item , index) in getWidgetFind.buttons" :key="index" v-if="item.button_type === 'Central'">
          <div v-if="item.button_external_url">
            <a :href="item.button_external_url" class=" text-center">
              <img :src="`${baseUrl}${item.icon}?h=32?w=32`" class="img-fluid" v-show="item.icon">
              <span>{{item.title}}</span>
            </a>
          </div>
          <div v-else-if="item.button_url">
            <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: item.button_url } }" class=" text-center">
              <img :src="`${baseUrl}${item.icon}?h=32?w=32`" class="img-fluid" v-show="item.icon">
              {{item.title}}
            </nuxt-link>
          </div>
        </div>

      </div>
      <div class="diamond-links text-center">
        <div v-for="(item , index) in getWidgetFind.buttons" :key="index" v-if="item.button_type === 'Left'">
          <div v-if="item.button_external_url">
            <a :href="item.button_external_url" class=" text-center">
              <img :src="`${baseUrl}${item.icon}?h=32?w=32`" class="img-fluid" v-show="item.icon">
              <span>{{item.title}}</span>
            </a>
          </div>
          <div v-else-if="item.button_url">
            <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: item.button_url } }" class=" text-center">
              <img :src="`${baseUrl}${item.icon}?h=32?w=32`" class="img-fluid" v-show="item.icon">
              {{item.title}}
            </nuxt-link>
          </div>
        </div>
        <span class="mx-4 d-none d-md-block">
          <svg width="19px" height="31px" viewBox="0 0 19 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Diamonds---product-page-V5" transform="translate(-904.000000, -1910.000000)" fill="#24354F">
                    <g id="Find-the-ideal-centre-stone" transform="translate(264.000000, 1486.000000)">
                        <g id="Group-6" transform="translate(358.000000, 424.000000)">
                            <rect id="Rectangle-6" transform="translate(291.500000, 15.500000) rotate(-330.000000) translate(-291.500000, -15.500000) " x="291" y="-2" width="1" height="35"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        </span>
        <div v-for="(item , index) in getWidgetFind.buttons" :key="index" v-if="item.button_type === 'Right'">
          <div v-if="item.button_external_url">
            <a :href="item.button_external_url" class=" text-center">
              <img :src="`${baseUrl}${item.icon}?h=32?w=32`" class="img-fluid" v-show="item.icon">
              <span>{{item.title}}</span>
            </a>
          </div>
          <div v-else-if="item.button_url">
            <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: item.button_url } }" class=" text-center">
              <img :src="`${baseUrl}${item.icon}?h=32?w=32`" class="img-fluid" v-show="item.icon">
              {{item.title}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  import {mapGetters} from 'vuex'


  export default {
    data() {
      return {

      }
    },
    computed:{
      ...mapGetters(['getWidgetFind'])
    },
    methods: {
      fetchWidgetListJewellery(){
        this.$store.dispatch('setWidgetFindJewellery');
      }
    },
    created() {
      this.fetchWidgetListJewellery();
    }

  }
</script>

