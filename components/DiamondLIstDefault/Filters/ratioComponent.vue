<template>
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
              <div class="count-range mt-5 mb-4">
                <div class="count-range">
                  <div class="min-count">
                    <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="ratio[0]" @change="selectNumber(filter_item.alias, ratio)" :max="ratio[1]">
                  </div>
                  -
                  <div class="max-count">
                    <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="ratio[1]" @change="selectNumber(filter_item.alias, ratio)" :max="ratio[1]">
                  </div>
                </div>
              </div>
              <div>
                <vue-slider
                  v-model="ratio"
                  :enable-cross="true"
                  :min=filter_item.values.min
                  :max=filter_item.values.max
                  v-bind="optionSlide"
                  :tooltip="'none'"
                  :min-range="1"
                  @drag-end="selectNumber(filter_item.alias, ratio)">
                </vue-slider>
              </div>

              <div class="count-range-description mt-5 mb-3">{{filter_item.description}}</div>
              <div class="count-range-link mb-3" v-if="filter_item.url_link">
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }" class=" text-center">

                  LEARN MORE ABOUT DIAMOND {{filter_item.alias}}
                </nuxt-link>
              </div>
            </div>
          </div>

        </div>
        <el-button slot="reference" class="numberRange">
          <div class="title">
            {{filter_item.title}}
            <Caret/>
          </div>
          <div class="item-another-filter">
            <div>
              {{ratio[0]}} -
              {{ratio[1]}}
            </div>
          </div>
        </el-button>

      </el-popover>
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

        ratio: [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`],
        optionSlide: {
          interval: 0.1
        },
      }
    },
    components: {
      Caret
    },
    methods: {
      selectNumber (alias, value) {
        this.$emit('change-number', {alias, value})
      },
      getValue(){
        this.ratio = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
      },
      setQueryValue(){
        if(typeof this.$store.state.diamonds.diamonds_query.ratio !== 'undefined' && this.$store.state.diamonds.diamonds_query.ratio.length > 0){
          this.ratio = this.$store.state.diamonds.diamonds_query.ratio
        }else{
          if(this.$route.query.ratio ){
            this.ratio = this.$route.query.ratio
            this.$forceUpdate();

          }else{
            this.ratio = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
            this.$forceUpdate();
          }
        }

      }

    },
    mounted(){

        this.setQueryValue();

      this.$bus.$on('messageSent', this.getValue);
    }
  }
</script>
