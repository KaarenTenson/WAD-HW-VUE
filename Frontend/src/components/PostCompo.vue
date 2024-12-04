<template>
    <section class="post" v-for="post in PostList" :key="post.id">
      <div class="postheader">
        <img :src="resolvePicture(post.profile_picture)" alt="profile">
        <p>{{ post.date_posted }}</p>
      </div>
      <img v-if="post.image" :src="resolvePicture(post.image)" alt="post image">
      <p>{{ post.caption }}</p>
     
      <section class="reaktsioon">
        <button  @click="Like(post.id)" :class="post.likes.IsLiked ? 'like_button_clicked' : 'like_button'" ></button>
        <p class="reaktsioonLikeText">{{ post.likes.count }}</p>
      </section>
    </section>
  </template>
  
  <script>
export default {
name: "PostCompo",
data: function() {

return {
    
}},
computed: {
    PostList() {
        return this.$store.state.PostList},
  },
methods: {
    Like(id) {
  this.$store.dispatch("LikeAct",id)
},
resolvePicture(Picture) {
  if(Picture.startsWith("http")){
       return Picture 
      }
      
    return require(`@/assets/${Picture}`); // For static paths
  
  },
},
}
</script>
<style>
.post{
    border: 3px solid black;
    padding: 2%;
    background-color: white;
    margin-bottom: 2%;

}
.post > p~p::first-letter{
    font-size: larger;
    font-weight:bold;
    color: red;
}
.post:hover {
    margin:  1%;
  }
.postheader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.postheader img {
    display: block;
    width: 40px;
    height: 100%;
}


.post > img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}

.reaktsioon{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
   
}
/*like count text */
.reaktsioonLikeText{
    margin: 10px;
    font-size: x-large;
}
/*like button */

.like_button {
    background-image: url("../assets/like.png");
    background-color: transparent;
    width: 25px;
    height: 25px;
    background-size: cover;
    background-position: center;
    display: inline-block;
    border: none;

}

.like_button_clicked {
    background-image: url("../assets/like_filled.png"); /* Change when checked */
    background-color: transparent;
    width: 25px;
    height: 25px;
    background-size: cover;
    background-position: center;
    display: inline-block;
    border: none;
}
</style>
  