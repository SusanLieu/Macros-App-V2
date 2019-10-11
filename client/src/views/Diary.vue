<template>
    <div id="diary" class="background">
        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col cols="5">
                  <b-card header-bg-variant="dark" header-text-variant ="white" border-variant="dark" header="Daily Summary" align="center">
                  <!-- <h3 style="padding-bottom: 1em;">Daily Summary</h3> -->
                        <div id="progressBar">
                          <div class="row mb-2 mt-3">
                          <!-- <h5 style="padding-top: 0em;">Calories</h5> -->
                          <div class="col-sm-3">Calories:</div>
                          <div class="col-sm-9 pt-1">
                            <b-progress :value="value" :max="diet.calories" show-value animated></b-progress>
                          </div>
                          </div>
                            <h5>Macros Split</h5>
                            <!-- <b-progress class="mt-2" :max="diet.calories" show-value>
                            <b-progress-bar :value="value * (6 / 10)" variant="success"></b-progress-bar>
                            <b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar>
                            <b-progress-bar :value="value * (1.5 / 10)" variant="danger"></b-progress-bar>
                            </b-progress> -->
                            <div v-for="bar in bars" :key="bar.name" class="row mb-1">
                              <div class="col-sm-3">{{ bar.name }}:</div>
                              <div class="col-sm-9 pt-1">
                                <b-progress :value="bar.value" :variant="bar.variant" :key="bar.variant" show-value></b-progress>
                              </div>
                            </div>
                        </div>
                        <div class="text-left">
                            <strong>Calories:</strong> {{diet.calories}} kcal<br>
                            <strong>Protein:</strong> g<br>
                            <strong>Carbs:</strong> g<br>
                            <strong>Fat:</strong> g
                        </div>
                  </b-card>
                </b-col>
                <b-col cols="7">
                  <b-card border-variant="dark" header="Meals" align="center">
                    <!-- <h3>Meals</h3> -->
                     <h5>Breakfast</h5>
                    <div class="text-left" v-for="meal in breakfastMeals" :key="meal._id">
                        Meal type: {{ meal.mealType }}<br>
                        Meal date: {{ meal.date }}
                    </div>
                    <hr>
                    <h5>Lunch</h5>
                    <div class="text-left" v-for="lunchMeal in lunchMeals" :key="lunchMeal._id">
                        Meal type: {{ lunchMeal.mealType }}<br>
                        Meal date: {{ lunchMeal.date }}
                    </div>
                    <hr>
                    <h5>Dinner</h5>
                    <div class="text-left" v-for="dinnerMeal in dinnerMeals" :key="dinnerMeal._id">
                        Meal type: {{ dinnerMeal.mealType }}<br>
                        Meal date: {{ dinnerMeal.date }}
                    </div>
                    <hr>
                    <h5>Snack</h5>
                    <div class="text-left" v-for="snackMeal in snackMeals" :key="snackMeal._id">
                        Meal type: {{ snackMeal.mealType }}<br>
                        Meal date: {{ snackMeal.date }}
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
  name: 'Diary',
  data() {
    return {
      diary: [],
      diet: [],
      breakfastMeals: [],
      lunchMeals: [],
      dinnerMeals: [],
      snackMeals: [],
      value: 450,
      bars: [
          { name: 'Protein', variant: 'secondary', value: 75 },
          { name: 'Carbs', variant: 'info', value: 75 },
          { name: 'Fat', variant: 'warning', value: 75 }
      ]
    }
  },
  created() {
    Api.get(`/diaries/` + this.$route.params.diary_id)
      .then(response => {
        this.diary = response.data
      })
      .catch(error => {
        console.log(error)
      })
    Api.get(`/diets/` + this.$route.params.diet_id)
      .then(response => {
        this.diet = response.data
      })
      .catch(error => {
        console.log(error)
      })
    Api.get(`diaries/` + this.$route.params.diary_id + `/meals`)
      .then(response => {
        this.filterMeals(response.data.meals)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
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
    }
  }
}
</script>

<style>
#progressBar {
    padding-bottom: 3em;
}

h5 {
    padding-top: 1em;
}

.background {
  background-color: #f0f5f5;
  background-size: cover; /* cover will scale the image so that the smallest dimension = the widest dimension of the box */
  background-position: center; /* vs the top-left that is default */
  position: absolute;
  width: 100%;
  height: 100%;
} 
</style>
