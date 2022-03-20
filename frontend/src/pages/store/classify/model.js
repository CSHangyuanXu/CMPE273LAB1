import api from 'api'
import { message } from 'antd';
import store from 'store'
const pathToRegexp = require("path-to-regexp")

const { getUserStoreClassify, addUserStoreClassify } = api

export default {
    namespace: 'storeClassify',
    state: {
        list: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/store/classify', '/store/goods']).exec(location.pathname)) {
                    const userInfo = store.get('userInfo') || {}
                    dispatch({
                        type: "getUserStoreClassifyList",
                        payload: {
                            user_id: userInfo.id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getUserStoreClassifyList({ payload }, { put, call, select }) {
            const data = yield call(getUserStoreClassify, payload)
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
        *addUserStoreClassifyList({ payload }, { put, call, select }) {
            const data = yield call(addUserStoreClassify, payload)
            if (data.success) {
                message.success('保存成功！');

                yield put({
                    type: 'getUserStoreClassifyList',
                    payload: {
                        user_id: payload.user_id,
                    },
                })

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