<template>
    <div id="profile" class="background">
        <b-container>
              <b-row align-h="center" class="mt-5">
                <b-col cols="6">
                  <b-card class="p-3">
                    <h3 class="mb-4 formTitle">Profile</h3>

                    <b-form @submit="onSubmit">
                    <b-form-group label-cols-sm="3" id="profileInput" label="Age:" label-for="age"
                    >
                        <b-form-input
                        id="age"
                        v-model="form.age"
                        type="number"
                        required
                        placeholder="Enter age"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="3" id="profileInput" label="Height:" label-for="height"
                    >
                        <b-form-input
                        id="height"
                        v-model="form.height"
                        type="text"
                        required
                        placeholder="Enter height"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="profileInput" label="Weight:" label-for="weight">
                        <b-form-input
                        id="weight"
                        v-model="form.weight"
                        type="text"
                        required
                        placeholder="Enter weight"
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
                    <b-button type="button" pill variant="outline-danger" router-link to="/">Cancel</b-button>
                    <!-- ADD function for pop up "Profile must be filled out in order to complete account creation. Are you sure you want to cancel?"
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
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      var account_id = this.$cookies.get('accountId')
      Api.post(`/accounts/${account_id}/profiles`, this.form)
        .then(response => {
          alert('Registered profile successfully')
          this.$router.push({
            name: 'diet'
          })
        })
        .catch(error => {
          console.log(error)
          alert('Something went wrong.')
        })
        .then(() => {
          // This code is always executed (after success or error).
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
