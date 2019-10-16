<template>
    <div id="diet" class="background">
      <h2 class="heading centerTitle">
        <span class="heading-highlight">Diet settings</span>
      </h2>
        <b-container>
              <b-row align-h="center">
                <b-col cols="6">
                  <b-card class="p-3 shadow-sm">
                    <div v-if="errorMessage" class="errorMessage">
                      {{errorMessage}}
                    </div>
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
                    <div style="padding-bottom: 1em; padding-top: 1em; font-size: 1.2em; font-weight: 500">
                    Divide your macronutrients:
                    </div>
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
                    <b-button id="cancel-button" type="button" pill variant="outline-danger" @click="deleteProfile()">Cancel</b-button>
                    <b-tooltip target="cancel-button" placement="bottom">
                    <strong>Warning!</strong> Diet must be filled out in order to complete registration
                    </b-tooltip>
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
        calories: null,
        protein: null,
        carbs: null,
        fat: null
      },
      errorMessage: '',
      profile_id: this.$cookies.get('new_profile')._id,
      account_id: this.$cookies.get('new_account'),
      profile: {}
    }
  },
  created() {
    this.getProfile()
  },
  computed: {
    getCalories() {
      var weight = this.profile.weight
      var height = this.profile.height
      var age = this.profile.age
      var activityLevel = this.getActivityLevel()
      if (this.profile.gender === 'female') {
        var bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
      } else {
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
      }
      return parseInt(bmr * activityLevel)
    }
  },
  methods: {
    getProfile() {
      Api.get(`/accounts/${this.account_id}/profiles/${this.profile_id}`)
        .then(response => {
          this.profile = response.data.profile
        })
        .catch(error => {
          this.errorMessage = error.response.data.message
        })
    },
    getActivityLevel() {
      if (this.profile.activityLevel === 'sedentary') {
        return 1.2
      }
      if (this.profile.activityLevel === 'light') {
        return 1.375
      }
      if (this.profile.activityLevel === 'moderate') {
        return 1.55
      }
      if (this.profile.activityLevel === 'active') {
        return 1.725
      }
      if (this.profile.activityLevel === 'very active') {
        return 1.9
      }
    },
    onSubmit(evt) {
      evt.preventDefault()
      if (parseInt(this.form.protein) + parseInt(this.form.carbs) + parseInt(this.form.fat) !== 100){
        this.errorMessage = "Macronutrients split must add up to 100%"
      } else {
      Api.post(`/accounts/${this.account_id}/diets`, this.form)
        .then(response => {
          console.log('Diet registered successfully')
        })
        .catch(error => {
          this.errorMessage = error.response.data.message
        })
      Api.post(`/accounts/${this.account_id}/diaries`)
        .then(response => {
          alert('Created diary')
          // set time out for router.push in order to display a message to the user e.g. "Registration successful!"
          this.$router.push({
            name: 'accounts'
          })
        })
        .catch(error => {
          this.errorMessage = error.response.data.message
        })
      }
    },
    deleteProfile() {
      Api.delete(`/accounts/${this.account_id}/profiles/${this.profile_id}`)
        .then(response => {
          console.log(response.data)
          this.deleteAccount()
        })
        .catch(error => {
          this.errorMessag = error.response.data.message
        })
    },
    deleteAccount() {
      Api.delete(`/accounts/${this.account_id}`)
        .then(response => {
          console.log(response.data)
          this.$router.push({
            name: 'home'
          })
        })
        .catch(error => {
          this.errorMessag = error.response.data.message
        })
    }
  }
}
</script>

<style>
#diet {
    text-align: left;
}
</style>
