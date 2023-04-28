<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld/>
  <!-- <div >
    <div>
      <span>Loan amount</span>
      <input type="Number" v-model="data">
         <span> $</span>
    </div>
   <span> <slider-comp
      :config="{
              fill: '#54bd95',
              background: '#F0EEEC',
            }"
            :max="100"
            :min="0"
            v-model="data"
            @change="handle"
      /></span>
  </div>
  <div >
    <span>Interest Rate</span>
    <input type="Number" >
    <slider-comp
    :config="{
            fill: '#54bd95',
            background: '#F0EEEC',
          }"
          :max="40"
          :min="0"
          v-model="data"
          @change="handle"
    />
<span> %</span>
<span> {{ data }}</span>

  </div>
  <div >
    <span>Loan Tenure</span>
    <input type="Number" >
    <slider-comp
    :config="{
            fill: '#54bd95',
            background: '#F0EEEC',
          }"
          :max="40"
          :min="0"
          v-model="data"
          @change="handle"
    />
    <span> Month/Year</span>
   <span> {{ data }}</span>
  </div> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import SliderComp from './components/SliderComponent.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    // SliderComp
  },
  data(){
    return{
      data:0,
    }
  },
  methods:{
    handle(d) {
      this.data = d
      console.log(d, "from change");
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
