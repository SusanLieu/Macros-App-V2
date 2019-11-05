<template>
    <div id="register" class="background">
      <h2 class="heading centerTitle">
        <span class="heading-highlight">Registration</span>
      </h2>
        <b-container>
              <b-row align-h="center">
                <b-col cols="8">
                  <b-card class="p-3 shadow-sm">
                    <div v-if="errorMessage" class="errorMessage">
                    {{errorMessage}}
                    </div>
                    <b-form @submit="onSubmit">
                    <b-form-group id="registrationInput" label="Name:" label-for="name"
                    >
                        <b-form-input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="registrationInput" label="Email address:" label-for="email"
                    >
                        <b-form-input
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>

                    <div class="text-right">
                    <b-button type="submit" pill variant="outline-primary">Next</b-button>&nbsp;
                    <b-button type="button" pill variant="outline-danger" router-link to="/">Cancel</b-button>
                    </div>
                    </b-form>
                </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Api.post('/accounts', this.form)
        .then(response => {
          this.$cookies.set('new_account', response.data.account._id)
          alert('Registered successfully')
          this.$router.push({
            name: 'profile'
          })
        })
        .catch(error => {
          this.errorMessage = error.response.data.message
        })
    }
  }
}
</script>

<style>
#register {
  text-align: left;
}

.centerTitle {
  text-align: center;
}

.errorMessage {
  color: red;
  font-weight: 600;
  padding-bottom: 1em;
}
</style>
