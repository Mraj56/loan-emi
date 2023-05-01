<template>
  <div class="payment-schedule">
    <h3 class="title">Payment Schedule</h3>
    <table class="payment-table">
      <thead>
        <tr>
          <th class="year-header">Year</th>
          <th>Total Payment Made</th>
          <th>Balance</th>
          <th>Loan % Paid Till Date</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(year, ind) in paymentSchedule" :key="'year-' + ind">
          <tr class="year-row">
            <td>
              <button class="year-btn" type="button" @click="toggleAccordion(year.year)">
                {{ year.year }}
              </button>
            </td>
            <td>{{ year.totalPayment }}</td>
            <td>{{ year.balance }}</td>
            <td>{{ year.loanPaidPercentage }}</td>
          </tr>
          <tr  class="month-row" :ref="'element'+ year.year" v-for="(payment, index) in year.payments" :key="'payment-' + index">
            <td>{{ payment.month }}</td>
            <td>{{ payment.payment }}</td>
            <td>{{ payment.principalPaid }}</td>
            <!-- <td>{{ payment.interestPaid }}</td> -->
            <!-- <td>{{ payment.newBalance }}</td>-->
            <td>{{ payment.loanPaidPercentage }}</td> 
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    paymentSchedule: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAccordion: null
    };
  },
  methods: {
    toggleAccordion(year) {
      // console.log(this.$refs['element'+year])
      const kk = this.$refs['element'+year]
      kk.forEach(element => {
        // window.getComputedStyle(element)
        // console.log(element.style.display);
        if(element.style.display == undefined || element.style.display == 'none'|| element.style.display==''){

          element.style.display = 'table-row'
        }else if(element.style.display == 'table-row'){
          element.style.display = 'none'
        }
      });
}

  }
};
</script>

<style >

</style>
