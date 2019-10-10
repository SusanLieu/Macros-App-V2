<template>
  <div id="home">
    <div class="bg-image"></div>

    <b-container>
      <b-row class="homeTitle">
        <b-col md="6" offset-md="3">
          <h1>
            Start your journey
          </h1>
        </b-col>
      </b-row>
      <b-row class="homeDescription">
        <b-col md="8" offset-md="2">
          {{ message }}
        </b-col>
      </b-row>
      <b-row class="homeButtons">
        <b-col md="2" offset-md="4"><b-button router-link to="/accounts" pill variant="outline-secondary" size="lg">Accounts</b-button></b-col>
        <b-col md="2"><b-button router-link to="/register" pill variant="outline-info" size="lg">Register</b-button></b-col>
      </b-row>
    </b-container>
    </div>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import image from '../assets/home.jpg'

export default {
  name: 'Home',
  data() {
    return {
      image: image,
      message: '',
      accounts: []
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    getAccounts() {
      Api.get('accounts')
        .then(reponse => {
          this.accounts = reponse.data.accounts
        })
        .catch(error => {
          this.accounts = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    }
  }
}
</script>

<style>
.bg-image {
  background-image: url('../assets/home.jpg');
  opacity: .25;
  background-size: cover; /* cover will scale the image so that the smallest dimension = the widest dimension of the box */
  background-position: center; /* vs the top-left that is default */
  position: absolute;
  width: 100%;
  height: 88.8%
}
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.homeTitle {
  padding-top: 100px;
  padding-bottom: 20px;
}
.homeDescription {
  padding-top: 10px;
  padding-bottom: 20px;
}
.homeButtons {
  padding-top: 20px;
}

</style>
