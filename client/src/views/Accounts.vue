<template>
  <div id="accounts" class="background">
    <b-container>
      <b-row>
        <b-col cols="6" offset="3">
          <h2>
            <span class="heading-highlight">Choose your account</span>
          </h2>
        </b-col>
      </b-row>
      <b-row v-if="errorMessage" class="errorMessage" align-h="center">
        <b-col>
          {{errorMessage}}
        </b-col>
      </b-row>
      <b-row>
        <b-col id="accountList" class="mt-1" cols="8" offset="2" v-for="account in accounts" :key="account._id">
          <b-card class="px-4 shadow-sm">
            <b-button type="button" class="close" @click="deleteAccount(account._id)">&times;</b-button>
            <b-button style="color: #2c3e50;" variant="link" class="text-decoration-none" @click="setCookies(account.diet, account._id, account.profile)">
              <strong>{{ account.email }}</strong><br>
              {{ account.name }}
            </b-button>
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
      accounts: [],
      errorMessage: ''
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
          this.errorMessage = error.response.data.message
        })
    },
    deleteAccount(id) {
      if (confirm('Are you sure?')) {
        Api.delete(`/accounts/${id}`)
          .then(response => {
            console.log(response.data.message)
            var index = this.accounts.findIndex(account => account._id === id)
            this.accounts.splice(index, 1)
          })
          .catch(error => {
            this.errorMessage = error.response.data.message
          })
      }
    },
    setCookies(diet, account, profile) {
      this.$cookies.set('diet', diet)
      this.$cookies.set('account', account)
      this.$cookies.set('profile', profile)
      this.$router.push({
        name: 'diary'
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
  padding: 1em;
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
</style>
