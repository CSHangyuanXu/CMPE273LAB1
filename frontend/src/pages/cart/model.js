import api from 'api'
import { message } from 'antd';
import store from 'store'
import { history } from 'umi'
const pathToRegexp = require("path-to-regexp")

const { getUserCart, editUserCart, addUserOrder } = api

export default {
    namespace: 'cartList',
    state: {
        list: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/cart']).exec(location.pathname)) {
                    const userInfo = store.get('userInfo') || {}
                    dispatch({
                        type: "getUserCart",
                        payload: {
                            user_id: userInfo.id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getUserCart({ payload }, { put, call, select }) {
            const data = yield call(getUserCart, payload)
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
        *editUserCart({ payload }, { put, call, select }) {
            const data = yield call(editUserCart, payload)
            if (data.success) {
                const userInfo = store.get('userInfo') || {}

                yield put({
                    type: 'getUserCart',
                    payload: {
                        user_id: userInfo.id
                    },
                })
            } else {
                throw data
            }
        },
        *addUserOrder({ payload }, { put, call, select }) {
            const data = yield call(addUserOrder, payload)
            if (data.success) {
                message.success("submitted")

                history.push('/user/order')
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