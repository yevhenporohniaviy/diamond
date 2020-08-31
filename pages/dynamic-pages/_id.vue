<template>
  <div>

    <div v-if="itemGuid.alias !== 'contact_us' && itemGuid.alias !== 'faq'">
      <div class="" v-for="(widget, index) in itemGuid.widgets" :key="index">
        <component v-bind:is="widget.component" :widget="widget" :alias="itemGuid.alias">
        </component>
      </div>
      <div class="container" v-if="itemGuid.group_id === 1">
        <div class="row">
          <div class="col-12 mt-5">
            <div class="row justify-content-center ">
              <div class="diamond-guid-emblem w-25">
                <img src="~assets/img/guids-emblem-diamond.png" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="itemGuid.alias === 'faq'">
      <div v-if="itemGuid.widgets" v-for="(item, index) in itemGuid.widgets" :key="index">
        <component v-bind:is="item.component" :widget="item"></component>
      </div>

      <div class="container" id="faq-components-tabs">
        <div class="col-12 col-md-10 offset-md-1">

          <el-tabs tab-position="left"  v-if="$device.isDesktop">
            <el-tab-pane v-for="item in listFaq.categories" :key="item.id" v-if="item.questions.length ">
              <span slot="label">{{item.title}}<fa icon="chevron-right"/></span>
              <div class="content-tab">
                <div class="question" v-for="question in item.questions" :key="question.id">
                  <div class="title">{{question.question}}</div>
                  <div class="text" v-html="question.answer">
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-collapse v-model="activeName" accordion v-if="$device.isMobile" class="my-4">
            <el-collapse-item :title="item.title" :name="item.id" v-for="item in listFaq.categories" :key="item.id" v-if="item.questions.length ">
              <div class="question" v-for="question in item.questions" :key="question.id">
                <div class="title">{{question.question}}</div>
                <div class="text"  v-html="question.answer">
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <vector></vector>

        </div>
      </div>
    </div>
    <div v-else-if="itemGuid.alias === 'contact_us'">
      <div class="contact-page" >
        <div class="container" v-if="itemGuid.widgets" >
          <div v-for="widget in itemGuid.widgets" :key="widget.id" v-if="widget.component === 'PageHeaderBlue'">
            <component v-bind:is="widget.component" :widget="widget"></component>
          </div>
        </div>
        <div class="container" v-if="$device.isDesktop">
          <div class="col-12 col-md-10 offset-md-1">
            <div class="row box-contact" v-if="itemGuid.widgets">
              <div class="col-12 col-md-6"
                   v-for="widget in itemGuid.widgets" :key="widget.id"
                   v-if="widget.component !== 'PageHeaderBlue'" >
                <component v-bind:is="widget.component" :widget="widget" @thankMod="openModal" @closeThxModal="closeModal" :visible="visibility"></component>
              </div>
            </div>
          </div>
        </div>

        <div class="container p-0" v-if="$device.isMobile">
          <div class="col-12">
            <div class="row justify-content-center text-center">
              <div class="showroom-mob-title">
                <div class="logo">
                  <img src="~assets/img/info-logo.svg" class="img-fluid">
                </div>
                <div class="title">SYDNEY SHOWROOM</div>
                <div class="text">BY APPOINTMENT ONLY</div>
              </div>
            </div>
          </div>
          <div class="col-12 ">
            <div class="row box-contact" v-if="newRangeIndex">
              <div class="col-12 col-md-6"
                   v-for="widget in newRangeIndex" :key="widget.id"
                   v-if="widget.component !== 'PageHeaderBlue'" >
                  <component v-bind:is="widget.component" :widget="widget" @thankMod="openModal" @closeThxModal="closeModal" :visible="visibility"></component>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import {mapGetters} from 'vuex'


  import GuidEmblem from '~/components/Guids/emblem-diamond.vue'
  import GuidesHeadWidget from '~/components/Guids/GuidesHeadWidget.vue'
  import SimpleWidget from '~/components/Guids/SimpleWidget.vue'
  import DiamondAnatomy from '~/components/Guids/DiamondAnatomy.vue'
  import CutGrades from '~/components/Guids/CutGrades.vue'
  import IdealCutWidget from '~/components/Guids/IdealCutWidget.vue'
  import SimpleMultiImageWidget from '~/components/Guids/SimpleMultiImageWidget.vue'
  import SecondHeadWidget from '~/components/Guids/RareDiamondsColor.vue'
  import ExampleListWidget from '~/components/Guids/ExampleListWidget.vue'
  import SimpleContentWidget from '~/components/Guids/SimpleContentWidget.vue'
  import SimplePageWidget from '~/components/CustomerCare/SimplePageWidget.vue'
  import SecondGenerate from '~/components/AboutUs/SecondGenerate.vue'
  import HelpingClients from '~/components/AboutUs/HelpingClients.vue'
  import RefinedSelection from '~/components/AboutUs/RefinedSelection.vue'
  import CoreValues from '~/components/AboutUs/CoreValues.vue'
  import MeetTheFamily from '~/components/AboutUs/MeetTheFamily.vue'
  import PersonalisedService from '~/components/AboutUs/PersonalisedService.vue'
  import PageHeaderWhite from '~/components/AboutUs/PageHeaderWhite.vue'
  //faq
  import Vector from '~/components/Elements/Icons/Vector'
  import PageHeaderBlue from '~/components/CustomerCare/PageHeaderBlue'
  //contact
  import FormWidget from '~/components/ContactUs/FormWidget'
  // import PageHeaderBlue from '~/components/ContactUs/PageHeaderBlue'
  import ShowroomBlock from '~/components/ContactUs/ShowroomBlock'
  import ImageWidget from '~/components/ContactUs/ImageWidget'
  import ThankYouModal from '~/components/ContactUs/ThankYouModal'


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
    data() {
      return {

        visibility: false
      }
    },
    components: {
      //guids
      GuidEmblem,
      GuidesHeadWidget,
      SimpleWidget,
      DiamondAnatomy,
      CutGrades,
      IdealCutWidget,
      SimpleMultiImageWidget,
      SecondHeadWidget,
      ExampleListWidget,
      SimpleContentWidget,
      SimplePageWidget,
      //about
      SecondGenerate,
      HelpingClients,
      RefinedSelection,
      CoreValues,
      MeetTheFamily,
      PersonalisedService,
      PageHeaderWhite,
      //faq,contact
      Vector,
      PageHeaderBlue,
      FormWidget,
      ShowroomBlock,
      ImageWidget,
      ThankYouModal

    },
    computed: {
      ...mapGetters([
        'itemGuid',
        'listFaq',
        'itemMeta'
      ]),
      newRangeIndex() {
        let list = [];
        if(this.itemGuid.widgets && this.itemGuid.alias === 'contact_us' ){
          this.itemGuid.widgets
            .map((item) => {
              switch(item.alias) {
                case 'sydney_showroom':
                  list[1] = item
                  break
                case 'showroom_map':
                  list[0] = item
                  break
                case 'showroom_office':
                  list[2] = item
                  break
                case 'contact_us_form':
                  list[3] = item
                  break
              }
            })
          return list;
        }
      },
    },
    methods: {
      closeModal(item){
        this.visibility = item.visible
      },
      openModal(item){
        this.visibility = item.visible
      },
       async fetchDynamicPage(){
         this.$store.dispatch('fetchDynamicPage', this.$route.params.id);
         this.$store.dispatch('fetchFaq');
         this.$store.dispatch('fetchMeta', this.$route.params.id );
       }
    },
    created() {
      this.fetchDynamicPage();
    }

  }
</script>

