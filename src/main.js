// src/main.js

import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from "./App.vue";
import Router from "vue-router";

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');