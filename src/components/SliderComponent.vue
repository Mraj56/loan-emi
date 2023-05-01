<template>
  
    <div class="range-slider" id="slider-001" style="width:100%;position: relative;">
      <input
        class="range-slider__range"
        id="range-slider"
        ref="slider"
        @input="handleChange"
        type="range"
        :min="min"
        :max="max"
        v-model="currentValue"
        :step="this.stepSize"
      />
      <div class="slider-range-steps">
          <span
            class="slider-range-step"
            v-for="step in numSteps"
            :key="step"
            :style="{ left: stepPosition(step) + '%' }"
          >
        </span>
      </div>
      <div class="slider-value-container">
        <div v-for="val in sliderValues" class="slider-value" :key="val">{{ formattedValue(val) }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "slider-comp",
    emits: ["update:modelValue","change"],
    props: {
      max: {
        type: Number,
        default: 100,
      },
      min: {
        type: Number,
        default: 0,
      },
      stepSize: {
        type: Number,
        default:1,
        required: true,
      },
      config: {
        type: Object,
        default: ()=> {
          return {
            fill: "#F6991D",
            background: "#d4d4d4",
          };
      },
    },
  },
    data() {
      return {
        currentValue: 0,
        value:this.min
      };
    },
     mounted() {
      
        let slider = this.$refs["slider"];
        this.currentValue = this.min
        const percentage =
          100 * ((this.currentValue - this.min) / (this.max - this.min));
        // now we'll create a linear gradient that separates at the above point
        // Our background color will change here
        const bg = `linear-gradient(90deg, ${this.config.fill} ${percentage}%, ${
          this.config.background
        } ${percentage + 0.1}%)`;
        slider.style.background = bg;
      },
      computed: {
      numSteps() {
        const values = [];
      for (let i = this.min; i <= this.max; i += this.stepSize) {
        values.push(i);
      }
      return values;
      },
      sliderValues() {
      const values = [];
      for (let i = this.min; i <= this.max; i += this.stepSize) {
        values.push(i);
      }
      return values;
    }
    },
    methods: {
      formattedValue(value) {
        if (value >= 100000) {
        return `${(value / 100000).toFixed(1)}L`;
      } else {
        return `${value}`;
      }
    },
      stepPosition(step) {
        const stepPercent = (step * this.stepSize) / (this.max - this.min);
        return stepPercent * 100;
      },
      handleChange($event) {
        this.$emit("update:modelValue", this.currentValue);
        this.$emit("change", this.currentValue);
        
        const percentage =
          100 * ((this.currentValue - this.min) / (this.max - this.min));
        // now we'll create a linear gradient that separates at the above point
        // Our background color will change here
        const bg = `linear-gradient(90deg, ${this.config.fill} ${percentage}%, ${
          this.config.background
        } ${percentage + 0.1}%)`;
        $event.target.style.background = bg;
        $event.target.style.marginBottom = '10px'
        // if (this.currentValue < 30) {
        //         return this.loanRangeStep = 1;
        //     } else if (this.currentValue >= 30 && this.currentValue < 50) {
        //         return this.loanRangeStep = 5;
        //     } else if (this.currentValue >= 50) {
        //         return this.loanRangeStep = 10;
        //     } 
        }
      }
}

  </script>
  
  