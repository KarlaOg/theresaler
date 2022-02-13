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
#app {
  background-color: #ffffff !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
* {
  outline: none;
}

a,
a:hover {
  color: #000000;
}
</style>
