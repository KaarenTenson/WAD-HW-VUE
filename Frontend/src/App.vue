<script setup>
import Header from './components/Header.vue';
import Footer  from './components/Footer.vue';

// Declare reactive `showProfile` using `ref`

</script>

<template>
  <Header></Header>
  <router-view/>
  <Footer></Footer>
  
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
