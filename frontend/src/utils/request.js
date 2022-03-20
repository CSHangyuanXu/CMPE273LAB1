import axios from 'axios'
import { cloneDeep } from 'lodash'
const { parse, compile } = require("path-to-regexp")
import { message } from 'antd'

export default function request(options) {
    let { data, url, method } = options
    const cloneData = cloneDeep(data)

    try {
        let domain = ''
        const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
        if (urlMatch) {
            ;[domain] = urlMatch
            url = url.slice(domain.length)
        }

        const match = parse(url)
        url = compile(url)(data)

        for (const item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name]
            }
        }
        url = domain + url
    } catch (e) {
        message.error(e.message)
    }

    if (method.toUpperCase() === "GET") {
        options.params = data
    }

    options.url = url

    return axios(options)
        .then(response => {
            const { statusText, status, data } = response

            let result = {}
            if (typeof data === 'object') {
                result = data
                if (Array.isArray(data)) {
                    result.list = data
                }
            } else {
                result.data = data
            }

            if (result.code === 200) {
                return Promise.resolve({
                    success: true,
                    message: statusText,
                    statusCode: status,
                    ...result,
                })
            }

            return Promise.reject({
                success: false,
                statusCode: status,
                message: result.msg,
            })

        })
        .catch(error => {
            const { response, message } = error


            let msg
            let statusCode

            if (response && response instanceof Object && error instanceof Object) {
                const { data, statusText } = response
                statusCode = response.status
                msg = data.message || statusText
            } else {
                statusCode = 600
                msg = error.message || 'Network Error'
            }

            /* eslint-disable */
            return Promise.reject({
                success: false,
                statusCode,
                message: msg,
            })
        })
}
