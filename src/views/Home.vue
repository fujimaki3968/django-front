<template>
    <div>
        <v-container grid-list-lg>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="question in questions" :key="question.id">
                    <v-card class="white--text" dark>
                        <v-card-title primary-title>
                            <div>{{ question.questionText }}</div>
                        </v-card-title>
                        <v-card-text v-if="question.choices.length">
                            <v-radio-group v-model="vote">
                                <v-list v-for="choice in question.choices" :key="choice.id" class="text--white" style="position: relative">
                                    <v-radio :value="choice.id" :label="choice.choiceText"></v-radio>
                                    <v-chip color="primary" style="position: absolute; right: 10px; top: 8px">Votes:{{choice.votes}}</v-chip>
                                </v-list>
                            </v-radio-group>
                            <v-btn color="success">POST</v-btn>
                        </v-card-text>
                        <v-card-text>
                            <div>{{ question.pubDate|printDate }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        data() {
            return {
                vote: null,
                questions: [],
            }
        },

        name: "Home",
        methods: {
            fetchData() {
                axios.get('http://localhost:8000/api/questions/').then(res => {
                    this.questions = res.data.results
                })
            }
        },
        filters: {
            printDate(val) {
                return moment(val).locale('ja').format('YYYY年MM月DD日(ddd) HH時mm分ss秒')
            }
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style scoped>

</style>