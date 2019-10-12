<template>
  <div id="accounts" class="background">
    <!-- <b-button type="button" class="createButton" @click="createAccount()">Create Account</b-button> -->
    <b-container>
      <b-row>
        <!-- <b-col sm="1">
          <h2>
          <b-button type="button" router-link to="/">&larr;</b-button>
          </h2>
        </b-col> -->
        <b-col sm="6" offset-md="3">
          <h2>
            <span class="heading-highlight">Choose your account</span>
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col id="accountList" class="mt-1" sm="4" offset-md="4" v-for="account in accounts" :key="account._id">
          <b-card class="px-4 shadow-sm">
            <b-button type="button" class="close" @click="deleteAccount(account._id)">&times;</b-button>
            <router-link :to="{ name: 'diary', params: {diary_id: account.diary, diet_id: account.diet} }">
              <strong>{{ account.email }}</strong><br>
              {{ account.name }}
            </router-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Accounts',
  data() {
    return {
      accounts: []
    }
  },
  created() {
    this.getAccounts()
  },
  methods: {
    getAccounts() {
      Api.get('/accounts')
        .then(response => {
          this.accounts = response.data.accounts
        })
        .catch(error => {
          this.accounts = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteAccount(id) {
      Api.delete(`/accounts/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.accounts.findIndex(account => account._id === id)
          this.accounts.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
#accounts {
  text-align: center;
}

#accountList a {
  color: #2c3e50;
}

h2 {
  padding: 30px;
}

.heading-highlight {
-webkit-font-smoothing: antialiased;
-webkit-tap-highlight-color: transparent;
-webkit-box-direction: normal;
font-weight: 600;
font-size: 2rem;
padding-left: .3125rem;
padding-right: .3125rem;
background-image: linear-gradient(0deg,#ffe7e2 50%,transparent 50%);
}

.background {
  background-color: #fdfdfd;
  background-size: cover; /* cover will scale the image so that the smallest dimension = the widest dimension of the box */
  background-position: center; /* vs the top-left that is default */
  position: absolute;
  width: 100%;
  height: 100%;
} 

/* .container {
  opacity: .90;
} */
</style>
