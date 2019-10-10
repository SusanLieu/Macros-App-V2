<template>
  <div id="accounts">
    <h2 class="mt-5 heading">Choose your account</h2>
    <!-- <b-button type="button" class="createButton" @click="createAccount()">Create Account</b-button> -->
    <b-container class="mt-3" v-for="account in accounts" :key="account._id">
      <b-row>
        <b-col md="4" offset-md="4">
            <b-list-group id="accountList">
            <router-link :to="{ name: 'diary', params: {diary_id: account.diary, diet_id: account.diet} }">
              <strong>{{ account.email }}</strong>
              <b-button type="button" class="close" @click="deleteAccount(account._id)">&times;</b-button><br>
              {{ account.name }} 
            </router-link>
            </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AccountItem from '@/components/AccountItem'

export default {
  name: 'Accounts',
  components: {
    AccountItem
  },
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
#accountList a {
  color: #2c3e50;
  text-align: left;
}

.heading {
  padding-bottom: 40px;
}
</style>