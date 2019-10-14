<template>
<div id="updateaccount" class="background">
  <h2 class="heading centerTitle">
    <span class="heading-highlight">Update Account Settings</span>
  </h2>
  <b-container>
        <b-row align-h="center">
          <b-col cols="6">
            <b-card class="p-3 shadow-sm">
              {{account}}
                <div class="text-right">
                <b-button type="submit" pill variant="outline-primary">Update</b-button>&nbsp;
                <b-button type="button" pill variant="outline-danger" router-link :to="{name: 'diary'}">Cancel</b-button>
              </div>
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
      account: {}
    }
  },
  created() {
    var account_id = this.$cookies.get('account')
    Api.get(`/accounts/${account_id}`)
      .then(response => {
        this.account = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
