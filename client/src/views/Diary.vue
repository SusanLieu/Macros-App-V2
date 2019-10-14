<template>
    <div id="diary" class="background">
      <h2 class="heading">
        <span class="heading-highlight">Diary/Intake Tracker</span>
      </h2>
        <b-container>
            <b-row align-h="center">
                <b-col cols="5">
                  <b-card class="shadow" header-class="diary-card" header-bg-variant="dark" header-text-variant ="white" border-variant="dark" header="Daily Summary" align="center">
                        <div id="progressBar">
                          <div class="row mb-2 mt-3">
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
                  <b-card class="shadow mb-4" border-variant="dark" align="center">
                   <template v-slot:header header="Meals" header-class="text-left">
                    <div class="float-left diary-card">Meals</div>
                    <router-link :to="{ name: 'meal' }" class="router-link-color"><i class="material-icons md-28 icon float-right">add_circle</i></router-link>
                  </template>
                     <h5>Breakfast</h5>
                    <div class="text-left" v-for="meal in breakfastMeals" :key="meal._id">
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                    </div>
                    <hr>
                    <h5>Lunch</h5>
                    <div class="text-left" v-for="meal in lunchMeals" :key="meal._id">
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                    </div>
                    <hr>
                    <h5>Dinner</h5>
                    <div class="text-left" v-for="meal in dinnerMeals" :key="meal._id">
                        <strong>{{meal.amount}}g {{ meal.name }}</strong><br>
                        Calories: {{ meal.calories }} Protein: {{meal.protein}} Carbs: {{meal.carbs}} Fat: {{meal.fat}}
                    </div>
                    <hr>
                    <h5>Snack</h5>
                    <div class="text-left" v-for="meal in snackMeals" :key="meal._id">
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

export default {
  name: 'Diary',
  data() {
    return {
      diary: {},
      diet: {},
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
    var diary_id = this.$cookies.get('diary')
    var diet_id = this.$cookies.get('diet')
    Api.get(`/diaries/${diary_id}`)
      .then(response => {
        this.diary = response.data
        localStorage.setItem('access_token', this.diary.account)
        this.$bus.$emit('logged', 'User logged')
      })
      .catch(error => {
        console.log(error)
      })
    Api.get(`/diets/${diet_id}`)
      .then(response => {
        this.diet = response.data
      })
      .catch(error => {
        console.log(error)
      })
    Api.get(`diaries/${diary_id}/meals`)
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
#diary {
  text-align: center;
}

#progressBar {
    padding-bottom: 3em;
}

h5 {
    padding-top: 1em;
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
/* .background {
  background-color: #f0f5f5;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
}  */
</style>
