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
                    <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="table[0]" @change="selectNumber(filter_item.alias, table)" :max="table[1]">
                  </div>
                  -
                  <div class="max-count">
                    <input type="number" class="input-filter-number" pattern="[0-9]" v-model.number="table[1]" @change="selectNumber(filter_item.alias, table)" :max="table[1]">
                  </div>
                </div>
              </div>
              <div>
                <vue-slider
                  v-model="table"
                  :enable-cross="true"
                  :min=filter_item.values.min
                  :max=filter_item.values.max
                  v-bind="optionSlide"
                  :tooltip="'none'"
                  :min-range="1"
                  @drag-end="selectNumber(filter_item.alias, table)">
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
              {{table[0]}}% -
              {{table[1]}}%
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
      selectNumber (alias, value) {
        this.$emit('change-number', {alias, value})
      },
      getValue(){
        this.table = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
      },
      setQueryValue(){
        if(typeof this.$store.state.diamonds.diamonds_query.table !== 'undefined' && this.$store.state.diamonds.diamonds_query.table.length > 0){
          this.table = this.$store.state.diamonds.diamonds_query.table
        }else{
          if(this.$route.query.table){
            this.table = this.$route.query.table
            this.$forceUpdate();

          }else{
            this.table = [`${this.filter_item.values.min}`, `${this.filter_item.values.max}`]
            this.$forceUpdate();
          }         }

      }
    },
    mounted(){
      this.setQueryValue();
      this.$bus.$on('messageSent', this.getValue);
    }
  }
</script>
