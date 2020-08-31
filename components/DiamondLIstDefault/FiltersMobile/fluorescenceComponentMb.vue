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
        <div class="w-100">

          <div class="count-range-string mb-3" v-if="range.fluorescence">
            <div class="min-count-text">{{range.fluorescence[0]}}</div>
            -
            <div class="max-count-text">
              {{range.fluorescence[range.fluorescence.length-1]}}</div>
          </div>
          <div class="count-range-string mb-3" v-else>
            <div class="min-count-text">{{filter_item.values[0].value}}</div>
            -
            <div class="max-count-text">
              {{filter_item.values[filter_item.values.length-1].value}}</div>
          </div>

          <div class="my-4">
            <vue-slider
              :data="newRangeValue"
              v-model="fluorescence"
              :min-range="1"
              :enable-cross="true"
              :tooltip="'none'"
              :adsorb="true"
              v-bind='optionSlideText'
              @drag-end="selectValueMobile(filter_item.alias, fluorescence)" @change="newValue(fluorescence)" ></vue-slider>

            <div class="vue-slider-values mt-2">

              <div :class="inRange(item) && 'active'" class="vue-slider-value-item" v-for="(item, index) in filter_item.values" :key="index" >
                {{item.title}}
              </div>
            </div>
          </div>
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
      newIndex: Array,
      filter_value: Array
    },
    data() {
      return {

        fluorescence: this.newIndex,
        range: [],
        optionSlideText: {
          interval: 0.5
        },
      }
    },
    components: {
      Caret
    },
    methods: {
      selectValueMobile (alias,  value = []) {
        this.$emit('change', {alias, value})
      },
      newValue(value = []) {
        let result = this.filter_item.values
          .filter((val) => val.index >= value[0] && val.index <= value[1])
          .map((val) => val.value);
        this.range[this.filter_item.alias] = [...result];
      },
      inRange(obj){
        return this.filter_item.values
          .filter((val) => val.index >= this.fluorescence[0] && val.index <= this.fluorescence[1])
          .find((value) => value === obj)
      },
      getValue(){
        this.range.fluorescence = [this.filter_item.values[0].value,this.filter_item.values[this.filter_item.values.length-1].value]
        this.fluorescence = this.newIndex
      }

    },
    mounted(){
      this.$bus.$on('messageSent', this.getValue);
    },
    computed:{
      newRangeValue() {
        let result = {
          "fluorescence": [],
        };
        return result[this.filter_item.alias]['index'] = [0, ...this.filter_item.values
          .map((item) =>
            item.index + 0.5
          )]
      },

    }
  }
</script>
