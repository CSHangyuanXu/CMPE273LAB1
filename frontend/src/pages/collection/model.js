import api from 'api'
import { message } from 'antd';
import store from 'store'
const pathToRegexp = require("path-to-regexp")

const { getCollectionList,deleteCollectionList } = api

export default {
    namespace: 'collectionList',
    state: {
        list: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/collection']).exec(location.pathname)) {
                    const userInfo = store.get('userInfo') || {}
                    dispatch({
                        type: "getCollectionList",
                        payload: {
                            user_id: userInfo.id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getCollectionList({ payload }, { put, call, select }) {
            const data = yield call(getCollectionList, payload)
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
        *deleteCollectionList({ payload }, { put, call, select }) {
            const data = yield call(deleteCollectionList, payload)
            
            const userInfo = store.get('userInfo') || {}

            if (data.success) {
                message.success('deleted');

                yield put({
                    type: 'getCollectionList',
                    payload: {
                        user_id: userInfo.id
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