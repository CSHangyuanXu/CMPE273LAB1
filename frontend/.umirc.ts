import { resolve } from 'path'

export default {
    title: 'etsy',
    nodeModulesTransform: {
        type: 'none',
        exclude: [],
    },
    devtool: 'eval',
    dva: { immer: true },
    hash: true,
    fastRefresh: {},
    webpack5: {},
    mfsu: {},
    alias: {
        api: resolve(__dirname, './src/services/'),
    },
};
