(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine"],{"15f8":function(n,t,e){},"42bc":function(n,t,e){"use strict";var i=e("15f8"),a=e.n(i);a.a},"435b":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{isLogin:!1,userinfo:{phone:"请登录",img:"/static/mine/tou.png"},orderList:[{name:"全部订单",icon:"../../static/mine/quanbudingdan.png"},{name:"待付款",icon:"../../static/mine/daifukuan.png"},{name:"待收货",icon:"../../static/mine/daishouhuo.png"}],personMsgList:[{name:"地址管理",icon:"../../static/mine/dizhiguanli.png"},{name:"我的钱包",icon:"../../static/mine/zu.png",remaBala:"200余额"},{name:"我的优惠券",icon:"../../static/mine/wodeyouhuiquan.png"},{name:"我的二维码",icon:"../../static/mine/wodeerweima.png"},{name:"我的小伙伴",icon:"../../static/mine/xiaohuoban.png"}]}},onShow:function(){var t=n.getStorageSync("token")||"";""==t?this.isLogin=!1:(this.isLogin=!0,this.userinfo.phone=n.getStorageSync("phone")),this._goOrder()},methods:{_goOrder:function(t){0==t&&n.navigateTo({url:"../../pagesa/order/order"})}}};t.default=e}).call(this,e("543d")["default"])},"4df9":function(n,t,e){"use strict";(function(n){e("d87f");i(e("66fd"));var t=i(e("bb74"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},b864:function(n,t,e){"use strict";var i;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return i}));var a=function(){var n=this,t=n.$createElement;n._self._c},o=[]},bb17:function(n,t,e){"use strict";e.r(t);var i=e("435b"),a=e.n(i);for(var o in i)"default"!==o&&function(n){e.d(t,n,(function(){return i[n]}))}(o);t["default"]=a.a},bb74:function(n,t,e){"use strict";e.r(t);var i=e("b864"),a=e("bb17");for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);e("42bc");var u,c=e("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);t["default"]=r.exports}},[["4df9","common/runtime","common/vendor"]]]);