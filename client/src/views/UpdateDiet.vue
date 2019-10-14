<template>
<div id="updatediet" class="background">
  <h2 class="heading centerTitle">
    <span class="heading-highlight">Update Diet Settings</span>
  </h2>
  <b-container>
        <b-row align-h="center">
          <b-col cols="6">
            <b-card class="p-3 shadow-sm">
              {{diet}}
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
  name: 'UpdateDiet',
  data() {
    return {
      diet: {}
    }
  },
  created() {
    var diet_id = this.$cookies.get('diet')
    Api.get(`/diets/${diet_id}`)
      .then(response => {
        this.diet = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
