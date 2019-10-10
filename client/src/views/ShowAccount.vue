<template>
<b-container>
  name: {{account.name}}
  email: {{account.email}}
</b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'ShowAccount',
  data() {
    return {
      account: []
    }
  },
  created() {
      Api.get(`/accounts/`+ this.$route.params.id)
      .then(response => {
        // cookies?
        this.account = response.data
      })
      .catch(error => {
          console.log(error)
      })
  }
}
</script>

<style>

</style>