import Vue from 'vue'
import Vuex from 'vuex'
import client from "@/api";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
    isLoggedIn: false,
};

const voteState = {
    status: null,
    lastChoice: null,
};

const mutations = {
    loggedIn (state, token) {
        state.isLoggedIn = true;
        client.defaults.headers.common['Authorization'] = `JWT ${token}`;
        localStorage.setItem('token', token)
    },
    loggedOut (state) {
        state.isLoggedIn = false;
        delete client.defaults.headers.common['Authorization'];
        localStorage.clear()
    },
    voteLog (voteState, choiceId, status) {
        voteState.lastChoice = choiceId;
        voteState.lastChoice = status;
    }
};

const actions = {
    login ({commit}, [username, password]) {
        return client.auth.login(username, password).then(res => {
           commit('loggedIn', res.data.token);
           return res
        });
    },
    logout ({commit}) {
        commit('loggedOut')
    },
    tryLogin ({commit}) {
        const token = localStorage.getItem('token');
        if (token) {
            client.auth.verify(token).then(() => {
                commit('loggedIn', token)
            }, () => {
               localStorage.clear()
            })
        }
    },
    tryVote ({commit}, choiceId) {
        const token = localStorage.getItem('token');
        if (token) {
            client.questions.vote(choiceId, token).then( () => {
                commit('voteLog', choiceId, true);
            }, () => {
                commit('voteLog', choiceId, false);
                localStorage.clear()
            })
        }
    }
};

const getters = {
    isLoggedIn: state => state.isLoggedIn,
    votedLog: voteState => voteState.status,
};

export default new Vuex.Store({
    strict: debug,
    actions,
    getters,
    mutations,
    state,
    voteState,
})