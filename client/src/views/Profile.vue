<template>
    <div id="profile" class="background">
      <h2 class="heading centerTitle">
        <span class="heading-highlight">Profile</span>
      </h2>
        <b-container>
              <b-row align-h="center">
                <b-col cols="8">
                  <b-card class="p-3 shadow-sm">
                    <div v-if="errorMessage" class="errorMessage">
                      {{errorMessage}}
                    </div>
                    <b-form @submit="onSubmit">
                    <b-form-group label-cols-sm="3" id="profileInput" :invalid-feedback="invalidFeedback" :state="state" label="Age:" label-for="age"
                    >
                        <b-form-input
                        id="age"
                        v-model="form.age"
                        type="number"
                        required
                        :state="state"
                        placeholder="Enter age"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="3" id="profileInput" label="Height:" label-for="height"
                    >
                        <b-form-input
                        id="height"
                        v-model="form.height"
                        type="number"
                        required
                        placeholder="Enter height (cm)"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="profileInput" label="Weight:" label-for="weight">
                        <b-form-input
                        id="weight"
                        v-model="form.weight"
                        type="number"
                        required
                        placeholder="Enter weight (kg)"
                        >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="profileInput" label="Gender:" label-for="gender">
                        <b-form-select
                        id="gender"
                        v-model="form.gender"
                        :value="null"
                        :options="{ 'male': 'Male', 'female': 'Female' }"
                        required
                        >
                          <template v-slot:first>
                            <option :value="null">Choose...</option>
                          </template>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="profileInput" label="Activity level:" label-for="activityLevel">
                        <b-form-select
                        id="activityLevel"
                        v-model="form.activityLevel"
                        :value="null"
                        :options="{ 'sedentary': 'Sedentary', 'light': 'Light', 'moderate': 'Moderate', 'active': 'Active', 'very active': 'Very active' }"
                        required
                        >
                          <template v-slot:first>
                            <option :value="null">Choose...</option>
                          </template>
                        </b-form-select>
                    </b-form-group>
                    <div class="text-right">
                    <b-button type="submit" pill variant="outline-primary">Next</b-button>&nbsp;
                    <b-button id="cancel-button" type="button" pill variant="outline-danger" @click="deleteAccount()">Cancel</b-button>
                    <b-tooltip target="cancel-button" placement="bottom">
                    <strong>Warning!</strong> Profile must be filled out in order to complete registration
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
  name: 'Profile',
  data() {
    return {
      message: '',
      form: {
        age: '',
        height: '',
        weight: '',
        gender: '',
        activityLevel: ''
      },
      errorMessage: '',
      accountId: this.$cookies.get('new_account')
    }
  },
  computed: {
    state() {
      return this.form.age <= 120 && this.form.age >= 1 ? true : false
    },
    invalidFeedback() {
      if (this.form.age <= 120 && this.form.age >= 1) {
        return ''
      } else {
        return 'Enter a number between 1 - 120'
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Api.post(`/accounts/${this.accountId}/profiles`, this.form)
        .then(response => {
          alert('Registered profile successfully')
          this.$cookies.set('new_profile', response.data.profile)
          this.$router.push({
            name: 'diet'
          })
        })
        .catch(error => {
          this.errorMessage = error.response.data.message
        })
    },
    deleteAccount() {
      Api.delete(`/accounts/${this.accountId}`)
        .then(response => {
          console.log(response.data)
          this.$router.push({
            name: 'home'
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
#profile {
  text-align: left;
}
</style>
