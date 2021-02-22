<template>
	<view class="minh100">
		<z_text></z_text>
		<view id="wrap" class="wrap">
			<view class="ct_top dis_flex aic">{{datas.lexiconData.title}}</view>
			<view class="ct_list">
				<view class="dis_flex ">
					<view class="d1 dis_flex aic">类似条目:</view>
					<view class="d2 flex_1" :class="{listshow:zhankai}">
						<view class="oh1" v-for="(item,index) in datas.analogyData">
							<text  >{{item}}</text>
						</view>
					</view>
					<view v-if="zhankai" class="d3 dis_flex aic" @tap="zhankai=false">收起<img :src="getimg('/static/web/images/go_up.png')"></view>
					<view v-else class="d3 dis_flex aic" @tap="zhankai=true">展开<img :src="getimg('/static/web/images/go_down.png')"></view>
				</view>
			</view>
			<view class="sheji">
				<view class="d_tit">涉及险种</view>
				<view class="d_inr noselect">{{datas.lexiconData.involve_insurance}}</view>
				<view class="clearfix inr_cz">
					<div v-if="zan_type==2" data-d="2"  class="zan cai zan1"><i class="iconfont icon-cai"></i>需完善</div>
					<view v-else data-d="2" @tap="dz_fuc(2,1)" class="zan cai"><i class="iconfont icon-iconfontzan"></i>需完善</view>
					<view v-if="zan_type==1" data-d="2"  class="zan dz zan1"><i class="iconfont icon-zan1"></i>准确</view>
					<view  v-else data-d="2" @tap="dz_fuc(1,1)" class="zan dz"><i class="iconfont icon-zan"></i>准确</view>
				</view>
			</view>
			<view class="sheji">
				<view class="d_tit">释义</view>
				<view class="d_inr noselect" v-html="datas.lexiconData.paraphrase">
					
				</view>
				<view class="clearfix inr_cz">
					<div v-if="zan_type1==2"  class="zan cai zan1"><i class="iconfont icon-cai"></i>需完善</div>
					<view v-else @tap="dz_fuc(2,2)" class="zan cai"><i class="iconfont icon-iconfontzan"></i>需完善</view>
					<view v-if="zan_type1==1"  class="zan dz zan1"><i class="iconfont icon-zan1"></i>准确</view>
					<view  v-else @tap="dz_fuc(1,2)" class="zan dz"><i class="iconfont icon-zan"></i>准确</view>
				</view>
			</view>
			<view class="sheji">
				<view class="d_tit">使用场景</view>
				<view class="d_inr noselect"  v-html="datas.lexiconData.scene">
				</view>
				<view class="clearfix inr_cz">
					<div v-if="zan_type2==2"  class="zan cai zan1"><i class="iconfont icon-cai"></i>需完善</div>
					<view v-else @tap="dz_fuc(2,3)" class="zan cai"><i class="iconfont icon-iconfontzan"></i>需完善</view>
					<view v-if="zan_type2==1"  class="zan dz zan1"><i class="iconfont icon-zan1"></i>准确</view>
					<view  v-else @tap="dz_fuc(1,3)" class="zan dz"><i class="iconfont icon-zan"></i>准确</view>
				</view>
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
				id:'',
				datas: '',
				zhankai: false,
				zan_type:0,
				zan_type1:0,
				zan_type2:0,
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
			dz_fuc(num,centent){
				if(centent==1){
					that.zan_type=num
				}
				if(centent==2){
					that.zan_type1=num
				}
				if(centent==3){
					that.zan_type2=num
				}
				that.set_remark(num,centent)
			},
			set_remark(num,centent){
				// /search/remark
				var jkurl = '/search/remark'
				var data = {
					token: this.$store.state.loginDatas.userToken,
					id: that.id,
					type:num,
					centent:centent
				}
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
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
			getdata() {
				// if (that.btn_kg == 1) {
				// 	return
				// }
				// if (that.data_last) {
				// 	return
				// }
				// that.btn_kg = 1
				var jkurl = '/search/details'
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
			jump_web(url) {
				if (!url) {
					return
				}
				uni.setStorageSync('web_url', url)
				uni.navigateTo({
					url: '/pages/new_html/new_html'
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
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>
	body {
		background: #fff;
	}

	.ct_top {
		width: 100%;
		height: 120upx;
		border-top: 1px solid #e6e6e6;
		font-size: 40upx;
		padding: 0 33upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
	}

	.ct_list {
		background: #fff;
		width: 100%;
		padding: 0 33upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 17upx;
	}

	.ct_list>view {
		border-top: 1px solid #E6E6E6;
	}

	.ct_list .d1 {
		color: #43BFFF;
		font-size: 26upx;
		height: 85upx;
		padding-right: 5px;
	}

	.ct_list .d2>view {
		display: block;
		width: 100%;
		color: #43BFFF;
		font-size: 26upx;
		height: 85upx;
		/* line-height: 85upx; */
		display: flex;
		align-items: center;
	}

	.ct_list .d2 {
		height: 85upx;
		overflow: hidden;
	}

	.ct_list .d2.listshow {
		height: auto;
	}

	.ct_list .d3 {
		color: #43BFFF;
		font-size: 26upx;
		height: 85upx;
		line-height: 85upx;
	}

	.ct_list .d3 img {
		width: 24upx;
		height: 24upx;
		margin-left: 4px;
		/* height: .08upx; */
	}

	.sheji {
		width: 100%;
		padding: 48upx 30upx 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
		border-top: .17upx solid #f7f7f7;
	}

	.d_tit {
		border-left: 3upx solid #43BFFF;
		padding-left: 7px;
		font-size: 32upx;
		font-weight: 800;
		color: #333;
		margin-bottom: 10upx;
	}

	.d_inr {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 60upx;
	}

	.noselect {
		-webkit-touch-callout: none;
		/* iOS Safari */
		-webkit-user-select: none;
		/* Chrome/Safari/Opera */
		-khtml-user-select: none;
		/* Konqueror */
		-moz-user-select: none;
		/* Firefox */
		-ms-user-select: none;
		/* Internet Explorer/Edge */
		user-select: none;
		/* Non-prefixed version, currently
not supported by any browser */
	}

	.d_inr1 {
		text-indent: 2em;
	}

	.inr_cz {
		margin-top: 40upx;
		height: 30upx;
	}

	.zan {
		float: right;
		font-size: 20upx;
		color: #999;
		margin-left: 10px;
		display: flex;
		align-items: center;
	}

	.zan i {
		margin-right: 3px;
		font-size: 20upx;
		color: #999;
	}

	.zan1 {
		color: #f00;
	}

	.zan1 i {
		color: #f00;
	}

	.newsDe {
		line-height: 90upx;
		height: 90upx;
		/*text-indent: 1em;*/
	}
</style>
