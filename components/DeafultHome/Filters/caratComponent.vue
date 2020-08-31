<template>
  <el-popover
    popper-class="popoverOther home"
    visible-arrow
    width="500"
    trigger="hover"
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
        </div>
      </div>
    </div>
    <div slot="reference" class="filter-home-range d-flex justify-content-between">
      <div class="d-flex flex-column">
        <div class="title-home-range">{{filter_item.title}}</div>
        <div class="item-another-filter">
          <div>
            ie.
            {{Number.parseFloat(minRange).toFixed(2)}} -
            {{Number.parseFloat(maxRange).toFixed(2)}}
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
    valueFloat(value) {
      if (value) {
        let result = value;
        if (!Number.isInteger(result)) {
          Number.parseFloat(result);
        }
        return result.toFixed(2);
      }
    },
    selectNumber(alias, min, max) {
      const value = [min, max];
      this.$emit("change-number", { alias, value });
    },
    getValue() {
      this.carat = [0, 100];
    }
  },
  created() {
    this.min_delta = this.filter_item.values.min;
    this.max_delta = this.filter_item.values.max;
  }
};
</script>
