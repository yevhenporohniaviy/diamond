<template>
  <div>
    <div v-for="(widget, index) in listWidgets" :key="index">
      <component v-bind:is="`component${index}`" :widget="widget" :inst="itemInst">
      </component>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  import CarouselHomepage from '~/components/DeafultHome/CarouselHomePage'
  import CuratedLinksHome from '~/components/DeafultHome/CuratedLinks'
  import EngagementSectionHome from '~/components/DeafultHome/EngagementSection'
  import JewellerySectionHome from '~/components/DeafultHome/JewellerySection'
  import FilterSearchHome from '~/components/DeafultHome/FilterHome'
  import DesignSection from '~/components/DeafultHome/DesignProcessHome'
  import TabListHomepage from '~/components/DeafultHome/TabListHomepage'
  import InspiredHomepage from '~/components/DeafultHome/InspiredHomepage'
  import CaseStudiesHomepage from '~/components/DeafultHome/CaseStudies'
  import ExperienceHomepage from '~/components/DeafultHome/ExperienceHome'

  export default{

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
    methods: {
      showPodiumModal() {
        setTimeout(() => {
          let d = document.getElementById('podium-website-widget');
          d.style.display = 'block';
          d.style.opacity = 1;
        }, 7000)
      }
    },
    computed: {
      ...mapGetters(['itemMeta'])
    },
    mounted() {
      this.showPodiumModal();
    },
    components:{
      component0: CarouselHomepage,
      component1: CuratedLinksHome,
      component2: EngagementSectionHome,
      component3: JewellerySectionHome,
      component4: FilterSearchHome,
      component5: DesignSection,
      component6: TabListHomepage,
      component7: InspiredHomepage,
      component8: CaseStudiesHomepage,
      component9: ExperienceHomepage
    },
    async asyncData({store}) {
      const listWidgets = await store.dispatch('fetchComponentsHome');
      const metaData = await store.dispatch('fetchMeta', 'homepage' );
      const itemInst = await store.dispatch('fetchInstagramHomepage');
      return { listWidgets: listWidgets, metaData: metaData, itemInst: itemInst};

    }
  }
</script>

