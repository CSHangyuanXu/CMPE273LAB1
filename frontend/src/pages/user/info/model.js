import api from 'api'
import { message } from 'antd';
import store from 'store'
const { editUserInfo } = api

export default {
    namespace: 'userInfo',
    state: {},
    effects: {
        *editUserInfo({ payload }, { put, call, select }) {
            const data = yield call(editUserInfo, payload)
            if (data.success) {
                message.success('Saved!');
                
                store.set('userInfo',data.data);

                yield put({
                    type: 'app/updateState',
                    payload: {
                        userInfo: data.data,
                    },
                })

                return data.data
            } else {
                throw data
            }
        },
    },
}