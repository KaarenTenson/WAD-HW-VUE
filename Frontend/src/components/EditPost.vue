<template>
    <div>
      <h1>Post Details</h1>
      <div v-if="post">
        <p><strong>Caption:</strong> {{ post.caption }}</p>
        <textarea id="newBody" v-model="newBody" required></textarea><br>
        <button @click="updatePost">Update Post</button>
        <button @click="deletePost">Delete Post</button>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>

<script>
    export default {
  computed: {
    post() {
        const postId = parseInt(this.$route.params.postId);
        return this.$store.state.PostList.find(post => post.id === postId);
    },
    isLoading() {
        return this.$store.state.PostList.length === 0;
    },
  },
  methods: {
    async fetchPosts() {
        if (this.isLoading) {
            await this.$store.dispatch("editPostAct");
        }
    },
    updatePost() {
        const updatedCaption = this.newBody
        this.$store
          .dispatch("updatePost", { id: this.post.id, post: {
              "id": this.post.id,
              "author_name": this.post.author_name,
              "profile_picture": this.post.profile_picture,
              "date_posted": this.post.date_posted,
              "caption": updatedCaption,
              "likes": {
                "count": this.post.likes.count,
                "IsLiked": this.post.likes.IsLiked,
              },
        } 
      })
          .then(() => {
            alert("Post updated successfully!");
            this.post.caption = updatedCaption;
          });
    },
    deletePost() {
      if (confirm("Are you sure you want to delete this post?")) {
        this.$store.dispatch("DeleteAct", this.post.id).then(() => {
          alert("Post deleted successfully!");
          this.$router.push("/");
        });
      }
    }
  }
}
</script>