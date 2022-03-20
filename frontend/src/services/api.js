export default {
    loginUser: 'POST /login',
    registerUser: 'POST /register',
    editUserInfo: 'PUT /user/edit/:id',
    getUserStoreInfo: '/store/user/store/info',
    editUserStoreInfo: "PUT /store/edit/store/:id",
    addUserStoreInfo: "POST /store",
    getUserStoreClassify: "/category",
    addUserStoreClassify: "POST /category",
    addUserStoreGoods: "POST /goods",
    getUserStoreGoods: "/goods",
    editUserStoreGoods: "PUT /goods/edit/:id",
    getAllGoods: "/goods/all",
    getGoodsDetails: "/goods/details",
    getCollectionList: "/collection",
    addUserCollection: "POST /collection",
    deleteCollectionList: "DELETE /collection",
    addUserCart: "POST /carts",
    getUserCart: "/carts",
    editUserCart: "POST /carts/app/edit",
    addUserOrder: "POST /orders",
    getUserOrder:"/orders",
    getStoreDetails:"/store/details",
    queryStoreName:"/store/name",
}