import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const userId = await dispatch('getUserId')
                const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
                commit('setInfo', info)
            } catch(e) {
                console.log(e)
            }
        }
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    getters: {
        info: s => s.info
    }
}
