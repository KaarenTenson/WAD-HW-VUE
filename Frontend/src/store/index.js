import { createStore } from 'vuex'

export default createStore({
  state: {
    profile: {
      name: "Guest",
      mail: "guest@example.com",
    },
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
    LOG_OUT(state){
      state.profile={
        name: "Guest",
        mail: "guest@example.com",
      }
      
    },
    ADD_POST(state, newPost) {
      console.log('in the addPost', newPost)
      state.PostList.push(newPost);
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
    UPDATE_POST(state, {post, Postid}) {
      const postIndex = state.PostList.findIndex(post1 => post1.id === Postid);
     state.PostList[postIndex]={
      id: Postid,
      ...post,  
      }
    }
  },
  actions: {
    LogOutAct({commit}){
      commit("LOG_OUT")
    },
    setProfile({ commit }, profileData) {
      commit("updateProfile", profileData);
    },
    LikeAct({ commit },  postId ) {
      commit('Like', postId );
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
          };
      }));
      } catch (error) {
        console.error('Fetch posts error:', error);
      }
    },
    async DeleteAllAct({ commit }) {
      await fetch('http://localhost:3000/posts/DeleteAll', {
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
  async DeleteAct({ }, id) {
    console.log(id);
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data)) // Success message from the server
    .catch(error => console.error('Error:', error)); // Logs any error
     
},
    async addPostAct({ state }, postBody) {
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

        console.log('Post added:', addedPost);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    },
    async editPostAct({commit},id, post) {
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
    async updatePost({commit, state}, {id, post}) 

    {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({
            post: post,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Ready to update posts:', data.post, data.id);
        commit('UPDATE_POST', data.post, data.id); 
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})