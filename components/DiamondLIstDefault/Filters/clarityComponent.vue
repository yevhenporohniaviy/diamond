<template>
  <no-ssr>
    <div class="row">
      <div class="grid-content bg-purple w-100">
        <el-popover popper-class="popoverOther"
                    visible-arrow
                    width="485"
                    trigger="hover"
                    :open-delay="900"
                    placement="bottom-start">
          <div class="container">

            <div class="col-12">
              <div class="w-100">

                <div class="count-range-string mt-5 mb-4" v-if="range.clarity">
                  <div class="min-count-text">{{range.clarity[0]}}</div>
                  -
                  <div class="max-count-text">
                    {{range.clarity[range.clarity.length-1]}}</div>
                </div>
                <div class="count-range-string mt-5 mb-4" v-else>
                  <div class="min-count-text">{{filter_item.values[0].value}}</div>
                  -
                  <div class="max-count-text">
                    {{filter_item.values[filter_item.values.length-1].value}}</div>
                </div>

                <vue-slider
                  :data="newRangeValue"
                  v-model="clarity"
                  :min-range="1"
                  :enable-cross="true"
                  :adsorb="true"
                  :tooltip="'none'"
                  v-bind='optionSlideText'
                  @drag-end="selectValue(filter_item.alias, clarity)" @change="newValue(clarity)" />

                <div class="vue-slider-values mt-2">

                  <div :class="inRange(item) && 'active'" class="vue-slider-value-item" v-for="(item, index) in filter_item.values" :key="index" >
                    {{item.title}}
                  </div>
                </div>
              </div>


              <div class="count-range-description mt-5 mb-3">{{filter_item.description}}</div>
              <div class="count-range-link mb-3" v-if="filter_item.url_link">
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }" class=" text-center">

                  LEARN MORE ABOUT DIAMOND {{filter_item.alias}}
                </nuxt-link>
              </div>
            </div>

          </div>
          <el-button slot="reference" class="numberRange ">
            <div class="title">
              {{filter_item.title}}
              <Caret/>
            </div>
            <div class="item-another-filter" v-if="range.clarity">
              {{range.clarity[0]}}
              -
              {{range.clarity[range.clarity.length-1]}}
            </div>
            <div class="item-another-filter" v-else>
              {{filter_item.values[0].value}}
              -

              {{filter_item.values[filter_item.values.length-1].value}}
            </div>

          </el-button>

        </el-popover>
      </div>
    </div>
  </no-ssr>
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

        clarity: this.newIndex,
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
          .filter((val) => val.index >= this.clarity[0] && val.index <= this.clarity[1])
          .find((value) => value === obj)

      },
      getValue(){
        this.range.clarity = [this.filter_item.values[0].value,this.filter_item.values[this.filter_item.values.length-1].value]
        this.clarity = this.newIndex
      },
      getValueYeyClear(){
        this.range.clarity = [this.filter_item.values[2].value, this.filter_item.values[this.filter_item.values.length-1].value]
        this.clarity = [1.5, 7.5]
      },
      removeValueYeyClear(){
        this.range.clarity = [this.filter_item.values[0].value, this.filter_item.values[this.filter_item.values.length-1].value]
        this.clarity = this.newIndex
      },

      setQueryValue(){
        if(typeof this.$store.state.diamonds.diamonds_query.clarity !== 'undefined' && this.$store.state.diamonds.diamonds_query.clarity.length > 0){
          let result = this.filter_item.values.filter((item) => {
            return this.$store.state.diamonds.diamonds_query.clarity.includes(item.title);
          }).map((item) => item.index);
          this.range.clarity = this.$store.state.diamonds.diamonds_query.clarity
          if(result.includes(0)){
            this.clarity = [ result[0], result[result.length - 1] + 0.5]
          }else{
            this.clarity = [ result[0] - 0.5, result[result.length - 1] + 0.5]
          }
        }else{
          if(this.$route.query.clarity ){
            let result = this.filter_item.values.filter((item) => {
              return this.$route.query.clarity.includes(item.title);
            }).map((item) => item.index);
            this.range.clarity = this.$route.query.clarity
            if(result.includes(0)){
              this.clarity = [ result[0], result[result.length - 1] + 0.5]
            }else{
              this.clarity = [ result[0] - 0.5, result[result.length - 1] + 0.5]
            }
            this.$forceUpdate();

          }else{
            this.clarity = this.newIndex
            this.$forceUpdate();
          }

        }
      }

    },
    mounted(){
      this.setQueryValue();
      this.$bus.$on('setYeyClear', this.getValueYeyClear);
      this.$bus.$on('removeYeyClear', this.removeValueYeyClear);
      this.$bus.$on('messageSent', this.getValue);
    },
    computed:{
      newRangeValue() {
        let result = {
          "clarity": [],
        };
        return result[this.filter_item.alias]['index'] = [0, ...this.filter_item.values
          .map((item) =>
            item.index + 0.5
          )]
      },

    }
  }
</script>
