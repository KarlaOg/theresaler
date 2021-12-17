<template>
  <div id="app">
    <p>tata</p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Inscriptions />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Inscriptions from './components/Inscriptions.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Inscriptions,
  },
};
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
