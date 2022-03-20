/* global window */

import { history } from 'umi'
const pathToRegexp = require("path-to-regexp")
import { message } from 'antd';
import store from 'store'

const goDashboard = () => {
    if (pathToRegexp(['/login']).exec(window.location.pathname)) {
        history.push({
            pathname: '/',
        })
    }
}

export default {
    namespace: 'app',
    state: {
        userInfo: null,
        isLogin: false
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'query' })
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const isLogin = store.get('isLogin');
            const userInfo = store.get('userInfo');

            if (isLogin) {
                yield put({
                    type: 'updateState',
                    payload: {
                        userInfo: userInfo,
                        isLogin: true
                    },
                })
                goDashboard();
                return
            }

            yield put({
                type: 'updateState',
                payload: {
                    userInfo: null,
                    isLogin: false
                },
            })
        },

        *signOut({ payload }, { call, put }) {
            store.set('isLogin', false);
            store.set('userInfo', null);

            yield put({
                type: 'updateState',
                payload: {
                    userInfo: null,
                    isLogin: false
                },
            })
            message.success("log out!")
            history.push({
                pathname: '/',
            })
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
