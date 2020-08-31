<template>
  <no-ssr>
    <div class="row">
      <div class="grid-content bg-purple w-100">
        <el-popover popper-class="popoverOther"
                    visible-arrow
                    width="485"
                    trigger="hover"
                    :open-delay="300"
                    placement="bottom-start">
          <div class="container">

            <div class="col-12">
              <div class="w-100">

                <div class="count-range-string mt-5 mb-4" v-if="range.symmetry">
                  <div class="min-count-text">{{range.symmetry[0]}}</div>
                  -
                  <div class="max-count-text">
                    {{range.symmetry[range.symmetry.length-1]}}</div>
                </div>
                <div class="count-range-string mt-5 mb-4" v-else>
                  <div class="min-count-text">{{filter_item.values[0].value}}</div>
                  -
                  <div class="max-count-text">
                    {{filter_item.values[filter_item.values.length-1].value}}</div>
                </div>

                <vue-slider
                  :data="newRangeValue"
                  v-model="symmetry"
                  :min-range="1"
                  :enable-cross="true"
                  :tooltip="'none'"
                  :adsorb="true"
                  v-bind='optionSlideText'
                  @drag-end="selectValue(filter_item.alias, symmetry)" @change="newValue(symmetry)" ></vue-slider>

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

      },
      getValue(){
        this.range.symmetry = [this.filter_item.values[0].value,this.filter_item.values[this.filter_item.values.length-1].value]
        this.symmetry = this.newIndex
      },
      setQueryValue(){
        if(typeof this.$store.state.diamonds.diamonds_query.symmetry !== 'undefined' && this.$store.state.diamonds.diamonds_query.symmetry.length > 0){
          let result = this.filter_item.values.filter((item) => {
            return this.$store.state.diamonds.diamonds_query.symmetry.includes(item.title);
          }).map((item) => item.index);
          this.range.symmetry = this.$store.state.diamonds.diamonds_query.symmetry
          if(result.includes(0)){
            this.symmetry = [ result[0], result[result.length - 1] + 0.5]
          }else{
            this.symmetry = [ result[0] - 0.5, result[result.length - 1] + 0.5]
          }
        }else{
          if(this.$route.query.symmetry ){
            let result = this.filter_item.values.filter((item) => {
              return this.$route.query.symmetry.includes(item.title);
            }).map((item) => item.index);
            this.range.symmetry = this.$route.query.symmetry
            if(result.includes(0)){
              this.symmetry = [ result[0], result[result.length - 1] + 0.5]
            }else{
              this.symmetry = [ result[0] - 0.5, result[result.length - 1] + 0.5]
            }
            this.$forceUpdate();

          }else{
            this.symmetry = this.newIndex
            this.$forceUpdate();
          }
        }
      }


    },
    mounted(){

        this.setQueryValue();
      this.$bus.$on('messageSent', this.getValue);
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
