import api from 'api'
import { message } from 'antd';
import store from 'store'
const pathToRegexp = require("path-to-regexp")

const { getUserStoreInfo, editUserStoreInfo, addUserStoreInfo,queryStoreName } = api

export default {
    namespace: 'storeInfo',
    state: {
        isOpen: false,
        storeInfo: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/store/info', '/store/classify', '/store/goods']).exec(location.pathname)) {
                    const userInfo = store.get('userInfo') || {}
                    dispatch({
                        type: "getUserStoreInfo",
                        payload: {
                            user_id: userInfo.id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getUserStoreInfo({ payload }, { put, call, select }) {
            const data = yield call(getUserStoreInfo, payload)
            if (data.success) {
                yield put({
                    type: 'updateState',
                    payload: {
                        isOpen: data.isOpen,
                        storeInfo: data.data,
                    },
                })
            } else {
                throw data
            }
        },
        *addUserStoreInfo({ payload }, { put, call, select }) {
            const data = yield call(addUserStoreInfo, payload)
            if (data.success) {
                message.success('saved！');

                yield put({
                    type: 'getUserStoreInfo',
                    payload: {
                        user_id: payload.user_id,
                    },
                })

                return data.data
            } else {
                throw data
            }
        },
        *editUserStoreInfo({ payload }, { put, call, select }) {
            const data = yield call(editUserStoreInfo, payload)
            if (data.success) {
                message.success('saved！');

                yield put({
                    type: 'updateState',
                    payload: {
                        storeInfo: data.data,
                    },
                })

                return data.data
            } else {
                throw data
            }
        },
        *queryStoreName({ payload }, { put, call, select }) {
            const data = yield call(queryStoreName, payload)
            if (data.success) {
                message.success(data.msg)
                return data.data
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