import api from 'api'
import { message } from 'antd';
import store from 'store'
const pathToRegexp = require("path-to-regexp")

const { getUserOrder } = api

export default {
    namespace: 'userOrder',
    state: {
        list: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/user/order']).exec(location.pathname)) {
                    const userInfo = store.get('userInfo') || {}
                    dispatch({
                        type: "getUserOrder",
                        payload: {
                            user_id: userInfo.id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getUserOrder({ payload }, { put, call, select }) {
            const data = yield call(getUserOrder, payload)
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