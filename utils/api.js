import {http} from '@/utils/http.js'
import baseUrl from '@/utils/config.js'
// 获取一级导航
const getNav =()=>{
	return http({
		url:'/api/getcate'
	})
}
// 获取轮播图
const getBanner=()=>{
	return http({
		url:'/api/getbanner'
	})
}

// 处理图片地址  imgArr是一个二维数组
const imgUrl=(imgArr)=>{
	imgArr.forEach(item=>{
		if(item.img.indexOf(baseUrl)==-1){
			item.img=baseUrl+item.img
		}
		
	})
	return imgArr
}
// 获取首页的商品
const getIndexGoods =()=>{
	return http({
		url:'/api/getindexgoods'
	})
}

// 限时秒杀
const getSeckill=()=>{
	return http({
		url:'/api/getseckill'
	})
}

// classify页面 
const getCates=()=>{
	return http({
		url:'/api/getcates'
	})
}
//product页面 根据cate_id获取分类下面所有的商品
const getGoodsByCateId=(data={})=>{
	return http({
		url:'/api/getcategoodPage',
		data
	})
}
// 搜索  模糊查询
const search =(data={})=>{
	return http({
		url:'/api/search',
		data
	})
}
// 商品详情页面 
const getGoodsById =(data={})=>{
	return http({
		url:'/api/getgoodsinfo',
		data
	})
}
// 发送短信验证码
const sendMsg =(data={})=>{
	return http({
		url:'/api/sms',
		data
	})
}
// 登录
const login=(data={})=>{
	return http({
		url:'/api/wxlogin',
		data
	})
} 
// 加入购物车
const addCart =(token,data={})=>{
	return http({
		url:'/api/cartadd',
		data,
		header:{
			'content-type': "application/x-www-form-urlencoded",
			'authorization':token
		}
	})
}

// 购物车列表
const getCart=(token,data={})=>{
	return http({
		url:'/api/cartlist',
		data,
		header:{
			'content-type': "application/x-www-form-urlencoded",
			'authorization':token
		}
	})
}
// 购物车修改
const editCart = (token,data={})=>{
	return http({
		url:'/api/cartedit',
		data,
		header:{
			'content-type': "application/x-www-form-urlencoded",
			'authorization':token
		}	
	})
}

// 购物车删除
const delCart =(token,data={})=>{
	return http({
		url:'/api/cartdelete',
		data,
		header:{
			'content-type': "application/x-www-form-urlencoded",
			'authorization':token
		}	
	})
}
// 确认订单
const order=(token,data={})=>{
	return http({
		url:'/api/orderadd',
		data,
		header:{
			'content-type': "application/x-www-form-urlencoded",
			'authorization':token
		}	
	})
}

// 下订单时间
const dateFormat=()=>{
	var d=new Date();
		var year=d.getFullYear();
		var month=change(d.getMonth()+1);  
		var day=change(d.getDate());
		var hour=change(d.getHours());
		var minute=change(d.getMinutes());
		var second=change(d.getSeconds());

		function change(t){
		   if(t<10){
		    return "0"+t;
		   }else{
		    return t;
		   }
		 }
		 var time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
		 return time
	
}

// 订单页面 查询订单
const getOrder =(token,data={})=>{
	return http({
		url:'/api/orders',
		data,
		header:{
			'content-type': "application/x-www-form-urlencoded",
			'authorization':token
		}	
	})
}



export default{
	getNav,
	getBanner,
	imgUrl,
	getIndexGoods,
	getSeckill,
	getCates,
	getGoodsByCateId,
	search,
	getGoodsById,
	sendMsg,
	login,
	addCart,
	getCart,
	editCart,
	delCart,
	order,
	dateFormat,
	getOrder
}