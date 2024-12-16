<template>
    <div>
        <h3>{{ProfileInfo.name}}</h3>
        <p>Email: {{ProfileInfo.mail}}</p>
        <button @click="LogOut">Logout</button>
    </div>

</template> 
<script>
export default {
name: "ProfileCompo",
data: function() {

return {
    
}},
computed: {
    ProfileInfo() {
        return {
        name: this.$store.getters.name,  // Correct access to the `name` getter
        mail: this.$store.getters.mail   // Correct access to the `mail` getter
      };
  },
},
methods: {
    async LogOut() {
        try {
            const response = await fetch("http://localhost:3000/auth/logout", {
                method: "GET",
                credentials: 'include',
            });

            if (response.ok) {
                console.log("Logout successful!");
                this.$store.dispatch("LogOutAct");
                this.$router.push('/Login');
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    },
},
}
</script>
<style scoped>

div {

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
h3 {
    margin: 0;
    font-size: 18px;
}

p {
    margin: 5px 0;
    font-size: 14px;
}
</style>