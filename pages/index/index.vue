<template>
	<view class="minh100">
		<view class="h_box">
			<view class="top_box">
				<image class="top_img" :src="getimg('/static/images/xiaotujingxuan1_03.jpg')" mode="aspectFit"></image>
				<view>Hi~ 欢迎使用小兔保</view>
			</view>
			<view class="main_box dis_flex">
				<view v-for="(item,index) in banner" @tap="jump"  :data-url="item.jump_url"><image :src="getimg(item.pic)" mode="aspectFill"></image></view>
				<!-- <view @tap="jump" data-url="/pages/index1/index1"><image :src="getimg('/static/images/xiaotujingxuan_08.jpg')" mode="aspectFill"></image></view>
				<view><image :src="getimg('/static/images/xiaotujingxuan_11.jpg')" mode="aspectFill"></image></view>
				<view><image :src="getimg('/static/images/xiaotujingxuan_12.jpg')" mode="aspectFill"></image></view> -->
			</view>
		</view>
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
				title: 'Hello',
				banner:[]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			// plus.device.getInfo({
			// 		success:function(e){
			// 				console.log('getDeviceInfo success: '+JSON.stringify(e));
			// 				console.log('uuid: '+JSON.stringify(e.uuid));
			// 				that.setuuid(e.uuid)
			// 				that.uuid1=e.uuid
			// 		},
			// 		fail:function(e){
			// 				console.log('getDeviceInfo failed: '+JSON.stringify(e));
			// 		}
			// });
			that=this
			that.getbanner()
		},
		onShareAppMessage() {
			
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform','setfj_data']),
			getimg(img){
				return service.getimg(img)
			},
			getbanner() {
			
				///api/info/list
				var that = this
				var data = {}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/entrance'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
			
						that.banner = datas
						console.log(datas)
			
			
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			jump(e) {
				var that = this
				
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
			
				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.h_box{
		width: 100%;
		padding: 0 20upx;
		
	}
	.top_box{
		width: 100%;
		height: 195upx;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 42upx;
		color: #37424A;
	}
	.top_box view{
		position: relative;
		z-index: 10;
	}
	.top_img{
		width: 100%;
		height: 195upx;
		position: absolute;
		z-index: 1;
		/* margin-bottom: 10upx; */
	}
	.main_box{
		flex-wrap: wrap;
		width: 100%;
	}
	.main_box view{
		width: 50%;
		height: 470upx;
		padding: 10upx;
	}
	.main_box view image{
		width: 100%;
		height: 100%;
	}
</style>
