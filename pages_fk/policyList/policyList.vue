<template>
	<view class="minh100">
		<view class="gl_box1">
			<image class="gl_box1_bg" :src="getimg('/static/web/images/glbg_01.jpg')" mode=""></image>
			<view class="gl_top dis_flex ju_b aic">
				<view class="gl_title flex_1 dis_flex aic">
					<span>保单管理</span>
					<img @tap="jump" data-url="/pages_fk/policyList/policyList" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLXROBMgJ1mqIvWeUSTul3TvibmN8ib1Xlo2TPxsPM4HTLGemOLeb8d6pkhvTOe30vLgNRjMlTxq7Ug/132"
					 alt="">
				</view>
				<view class="dis_flex">
					<a v-if="datas.operation==2" @tap="jump" data-url="" class="top_btn" style="position: relative;">
						<img :src="getimg('/static/web/images/fenxiang.png')" alt="">
					</a>
					<a @tap="down_fuc(datas.explain)" class="top_btn"><img :src="getimg('/static/web/images/help.png')" alt=""></a>
				</view>
			</view>
			<view class="user_box clearfix">
				<view class="user_box1">
					<view v-for="(item,index) in insuredData" policy_name="s1" @tap="cur_fuc(index)" :class="cur_p==index?'cur':''">
						<p>{{item.insured}}</p> <span></span>
					</view>
				</view>
			</view>
		</view>
		<view class="gl_list">
			<view class="gl_li ">
				<view class="li_type">重疾险</view>
				<view class="li_cz dis_flex ju_b">
					<view></view>
					<view class="li_go dis_flex aic ju_b">
						<span v-if="datas.operation==2">移动</span>
						<view v-if="datas.operation==2" class="li_go_fx dis_flex">
							<a href="###" @tap="move(7,1)"><img :src="getimg('/static/web/images/go_up.png')" alt=""></a>
							<a href="###" @tap="move(7,2)"><img :src="getimg('/static/web/images/go_down.png')" alt=""></a>
						</view>
					</view>
				</view>
				<view class="youxiao_icon"></view>
				<view class="d1">5</view>
				<view class="d2">被保险人：3</view>
				<view class="d2">
					保费：67.00元
					&nbsp;&nbsp;&nbsp;&nbsp;
					保额：78元 </view>
				<view class="d3">保障期限：<span>
						终身
					</span></view>
			</view>
			<view class="gl_li ">
				<view class="li_type">重疾险</view>
				<view class="li_cz dis_flex ju_b">
					<view></view>
					<view class="li_go dis_flex aic ju_b">
						<span v-if="datas.operation==2">移动</span>
						<view v-if="datas.operation==2" class="li_go_fx dis_flex">
							<a href="###" @tap="move(9,1)"><img :src="getimg('/static/web/images/go_up.png')" alt=""></a>
							<a href="###" @tap="move(9,2)"><img :src="getimg('/static/web/images/go_down.png')" alt=""></a></view>
					</view>
				</view>
				<view class="youxiao_icon"></view>
				<view class="d1">1</view>
				<view class="d2">被保险人：1</view>
				<view class="d2">
					保费：1.00元
					&nbsp;&nbsp;&nbsp;&nbsp;
					保额：1元 </view>
				<view class="d3">保障期限：<span>终身</span></view> 
				<view v-if="datas.operation==2" @tap="tixing(9)" class="li_tx dis_flex aic ju_c">自动提醒</view>
			</view>
			<view class="gl_li ">
				<view class="li_type">重疾险</view>
				<view class="li_cz dis_flex ju_b">
					<view></view>
					<view class="li_go dis_flex aic ju_b">
						<span v-if="datas.operation==2">移动</span>
						<view v-if="datas.operation==2" class="li_go_fx dis_flex">
							<a href="###" @tap="move(6,1)"><img :src="getimg('/static/web/images/go_up.png')" alt=""></a>
							<a href="###" @tap="move(6,2)"><img :src="getimg('/static/web/images/go_down.png')" alt=""></a>
						</view>
					</view>
				</view>
				<view class="youxiao_icon"></view>
				<view class="d1">sss</view>
				<view class="d2">被保险人：s1</view>
				<view class="d2">
					保费：1.00元
					&nbsp;&nbsp;&nbsp;&nbsp;
					保额：2元 </view>
				<view class="d3">保障期限：<span>
						终身
					</span></view>
			</view>
		</view>
		<view class="gl_btn_box dis_flex ju_a" v-if="datas.operation==2">
			<a @tap="jump" data-url="/pages_fk/examine/examine" href="/index/examine" class="dis_flex aic ju_c">查看保单</a>
			<a @tap="jump" data-url="/pages_fk/policyAdd/policyAdd" href="/index/policyAdd" class="dis_flex aic ju_c">录入保单</a>
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
				share_id:'',
				share_look_ids:'',
				datas:{
					operation:2
				},
				insuredData:[
					{"insured": "s1"},
					{"insured": "3"},
					{"insured": "11"},
					{"insured": "bb"},
				],
				cur_p:-1,
				policyData:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			that=this
			if(option.share_id){
				that.share_id=option.share_id
			}
			if(option.share_look_ids){
				that.share_look_ids=option.share_look_ids
			}
			// that.getdata()
		},
		onShareAppMessage(res) {
			
			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			return {
			  title: '小兔保',
			  path: '/pages_fk/policyList/policyList?share_id='+loginDatas.id+'&share_look_ids=',
			  success: function (res) {
			    console.log('成功', res)
			  }
			}
		},
		methods: {
			cur_fuc(num){
				that.cur_p=num
				// that.getdata()
			},
			tixing(id){
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				var data = {
					token:that.loginDatas.userToken,
					id:id
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/policy/setRemind'
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.getdata()
							
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
						title: '操作失败'
					})
				})
			},
			move(id,type){
				if(that.datas.operation==1){
					return
				}
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				var data = {
					token:that.loginDatas.userToken,
					id:id,
					type:type
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/policy/move'
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.getdata()
							
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
				var that = this
				var data = {
					token:that.loginDatas.userToken,
					share_id:that.share_id,
					share_look_ids:that.share_look_ids
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/policy/index'
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
						that.datas = datas
						that.insuredData=datas.insuredData
						that.policyData=datas.policyData
						/*if(page_that==1){
							that.datas = datas.data
						}else{
							if(datas.data.length==0){
								that.data_last=true
								return
							}
							that.datas = that.datas.concat(datas.data)
						}
						that.page++
						console.log(datas)*/
			
			
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
			down_fuc(url) {
				// return
				var that = this
				uni.showLoading({
					title: '正在拉取数据'
				})
				// console.log(service.IPurl + '/user/getExcel?id=' + that.id + '&token=' + that.loginDatas.userToken)
				console.log(url)
				var now = Date.parse(new Date())
				uni.downloadFile({
					// url: service.IPurl + '/user/getExcel?id=' + that.id + '&token=' + that.loginDatas.userToken, //仅为示例，并非真实的资源
					url: service.imgurl+url,
					// filePath: wx.env.USER_DATA_PATH + '/' + now + '.xlsx',
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							console.log(res);
							uni.hideLoading()
							// uni.showToast({
							// 	icon: 'none',
							// 	title: '保存成功'
							// })
							var filePath = res.tempFilePath;
							wx.openDocument({
								filePath: filePath,
								showMenu: true,
								success: function(res) {
									console.log('打开文档成功')
								},
								fail: function(res) {
									console.log(res);
								},
								complete: function(res) {
									console.log(res);
								}
							})
						}
					}
				});
			},
			getimg(img) {
				return service.getimg(img)
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
	.minh100 {
		background: #F2F2F2;
	}

	.gl_box1 {
		width: 100%;
		height: 197upx;
		background-size: cover;
		/* background-image: url(/static/web/images/glbg_01.jpg); */
		background-repeat: no-repeat;
		background-position: center;
	}

	.gl_box1_bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 197upx;
		z-index: 0;
	}

	.gl_box1>view {
		position: relative;
		z-index: 1;
	}

	.gl_top {
		padding: 37upx 30upx 27upx;
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.gl_title {
		color: #fff;

	}

	.gl_title span {
		padding-left: 5px;
		position: relative;
		font-size: 34upx;
		line-height: 34upx;
		color: #fff;

	}

	.gl_title span:before {

		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 2px;
		height: 34upx;
		background: #fff;
	}

	.gl_title img {
		margin-left: 10px;
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}

	.top_btn {
		width: 40upx;
		height: 40upx;
	}

	.top_btn img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.top_btn+.top_btn {
		margin-left: 21upx;
	}

	.user_box {
		width: 100%;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		overflow-x: auto;
		height: 70upx;
	}

	.user_box::-webkit-scrollbar,
	.user_box::-webkit-scrollbar {
		height: 0 !important;
		-ms-overflow-style: none;
		overflow: -moz-scrollbars-none;
	}

	.user_box1 {
		white-space: nowrap;
		font-size: 0;

	}

	.user_box1>view {
		display: inline-block;
		height: 60upx;
		text-align: center;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.user_box1>view+view {
		margin-left: 47upx;
	}

	.user_box1>view img {
		display: inline-block;
		width: 89upx;
		height: 89upx;
		background: #fff;
		border-radius: 50%;
	}

	.user_box1>view p {
		margin-top: 10upx;
		text-align: center;
		font-size: 26upx;

		font-family: PingFang SC;
		font-weight: bold;
		color: #fff;
	}

	.user_box1>view span {
		display: inline-block;
		margin: 12upx auto 0;
		width: 65upx;
		height: 70upx;
		border-radius: 4upx;


	}

	.user_box1>view.cur span {
		background: #FFFFFF;
	}

	.gl_list {
		width: 100%;
		padding: 40upx 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.gl_li {
		width: 100%;
		height: 243upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		position: relative;
		overflow: hidden;
		padding-top: 59upx;
		padding-left: 40upx;
		padding-right: 24upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 34upx;
	}

	.li_type {
		position: absolute;
		top: 0;
		left: 0;
		width: 124upx;
		height: 38upx;
		display: flex;
		justify-content: center;
		-ms-align-items: center;
		align-items: center;
		background: rgba(67, 191, 255, 1);
		border-bottom-right-radius: .38upx;
		text-align: center;
		font-size: 20upx;
		color: #fff;
	}

	.li_cz {
		width: 280upx;
		position: absolute;
		top: 10upx;
		right: 30upx;
	}

	.sc_bd {
		width: 144upx;
		color: #54C5FF;
		font-size: 22upx;
		position: relative;
	}

	.sc_bd img {
		width: 22upx;
		height: 22upx;
	}

	.sc_bd input {
		min-width: 0;
		width: 144upx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}

	.li_go {
		width: 90upx;
		color: #54C5FF;
		font-size: 22upx;
	}

	.li_go_fx {
		flex-direction: column;
		justify-content: space-between;
		height: 50upx;
	}

	.li_go_fx a {
		width: 24upx;
		height: 16upx;
	}

	.li_go_fx a img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.youxiao_icon {
		width: 134upx;
		height: 134upx;
		position: absolute;
		top: 56upx;
		right: 75upx;
		z-index: 9;
	}

	.youxiao_icon img {
		width: 100%;
		height: 100%;
	}

	.gl_li .d1 {
		font-size: 26upx;
		line-height: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #43BFFF;
		margin-bottom: 22upx;
	}

	.gl_li .d2 {
		font-size: 22upx;
		line-height: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		margin-bottom: 22upx;
	}

	.gl_li .d3 {
		font-size: 22upx;
		line-height: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
	}

	.gl_li .d3 span {
		color: #43BFFF;
	}

	.gl_li .d3 em {
		margin: 0 4upx;
	}

	.li_tx {
		position: absolute;
		right: 17upx;
		bottom: 19upx;
		width: 138upx;
		height: 48upx;
		border-radius: .48upx;
		background: rgba(67, 191, 255, 1);
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		z-index: 10;
		font-size: 22upx;
		color: #fff;
	}

	.gl_btn_box {
		margin-top: 55upx;
		margin-bottom: 55upx;
	}

	.gl_btn_box a {
		font-size: 34upx;
		color: #fff;
		width: 282upx;
		height: 93upx;
		border-radius: 93upx;
		background: rgba(67, 191, 255, 1);
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
