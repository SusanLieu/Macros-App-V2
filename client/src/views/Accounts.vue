<template>
  <div id="accounts">
    <h2 class="mt-5 heading">Choose your account</h2>
    <!-- <b-button type="button" class="createButton" @click="createAccount()">Create Account</b-button> -->
    <b-container class="mt-3" v-for="account in accounts" :key="account._id">
      <b-row>
        <b-col id="accountList" md="4" offset-md="4">
          <b-card class="px-4">
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

<style scoped>
#accounts {
  text-align: center;
}

#accountList a {
  color: #2c3e50;
}

.heading {
  padding-bottom: 40px;
}
</style>
