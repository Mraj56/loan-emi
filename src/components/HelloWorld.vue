<template>
  <div>
    <label>Loan Amount</label>
    <span><input type="Number" v-model="principal"/></span>
    <br><br>
    <input type="range" min="0" max="200000000" v-model="principal">
    <br><br>
    <label>Tenure (in months)</label>
    <span><input type="Number" v-model="tenure"/></span>
    <br><br>
    <input type="range" min="0" max="3600"  v-model="tenure">
    <br><br>
    <label>Interest Rate (per annum)</label>
    <span><input type="Number" v-model="interestRate"/></span>
    <br><br>
    <input type="range" min="1" max="20" step="0.1" v-model="interestRate">
    <br><br>
    <button @click="calculate">Calculate EMI</button>
    <br><br>
    <div v-if="result !== null">
      Monthly Payment: {{ result }}
    </div>
    <br><br>
  </div>
  <PieChart :principal="parseFloat(principal)" :interest="parseFloat(totalInterest)" v-if="result !== null"/>
  <PaymentSchedule :paymentSchedule="paymentSchedule" v-if="paymentSchedule !== null" />

</template>

<script>
import PieChart from './PieChart.vue'
import PaymentSchedule from './PaymentShedule.vue'
export default {
  components:{
    PieChart,
    PaymentSchedule
  },
  data() {
    return {
      principal: 1000,
      tenure: 12,
      interestRate: 1,
      result: null,
      paymentSchedule: [],
    };
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
      const emi = (numerator / denominator).toFixed(2);
      this.result = emi;
      this.paymentSchedule = this.generatePaymentSchedule();
    },
    
    generatePaymentSchedule() {
      const r = this.interestRate / (12 * 100);
      const n = this.tenure;
      const p = this.principal;
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      let balance = p;
      const schedule = [];

      for (let i = 0; i < n; i++) {
        const interest = balance * r;
        const principalPaid = emi - interest;
        balance -= principalPaid;

        const year = Math.floor((i + 1) / 12) + 1; // calculate the year number
        const found = schedule.find(obj => obj.year === year); // check if a year object already exists in the schedule
        if (found) { // if year object exists, update its properties
          found.totalPayment += emi;
          found.interestPaid += interest;
          found.principalPaid += principalPaid;
          found.balance = balance;
        } else { // otherwise, create a new year object and add it to the schedule
          schedule.push({
            year,
            totalPayment: emi,
            interestPaid: interest,
            principalPaid,
            balance
          });
        }
      }
      return schedule;
    }
  },
};
</script>
