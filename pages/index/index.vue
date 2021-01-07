<template>
	<view class="minh100">
		<view class="h_box">
			<view class="top_box">
				<image class="top_img" src="../../static/images/xiaotujingxuan1_03.jpg" mode="aspectFit"></image>
				<view>Hi~ 欢迎使用小兔保</view>
			</view>
			<view class="main_box dis_flex">
				<view><image src="../../static/images/xiaotujingxuan_06.jpg" mode="aspectFill"></image></view>
				<view @tap="jump" data-url="/pages/index1/index1"><image src="../../static/images/xiaotujingxuan_08.jpg" mode="aspectFill"></image></view>
				<view><image src="../../static/images/xiaotujingxuan_11.jpg" mode="aspectFill"></image></view>
				<view><image src="../../static/images/xiaotujingxuan_12.jpg" mode="aspectFill"></image></view>
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
				title: 'Hello'
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {

		},
		onShareAppMessage() {
			
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform','setfj_data']),
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
