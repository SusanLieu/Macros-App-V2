<template>
<div id="updateprofile" class="background">
  <h2 class="heading centerTitle">
    <span class="heading-highlight">Update Profile Settings</span>
  </h2>
  <b-container>
        <b-row align-h="center">
          <b-col cols="6">
            <b-card class="p-3 shadow-sm">
              <div v-if="errorMessage" class="errorMessage">
                {{errorMessage}}
              </div>
              <b-form @submit="onSubmit">
                    <b-form-group label-cols-sm="3" id="profileInput" label="Age:" label-for="age"
                    >
                        <b-form-input
                        id="age"
                        v-model="profile.age"
                        type="number"
                        required
                        placeholder="Enter age"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="3" id="profileInput" label="Height:" label-for="height"
                    >
                        <b-form-input
                        id="height"
                        v-model="profile.height"
                        type="text"
                        required
                        placeholder="Enter height"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="profileInput" label="Weight:" label-for="weight">
                        <b-form-input
                        id="weight"
                        v-model="profile.weight"
                        type="text"
                        required
                        placeholder="Enter weight"
                        >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="profileInput" label="Gender:" label-for="gender">
                        <b-form-select
                        id="gender"
                        v-model="profile.gender"
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
                        v-model="profile.activityLevel"
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
  name: 'UpdateProfile',
  data() {
    return {
      profile: {},
      errorMessage: '',
      profile_id: this.$cookies.get('profile')
    }
  },
  created() {
    Api.get(`/profiles/${this.profile_id}`)
      .then(response => {
        this.profile = response.data
      })
      .catch(error => {
        this.errorMessage = error.response.data.message
      })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Api.patch(`/profiles/${this.profile_id}/`, this.profile)
        .then(response => {
          console.log(response.data)
          // set time out for router.push in order to display a message to the user e.g. "Registration successful!"
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
