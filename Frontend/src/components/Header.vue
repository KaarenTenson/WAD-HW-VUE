<script setup>
import { ref } from 'vue';  // Import ref from Vue
import ProfileCompo from './ProfileCompo.vue';
const showProfile = ref(false);

// Method to toggle the `showProfile` state
const toggleProfile = () => {
  showProfile.value = !showProfile.value;
};

</script>
<template>
<header>
  <div>
  <strong><router-link to="/"> Home </router-link></strong>
  <strong><router-link to="/new-post">| New Post </router-link></strong>
  <strong><router-link to="/about">| About us </router-link></strong>
  </div>
  <div>
    <button id="Profile_info" type="button" @click="toggleProfile"></button>
  </div>
  <ProfileCompo v-if="showProfile" />
  </header>
</template>
<style scoped>
#Profile_info{ 
    width: 50px;
    height: 50px;
    background-image: url("../assets/me.png");
    background-size: cover;
    background-position: center;
    border-radius: 50%;
}

header{
    background-color: rgb(171, 171, 159);
    color: black;
    text-align: center;
    font-size: larger;
    display: flex;
    align-items: center; /* Vertically centers the content */
    justify-content: space-between; /* Horizontally centers the content */
    height: 100px;
    padding: 0% 3% 0% 3%;
    border-radius: 10px;
}
header img {
    align-content: end;
}
header a {
    color: black;
    font-size: large;
}
header a:hover {
    background-color: rgb(154, 149, 149);
    text-decoration:overline ;
}
</style>