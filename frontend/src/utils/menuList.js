module.exports = [{
    title: "Account Management",
    path: "/user",
    children: [{
        title: 'Profile',
        path: "/user/info"
    },{
        title: 'My Purchase',
        path: "/user/order"
    }]
},{
    title: "Shop Management",
    path: "/store",
    children: [{
        title: 'Shop Info',
        path: "/store/info"
    },{
        title: 'Item',
        path: "/store/goods"
    },{
        title: 'Categories',
        path: "/store/classify"
    }]
}]