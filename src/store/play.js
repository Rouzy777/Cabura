import firebase from 'firebase/app'

export default {
    actions: {
        async updateBill({commit, dispatch}, {bill}) {
            try {
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info/`).update({bill})
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
