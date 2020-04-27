import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: Cookies.get('score') != undefined ? Cookies.get('score') : 1, //генерация начального счета
        sum: 1, //сумма в инпуте
        chance: 80, //шанс в инпуте
        user: "Rouzy" //никнейм
    },
    mutations: {
        updateSum(state, newSum) {
            state.sum = Number(newSum)
        },
        updateChance(state, newChance) {
            state.chance = Number(newChance)
        },
        updateScore(state, newScore) {
            state.score = Number(newScore)
        }
    }
})
