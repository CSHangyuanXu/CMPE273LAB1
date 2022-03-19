module.exports = [{
    title: "帐号管理",
    path: "/user",
    children: [{
        title: '个人资料',
        path: "/user/info"
    },{
        title: '我的购买',
        path: "/user/order"
    }]
},{
    title: "商店管理",
    path: "/store",
    children: [{
        title: '商店资料',
        path: "/store/info"
    },{
        title: '商店商品',
        path: "/store/goods"
    },{
        title: '分类',
        path: "/store/classify"
    }]
}]