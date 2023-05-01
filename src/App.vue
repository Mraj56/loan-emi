<template>
  <HelloWorld/>
</template>

<script>

import HelloWorld from './components/LoanEMI.vue'
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

<style lang="scss">
@import "./assets/styles/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  // width:100%;
  // height: 100vh;
  padding: 50px;
}
</style>
