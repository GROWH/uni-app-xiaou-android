<template>
	<view class="">
		<!-- 搜索框区域 -->
		<view class="head">
			<image src="../../static/index/logo.jpg" mode="widthFix"></image>
			<view class="searchview">
				<input type="text" value="" placeholder="寻找商品" @focus="_goSearch()" />
			</view>
		</view>
		<!-- 快速分类导航 滚动视图 -->
		<scroll-view scroll-x class="quicknav">
			<view @click="_goCateList(index)" v-for="(item,index) in quicknav" :key="index">
				<text :class="index == topindex ? 'navactive' : '' ">{{item.catename}}</text>
			</view>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.img" mode=widthFix></image>
			</swiper-item>
		</swiper>
		<!-- 功能导航 -->
		<view class="funnav">
			<view class="funnavrow" @click="_goCate(index)" v-for="(item,index) in funNavList" :key="index">
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 秒杀商品推荐区域 -->
		<view class="seckill">
			<!-- 秒杀左侧区域 -->
			<view class="leftseckill">
				<view class="title">
					<image src="../../static/index/xianshi.jpg" mode="widthFix"></image>
					<text>限时秒杀</text>
				</view>
				<view class="info">
					<text>每天零点场，好货抢不停</text>
				</view>
				<view class="time">
					<view>00</view>:
					<view>00</view>:
					<view>00</view>
					<view>秒杀</view>
				</view>
				<image src="../../static/index/goods2.jpg" mode="widthFix" class="goodimg"></image>
			</view>
			<!-- 秒杀右侧区域 -->
			<view class="rightseckill">
				<view class="top">
					<view class="topinfo">
						<text>品牌上新 <text style="background: #f33182;font-size: 28rpx;color: white;">折</text></text>
						<text>每天九点，抢大牌</text>
					</view>
					<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
				</view>
				<view class="bottom">
					<view class="bottomgood">
						<text>每日十件</text>
						<text>只为您好选</text>
						<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
					</view>
					<view class="bottomgood">
						<text>每日十件</text>
						<text>只为您好选</text>
						<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 广告图片推送区域 -->
		<view class="gg">
			<image src="../../static/index/swiper1.jpg" mode="widthFix"></image>
		</view>
		<!-- 推荐商品区域 -->
		<view class="recommendgood">
			<!-- 推荐导航 -->
			<view class="recommendnav">
				<view :class="switchIndex==0?'recommendactive':''"  @click="_switchTab(0)">
					<text>热门推荐</text>
				</view>
				<view :class="switchIndex==1?'recommendactive':''" @click="_switchTab(1)">
					<text>上新推荐</text>
				</view>
				<view :class="switchIndex==2?'recommendactive':''" @click="_switchTab(2)">
					<text>所有商品</text>
				</view>
			</view>
			<view class="recommendlist"  v-for="(item,index) in indexGoods" :key="index">
				<view class="recommendrow">
					<image :src="item.img" mode="widthFix"></image>
					<view class="recommendrowinfo">
						<text>{{item.goodsname}}</text>
						<text>现价格： ￥{{item.price}}</text>
						<text>原价格：￥{{item.market_price}}</text>
						<text @click="_goDetail(item.id)">
							立即抢购
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				quicknav: [], //快速分类导航,
				topindex: 0,
				swipers: [],
				products: [], //热销、上新、所有商品数据
				funNavList: [{ //功能导航数据
						name: "限时抢购",
						icon: require("../../static/index/xiaohuoban.png")
					},
					{
						name: "积分商城",
						icon: require("../../static/index/jifentixicopy.png")
					},
					{
						name: "联系我们",
						icon: require("../../static/index/lianxiwomen.png")
					},
					{
						name: "商品分类",
						icon: require("../../static/index/-shangpinfenlei-gai.png")
					}
				],
				switchIndex:0
			}
		},
		onLoad() {
			// uni.request({
			// 	url:"http://localhost:3000/api/getcate",
			// 	method:"GET",
			// 	data:{},
			// 	success:(res)=> {
			// 		console.log(res)
			// 	}
			// })
			this._getNav()
			this._getBanner()
			this._getIndexGoods()
			this._getSeckill()
			
		},
		computed:{
			//  推荐导航点击切换 因为异步 数据渲染和数据请求不一致 
			indexGoods:function(){
				if(this.products[this.switchIndex]){
					 // Api.imgUrl()里的imgArr是一个二维数组  所以不能对this.products=res.data.list直接遍历，而是它里面的content数组
					 // list[{
						//  content[{
						// 	 id:
						// 	 img:
						//  }]
					 // }]
					return Api.imgUrl(this.products[this.switchIndex].content)
					
				}else{
					return []
				}
			}
		},
		methods: {
			
			// 获取限时秒杀(list为null)
			_getSeckill:async function(){
				let res = await Api.getSeckill()
				// console.log(res)
			},
			//进入商品详情
			_goDetail:function(id){
				uni.navigateTo({
					url:'../../pagesb/details/details?id='+id
				})
			},
		
			//  推荐导航点击切换
			_switchTab:function(index){
				this.switchIndex=index
			},
			// 获取首页的商品(选项卡下面)
			_getIndexGoods:async function(){
				let res = await Api.getIndexGoods()
				// console.log(res)
				if(res.data.code==200){
					this.products=res.data.list
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
				
			},
			
			// 点击功能导航第三个进入分类页面
			_goCate:function(index){
				if(index==3){
					uni.navigateTo({
						url:'../../pagesb/classify/classify'
					})
				}
			},

			// 获取轮播图
			_getBanner:async function(){
				let res = await Api.getBanner()
				// console.log(res)
				if(res.data.code==200){
					this.swipers=Api.imgUrl(res.data.list)
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			},
			// 跳转到分类列表
			_goCateList:function(index){
				this.topindex=index
				uni.navigateTo({
	
					url:'../../pagesb/product/product?id='+this.quicknav[index].id
				})
			},
			// 点击搜索框跳转至搜索页面
			_goSearch:function(){
				uni.navigateTo({
					url:'../../pagesb/search/search'
				})
			},
			// 获取一级导航
			_getNav:async function(){
				let res = await Api.getNav()
				// console.log(res)
				if(res.data.code==200){
					this.quicknav=res.data.list
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
@import url("../../common/css/index.css");
</style>
