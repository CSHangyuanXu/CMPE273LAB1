import api from 'api'
import { message } from 'antd';
import  {history} from 'umi'

const { registerUser } = api

export default {
    namespace: 'register',
    state: {},
    effects: {
        *register({ payload }, { put, call, select }) {
            const data = yield call(registerUser, payload)
            if (data.success) {
                message.success('registerd');
                history.push('/login')
                return data.data
            } else {
                throw data
            }
        },
    },
}
