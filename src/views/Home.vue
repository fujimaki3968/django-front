<template>
  <div>
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs6 v-for="data in questions" :key="data.id">
            <v-card class="white--text" dark>
              <v-card-title primary-title>
                <div>{{ data.questionText }}</div>
              </v-card-title>
              <v-card-text>
                <div>{{ data.pubDate }}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                questions: [],
            }
        },

        name: "Home",
        methods: {
          fetchData () {
            axios.get('http://localhost:8000/api/questions/').then(res => {
              this.questions = res.data.results
            })
          }
        },
        mounted() {
          this.fetchData()
        }
    }
</script>

<style scoped>

</style>