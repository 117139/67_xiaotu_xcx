<template>
	<view class="minh100">
		<z_text></z_text>
		<scroll-view scroll-y id="wrap" class="wrap" :scroll-into-view="id_str">
			<view class="box_l" >
				<view class="w_li" v-for="(item,index) in datas">
					<view :id="item.name" class="w_li_tit">{{item.name}}</view>
					<view class="w_list">
						<view v-for="(item1,index1) in item.data" @tap="jump" 
							:data-url="'/pages_fk/lexicnDetails/lexicnDetails?id='+item1.id" class="n_li_tit oh1">{{item1.title}}</view>
						
					</view>
				</view>
			</view>
			<view class="box_r">
				<a v-for="(item,index) in datas" @tap="id_str=item.name">{{item.name}}</a> 
				
			</view>
		</scroll-view>
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
				id:'',
				datas: '',
				zhankai: false,
				zan_type:0,
				id_str:'',
			}
		},
		onLoad(option) {
			that=this
			// console.log(that.$store.state.v_type==1)
			// if(that.$store.state.v_type==1){
			// 	uni.redirectTo({
			// 		url:'/pages_fk/details/details'
			// 	})
			// 	return
			// }
			that.id=option.id
			that.getdata()
		},
		methods: {
			getdata() {
			
				var jkurl = '/search/catalogue'
				var data = {
					token: this.$store.state.loginDatas.userToken,
					id: that.id
				}
				var page_that = that.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas = datas
						// if (page_that == 1) {
						// 	that.datas = datas
						// } else {
						// 	if (datas.data.length == 0) {
						// 		that.data_last = true
						// 		return
						// 	}
						// 	that.datas = that.datas.concat(datas)
						// }
						// that.page++
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
	body {
		background: #fff;
	}
	.wrap{
		height: 100vh;
	}
	.box_r {
		position: fixed;
		right: 0;
		top: 0;
		width: 60upx;
		bottom: 0;
		font-size: 24upx;
		color: #43bfff;
		z-index: 999;
		background: #eee;
		padding-top: 10px;
	}

	.box_r a {
		display: block;
		text-align: center;
		line-height: 40upx;
	}

	.box_l {
		width: 100%;
	}

	.w_li {
		width: 100%;
		background: #fff;


	}

	.w_li>view {
		width: 100%;
		padding: 0 30upx;
		padding-right: 80upx;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}

	.w_li_tit {
		height: 30upx;
		line-height: 30upx;
		background: #f7f7f7;
		font-size: 24upx;
		color: #333;
	}

	.w_list {
		width: 100%;
	}

	.n_li_tit {
		line-height: 90upx;
		height: 90upx;
		font-size: 32upx;
		color: #43bfff;
	}

	.n_li_inr {
		line-height: 40upx;
		font-size: 26upx;
		color: #666;
		/*padding-bottom: 0.3upx;*/
		margin-bottom: 30upx;
		height: 80upx;
	}

	.n_li_inr view,
	.n_li_inr p {
		line-height: 40upx;
		font-size: 26upx;
		/*text-indent: 2em;*/
	}
</style>
