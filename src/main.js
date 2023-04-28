import { createApp } from 'vue';
import App from './App.vue';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

const app = createApp(App);
app.use(HighchartsVue);
HighchartsAccessibility(Highcharts);
app.mount('#app');