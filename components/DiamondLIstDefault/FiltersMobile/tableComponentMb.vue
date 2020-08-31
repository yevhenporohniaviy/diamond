<template>
  <div class="container">

    <div class="row">
      <div class="col-12 ">
        <div class="py-4">
          <div class="row justify-content-between">
            <div class="col-6 count-title">
              <div class="row justify-content-start">
                {{filter_item.alias}}
              </div>
            </div>
            <div class="col-6 count-range-link">
              <div class="row justify-content-end">
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }" >

                  LEARN MORE
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="count-range mb-3">
          <div class="count-range">
            <div class="min-count">
              <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="table[0]" @change="selectNumberMobile(filter_item.alias, table)" :max="table[1]">
            </div>
            -
            <div class="max-count">
              <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="table[1]" @change="selectNumberMobile(filter_item.alias, table)" :max="table[1]">
            </div>
          </div>
        </div>
        <div class="my-4">
          <vue-slider
            v-model="table"
            :tooltip="'none'"
            :min-range="1"
            :enable-cross="true"
            :min=filter_item.values.min
            :max=filter_item.values.max
            v-bind="optionSlide"
            @drag-end="selectNumberMobile(filter_item.alias, table)">
          </vue-slider>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import Caret from '~/components/Elements/Icons/Caret-black'

  export default {
    name: 'filter-diamond',
    props: {
      filter_item: Object,

    },
    data() {
      return {

        table: [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`],
        optionSlide: {
          interval: 0.1
        },
      }
    },
    components: {
      Caret
    },
    methods: {
      selectNumberMobile (alias, value) {
        this.$emit('change-number', {alias, value})
      },
      getValue(){
        this.table = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
      }

    },
    mounted(){
      this.$bus.$on('messageSent', this.getValue);
    }
  }
</script>

