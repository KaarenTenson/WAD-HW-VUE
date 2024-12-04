<template>
    <div class="form-container">
      <h1>Create a New Post</h1>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="postBody">Post Body:</label>
          <textarea id="postBody" v-model="postBody" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Choose an Image:</label>
          <input type="file" id="image" @change="handleFileChange" accept="image/*" />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      postBody: '',
      image: null,
    };
  },
  methods: {
    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            this.image = null;
            }
    },
    submitPost() {
      if (!this.postBody) {
        alert("Post cannot be empty!");
        return;
      }
      this.$store.dispatch("addPostAct", {
        postBody: this.postBody,
        image: null, // Currently null, will add image functionality in future
      });
      this.postBody = "";
      this.image = null;
      alert("Post added");
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgb(171, 171, 159);
  border: 3px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}



h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  margin-right: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

input[type="file"] {
  width: 100%;
  padding: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
  box-shadow: 0 0 3px #0056b3;
}
</style>