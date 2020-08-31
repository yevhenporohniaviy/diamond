<template>
  <div>
    <ApptHeader/>
    <nuxt class="head-space-appoint"/>
  </div>
</template>
<script>
  import ApptHeader from '~/components/ApptHeader.vue'
  import Footer from '~/components/Footer.vue'
  import { mapGetters} from 'vuex'

  export default {
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
    components: {
      ApptHeader,
      Footer
    },
    computed: {
      ...mapGetters(['itemMeta']),

    },
    created() {
      this.$store.dispatch('fetchMeta', 'appointment' );

    }
  }
</script>

