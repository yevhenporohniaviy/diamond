<template>
  <div class="row">
    <div class="grid-content bg-purple w-100">
      <el-popover
        popper-class="popoverOther"
        visible-arrow
        width="485"
        trigger="hover"
        :open-delay="300"
        placement="bottom-start"
      >
        <div class="container">
          <div class="col-12">
            <div class="w-100">
              <div class="count-range mt-5 mb-4">
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
                  v-model="carat"
                  :enable-cross="true"
                  :min="0"
                  :max="100"
                  :min-range="1"
                  :intetval="1"
                  :tooltip="'none'"
                  @drag-end="selectNumber(filter_item.alias, minRange, maxRange)"
                ></vue-slider>
              </div>
              <div class="count-range-description mt-5 mb-3">{{filter_item.description}}</div>
              <div class="count-range-link mb-3" v-if="filter_item.url_link">
                <nuxt-link
                  :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }"
                  class="text-center"
                >LEARN MORE ABOUT DIAMOND {{filter_item.alias}}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <el-button slot="reference" class="numberRange">
          <div class="title">
            {{filter_item.title}}
            <Caret />
          </div>
          <div class="item-another-filter">
            <div>
              {{Number.parseFloat(minRange).toFixed(2)}} -
              {{Number.parseFloat(maxRange).toFixed(2)}}
            </div>
          </div>
        </el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import Caret from "~/components/Elements/Icons/Caret-black";

export default {
  name: "filter-diamond",
  props: {
    filter_item: Object
  },
  data() {
    return {
      carat: [0, 100],
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
        return Number.parseFloat(this.kx * this.carat[0] ** 4 + this.min_delta).toFixed(2);
      },
      set: function(newValue) {
        this.min_delta =
          newValue - this.filter_item.values.min > 0
            ? this.filter_item.values.min
            : newValue;
        let value = ((newValue - this.min_delta) / this.kx) ** (1 / 4);
        this.carat = [Number.parseFloat(value).toFixed(2), this.carat[1]];
      }
    },
    maxRange: {
      get: function() {
        return Number.parseFloat(this.kx * this.carat[1] ** 4 + this.min_delta).toFixed(2);
      },
      set: function(newValue) {
        this.max_delta =
          newValue - this.filter_item.values.max < 0
            ? this.filter_item.values.max
            : newValue;
        let value = ((newValue - this.min_delta) / this.kx) ** (1 / 4);
        this.carat = [Number.parseFloat(value).toFixed(2), this.carat[1]];
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
      this.carat = [0, 100];
    },
    setQueryValue(){
      if(typeof this.$store.state.diamonds.diamonds_query.price !== 'undefined' && this.$store.state.diamonds.diamonds_query.price.length > 0){
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
