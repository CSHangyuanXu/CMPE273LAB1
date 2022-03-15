import { message } from 'antd'

export const dva = {
    config: {
        onError(e, a) {
            e.preventDefault()
            if (e.message) {
                message.error(e.message)
            } else {
                /* eslint-disable */
                console.error(e)
            }
        },
    },
};