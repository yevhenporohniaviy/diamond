<template>
  <no-ssr>
    <div class="row">
      <div class="grid-content bg-purple w-100">
        <el-popover popper-class="popoverOther"
                    visible-arrow
                    width="425"
                    trigger="hover"
                    :open-delay="900"
                    placement="bottom-end">
          <div class="container">

            <div class="col-12">
              <div class="w-100">

                <div class="count-range-string mb-3" v-if="range.symmetry">
                  <div class="min-count-text">{{range.symmetry[0]}}</div>
                  -
                  <div class="max-count-text">
                    {{range.symmetry[range.symmetry.length-1]}}</div>
                </div>
                <div class="count-range-string mb-3" v-else>
                  <div class="min-count-text">{{filter_item.values[0].value}}</div>
                  -
                  <div class="max-count-text">
                    {{filter_item.values[filter_item.values.length-1].value}}</div>
                </div>

                <vue-slider
                  :data="newRangeValue"
                  v-model="symmetry"
                  :min-range="0.5"
                  :enable-cross="true"
                  :adsorb="true"
                  v-bind='optionSlideText'
                  @drag-end="selectValue(filter_item.alias, symmetry)" @change="newValue(symmetry)" ></vue-slider>

                <div class="vue-slider-values mt-2">

                  <div :class="inRange(item) && 'active'" class="vue-slider-value-item" v-for="(item, index) in filter_item.values" :key="index" >
                    {{item.title}}
                  </div>
                </div>
              </div>


              <div class="count-range-description my-3">{{filter_item.description}}</div>
              <div class="count-range-link" v-if="filter_item.url_link">
                <a :href="filter_item.url_link">
                  LEARN MORE ABOUT DIAMOND {{filter_item.alias}}
                </a>
              </div>
            </div>

          </div>
          <div slot="reference" class="filter-home-range d-flex justify-content-between">
            <div class="d-flex flex-column ">
              <div class="title-home-range">
                {{filter_item.title}}
              </div>
              <div class="item-another-filter" v-if="range.symmetry">
                {{range.symmetry[0]}}
                -
                {{range.symmetry[range.symmetry.length-1]}}
              </div>
              <div class="item-another-filter" v-else>
                {{filter_item.values[0].value}}
                -

                {{filter_item.values[filter_item.values.length-1].value}}
              </div>
            </div>
            <div class="d-flex align-items-center">
              <Caret/>
            </div>
          </div>

        </el-popover>
      </div>
    </div>
  </no-ssr>
</template>
<script>
  import Caret from '~/components/Elements/Icons/CaretFilterHome'

  export default {
    name: 'filter-diamond',
    props: {
      filter_item: Object,
      newIndex: Array,
      filter_value: Array
    },
    data() {
      return {

        symmetry: this.newIndex,
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
      selectValue (alias,  value = []) {
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
          .filter((val) => val.index >= this.symmetry[0] && val.index <= this.symmetry[1])
          .find((value) => value === obj)

      }
    },
    computed:{
      newRangeValue() {
        let result = {
          "symmetry": [],
        };
        return result[this.filter_item.alias]['index'] = [0, ...this.filter_item.values
          .map((item) =>
            item.index + 0.5
          )]
      },

    }
  }
</script>
