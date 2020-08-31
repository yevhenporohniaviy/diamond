<template>
  <el-popover
    popper-class="popoverCategory prices"
    placement="bottom-start"
    visible-arrow
    width="575"
    :open-delay="900"
    trigger="hover"
  >
    <div class="container">
      <div class="d-flex justify-content-center align-items-center">
        <div class="col-8">
          <div class="count-range my-4">
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
          <vue-slider
            v-model="values"
            :min-range="1"
            :enable-cross="true"
            :min="0"
            :max="100"
            :interval="1"
            :tooltip="'none'"
            @change="selectNumber()"
          ></vue-slider>
        </div>
      </div>
    </div>

    <el-button slot="reference" class="btn-filter">
      <div class="title">
        <div>Price range</div>
        <Caret />
      </div>

      <div class="sub-title">
        ${{ minRange }} -
        ${{ maxRange }}
      </div>
    </el-button>
  </el-popover>
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
    // Maybe need it in the future
    keyupCheck(event, side) {
      // Check if string value
      if(!(/^\d*\.?\d*$/.test(event.data))) {
        // If Change Min Value
        if(side == 'min') {
          let minV = this.minRange.toString().split('');
          // Delete no number item
          delete minV[minV.indexOf(event.data)];
          this.minRange = '';
          minV.forEach(element => {
            this.minRange += element;
          });
        } 
        // If Change Max Value
        else if(side == 'max') {
          let maxV = this.maxRange.toString().split('');
          // Delete no number item
          delete maxV[maxV.indexOf(event.data)];
          this.maxRange = '';
          maxV.forEach(element => {
            this.maxRange += element;
          })
        }
      };
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

      this.selectNumber();
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

      this.selectNumber();
    },
    sliderChange() {
      this.minRange = this.values[0];
      this.maxRange = this.values[1];
    },
    selectNumber() {
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
};
</script>
