<template>
<div id="updateaccount" class="background">
  <h2 class="heading centerTitle">
    <span class="heading-highlight">Update Account Settings</span>
  </h2>
  <b-container>
        <b-row align-h="center">
          <b-col cols="6">
            <b-card class="p-3 shadow-sm">
              <div v-if="errorMessage" class="errorMessage">
                {{errorMessage}}
              </div>
              <b-form @submit="onSubmit">
                  <b-form-group id="registrationInput" label="Name:" label-for="name"
                  >
                      <b-form-input
                      id="name"
                      v-model="account.name"
                      type="text"
                      required
                      placeholder="Enter name"
                      ></b-form-input>
                  </b-form-group>

                  <b-form-group id="registrationInput" label="Email address:" label-for="email"
                  >
                      <b-form-input
                      id="email"
                      v-model="account.email"
                      type="email"
                      required
                      placeholder="Enter email"
                      ></b-form-input>
                  </b-form-group>
                <div class="text-right">
                <b-button type="submit" pill variant="outline-primary">Update</b-button>&nbsp;
                <b-button type="button" pill variant="outline-danger" router-link :to="{name: 'diary'}">Cancel</b-button>
              </div>
              </b-form>
            </b-card>
          </b-col>
      </b-row>
  </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'UpdateAccount',
  data() {
    return {
      account: {},
      errorMessage: '',
      account_id: this.$cookies.get('account')
    }
  },
  created() {
    Api.get(`/accounts/${this.account_id}`)
      .then(response => {
        this.account = response.data
      })
      .catch(error => {
        this.errorMessage = error.response.data.message
      })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Api.patch(`/accounts/${this.account_id}`, this.account)
      .then(response => {
        console.log(response.data)
        this.$router.push({
          name: 'diary'
        })
      })
      .catch(error => {
        this.errorMessage = error.response.data.message
      })
    }
  }
}
</script>

<style scoped>

</style>
