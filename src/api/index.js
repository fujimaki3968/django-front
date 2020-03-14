import axios from 'axios'

import questions from './questions'
import auth from './auth'

const client = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
});

client.questions = questions(client);
client.auth = auth(client);

client.install = function (Vue) {
    Object.defineProperty(Vue.prototype, '$request', {
        get() {
            return client
        },
    })
};

export default client