import api from 'api'

const { registerUser } = api

export default {
    namespace: 'register',
    state: {},
    effects: {
        *register({ payload }, { put, call, select }) {
            const data = yield call(registerUser, payload)
            if (data.success) {
                console.log('=====>',data)
                return data.data
            } else {
                throw data
            }
        },
    },
}
