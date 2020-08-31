<template>
  <el-popover
    popper-class="popoverOther home"
    visible-arrow
    width="500"
    trigger="click"
    :open-delay="900"
    placement="bottom-end"
  >
    <div class="container d-none d-md-block">
      <div class="col-12 my-5">
        <div class="w-100">
          <div class="count-range mb-3">
            <div class="count-range">
              <div class="min-count">
                <input
                  :value="minRange"
                  type="number"
                  class="input-filter-number"
                  pattern="[0-9]"
                  @change="checkMinValue"
                />
              </div>-
              <div class="max-count">
                <input
                  :value="maxRange"
                  type="number"
                  class="input-filter-number"
                  pattern="[0-9]"
                  @change="checkMaxValue"
                />
              </div>
            </div>
          </div>
          <div>
            <vue-slider
              v-model="price"
              :enable-cross="true"
              :min="0"
              :max="100"
              :min-range="1"
              :intetval="1"
              :tooltip="'none'"
              @drag-end="selectNumber(filter_item.alias, minRange, maxRange)"
            ></vue-slider>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-block d-md-none">
      <div class="col-12 p-0">
        <div>
          <div class="row justify-content-between">
            <div class="col-6 count-title">
              <div class="row justify-content-start">{{filter_item.alias}}</div>
            </div>
            <div class="col-6 count-range-link">
              <div class="row justify-content-end">
                <nuxt-link
                  :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }"
                >LEARN MORE</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mb-5 mt-3">
        <div class="w-100">
          <div class="count-range mb-3">
            <div class="count-range">
              <div class="min-count">
                <input
                  :value="minRange"
                  type="number"
                  class="input-filter-number"
                  pattern="[0-9]"
                  @change="checkMinValue"
                />
              </div>-
              <div class="max-count">
                <input
                  :value="maxRange"
                  type="number"
                  class="input-filter-number"
                  pattern="[0-9]"
                  @change="checkMaxValue"
                />
              </div>
            </div>
          </div>
          <div class="mt-4">
            <vue-slider
              v-model="price"
              :enable-cross="true"
              :min="0"
              :max="100"
              :min-range="1"
              :intetval="1"
              :tooltip="'none'"
              @drag-end="selectNumber(filter_item.alias, minRange, maxRange)"
            ></vue-slider>
          </div>
        </div>
      </div>
    </div>
    <div slot="reference" class="filter-home-range d-flex justify-content-between">
      <div class="d-flex flex-column">
        <div class="title-home-range">{{filter_item.title}}</div>
        <div class="item-another-filter">
          <div>
            ie.
            ${{formatPrice(minRange)}} -
            ${{formatPrice(maxRange)}}
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <Caret />
      </div>
    </div>
  </el-popover>
</template>
<script>
import Caret from "~/components/Elements/Icons/CaretFilterHome";

export default {
  name: "filter-diamond",
  props: {
    filter_item: Object
  },
  data() {
    return {
      price: [0, 100],
      interval_range: 1,
      min_delta: 0,
      max_delta: 0
    };
  },
  components: {
    Caret
  },
  computed: {
    minRange: {
      get: function() {
        return Math.ceil(this.kx * this.price[0] ** 4 + this.min_delta);
      },
      set: function(newValue) {
        this.min_delta =
          newValue - this.filter_item.values.min > 0
            ? this.filter_item.values.min
            : newValue;
        let value = ((newValue - this.min_delta) / this.kx) ** (1 / 4);
        this.price = [value, this.price[1]];
      }
    },
    maxRange: {
      get: function() {
        return Math.ceil(this.kx * this.price[1] ** 4 + this.min_delta);
      },
      set: function(newValue) {
        this.max_delta =
          newValue - this.filter_item.values.max < 0
            ? this.filter_item.values.max
            : newValue;
        let value = ((newValue - this.min_delta) / this.kx) ** (1 / 4);
        this.price = [this.price[0], value];
      }
    },
    kx() {
      return this.priceRange / 100 ** 4;
    },
    priceRange() {
      return this.max_delta - this.min_delta;
    }
  },
  methods: {
    checkMaxValue(value) {
      if (
        value.target.value <= this.filter_item.values.max &&
        value.target.value > this.filter_item.values.min
      ) {
        this.maxRange = value.target.value;
      }
      // Check Max Value
      if (value.target.value > this.filter_item.values.max) {
        this.maxRange = this.filter_item.values.max;
      }
      if (value.target.value < this.filter_item.values.min) {
        this.maxRange = this.filter_item.values.min;
      }
      if (this.minRange > this.maxRange) {
        this.maxRange = this.minRange;
      }
      if (this.maxRange < this.minRange) {
        this.minRange = this.maxRange;
      }

      this.selectNumber(this.filter_item.alias, this.minRange, this.maxRange)
    },
    checkMinValue(value) {
      if (
        value.target.value <= this.filter_item.values.max &&
        value.target.value > this.filter_item.values.min
      ) {
        this.minRange = value.target.value;
      }
      // Check Min Value
      if (value.target.value > this.filter_item.values.max) {
        this.minRange = this.filter_item.values.max;
      }
      if (value.target.value < this.filter_item.values.min) {
        this.minRange = this.filter_item.values.min;
      }
      if (this.minRange > this.maxRange) {
        this.maxRange = this.minRange;
      }
      if (this.maxRange < this.minRange) {
        this.minRange = this.maxRange;
      }

      this.selectNumber(this.filter_item.alias, this.minRange, this.maxRange)
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    selectNumber(alias, min, max) {
      const value = [min, max];
      this.$emit("change-number", { alias, value });
    },
    getValue() {
      this.price = [0, 100];
    },
    setQueryValue(){
      if(typeof this.$store.state.diamonds.diamonds_query.price !== 'undefined' && this.$store.state.diamonds.diamonds_query.price.length > 0){
        console.log(this.$store.state.diamonds.diamonds_query.price)
        this.minRange = this.$store.state.diamonds.diamonds_query.price[0]
        this.maxRange = this.$store.state.diamonds.diamonds_query.price[1]
      }
    }
  },
  created() {
    this.min_delta = this.filter_item.values.min;
    this.max_delta = this.filter_item.values.max;
  },
  mounted() {
    this.setQueryValue();
    this.$bus.$on("messageSent", this.getValue);
  }
};
</script>


<style lang="scss">
.popoverOther {
  &.home {
    @media (max-width: 524px) {
      width: 88% !important;
      margin: 0 auto !important;
      left: 0 !important;
      right: 0 !important;
      background-color: #fff;
    }
    .count-title {
      color: #253650;
      font-family: lato-bold;
      font-size: 10px;
      letter-spacing: 1px;
      line-height: 18px;
      text-transform: uppercase;
    }
    .count-range-link {
      a {
        cursor: pointer;
        color: #80b8e6;
        font-family: lato-bold;
        font-size: 10px;
        letter-spacing: 0.49px;
        text-transform: uppercase;
      }
    }
    .vue-slider {
      .vue-slider-rail {
        .vue-slider-process {
          background-color: #cae3f6;
        }
      }
    }
  }
}
</style>
