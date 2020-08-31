<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="py-4">
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
        <div class="my-4">
          <vue-slider
            v-model="price"
            :enable-cross="true"
            :min="0"
            :max="100"
            :min-range="1"
            :intetval="1"
            :tooltip="'none'"
            @drag-end="selectNumberMobile(filter_item.alias, minRange,maxRange)"
          ></vue-slider>
        </div>
      </div>
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
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    selectNumberMobile(alias, min, max) {
      const value = [min, max];
      this.$emit("change-number", { alias, value });
    },
    getValue() {
      this.price = [0, 100];
    }
  },
  created() {
    this.min_delta = this.filter_item.values.min;
    this.max_delta = this.filter_item.values.max;
  },
  mounted() {
    this.$bus.$on("messageSent", this.getValue);
  }
};
</script>
