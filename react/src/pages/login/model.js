import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { loginUser } = api

export default {
    namespace: 'login',
    state: {},
    effects: {
        *login({ payload }, { put, call, select }) {
            const data = yield call(loginUser, payload)
            console.log(data)
            if (data.success) {
                
            } else {
                throw data
            }
        },
    },
}
