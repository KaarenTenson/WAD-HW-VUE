<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      validationErrors: [],
    };
  },
  methods: {
    validatePassword() {
      this.validationErrors = [];
      const password = this.password;

      if (password.length < 8 || password.length >= 15) {
        this.validationErrors.push("Password must be at least 8 characters and less than 15 characters long.");
      }
      if (!/^[A-Z]/.test(password)) {
        this.validationErrors.push("Password must start with an uppercase alphabet.");
      }
      if (!/[A-Z]/.test(password)) {
        this.validationErrors.push("Password must include at least one uppercase alphabet character.");
      }
      if (!/[a-z].*[a-z]/.test(password)) {
        this.validationErrors.push("Password must include at least two lowercase alphabet characters.");
      }
      if (!/\d/.test(password)) {
        this.validationErrors.push("Password must include at least one numeric value.");
      }
      if (!/_/.test(password)) {
        this.validationErrors.push('Password must include the character "_".');
      }
    },
    
    submitLogin() {
      this.validatePassword();

      if (this.validationErrors.length > 0) {
        return;
      }

      const username = this.email.split("@")[0];

      this.$store.dispatch("setProfile", {
        name: username,
        mail: this.email,
      });

      console.log(`Logging in with email: ${this.email}, password: ${this.password}`);
      this.$router.push("/about");
    },
  },
};
</script>

<template>
  <div class="login-page">
    <div class="form">
      <strong>Welcome to PostIt</strong>
      <div>
        <p>Create an account</p>
      </div>
      <p>or</p>
      <p>Please log in</p>
      <form @submit.prevent="submitLogin">
        <input type="email" v-model="email" required placeholder="Email" />
        <br />
        <input type="password" v-model="password" required placeholder="Password" />
        <br />
        <input type="submit" id="submit" value="Signup" />
      </form>

      <div v-if="validationErrors.length > 0" class="validation-errors">
        <p>Password is not valid:</p>
        <ul>
          <li v-for="(error, index) in validationErrors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.form {
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 20px;
  padding-top: 10px;
}

.form div > p {
  color: cyan;
}

#submit {
  background-color: blue;
  color: white;
}

form input {
  margin: 10px;
}

.form p {
  margin: 10px;
}

#submit:hover {
  background-color: lightblue;
}

div + p {
  text-decoration: underline;
}

.form p ~ p {
  color: yellow;
}

@media (max-width: 800px) {
  .header {
    flex-direction: column;
    align-items: center;
  }

  .form {
    flex-direction: column;
    align-items: center;
    margin: 0%;
  }

  button {
    width: 100%;
  }
}

</style>