<template>
    <div id="home">
        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col cols="5">
                        <div id="progressBar">
                            <b-progress :value="value" :max="diet.calories" show-value animated></b-progress>
                            <b-progress class="mt-2" :max="diet.calories" show-value>
                            <b-progress-bar :value="value * (6 / 10)" variant="success"></b-progress-bar>
                            <b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar>
                            <b-progress-bar :value="value * (1.5 / 10)" variant="danger"></b-progress-bar>
                            </b-progress>
                        </div>
                        <div>
                            <strong>Calories:</strong> {{diet.calories}} kcal<br>
                            <strong>Protein:</strong> g<br>
                            <strong>Carbohydrates:</strong> g<br>
                            <strong>Fat:</strong> g
                        </div>
                </b-col>
                <b-col cols="7">
                    <h3>Meals</h3>   
                     <h5>Breakfast</h5>
                    <div id="align-left" v-for="meal in breakfastMeals" :key="meal._id">
                        Meal type: {{ meal.mealType }}<br>
                        Meal date: {{ meal.date }}
                    </div>
                    <h5>Lunch</h5>
                    <div id="align-left" v-for="lunchMeal in lunchMeals" :key="lunchMeal._id">
                        Meal type: {{ lunchMeal.mealType }}<br>
                        Meal date: {{ lunchMeal.date }}
                    </div>
                    <h5>Dinner</h5>
                    <div id="align-left" v-for="dinnerMeal in dinnerMeals" :key="dinnerMeal._id">
                        Meal type: {{ dinnerMeal.mealType }}<br>
                        Meal date: {{ dinnerMeal.date }}
                    </div>
                    <h5>Snack</h5>
                    <div id="align-left" v-for="snackMeal in snackMeals" :key="snackMeal._id">
                        Meal type: {{ snackMeal.mealType }}<br>
                        Meal date: {{ snackMeal.date }}
                    </div>
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
            value: 450
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
        Api.get(`diaries/`+ this.$route.params.diary_id + `/meals`)
        .then(response => {
            this.filterMeals(response.data.meals)
        })
        .catch(error => {
            console.log(error)
        })
    },
    methods: {
        filterMeals(meals){
            for (var i = 0; i < meals.length; i++){
                if(meals[i].mealType === 'breakfast'){
                    this.breakfastMeals.push(meals[i])
                }
                if(meals[i].mealType === 'lunch'){
                    this.lunchMeals.push(meals[i])
                }
                if(meals[i].mealType === 'dinner'){
                    this.dinnerMeals.push(meals[i])
                }
                if(meals[i].mealType === 'snack'){
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

#align-left {
    text-align: left;
}

h5 {
    padding-top: 1em;
}
</style>