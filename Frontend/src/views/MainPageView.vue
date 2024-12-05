<script>
import PostCompo from '@/components/PostCompo.vue';

export default {
  name: "MainPageView",
  components: { PostCompo },
  mounted:function(){
        this.fetchPosts() //method1 will execute at pageload
  },
  methods: {
    LogOut() {
        this.$store.dispatch("LogOutAct", { 
        });
        this.$router.push('/Login'); 
        },
    DeleteAll() {
        this.$store.dispatch("DeleteAllAct", {
        });
    },
    NewPost(){
        this.$router.push('/new-post');
    },
    fetchPosts(){
        this.$store.dispatch("FetchPostsAct", { 
        });
    },
  }
};
</script>

<template>
 
    <br>
    <button @click="LogOut">Logout</button>
    <section class="box">
    <section class="vasak"><h1>adds</h1></section>
    <section class="keskmine">
        <PostCompo></PostCompo>
    </section>
    <section class="parem"><h1>more adds</h1></section>
    
    </section>
    <div> 
        <button type="button" @click="DeleteAll" > Delete All</button>
        <button type="button" @click="NewPost" > Add post</button>
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
div {
    margin: 1%; /* Margin around the group */
    display: flex;
    flex-direction: row;
    align-items: center; /* Align buttons vertically in the center */
    gap: 40px; /* Adds space between buttons */
    justify-content:  center;  /* Align buttons to the left */
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

</style>
