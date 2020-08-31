<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="title-categories">Price range</div>
      </div>

      <div class="col-10">
        <div class="count-range mb-3">
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
        <div class="my-5">
          <vue-slider
            v-model="values"
            :min-range="1"
            :enable-cross="true"
            :min="0"
            :max="100"
            :interval="1"
            :tooltip="'none'"
            @change="selectValueApply()"
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
    widget: Object
  },
  data() {
    return {
      // Base Min & Max Value
      minValue: this.widget.min,
      maxValue: this.widget.max,
      // Min & Max Values (for Slider)
      values: [0, 100],
      interval_range: 1,
      min_delta: 0,
      max_delta: 0
    };
  },
  components: {
    Caret
  },
  methods: {
    keyupCheck(value, side) {
    // Check if string value
    if(!(/^\d*\.?\d*$/.test(value))) {
      // If Change Min Value
      if(side == 'min') {
        let minV = value.toString().split('');
        // Delete no number item
        delete minV[minV.indexOf(value)];
        value = '';
        minV.forEach(element => {
          value += element;
        });
      } 
      // If Change Max Value
      else if(side == 'max') {
        let maxV = value.toString().split('');
        // Delete no number item
        delete maxV[maxV.indexOf(value)];
        value = '';
        maxV.forEach(element => {
          value += element;
        })
      }
      return value
    };
    
    this.values = [this.minRange, this.maxRange];

    // this.changeFilter();
    },
    checkMaxValue(value) {
      if (
        value.target.value <= this.widget.max &&
        value.target.value > this.widget.min
      ) {
        this.maxRange = value.target.value;
      }
      // Check Max Value
      if (value.target.value > this.widget.max) {
        this.maxRange = this.widget.max;
      }
      if (value.target.value < this.widget.min) {
        this.maxRange = this.widget.min;
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
        value.target.value <= this.widget.max &&
        value.target.value > this.widget.min
      ) {
        this.minRange = value.target.value;
      }
      // Check Min Value
      if (value.target.value > this.widget.max) {
        this.minRange = this.widget.max;
      }
      if (value.target.value < this.widget.min) {
        this.minRange = this.widget.min;
      }
      if (this.minRange > this.maxRange) {
        this.maxRange = this.minRange;
      }
      if (this.maxRange < this.minRange) {
        this.minRange = this.maxRange;
      }
    },
    sliderChange() {
      this.minRange = this.values[0];
      this.maxRange = this.values[1];
    },
    selectValueApply() {
      let values = [this.minRange, this.maxRange],
          alias = 'prices';
      
      this.$emit("change", { alias, values });
    }
  },
  computed: {
    minRange: {
      get: function() {
        return Math.ceil(this.kx * this.values[0] ** 4 + this.min_delta);
      },
      set: function(newValue) {
      
        this.min_delta =
          newValue - this.widget.min > 0
            ? this.widget.min
            : newValue;
        let value = ((newValue - this.min_delta) / this.kx) ** (1 / 4);
        this.values = [value, this.values[1]];
      }
    },
    maxRange: {
      get: function() {
        return Math.ceil(this.kx * this.values[1] ** 4 + this.min_delta);
      },
      set: function(newValue) {
      
        this.max_delta =
          newValue - this.widget.max < 0
            ? this.widget.max
            : newValue;
        let value = ((newValue - this.min_delta) / this.kx) ** (1 / 4);
        this.values = [this.values[0], value];
      }
    },
    kx() {
      return this.priceRange / 100 ** 4;
    },
    priceRange() {
      return this.max_delta - this.min_delta;
    }
  },
    created() {
    this.min_delta = this.widget.min;
    this.max_delta = this.widget.max;
  }
  // methods: {
  //   // selectValueApply(alias, values) {
  //   //   this.$emit("change", { alias, values });
  //   // }
  // }
};
</script>
