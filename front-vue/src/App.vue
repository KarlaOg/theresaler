<template>
  <div id="app">
    <Header />
    <router-view :key="$route.fullPath" />
    <!-- :key="$route.fullPath" : reaload components when the url changes, including query parameters -->
    <NotificationContainer />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    NotificationContainer,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Exo+2');
#app {
  background-color: #ffffff !important;
  font-family: 'Circular Book', 'Exo 2', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

a,
a:hover {
  color: #000000;
}
</style>
