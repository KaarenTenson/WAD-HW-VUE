<script>
import PostForm from '@/components/PostForm.vue';

export default {
    components: {
      PostForm,
    },
  };
  </script>

<template>
    <div>
      <main>
        <PostForm />
      </main>
    </div>
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