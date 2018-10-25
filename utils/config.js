const baseURL = 'https://card.hudusoft.net'
const url = {
    index: {
      getCardInfo: '/api/public/getcard',
      getPraise: '/api/public/praise'
    },
    login: {
      login: '/api/public/login',
      isLogined:'/api/public/login',
      getopenid:'/api/public/getopenid'
    },
    home:{
      website: '/api/public/getwebsite'
    },
    product:{
      productcatelist:'/api/Public/getproductcatelist',
      productlist: '/api/Public/getproductlist',
      productdetail: '/api/public/getproductdetails'
    },
    dynamic:{
      getdynamiclist:'/api/Public/getDynamicList',
      getcomment:'/api/public/comment'
    }

}

export {
    baseURL,
    url
};