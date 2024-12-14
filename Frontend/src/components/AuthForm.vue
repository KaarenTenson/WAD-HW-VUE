<script>
export default {
  name: "AuthForm",
  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => ["login", "signup"].includes(value),
    },
  },
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
    async submitForm() {
      this.validatePassword();

      if (this.validationErrors.length > 0) {
        return;
      }

      if (this.mode === "login") {
        const username = this.email.split("@")[0];
        this.$store.dispatch("setProfile", {
          name: username,
          mail: this.email,
        });
        console.log(`Logging in with email: ${this.email}, password: ${this.password}`);
        this.$router.push("/about");
      } else if (this.mode === "signup") {
        console.log(`Signing up with email: ${this.email}, password: ${this.password}`);

        try {
          const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            alert("Signup successful! Redirecting to login.");
            this.$router.push("/login");
          } else {
            const error = await response.json();
            console.error("Error:", error);
            alert(error.error || "Signup failed");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred during signup");
        }
      }
    },
    navigateToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<template>
  <div class="auth-page">
    <div class="form">
      <strong>Welcome to PostIt</strong>
      <div v-if="mode === 'signup'">
        <p>Create an account</p>
      </div>
      <p v-if="mode === 'login'">Please log in</p>
      <form @submit.prevent="submitForm">
        <input type="email" v-model="email" required placeholder="Email" />
        <br />
        <input type="password" v-model="password" required placeholder="Password" />
        <br />
        <div class="button-group" v-if="mode === 'login'">
          <input type="submit" id="signup" value="Signup" @click.prevent="navigateToSignup" />
          <span>or</span>
          <input type="submit" id="login" value="Log in" />
        </div>
        <div v-if="mode === 'signup'">
          <input type="submit" id="signup" value="Signup" />
        </div>
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
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgb(171, 171, 159);
  border: 3px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#signup, #login {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

form input {
  margin: 10px;
}

.form p {
  margin: 10px;
}

#signup:hover, #login:hover {
  background-color: #0056b3;
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
