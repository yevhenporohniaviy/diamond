<template>
  <div>
    <div class="container position-relative" >
      <div class="row acc-banner">
        <div class="banner-save">
          <div class="title">Saved inspirations</div>
          <div class="profile-tabs">
            <div class="link-box profile">
              <nuxt-link to="/favorites" >all</nuxt-link>
              <nuxt-link to="/inspired" >INSPIRATIONS</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="list-favorites" class="my-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-9">
            <div class="row" v-if="typeof favorites_list !== 'undefined' && favorites_list.length > 0">

              <div class="col-6 col-md-4 " v-for="item in favorites_list" :key="item.item_id" v-if="item.item_type === 'p'">
                <div class="card-favorites">

                  <div class="post-card">
                    <div class="remove" @click="removeFromFavorites(item)">
                      <img src="~assets/img/default/close-save.png" class="img-fluid ">
                    </div>
                    <div class="post-image" >
                      <img :src="item.item_details.images.main" class="img-fluid w-100">
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="text-center my-5 no-save-items">
                You currently have no saved inspirations.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <vector></vector>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Vector from '~/components/Elements/Icons/Vector'
  export default {
    components: {
      Vector
    },
    head() {
      return {
        title: this.itemMeta.meta_title ? this.itemMeta.meta_title : '',
        meta: [
          {hid: 'og:title', property: 'og:title', content:  this.itemMeta.meta_title ? this.itemMeta.meta_title : '' },
          {hid: 'og:description', property: 'og:description', content:  this.itemMeta.meta_description ? this.itemMeta.meta_description : ''},
          {hid: 'og:image', property: 'og:image', content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:url ', property: 'og:image:url', content:  this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:image:width', property: 'og:image:width', content: '200'},
        ]
      }
    },
    data() {
      return {

      }
    },

    methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      removeFromFavorites(item) {
        this.$store.dispatch('removeFromFavoritesList', item.id);
      },

    },
    computed: {
      ...mapGetters(['favorites_list','itemMeta']),
    },
    created() {
      this.$store.dispatch('fetchMeta', 'favorites' );

    }
  }


</script>
