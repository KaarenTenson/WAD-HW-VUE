<script>
import PostCompo from '@/components/PostCompo.vue';

export default {
  name: "MainPageView",
  components: { PostCompo },
  methods: {
    resetLikes() {
      console.log("yes"); 
      this.$store.dispatch('resetLikesAct');  
    }
  }
};
</script>

<template>
    <div id="profilePanel" class="profile-panel">
        <h3>Guest</h3>
        <p>Email: guest@example.com</p>
        <a href="Login.html" ><strong>Logout</strong></a>
    </div>
    <br>
    <section class="box">
    <section class="vasak"><h1>adds</h1></section>
    <section class="keskmine">
        <PostCompo></PostCompo>
    </section>
    <section class="parem"><h1>more adds</h1></section>
    
    </section>
    <button type="button" @click="resetLikes" > reset likes</button>
    
</template>

<style scoped>
button{
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: #4497ce;
    color: white;
    cursor: pointer;
    margin-bottom: 1%;
}
button:hover { 
        background-color: #2b2f31;
        } 
.box
{
    margin: 1%;
    display: flex;
    flex-direction: row;
    align-self: flex-start; 
    justify-content: space-between;
    

}
.vasak{
    text-align: center;
    background-color: rgb(64, 92, 92);
    width: 20%;
    border: 3px solid black;
    background-size: cover;
    background-position: center;
}
.keskmine{
    background-color: rgb(80, 78, 67);
    width: 55%;
    display: flex;
    flex-direction: column;
    border: 3px solid black;
    background-size: cover;
    background-position: center;
}
.parem{
    text-align: center;
    background-color: rgb(64, 92, 92);
    width: 20%;
    border: 3px solid black;
    background-size: cover;
    background-position: center;
}
@media (max-width: 800px) {
    .box{
        flex-direction: column;
        align-items: center;
        margin: 0%;
    }
    .box > section{
        width: 95%;
    }

}
#Profile_info{ 
    width: 50px;
    height: 50px;
    background-image: url("../assets/me.png");
    background-size: cover;
    background-position: center;
    border-radius: 50%;
}
.profile-panel {
    display: none; /* Hidden by default */
    position: absolute;
    top: 110px; /* Below the profile image */
    right: 10px;
    background-color: #f9f9f9;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 200px;
    z-index: 1000;
}
.profile-panel h3 {
    margin: 0;
    font-size: 18px;
}

.profile-panel p {
    margin: 5px 0;
    font-size: 14px;
}
.profile-panel a {
    margin: 5px 0;
    font-size: 14px;
    color: black;
}
</style>
