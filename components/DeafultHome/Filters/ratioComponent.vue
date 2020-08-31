<template>
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
              <div class="count-range mb-3">
                <div class="count-range">
                  <div class="min-count">
                    <input v-model.number="ratio[0]" @change="selectNumber(filter_item.alias, ratio)" :max="ratio[1]">
                  </div>
                  -
                  <div class="max-count">
                    <input v-model.number="ratio[1]" @change="selectNumber(filter_item.alias, ratio)" :max="ratio[1]">
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
                  @drag-end="selectNumber(filter_item.alias, ratio)">
                </vue-slider>
              </div>

              <div class="count-range-description my-3">{{filter_item.description}}</div>
              <div class="count-range-link" v-if="filter_item.url_link">
                <a :href="filter_item.url_link">
                  LEARN MORE ABOUT DIAMOND {{filter_item.alias}}
                </a>
              </div>
            </div>
          </div>

        </div>
        <div slot="reference" class="filter-home-range d-flex justify-content-between">
          <div class="d-flex flex-column ">
            <div class="title-home-range">
              {{filter_item.title}}
            </div>
            <div class="item-another-filter">
              <div>
                ie.
                {{ratio[0]}} -
                {{ratio[1]}}
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <Caret/>
          </div>
        </div>


      </el-popover>
    </div>
  </div>
</template>
<script>
  import Caret from '~/components/Elements/Icons/CaretFilterHome'

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
      }
    }
  }
</script>
