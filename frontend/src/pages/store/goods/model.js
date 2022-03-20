import api from 'api'
import { message } from 'antd';
import store from 'store'
const pathToRegexp = require("path-to-regexp")

const { getUserStoreGoods, addUserStoreGoods, editUserStoreGoods } = api

export default {
    namespace: 'storeGoods',
    state: {
        list: []
    },
    effects: {
        *getUserStoreGoodsList({ payload }, { put, call, select }) {
            const data = yield call(getUserStoreGoods, payload)
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
        *addUserStoreGoodsList({ payload }, { put, call, select }) {
            const data = yield call(addUserStoreGoods, payload)
            if (data.success) {
                message.success('保存成功！');

                yield put({
                    type: 'getUserStoreGoodsList',
                    payload: {
                        store_id: payload.store_id,
                    },
                })

                return data.data
            } else {
                throw data
            }
        },
        *editUserStoreGoodsList({ payload }, { put, call, select }) {
            const data = yield call(editUserStoreGoods, payload)
            if (data.success) {
                message.success('保存成功！');

                yield put({
                    type: 'getUserStoreGoodsList',
                    payload: {
                        store_id: payload.store_id,
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