<template>
  <div class="container">
    <div class="wrap">
      <div class="upper" >
        <label>Loan Amount</label>
        <span><input type="number" v-model="principal" @input="handleNumberInput" /></span>
        <img src="../../src/assets/svg/Indian-Rupee-symbol.svg" alt="rupee" >
      </div>

      <slider-component
      :min="0"
      :max="20000000"
      :step-size="2500000"
      v-model="principal"
      @change="currentVal"
    />
    </div>

    <div class="wrap">
      <div class="upper">
        <label>Interest Rate (per annum)</label>
        <span><input type="number" v-model="interestRate" @input="handleNumberRate"/></span>
        <span style="margin-left: 5px;">%</span>
      </div>
      <slider-component
      :min="5"
      :max="20"
      :step-size="2.5"
      v-model="interestRate"
      @change="currentVal"
    />
    </div>

    <div class="wrap">
      <div class="upper">
        <label>Tenure (in months)</label>
        <span><input type="number" v-model="tenure"  @input="handleNumberTenure"/></span>
        <span style="margin-left: 5px;">Mo</span>
      </div>
      <slider-component
      :min="0"
      :max="30"
      :step-size="5"
      v-model="tenure"
      @change="currentVal"
    />
    </div>
   
    <button @click="calculate">Calculate EMI</button>

    <div v-if="result !== null">
      Monthly Payment: {{ result.toFixed(2) }}
    </div>
    <PieChart :principal="parseFloat(principal)" :interest="parseFloat(totalInterest)" v-if="result !== null" />
  <PaymentSchedule :paymentSchedule="paymentSchedule" v-if="result !== null" />
  </div>
  
</template>


<script>
import PieChart from './PieChart.vue'
import PaymentSchedule from './PaymentShedule.vue'
import SliderComponent from './SliderComponent.vue'
export default {
  components: {
    PieChart,
    PaymentSchedule,
    SliderComponent
  },
  data() {
    return {
      principal: 100000,
      tenure: 12,
      interestRate: 5,
      result: null,
      paymentSchedule: [],
      selectedValue:0,
      MaxPrincipal:20000000,
      MaxTenure:30,
      MaxRate:20,
    }
  },
  
  computed: {
    monthlyInterestRate() {
      return this.interestRate / 1200
    },
    totalInterest() {
      const totalPayment = this.calculateTotalPayment()
      return totalPayment - this.principal
    }
  },
  methods: {
    handleNumberInput(event) {
  let inputValue = event.target.value;

  // Remove non-digit characters from the input
  inputValue = inputValue.replace(/\D/g, "");

  // Ensure the input value is not negative and is within the min/max range
  if (inputValue < 0) {
    // If it is negative, set the input value to 0
    inputValue = 0;
  } else if (inputValue > this.MaxPrincipal) {
    // If it is greater than MaxPrincipal, set the input value to MaxPrincipal
    inputValue = this.MaxPrincipal;
  }

  // Update the data property with the sanitized value
  this.principal = Number(inputValue);
},
    handleNumberRate(event) {
      let inputValue = event.target.value;

  // Remove non-digit characters from the input
  inputValue = inputValue.replace(/\D/g, "");

  // Ensure the input value is not negative and is within the min/max range
  if (inputValue < 0) {
    // If it is negative, set the input value to 0
    inputValue = 0;
  } else if (inputValue > this.MaxRate) {
    // If it is greater than MaxRate, set the input value to MaxRate
    inputValue = this.MaxRate;
  }

  // Update the data property with the sanitized value
  this.interestRate = Number(inputValue);
    },
    handleNumberTenure(event) {
      let inputValue = event.target.value;

  // Remove non-digit characters from the input
  inputValue = inputValue.replace(/\D/g, "");

  // Ensure the input value is not negative and is within the min/max range
  if (inputValue < 0) {
    // If it is negative, set the input value to 0
    inputValue = 0;
  } else if (inputValue > this.MaxTenure) {
    // If it is greater than MaxTenure, set the input value to MaxTenure
    inputValue = this.MaxTenure;
  }

  // Update the data property with the sanitized value
  this.tenure = Number(inputValue);
    },
    calculateTotalPayment() {
      const numerator = parseFloat(this.principal) * this.monthlyInterestRate * Math.pow(1 + this.monthlyInterestRate, parseFloat(this.tenure));
      const denominator = Math.pow(1 + this.monthlyInterestRate, parseFloat(this.tenure)) - 1;
      return numerator / denominator * parseFloat(this.tenure);
    },

    calculate() {
      const r = this.interestRate / (12 * 100);
      const n = this.tenure;
      const p = this.principal;
      const numerator = p * r * Math.pow(1 + r, n);
      const denominator = Math.pow(1 + r, n) - 1;
      const emi = (numerator / denominator)
      if(typeof(emi)===Number){
        emi.toFixed(2)
      }
      this.result = emi;

      this.paymentSchedule = [];
      let year = new Date().getFullYear();
      let balance = this.principal;
      let totalInterestPaid = 0;

      for (let i = 0; i < this.tenure; i++) {
        const payments = [];

        for (let j = 0; j < 12; j++) {
          const interest = balance * this.monthlyInterestRate;
          const principalPaid = emi - interest;
          const newBalance = balance - principalPaid;

          totalInterestPaid += interest;

          payments.push({
            month: this.getMonthName(j),
            payment: parseFloat(emi.toFixed(2)),
            principalPaid: parseFloat(principalPaid.toFixed(2)),
            interestPaid: parseFloat(interest.toFixed(2)),
            newBalance: parseFloat(newBalance.toFixed(2)),
            loanPaidPercentage: ((this.principal - newBalance) / this.principal * 100).toFixed(2)
          });

          balance = newBalance;

          if (balance <= 0) {
            break;
          }
        }

        const yearData = {
          year: year++,
          totalPayment: parseFloat((emi * 12).toFixed(2)),
          balance: parseFloat(balance.toFixed(2)),
          loanPaidPercentage: ((this.principal - balance) / this.principal * 100).toFixed(2),
          payments
        };

        this.paymentSchedule.push(yearData);

        if (balance <= 0) {
          break;
        }
      }

      this.totalInterest = totalInterestPaid.toFixed(2);
    },

    getMonthName(monthIndex) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames[monthIndex];
    },
    currentVal(val){
      console.log(val);
      this.principal
    }
    
  }
}

</script>
