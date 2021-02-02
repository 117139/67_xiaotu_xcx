<template>
	<view class="minh100">
		
		<view class="top_box">
			<view class="getback" @tap="back"><image src="/static/img/back.png" mode="aspectFit"></image>返回</view>
			<div class="dataNum">共{{Insurances.length}}条</div>
		</view>
		<!-- 渲染商品列表 -->
		<div v-if="Insurances.length>0">
			<!-- <div class="dataNum">共{{Insurances.length}}条</div> -->
			<ul class="insurancesData">
				<view class="ju_b" :id="val.id" v-for="(val,index) in Insurances" :key="index" @click="goDetail(val.pid,val.ptypeCode)" :class="[checkedData.indexOf(val.pid) != -1 ? 'compareChecked':'',val.isOnline == '0' ? 'unOnline':'']">
					<!-- <van-icon :name="beforeIcon" class="liIcon" /> -->
					<image :src="getimg(beforeIcon)" mode="aspectFill" class="liIcon"></image>
					<!-- <view class="flex_1">{{val.pname}}<span class="shop" v-if="val.isBuy != '0' && val.isOnline != '0'">购</span></view> -->
					<view class="flex_1 text-cut">{{val.pname}}<span v-if="val.isBuy != '0' && val.isOnline != '0'" class="shop">购</span></view>
					<!-- <van-icon :name="detailIcon" class="liked" /> -->
					<image :src="getimg(detailIcon)" mode="aspectFill" class="liked"></image>
				</view>
				<view v-if="data_last" class="getMore ju_c">
					到底了~~~
				</view>
				<view v-else  class="getMore ju_c" @click="getMore">
					加载更多
				</view>
			</ul>
		</div>
		<div class="noCollectBox" v-else>
			<image class="noCollectImg" :src="getimg('/static/img/none.png')" mode="widthFix"></image>
			<p class="noCollect">您还没有收藏产品哦~</p>
		</div>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				compare: false,
				Insurances: [],
				checkedData: [],
				pageIndex: 1,
				detailData: [],
				type: 'T0',
				beforeIcon: '/static/img/collectIcon.png',
				detailIcon: '/static/img/detail_icon.png',
				data_last:false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			that=this
			this.getMore();
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			getimg(img){
				return service.getimg(img)
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			goDetail(val, type) { //跳转详情
				let detailData = {
					type: type,
					id: [val]
				}
				// this.$store.state.detailData = detailData;
				// this.$router.push({
				// 	name: `detail`,
				// });
				uni.setStorageSync("details", JSON.stringify(detailData))
				uni.navigateTo({
					url:'/pagesA/cp_detail/cp_detail'
				})
			},
			getMore() {
				uni.showLoading({
					mask:true,
					title:'正在请求数据'
				})
				let data = {
					fid: 'S0009',
					openId: this.$store.state.loginDatas.openId,
					pageSize: this.$store.state.pageSize,
					pageIndex: this.pageIndex,
				}
				// api(data).then(res => {
				// 	if (res.data.code == 'S0001') {
				// 		this.Insurances = res.data.data.list;
				// 		this.$store.state.pageSize += 10;
				// 	}
				// })
				var jkurl = service.imgurl_w+'/bx/mobile'
				var header={'content-type': 'application/json'}
				var page_that= this.pageIndex
				service.P_post(jkurl, data,header).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 'S0001') {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
				
						if (page_that == 1) {
				
							that.datas = datas
							this.pcount = datas.pcount;
							this.Insurances = datas.list;
							// this.$store.state.pageSize += 10;
							this.loading = false;
						} else {
							if (datas.list.length == 0) {
								that.data_last = true
								return
							}
							that.Insurances = that.Insurances.concat(datas.list)
						}
						that.pageIndex++
				
					} else {
						that.htmlReset = 1
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			iconCode(code) {
				switch (code) {
					case 'T1':
						return 'label-o';
						break;
					case 'T2':
						return 'bookmark-o';
						break;
					case 'T3':
						return 'bill-o';
						break;
					case 'T4':
						return 'orders-o';
						break;
					case 'T5':
						return 'newspaper-o';
						break;
					case 'T6':
						return 'records';
						break;
				}

			},
			typeCode(code) {
				switch (code) {
					case 'T1':
						return 'red';
						break;
					case 'T2':
						return 'orange';
						break;
					case 'T3':
						return 'blue';
						break;
					case 'T4':
						return 'purple';
						break;
					case 'T5':
						return 'yellow';
						break;
					case 'T6':
						return 'green';
						break;
				}
			},
		}
	}
</script>

<style scoped>
	#collect {
		position: relative;
		padding-top: 15px;
		min-height: 100%;
		background: rgb(242, 246, 250);
		/* background: url("../static/img/bg1.png") repeat;
        background-position-y: top;
        background-size: 100%; */
		/* padding-bottom:30px; */
	}

	.compare {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		position: fixed;
		right: 20px;
		bottom: 100px;
		box-shadow: 3px 6px 10px #c5c4c44d;
		background: #58acffec;
		color: #fff;
	}

	.compareing {
		background: #f33f48;
	}

	.noData {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		font-size: 16px;
		color: #c9c9c9;
	}


	.insurancesData {
		font-size: 16px;
		padding: 10px 10px 60px 10px;
		padding-bottom: 60px;
	}

	.insurancesData>view {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid rgba(192, 183, 183, 0.363);
	}

	.insurancesData>view.compareChecked {
		color: #fff;
		background: #58abffcb;
	}

	.insurancesData>view.getMore {
		border-bottom: none;
		text-align: center;
		font-size: 14px;
		color: rgba(64, 123, 231, 0.932);
		text-shadow: 2px 2px 2px rgba(188, 189, 190, 0.39);
	}

	.insurancesData>view.unOnline {
		color: #aaa;
	}

	.insurancesData>view .shop {
		display: inline-block;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		background: rgba(64, 123, 231, 0.932);
		border-radius: 50%;
		transform: scale(0.8);
	}

	.liIcon {
		/* transform: translateY(3px); */
		width: 30upx;
		height: 30upx;
	}

	.noCollect {
		text-align: center;
		font-size: 16px;
		opacity: .5;
		margin-top: 30px;
	}

	.noCollectBox {
		text-align: center;
	}

	.noCollectBox>img {
		margin-top: 150px;
		width: 120px;
	}

	.liked {
		width: 7px;
		height: 16upx;
		/* float: right;
		margin-top: 8px; */
	}

	.liked .van-image {
		width: 100%;
	}

	.liked img {
		width: 100% !important;
	}
	
	.top_box{
		width: 100%;
		padding-left: 30upx;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.getback {
		/* max-width: 100upx;
		height: 100upx;
		border: none; */
		font-size: 28upx;
		background: none;
		color: #83b1f9;
		display: flex;
		align-items: center;
	}
	.getback image{
		width: 14upx;
		height: 30upx;
		margin-right: 10upx;
	}
	.dataNum {
		/* position: absolute;
		top: 25px;
		right: 0; */
		padding: 20upx ;
		color: #fff;
		font-size: 28upx;
		text-shadow: 2px 2px 2px rgba(188, 189, 190, 0.39);
		background: rgba(102, 159, 250);
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		/* border:1px solid rgb(202, 227, 246); */
	}
</style>
