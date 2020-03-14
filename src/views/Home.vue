<template>
    <div>
        <v-container grid-list-lg>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="question in questions" :key="question.id">
                    <v-card class="white--text" dark>
                        <v-card-title primary-title>
                            <div>{{ question.questionText }}</div>
                        </v-card-title>
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