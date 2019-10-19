<template>
    <div id="diary" class="background">
      <h2 class="heading">
        <span class="heading-highlight">Diary</span>
      </h2>
        <b-container>
          <b-row class="text-center date">
            <b-col cols="1" offset="3">
              <b-button variant="link" style="color: #2c3e50;" class="text-decoration-none" @click="switchDate(subtract)"><i class="material-icons">
                arrow_back_ios
                </i></b-button>
            </b-col>
            <b-col cols="4">
              {{date}}
            </b-col>
            <b-col cols="1">
              <b-button variant="link" style="color: #2c3e50;" class="text-decoration-none" @click="switchDate(add)"><i class="material-icons">
                arrow_forward_ios
                </i></b-button>
            </b-col>
          </b-row>
          <b-row align-h="center" v-if="errorMessage" class="errorMessage">
            <b-col>{{errorMessage}}</b-col>
          </b-row>
            <b-row>
                <b-col sm="5">
                  <b-card class="shadow" header-class="diary-card" header-bg-variant="dark" header-text-variant ="white" border-variant="dark" header="Daily Summary" align="center">
                        <div id="progressBar">
                          <div class="row mb-2 mt-3">
                          <div class="col-lg-3">Calories:</div>
                          <div class="col-md-9 pt-1">
                              <b-progress :max="diet.calories" show-value animated>
                                <b-progress-bar :value="currentDietValues.calories">
                                 {{ currentDietValues.calories }} / {{ diet.calories }}
                                </b-progress-bar>
                              </b-progress>
                          </div>
                          </div>
                            <h5>Macros Split</h5>
                            <div class="row mb-1">
                            <div class="col-lg-3">Protein:</div>
                            <div class="col-md-9 pt-1">
                              <b-progress :max="macrosMaxInGrams.protein" show-value>
                                  <b-progress-bar variant="secondary" :value="currentDietValues.protein">
                                  {{ currentDietValues.protein }} / {{ macrosMaxInGrams.protein }}
                                  </b-progress-bar>
                                </b-progress>
                            </div>
                            </div>
                            <div class="row mb-1">
                            <div class="col-lg-3">Carbs:</div>
                            <div class="col-md-9 pt-1">
                              <b-progress :max="macrosMaxInGrams.carbs" show-value>
                                  <b-progress-bar variant="info" :value="currentDietValues.carbs">
                                  {{ currentDietValues.carbs }} / {{ macrosMaxInGrams.carbs }}
                                  </b-progress-bar>
                                </b-progress>
                            </div>
                            </div>
                            <div class="row mb-1">
                            <div class="col-lg-3">Fat:</div>
                            <div class="col-md-9 pt-1">
                              <b-progress :max="macrosMaxInGrams.fat" show-value>
                                  <b-progress-bar variant="warning" :value="currentDietValues.fat">
                                  {{ currentDietValues.fat }} / {{ macrosMaxInGrams.fat }}
                                  </b-progress-bar>
                                </b-progress>
                            </div>
                          </div>
                        </div>
                        <div class="text-left">
                          <b-row>
                            <b-col><strong><h4>Remaining</h4></strong></b-col>
                            </b-row>
                            <b-row>
                              <b-col><strong>Calories:</strong> {{round((diet.calories - currentDietValues.calories), 1)}} kcal</b-col>
                              </b-row>
                            <b-row>
                              <b-col><strong>Protein:</strong> {{round((macrosMaxInGrams.protein - currentDietValues.protein), 1)}}g</b-col>
                              </b-row>
                            <b-row>
                              <b-col><strong>Carbs:</strong> {{round((macrosMaxInGrams.carbs - currentDietValues.carbs), 1)}}g</b-col>
                              </b-row>
                            <b-row>
                              <b-col><strong>Fat:</strong> {{round((macrosMaxInGrams.fat - currentDietValues.fat), 1)}}g</b-col>
                              </b-row>
                        </div>
                  </b-card>
                </b-col>
                <b-col sm="7">
                  <b-card class="shadow mb-4" border-variant="dark" align="center">
                   <template v-slot:header header="Meals" header-class="text-left">
                    <div class="float-left diary-card">Meals</div>
                    <router-link :to="{ name: 'meal', params: {date: date} }" class="router-link-color"><i class="material-icons md-28 icon float-right">add_circle</i></router-link>
                  </template>
                  <b-row>
                     <b-col><h5>Breakfast</h5></b-col>
                  </b-row>
                    <b-row class="text-left" v-for="meal in breakfastMeals" :key="meal._id">
                      <b-col>
                        <b-button type="button" class="close" @click="deleteMeal(meal._id)">&times;</b-button>
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                      </b-col>
                    </b-row>
                    <hr>
                    <h5>Lunch</h5>
                    <div class="text-left" v-for="meal in lunchMeals" :key="meal._id">
                        <b-button type="button" class="close" @click="deleteMeal(meal._id)">&times;</b-button>
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                    </div>
                    <hr>
                    <h5>Dinner</h5>
                    <div class="text-left" v-for="meal in dinnerMeals" :key="meal._id">
                        <b-button type="button" class="close" @click="deleteMeal(meal._id)">&times;</b-button>
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                    </div>
                    <hr>
                    <h5>Snack</h5>
                    <div class="text-left" v-for="meal in snackMeals" :key="meal._id">
                      <b-button type="button" class="close" @click="deleteMeal(meal._id)">&times;</b-button>
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                    </div>
                  </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'
import moment from 'moment'

