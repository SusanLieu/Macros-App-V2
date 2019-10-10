<template>
    <div id="register" class="background">
        <b-container>
              <b-row align-h="center" class="mt-5">
                <b-col cols="6">
                  <b-card class="p-3">
                    <h3 class="mb-4 formTitle">Registration</h3>                  
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Api.post('/accounts', this.form)
      .then(response => {
        this.$cookies.set('accountId', response.data.account._id)
        alert('Registered successfully')
        this.$router.push({
        name: 'profile'
        })
      })
      .catch(error => {
        console.log(error)
        alert('Email already registered.')
      }) 
    }
   }
}
</script>

<style scoped>
#register {
  text-align: left;
}

.formTitle {
  text-align: center;
}
/* 
.background {
  background-color: #f0f5f5;
  background-size: cover; /* cover will scale the image so that the smallest dimension = the widest dimension of the box */
  /* background-position: center; vs the top-left that is default */
  /* position: absolute;
  width: 100%;
  height: 100%;
}  */
</style>
