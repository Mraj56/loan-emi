<template>
    <div>
      <h3>Payment Schedule</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Payment Made</th>
            <th>Balance</th>
            <th>Loan % Paid Till Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(year, index) in paymentSchedule" :key="index">
            <td>
              <button
                class="btn btn-link"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#year-' + index"
                aria-expanded="false"
                :aria-controls="'year-' + index"
              >
                {{ year.year }}
              </button>
            </td>
            <td>{{ year.totalPayment }}</td>
            <td>{{ year.balance }}</td>
            <td>{{ year.loanPaidPercentage }}</td>
          </tr>
          <tr v-for="(month, index) in paymentSchedule" :key="'month-' + index">
            <td :colspan="4">
              <div class="collapse" :id="'year-' + index">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Payment</th>
                      <th>Principal Paid</th>
                      <th>Interest Paid</th>
                      <th>New Balance</th>
                      <th>Loan % Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(payment, index) in month.payments" :key="'payment-' + index">
                      <td>{{ payment.month }}</td>
                      <td>{{ payment.payment }}</td>
                      <td>{{ payment.principalPaid }}</td>
                      <td>{{ payment.interestPaid }}</td>
                      <td>{{ payment.newBalance }}</td>
                      <td>{{ payment.loanPaidPercentage }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      paymentSchedule: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .btn-link {
    text-decoration: none;
    color: #0d6efd;
  }
  </style>
  