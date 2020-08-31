import Vue from 'vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  keyName: 'head',
  attribute: 'n-head',
  ssrAttribute: 'n-head-ssr',
  tagIDKeyName: 'hid',
  refreshOnceOnNavigation: true
})


