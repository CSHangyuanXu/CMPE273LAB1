import api from 'api'
import { message } from 'antd';
import store from 'store'
const pathToRegexp = require("path-to-regexp")

const { getAllGoods } = api

export default {
    namespace: 'goodsList',
    state: {
        list: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/home']).exec(location.pathname)) {
                    const { type = '' } = location.query

                    if (!type) {
                        dispatch({
                            type: "getAllGoods",
                            payload: {}
                        })
                    }
                }
            })
        },
    },
    effects: {
        *getAllGoods({ payload }, { put, call, select }) {
            const data = yield call(getAllGoods, payload)
            if (data.success) {
                yield put({
                    type: 'updateState',
                    payload: {
                        list: data.data
                    },
                })
            } else {
                throw data
            }
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}