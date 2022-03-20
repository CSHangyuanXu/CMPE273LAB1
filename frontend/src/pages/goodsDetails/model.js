import api from 'api'
import { message } from 'antd';
const pathToRegexp = require("path-to-regexp")

const { getGoodsDetails,addUserCollection,addUserCart } = api

export default {
    namespace: 'goodsDetails',
    state: {
        details: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/goodsDetails']).exec(location.pathname)) {
                    const { id } = location.query
                    dispatch({
                        type: "getGoodsDetails",
                        payload: {
                            id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getGoodsDetails({ payload }, { put, call, select }) {
            const data = yield call(getGoodsDetails, payload)
            if (data.success) {
                yield put({
                    type: 'updateState',
                    payload: {
                        details: data.data,
                    },
                })
            } else {
                throw data
            }
        },
        *addUserCollection({ payload }, { put, call, select }) {
            const data = yield call(addUserCollection, payload)
            if (data.success) {
                message.success('收藏成功！')
                return data.data
            } else {
                throw data
            }
        },
        *addUserCart({ payload }, { put, call, select }) {
            const data = yield call(addUserCart, payload)
            if (data.success) {
                message.success('加入购物车成功！')
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