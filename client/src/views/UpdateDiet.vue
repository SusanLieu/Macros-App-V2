<template>
<div id="updatediet" class="background">
  <h2 class="heading centerTitle">
    <span class="heading-highlight">Update Diet Settings</span>
  </h2>
  <b-container>
        <b-row align-h="center">
          <b-col cols="6">
            <b-card class="p-3 shadow-sm">
              <div v-if="errorMessage" class="errorMessage">
                {{errorMessage}}
              </div>
              <b-form @submit="onSubmit">
                    <b-form-group label-cols-sm="3" id="dietInput" label="Goal calories:" label-for="calories"
                    >
                        <b-form-input
                        id="calories"
                        v-model="diet.calories"
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
                        v-model="diet.protein"
                        type="number"
                        required
                        placeholder="Enter protein percentage"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="dietInput" label="Carbs:" label-for="carbs">
                        <b-form-input
                        id="carbs"
                        v-model="diet.carbs"
                        type="number"
                        required
                        placeholder="Enter carbohydrate percentage"
                        >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" id="dietInput" label="Fat:" label-for="fat">
                        <b-form-input
                        id="fat"
                        v-model="diet.fat"
                        type="number"
                        required
                        placeholder="Enter fat percentage"
                        >
                        </b-form-input>
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
  name: 'UpdateDiet',
  data() {
    return {
      diet: {},
      errorMessage: '',
      diet_id:this.$cookies.get('diet')
    }
  },
  created() {
    Api.get(`/diets/${this.diet_id}`)
      .then(response => {
        this.diet = response.data
      })
      .catch(error => {
        this.errorMessage = error.response.data.message
      })
  },
  methods: {
    onSubmit(evt){
      evt.preventDefault()
      Api.patch(`diets/${this.diet_id}`, this.diet)
      .then(response => {
        console.log(response.data)
        this.$router.push({
          name: 'diary'
        })
      })
      .catch (error => {
        this.errorMessage = error.response.data.message
      })
    }
  }
}
</script>

<style scoped>

</style>
