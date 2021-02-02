<template>
	<view class="minh100">
		<view class="set_list">
			<view class="add_li dis_flex ju_b aic" v-for="(item,index) in datas">
				<view class="selectbox c6 dis_flex aic flex_1">
					<i data-id="9" class="iconfont icon-duigou cd3" :class="item.cur==true?'cur':''" @tap="xz_fuc(item)"></i>
					<span class="flex_1" @tap="jump" :data-url="'/pages_fk/policyAdd/policyAdd?id='+item.id">{{item.insured}} - {{item.insured_name}}</span>
				</view>
				<i @tap="jump" :data-url="'/pages_fk/policyAdd/policyAdd?id='+item.id" class="iconfont icon-next c6"></i>
			</view>
		</view>
		<view class="set_footer dis_flex aic ju_b">
			<view class="dis_flex aic ju_c flex_1" @tap="del_dd">
				<i class="iconfont icon-shanchu" style="color: rgb(255, 67, 76);"></i> <span>删除</span>
			</view>
			<image :src="getimg('/static/web/images/set3.png')" mode="widthFix"></image>
			<view href="###" class="dis_flex aic ju_c flex_1" style="position: relative;">
				<button type="default" open-type="share" style="position: absolute;top: 0;opacity: 0;width: 100%;height: 100%;"></button>
				<i class="iconfont icon-fenxiang" style="color: rgb(67, 191, 255);"></i> <span>转发</span>
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
				datas: '',
				page: 1,
				size: 20
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			that = this
			if(option.share_id){
					uni.reLaunch({
						url:'/pages_fk/policyList/policyList?share_id=' +option.share_id + '&share_look_ids='+option.share_look_ids
					})
			}
			that.onRetry()
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},

		onShareAppMessage(res) {

			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			var ids=[]
			for(var i=0;i<that.datas.length;i++){
				if(that.datas[i].cur){
					ids.push(that.datas[i].id)
				}
			}
			ids=ids.join(',')
			return {
				title: '小兔保',
				path: '/pages_fk/policyList/policyList?share_id=' + that.loginDatas.id + '&share_look_ids='+ids,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onShareTimeline(){
			var ids=[]
			for(var i=0;i<that.datas.length;i++){
				if(that.datas[i].cur){
					ids.push(that.datas[i].id)
				}
			}
			ids=ids.join(',')
			return {
				title: '',
				query: {
					share_id: that.loginDatas.id,
					share_look_ids: ids,
				},
				// imageUrl: ''
			}
		},
		methods: {
			getimg(img) {
				return service.getimg(img)
			},
			xz_fuc(item) {
				if (item.cur) {
					Vue.set(item, 'cur', false)
				} else {
					Vue.set(item, 'cur', true)
				}
			},
			del_dd() {
				uni.showModal({
					title: '提示',
					content: '是否删除订单',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var ids=[]
							for(var i=0;i<that.datas.length;i++){
								if(that.datas[i].cur){
									ids.push(that.datas[i].id)
								}
							}
							ids=ids.join(',')
							console.log(ids)
							// return
							var data = {
								token: that.loginDatas.userToken,
								id:ids
							}
							//selectSaraylDetailByUserCard
							var jkurl = '/policy/notShow'
							service.P_post(jkurl, data).then(res => {
								that.btn_kg = 0
								console.log(res)
								if (res.code == 1) {
									var datas = res.data
									console.log(typeof datas)

									if (typeof datas == 'string') {
										datas = JSON.parse(datas)
									}

									// if (page_that == 1) {
									// 	that.datas = datas
									// } else {
									// 	if (datas.length == 0) {
									// 		that.data_last = true
									// 		return
									// 	}
									// 	that.datas = that.datas.concat(datas)
									// }
									// that.page++
									uni.showToast({
										icon:'none',
										title:'操作成功'
									})
									setTimeout(()=>{
										that.onRetry()
									},1000)
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onRetry() {
				that.page = 1
				that.getdata()
			},
			getdata() {
				var that = this
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				var data = {
					token: that.loginDatas.userToken,
					page: that.page,
					size: that.size
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/policy/examine'
				uni.showLoading({
					mask: true,
					title: '正在获取数据'
				})
				var page_that = this.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (page_that == 1) {
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++
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
			}
		}
	}
</script>

<style scoped>
	body {
		background: #fff;
	}

	.set_list {
		width: 100%;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border-top: 2px solid #e6e6e6;
	}

	.add_li {
		width: 100%;
		height: 97upx;
		font-size: 30upx;

	}

	.add_li+.add_li {
		border-top: 1px solid #f7f7f7;
	}

	.iconfont {
		margin-right: 10px;
	}

	.cd3 {
		color: #D3D3D3;
	}

	.selectbox .cur.cd3 {
		color: #43BFFF;
	}

	.set_footer {
		height: 92upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 5upx solid #F1F1F1;

	}

	.set_footer>image {
		width: 2upx;
		height: auto;
	}

	.set_footer view {
		font-size: 30upx;
		color: #666;
	}

	.set_footer i {
		margin-right: 28upx;
	}

	.fx_tk {
		top: 0 !important;
		/*bottom: 0;*/
		left: 0;
		right: 0;
		width: 100vw;
		/*height: 100vh;*/
		background-color: rgba(0, 0, 0, .1);
	}

	.fx_tk img {
		width: 100%;
		height: auto;
	}
</style>
