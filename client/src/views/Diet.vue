<template>
    <div id="diet" class="background">
        <b-container>
              <b-row align-h="center" class="mt-5">
                <b-col cols="6">
                  <b-card class="p-3">
                    <h3 class="mb-4 formTitle">Your diet settings</h3>
                    <h5>Your maintenance calories: {{ getCalories }}</h5>
                    <p>This calculation is based on the previous information entered from your profile.</p>
                    <b-form @submit="onSubmit">
                    <b-form-group label-cols-sm="3" id="dietInput" label="Goal calories:" label-for="calories"
                    >
                        <b-form-input
                        id="calories"
                        v-model="form.calories"
                        type="number"
                        required
                        placeholder="Enter calories"
                        ></b-form-input>
                    </b-form-group>

                    <!-- Add macros headers -->

                    <b-form-group label-cols-sm="3" id="dietInput" label="Protein:" label-for="protein"
                    >
                        <b-form-input
                        id="protein"
                        v-model="form.protein"
                        type="number"
                        required
                        placeholder="Enter protein percentage"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="dietInput" label="Carbs:" label-for="carbs">
                        <b-form-input
                        id="carbs"
                        v-model="form.carbs"
                        type="number"
                        required
                        placeholder="Enter carbohydrate percentage"
                        >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="dietInput" label="Fat:" label-for="fat">
                        <b-form-input
                        id="fat"
                        v-model="form.fat"
                        type="number"
                        required
                        placeholder="Enter fat percentage"
                        >
                        </b-form-input>
                    </b-form-group>
                    <div class="text-right">
                    <b-button type="submit" pill variant="outline-primary">Next</b-button>&nbsp;
                    <b-button type="button" pill variant="outline-danger" router-link to="/">Cancel</b-button>
                    <!-- ADD function for pop up "Diet must be filled out in order to complete account creation. Are you sure you want to cancel?"
                    If "Yes" delete account and redirect to home page, if "No, continue" bring back to page -->
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
  name: 'Diet',
  data() {
      return {
          form: {
              calories: '',
              protein: '',
              carbs: '',
              fat: ''
          }
      }
  },
  computed: {
    getCalories() {
      var profile = this.$cookies.get('profile')
      var weight = profile.weight
      var height = profile.height
      var age = profile.age
      var activityLevel = this.getActivityLevel()
      if (profile.gender === 'female'){
        var bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
      } else {
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
      }
      return parseInt(bmr * activityLevel)
    }
  },
    methods: {
    getActivityLevel() {
      var profile = this.$cookies.get('profile')
      if (profile.activityLevel === 'sedentary') {
      return 1.2 }
      if (profile.activityLevel === 'light') {
      return 1.375 }
      if (profile.activityLevel === 'moderate') {
      return 1.55 }
      if (profile.activityLevel === 'active') {
      return 1.725 }
      if (profile.activityLevel === 'very active') {
      return 1.9 }
    },
    onSubmit(evt) {
    evt.preventDefault()
    var account_id = this.$cookies.get('accountId')
    Api.post(`/accounts/${account_id}/diets`, this.form)
    .then(response => {
      alert('Registered diet settings successfully')
    })
      .catch(error => {
        console.log(error)
        alert("Something went wrong.")
      })
    Api.post(`/accounts/${account_id}/diaries`)
    .then(response => {
      alert('Created diary')
      this.$router.push({
      name: 'accounts'
      })
    })
    .catch(error => {
      console.log(error)
      alert("Something with diary went wrong")
    })
    }
  }
}
</script>

<style scoped>
#diet {
    text-align: left;
}
</style>