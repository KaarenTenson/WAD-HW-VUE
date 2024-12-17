import { createStore } from 'vuex'

export default createStore({
  state: {
    profile: {
      name: "Guest",
      mail: "guest@example.com",
    },
    isLoggedIn:false,
    mail:"",
    name:"",
    PostList:[  {
      "id":0,
      "author_name": "Hank Kim",
      "profile_picture": "me.png",
      "date_posted": "19.12.2003",
      "image": "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "how do you like my art?",
      "likes": {
          "count": 5,
          "IsLiked": false
      }
  },
  {
      "id":1,
      "author_name": "John Doe",
      "profile_picture": "me.png",
      "date_posted": "19.12.2003",
      "caption": "not bad",
      "likes": {
          "count": 1,
          "IsLiked": false
      }
  },
  {
      "id":2,
      "author_name": "Roger Parks",
      "profile_picture": "me.png",
      "date_posted": "19.12.2003",
      "caption": "looks good:)",
      "likes": {
          "count": 2,
          "IsLiked": false
      }
  },
  {
      "id":3,
      "author_name": "Sarah Mitchell",
      "profile_picture": "me.png",
      "date_posted": "19.12.2003",
      "caption": "i like it",
      "likes": {
          "count": 1,
          "IsLiked": false
      }
  },
  {
      "id":4,
      "author_name": "Ethan Parker",
      "profile_picture": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      "date_posted": "20.12.2003",
      "caption": "i dont know man",
      "likes": {
          "count": 1,
          "IsLiked": false
      }
  },
  {
      "id":5,
      "author_name": "Mia Thompson",
      "profile_picture": "me.png",
      "date_posted": "20.12.2003",
      "caption": "could be worse",
      "likes": {
          "count": 3,
          "IsLiked": false
      }
  },
  {
      "id":6,
      "author_name": "Lucas Johnson",
      "profile_picture": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      "date_posted": "20.12.2003",
      "caption": "pretty nifty ngl",
      "likes": {
          "count": 7,
          "IsLiked": false
      }
  },
  {
      "id":7,
      "author_name": "Ava Davis",
      "profile_picture": "me.png",
      "date_posted": "20.12.2003",
      "caption": "awesomesauce",
      "likes": {
          "count": 2,
          "IsLiked": false
      }
  },
  {
      "id":8,
      "author_name": "Noah Wilson",
      "profile_picture": "https://cdn.vectorstock.com/i/1000v/20/74/woman-avatar-profile-vector-21372074.jpg",
      "date_posted": "20.12.2003",
      "caption": "yeah sure",
      "likes": {
          "count": 1,
          "IsLiked": false
      }
  },
  {
      "id":9,
      "author_name": "Isabella Garcia",
      "profile_picture": "me.png",
      "date_posted": "20.12.2003",
      "caption": "pretty good",
      "likes": {
          "count": 3,
          "IsLiked": false
      }
  }

    ]
  },
  getters: {
    name(state) {
      return state.profile.name;
    },
    mail(state) {
      return state.profile.mail;
    },
  },
  mutations: {
    updateProfile(state, { name, mail }) {
      state.profile.name = name;
      state.profile.mail = mail;
    },
    Like(state, postId){
      let post=state.PostList.find(post1 => post1.id === postId);
      if(!post){
        return;
      }
      if(post.likes.IsLiked){
          post.likes.IsLiked=false;
          post.likes.count-=1;
      }else{
        post.likes.IsLiked=true;
        post.likes.count+=1;
      }
    },
    ADD_POST(state, newPost) {
      console.log('in the addPost', newPost)
      state.PostList.push(newPost);
    },
    LOG_OUT(state){
      state.isLoggedIn = false; 
    },
    DELETE_ALL(state){
      state.PostList=[];
    },
    FETCH_POSTS(state, data){
      console.log("posts fetched", data);

      state.PostList=data;
    },
    FETCH_POST(state, post) {
      console.log('fetched post', post);

      state.PostList.find(post);
    }    ,
    UPDATE_POST(state, {postId, caption}) {
      const postIndex = state.PostList.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        state.PostList[postIndex] = {
          ...state.PostList[postIndex],
          caption
        };
      }
    }
  },
  actions: {
    setProfile({ commit }, profileData) {
      commit("updateProfile", profileData);
    },
    LikeAct({ commit },  postId ) {
      commit('Like', postId );
    },
    LogOutAct({ commit}){
     commit("LOG_OUT");
    },
    async FetchPostsAct({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched posts:', data);
        commit('FETCH_POSTS', data.map((post) => {
          return {
              id: post.id,
              ...post.post,  
              user_id: post.user_id  
          };
      }));
      } catch (error) {
        console.error('Fetch posts error:', error);
      }
    },
    async DeleteAllAct({ commit }) {
      await fetch('http://localhost:3000/DeleteAll', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => console.log(data)) // Success message from the server
      .then(commit('DELETE_ALL'))
      .catch(error => console.error('Error:', error)); // Logs any error
       
  },
    async addPostAct({ commit, state }, postBody) {
      console.log(postBody)
      try {
        const response = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: state.profile.mail,
            content: postBody
          })
        });
        //console.log(state.profile.mail);

        if (!response.ok) {
          console.log(response);
        }
        const addedPost = await response.json();
        console.log('i have gotten the response')
        console.log(addedPost)

        commit('ADD_POST', {
          "id": addedPost.id,
          "author_name": state.profile.name,
          "profile_picture": 'me.png',
          "date_posted": new Date().toLocaleDateString(),
          "caption": postBody.caption,
          "likes": {
            "count": 0,
            "IsLiked": false,
          },
        });

        console.log('Post added:', addedPost);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    },
    async editPostAct({commit}) {
      console.log(postId);
      const response = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        console.log('issues getting post')
      }
      console.log('found a post')

      const posts = await response.json;
      return posts;
    },
    async updatePost({commit, state}, {id, caption}) 

    {
      let post=state.PostList.find(post1 => post1.id === id);
      post.caption=caption
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({
            email: post,
          }),
        });
        /**if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Ready to update posts:', data);
        commit('UPDATE_POST', id, caption, data); **/
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})