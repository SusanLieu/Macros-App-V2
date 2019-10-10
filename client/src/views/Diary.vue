<template>
    <div id="home">
        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col cols="5">
                        <div id="progressBar">
                            <b-progress :value="value" :max="diet.calories" show-progress animated></b-progress>
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
    }
}
</script>

<style>
#progressBar {
    padding-bottom: 3em;
}
</style>