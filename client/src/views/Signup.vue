<template>
  <div class="sign-up">
    <h1>Sign Up Page</h1>
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <form v-if="!loading" @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Enter Username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Enter Password" required>
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input v-model="user.confirmPassword" type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" required>
        <p>{{ comparePasswords }}</p>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template>

<script>
import Joi from 'joi'
import axios from 'axios'

const SIGNUP_URL = 'http://localhost:8081/auth/signup'

const schema = Joi.object().keys({
  username: Joi.string().trim().alphanum().min(2).max(30).required(),
  password: Joi.string().trim().min(6).required(),
  confirmPassword: Joi.string().trim().min(6).required()
})

export default {
name: 'Signup',
data() {
  return {
    user: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    error: '',
    loading: false
  }
},
computed: {
  comparePasswords() {
    return this.user.password !== this.user.confirmPassword ? 'Passwords do not match!' : ''
  }
},
methods: {
  signup() {
    this.error = ''

    if (this.validUser()) {
      const user = {
        username: this.user.username,
        password: this.user.password
      } 
      this.loading = true
      fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'content-type': 'application/json' 
        }
      }).then(response => {
        if (response.ok) {
          setTimeout(() => {
            this.$router.push('/login')
            return response.json()
          }, 1000)
        }
        response.json().then(err => {
          setTimeout(() => {
            this.loading = false
            this.error = err.message
          }, 1000)
        })  
      })
    }
  },

  validUser() {
    if (this.user.password !== this.user.confirmPassword) {
      this.error = 'Passwords must match!'
      return false
    }

    const result = Joi.validate(this.user, schema)

    if (result.error === null) {
      return true
    } 

    if (result.error.message.includes('username')) {
      this.error = 'Invalid Username!'
    } else {
      this.error = 'Invalid Password!'
    }
    return false
    
  }
}
}
</script>

<style>

</style>
