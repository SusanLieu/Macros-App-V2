<template>
  <div id="meal" class="background">
      <h2 class="heading centerTitle">
      <span class="heading-highlight">Add a meal</span>
    </h2>
      <b-container>
        <b-row align-h="center">
          <b-col cols="9">
            <b-card class="p-3 shadow-sm">
              <div v-if="errorMessage" class="errorMessage">
                {{errorMessage}}
              </div>
              <b-row no gutters>
                <b-col md="8">
              <b-form>
                <b-form-group label-cols-sm="2" id="mealInput" label="Meal:" label-for="mealType"
              >
                  <b-form-select
                  id="mealType"
                  v-model="mealType"
                  :value="null"
                  :options="{ 'breakfast': 'Breakfast', 'lunch': 'Lunch', 'dinner': 'Dinner', 'snack': 'Snack' }"
                  required
                  >
                  <template v-slot:first>
                    <option :value="null">Choose...</option>
                  </template>
                  </b-form-select>
              </b-form-group>
              <b-form-group label-cols-sm="2" id="mealInput" label="Search:" label-for="search"
                  >
              <model-list-select
                :list="options"
                v-model="objectItem"
                option-value="_id"
                option-text="name"
                id="mySelectId"
                name="mySelectName"
                placeholder="Select ingredient"
              >
              </model-list-select>
              </b-form-group>

              <b-form-group label-cols-sm="2" id="mealInput" label="Amount:" label-for="amount"
                    >
                <b-form-input
                id="amount"
                v-model="amount"
                type="number"
                required
                placeholder="Enter amount in grams"
                ></b-form-input>
              </b-form-group>

                <div v-if="amount" class="flex-result">
                <h5>Macronutrients Breakdown per {{amount}}g</h5>
                <table class="ui celled table">
                  <thead>
                  <tr>
                    <th>Calories (kcal)</th>
                    <th>Protein (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fat (g)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{{round((objectItem.calories * amount), 1)}}</td>
                    <td>{{round((objectItem.protein * amount), 1)}}</td>
                    <td>{{round((objectItem.carbs * amount), 1)}}</td>
                    <td>{{round((objectItem.fat * amount), 1)}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <b-button v-if="amount && mealType && objectItem.calories" size="sm" @click="addIngredient">Add to Ingredients List</b-button>
              <div>
                <b-button class="mt-5 float-right" type="button" pill variant="outline-danger" router-link :to="{name: 'diary'}">Cancel</b-button>
              </div>
            </b-form>
                </b-col>
                <b-col style="background-color: #f5f3ed" md="4">
                  <h5 class="text-center">Your Ingredients List</h5>
                  <div id="addedIngredients" v-for="(ingredient, index) in mealIngredients" :key="index">
                  <strong>{{ingredient.amount}}g {{ingredient.name}}</strong><br>
                    Calories: {{ingredient.calories}}kcal<br>
                    Protein: {{ingredient.protein}}g<br>
                    Carbs: {{ingredient.carbs}}g<br>
                    Fat: {{ingredient.fat}}g<br>
                    <hr>
                  </div>
                  <div v-if="mealSum.calories">
                  <strong>Total</strong><br>
                  Calories: {{mealSum.calories}}
                  Protein: {{mealSum.protein}}
                  Carbs: {{mealSum.carbs}}
                  fat: {{mealSum.fat}}<br>
                  <b-button @click="addToDiary(mealIngredients)" class="mb-3 mt-1" size="sm">Add to diary</b-button>
                  </div>
                </b-col>
              </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import { ModelListSelect } from 'vue-search-select'

export default {
  name: 'Meal',
  components: {
    ModelListSelect
  },
  data() {
    return {
      mealType: '',
      amount: '',
      mealIngredients: [],
      mealSum: {
        calories: null,
        protein: null,
        carbs: null,
        fat: null
      },
      options: [],
      objectItem: {
        _id: '',
        name: '',
        calories: null,
        protein: null,
        carbs: null,
        fat: null
      },
      errorMessage: ''
    }
  },
  created() {
    this.getIngredients()
  },
  methods: {
    getIngredients() {
      Api.get(`/ingredients`)
      .then(response => {
        this.options = response.data.ingredients
      })
      .catch(error => {
        console.log(error)
      })
    },
    addIngredient() {
      this.mealIngredients.push({
      name: this.objectItem.name,
      mealType: this.mealType,
      amount: this.amount,
      calories: this.round((this.objectItem.calories * this.amount), 1),
      protein: this.round((this.objectItem.protein * this.amount), 1),
      carbs: this.round((this.objectItem.carbs * this.amount), 1),
      fat: this.round((this.objectItem.fat * this.amount), 1),
      date: this.$route.params.date
      })
      this.getMealSum(this.mealIngredients)
      this.amount = null
      this.mealType = ''
      this.objectItem = {}
    },
    getMealSum(ingredients) {
      var caloriesSum = 0
      var proteinSum = 0
      var carbsSum = 0
      var fatSum = 0
      for (var i = 0; i < ingredients.length; i++) {
        caloriesSum += ingredients[i].calories
        proteinSum += ingredients[i].protein
        carbsSum += ingredients[i].carbs
        fatSum += ingredients[i].fat
      }
      this.mealSum = {
        calories: this.round(caloriesSum, 1),
        protein: this.round(proteinSum, 1),
        carbs: this.round(carbsSum, 1),
        fat: this.round(fatSum, 1)
      }
    },
    addToDiary(mealIngredients) {
      var diary_id = this.$cookies.get('diary')
      mealIngredients.forEach(mealIngredient => {
        Api.post(`/diaries/${diary_id}/meals`, mealIngredient)
        .then (response => {
          this.$cookies.set('date', response.data.date)
        })
        .catch(error => {
        this.errorMessage = error.response.data.message
        })
      })
      setTimeout(() => {
        this.$router.push({
        name: 'diary'
        })
      }, 500)
    },
    round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
    }
  }
}
</script>

<style scoped>

</style>
