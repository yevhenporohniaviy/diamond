<template>
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
              <div class="count-range mt-5 mb-3">
                <div class="count-range">
                  <div class="min-count">
                    <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="depth[0]" @change="selectNumber(filter_item.alias, depth)" :max="depth[1]">
                  </div>
                  -
                  <div class="max-count">
                    <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="depth[1]" @change="selectNumber(filter_item.alias, depth)" :max="depth[1]">
                  </div>
                </div>
              </div>
              <div>
                <vue-slider
                  v-model="depth"
                  :enable-cross="true"
                  :min=filter_item.values.min
                  :max=filter_item.values.max
                  v-bind="optionSlide"
                  :tooltip="'none'"
                  :min-range="1"
                  @drag-end="selectNumber(filter_item.alias, depth)">
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
              {{depth[0]}}% -
              {{depth[1]}}%
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

        depth: [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`],
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
        this.depth = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
      },

      setQueryValue(){
        if(typeof this.$store.state.diamonds.diamonds_query.depth !== 'undefined' && this.$store.state.diamonds.diamonds_query.depth.length > 0){
          this.depth = this.$store.state.diamonds.diamonds_query.depth
        }else{
          if(this.$route.query.depth ){
            this.depth = this.$route.query.depth
            this.$forceUpdate();

          }else{
            this.depth = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
            this.$forceUpdate();
          }
        }

      }

    },
    mounted(){

      this.setQueryValue();

      this.$bus.$on('messageSent', this.getValue);
    },
  }
</script>
