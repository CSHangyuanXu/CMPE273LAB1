import { history } from 'umi'
import { message } from 'antd';
import api from 'api'
import store from 'store'

const { loginUser } = api

export default {
    namespace: 'login',
    state: {},
    effects: {
        *login({ payload }, { put, call, select }) {
            const data = yield call(loginUser, payload)
            if (data.success) {
                message.success('logged in')
                store.set('isLogin',true);
                store.set('userInfo',data.data);

                yield put({
                    type: 'app/updateState',
                    payload: {
                        userInfo: data.data,
                        isLogin: true
                    },
                })

                history.push('/')
            } else {
                throw data
            }
        },
    },
}