export default {
  name: 'Diary',
  data() {
    return {
      date: moment().format('dddd MMMM Do YYYY'),
      add: 'add',
      subtract: 'subtract',
      errorMessage: '',
      diet: {},
      breakfastMeals: [],
      lunchMeals: [],
      dinnerMeals: [],
      snackMeals: [],
      macrosMaxInGrams: {
        protein: 0,
        carbs: 0,
        fat: 0
      },
      currentDietValues: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      },
      remaining: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      },
      dietId: this.$cookies.get('diet'),
      accountId: this.$cookies.get('account')
    }
  },
  created() {
    // mounted if it doesn't work
    localStorage.setItem('access_token', this.accountId)
    this.$bus.$emit('logged', 'User logged')
    this.getMeals()
    this.getDiet()
  },
  methods: {
    switchDate(change) {
      var currentDate = this.date
      if (change === 'add') {
        this.date = moment(currentDate, 'dddd MMMM Do YYYY').add(1, 'days').format('dddd MMMM Do YYYY')
      }
      if (change === 'subtract') {
        this.date = moment(currentDate, 'dddd MMMM Do YYYY').subtract(1, 'days').format('dddd MMMM Do YYYY')
      }
      this.getMeals()
    },
    getMeals() {
      this.breakfastMeals = []
      this.lunchMeals = []
      this.dinnerMeals = []
      this.snackMeals = []
      // date = cookies date OR this.date, then response is to delete cookies until cookies is set again when adding meal
      this.date = this.$cookies.get('date') || this.date
      Api.get(`/accounts/${this.accountId}/meals?filter=${this.date}`)
        .then(response => {
            this.filterMeals(response.data.meals)
            this.calculateCurrent(response.data.meals)
            this.$cookies.remove('date')
        })
        .catch(error => {
            this.errorMessage = error.response.data.message
        })
    },
    getDiet() {
      Api.get(`/diets/${this.dietId}`)
        .then(response => {
            this.diet = response.data
            this.getMacrosMax(response.data)
        })
        .catch(error => {
            this.errorMessage = error.response.data.message
        })
    },
    filterMeals(meals) {
      for (var i = 0; i < meals.length; i++) {
        if (meals[i].mealType === 'breakfast') {
          this.breakfastMeals.push(meals[i])
        }
        if (meals[i].mealType === 'lunch') {
          this.lunchMeals.push(meals[i])
        }
        if (meals[i].mealType === 'dinner') {
          this.dinnerMeals.push(meals[i])
        }
        if (meals[i].mealType === 'snack') {
          this.snackMeals.push(meals[i])
        }
      }
    },
    getMacrosMax(diet) {
      this.macrosMaxInGrams.protein = this.round((((diet.protein / 100) * diet.calories) / 4), 1)
      this.macrosMaxInGrams.carbs = this.round((((diet.carbs / 100) * diet.calories) / 4), 1)
      this.macrosMaxInGrams.fat = this.round((((diet.fat / 100) * diet.calories) / 9), 1)
    },
    calculateCurrent(meals) {
      var caloriesValue = 0
      var proteinValue = 0
      var carbsValue = 0
      var fatValue = 0
      meals.forEach(meal => {
        caloriesValue += meal.calories
        proteinValue += meal.protein
        carbsValue += meal.carbs
        fatValue += meal.fat
      })
      this.currentDietValues = {
        calories: this.round(caloriesValue, 1),
        protein: this.round(proteinValue, 1),
        carbs: this.round(carbsValue, 1),
        fat: this.round(fatValue, 1)
      }
    },
    deleteMeal(mealid) {
      if (confirm('Are you sure?')) {
        Api.delete(`/meals/${mealid}`)
            .then(response => {
            this.deleteFromDiary(response.data)
            this.alterCurrentDietValues(response.data)
            })
            .catch(error => {
            this.errorMessage = error.response.data.message
            })
      }
    },
    deleteFromDiary(deletedMeal) {
      if (deletedMeal.mealType === 'breakfast') {
        var index = this.breakfastMeals.findIndex(meal => meal._id === deletedMeal._id)
        this.breakfastMeals.splice(index, 1)
      }
      if (deletedMeal.mealType === 'lunch') {
        var index = this.lunchMeals.findIndex(meal => meal._id === deletedMeal._id)
        this.lunchMeals.splice(index, 1)
      }
      if (deletedMeal.mealType === 'dinner') {
        var index = this.dinnerMeals.findIndex(meal => meal._id === deletedMeal._id)
        this.dinnerMeals.splice(index, 1)
      }
      if (deletedMeal.mealType === 'snack') {
        var index = this.snackMeals.findIndex(meal => meal._id === deletedMeal._id)
        this.snackMeals.splice(index, 1)
      }
    },
    alterCurrentDietValues(meal) {
      this.currentDietValues.calories = this.round((this.currentDietValues.calories - meal.calories), 1)
      this.currentDietValues.protein = this.round((this.currentDietValues.protein - meal.protein), 1)
      this.currentDietValues.carbs = this.round((this.currentDietValues.carbs - meal.carbs), 1)
      this.currentDietValues.fat = this.round((this.currentDietValues.fat - meal.fat), 1)
    },
    round(value, precision) {
      var multiplier = Math.pow(10, precision || 0)
      return Math.round(value * multiplier) / multiplier
    }
  }
}
</script>

<style>
#diary {
  text-align: center;
}

#progressBar {
    padding-bottom: 3em;
}

h5 {
    padding-top: 1em;
}

.date {
  padding-bottom: 1.2em;
  margin-top: -0.5em;
  font-size: 1.5em;
  font-weight: 600;
}

.icon {
  display: flex;
  justify-content: center;
}

.diary-card {
  font-weight: bold;
  font-size: 1.2em;
}

.material-icons.md-28 {
  font-size: 28px;
}

.router-link-color {
  color: #2c3e50;
}
</style>
