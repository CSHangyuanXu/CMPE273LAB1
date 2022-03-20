import api from 'api'
import { message } from 'antd';
const pathToRegexp = require("path-to-regexp")

const { getStoreDetails } = api

export default {
    namespace: 'storePageDetails',
    state: {
        details: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp(['/storePage']).exec(location.pathname)) {
                    const { id } = location.query
                    dispatch({
                        type: "getStoreDetails",
                        payload: {
                            id
                        }
                    })

                    dispatch({
                        type: "storeGoods/getUserStoreGoodsList",
                        payload: {
                            store_id: id
                        }
                    })
                }
            })
        },
    },
    effects: {
        *getStoreDetails({ payload }, { put, call, select }) {
            const data = yield call(getStoreDetails, payload)
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