<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='getbanner'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="/static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view v-if="shell==2" class="h_box">
				<view class="top_box">
					<image class="top_img" :src="getimg('/static/images/xiaotujingxuan1_03.jpg')" mode="aspectFit"></image>
					<view>Hi~ 欢迎使用小兔保</view>
				</view>
				<view class="main_box dis_flex">
					<view v-for="(item,index) in banner" @tap="jump" :data-url="item.jump_url">
						<image :src="getimg(item.pic)" mode="aspectFill"></image>
					</view>
					<!-- <view @tap="jump" data-url="/pages/index1/index1"><image :src="getimg('/static/images/xiaotujingxuan_08.jpg')" mode="aspectFill"></image></view>
					<view><image :src="getimg('/static/images/xiaotujingxuan_11.jpg')" mode="aspectFill"></image></view>
					<view><image :src="getimg('/static/images/xiaotujingxuan_12.jpg')" mode="aspectFill"></image></view> -->
				</view>
			</view>
			<view v-else>
				<view class="container">
					<view bindtap="bindAddCur" class="pageHead">
						<view class="userinfo dis_flex aic">
							<image class="userinfo-avatar" src="/static/images/logo.png" mode="aspectFit"></image>
							<text class="userinfo-nickname">欢迎使用小兔汇率计算器</text>
						</view>

						<view class="addCur" @tap="bindAddCur">
							<!-- <text>+</text> -->
						</view>
					</view>
					<view class="cur_main">
						<view>
							<image :src="'/static/images/id128/'+myMainCur.name+'.png'" class="cur_logo" />
						</view>
						<view class="middle">
							<view class="top">
								<view>
									<text>{{myMainCur.name}} {{myMainCur.cn}}</text>
								</view>
								<view class="datetimeTxt">
									<text>{{curDate}}</text>
								</view>
							</view>
							<view class="amountInput">
								<input  placeholder="100" v-model="cny_num" maxlength="180" type="digit" />
							</view>
						</view>

					</view>
					<scroll-view scroll-y="true" style="height:calc(100vh - 250upx);">
						<block v-for="(item,index) in mySelectCurs">
							<view class="item" :data-text="item.cn" :data-id="item.name">
								<view>
									<image :src="'/static/images/id128/'+item.name+'.png'" class="cur_logo" />
								</view>
								<view class="middle">
									<view>
										<text>{{item.name}} {{item.cn}}</text>
									</view>
									<view class="rateTxt">
										<text>{{cny_num? getxj(cny_num,item):0}}</text>
									</view>
								</view>

								<view class="right">
									<text>1 {{item.name}}＝{{item.rate}}{{myMainCur.name}} </text>
								</view>

							</view>
						</block>
					</scroll-view>
				</view>
			</view>
		</block>
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
				htmlReset: -1,
				title: 'Hello',
				banner: [],
				shell: 2,



				curDate: {},
				userInfo: {},
				cny_num:'',
				myMainCur: {
					"name": "CNY",
					"country": "中国",
					"rate": 0.0,
					"amount": 100.0,
					"en": "RMB",
					"cn": "人民币",
					"jp": "香港ドル",
					"ko": "홍콩 달러"
				},
				mySelectCurs: [{
						"ExtensionData": {},
						"amount": 0,
						"cn": "港元",
						"country": "港元",
						"en": "Hong Kong Dollar",
						"jp": "香港ドル",
						"ko": "홍콩 달러",
						"name": "HKD",
						"order": 0,
						"rate": 88.853
					},
					{
						"ExtensionData": {},
						"amount": 0,
						"cn": "韩元",
						"country": "韩元",
						"en": "South-Korean Won",
						"jp": "韓国ウォン",
						"ko": "대한민국 원",
						"name": "KRW",
						"order": 0,
						"rate": 0.585
					},
					{
						"ExtensionData": {},
						"amount": 0,
						"cn": "欧元",
						"country": "欧元",
						"en": "Euro",
						"jp": "ユーロ",
						"ko": "유로",
						"name": "EUR",
						"order": 0,
						"rate": 733.45
					}, {
						"ExtensionData": {},
						"amount": 0,
						"cn": "美元",
						"country": "美元",
						"en": "US Dollar",
						"jp": "米国ドル",
						"ko": "미국 달러",
						"name": "USD",
						"order": 0,
						"rate": 689.15
					},
					{
						"ExtensionData": {},
						"amount": 0,
						"cn": "加拿大元",
						"country": "加拿大元",
						"en": "Canadian Dollar",
						"jp": "カナダ ドル",
						"ko": "캐나다 달러",
						"name": "CAD",
						"order": 0,
						"rate": 512.341
					},
					{
						"ExtensionData": {},
						"amount": 0,
						"cn": "俄罗斯卢布",
						"country": "俄罗斯卢布",
						"en": "Russian Rouble",
						"jp": "ロシア ルーブル",
						"ko": "러시아 루블",
						"name": "RUB",
						"order": 0,
						"rate": 10.741
					},
					{
						"ExtensionData": {},
						"amount": 0,
						"cn": "日元",
						"country": "日元",
						"en": "Japanese Yen",
						"jp": "日本円",
						"ko": "일본 엔",
						"name": "JPY",
						"order": 0,
						"rate": 6.235
					},
					{
						"ExtensionData": {},
						"amount": 0,
						"cn": "泰铢",
						"country": "泰铢",
						"en": "Thai Baht",
						"jp": "タイ バーツ",
						"ko": "태국 바트",
						"name": "THB",
						"order": 0,
						"rate": 19.451
					}
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			that = this
			that.getbanner()

		},
		onShow: function() {
			// 页面显示
			//获取用户收藏的货币
			var that = this
			if (that.shell == 1) {
				// wx.getStorage({
				// 	key: 'mySelectCurs',
				// 	success: function(res) {
				// 		console.info("onShow:", res.data);
				// 		that.setData({
				// 			mySelectCurs: res.data
				// 		})
				// 	}
				// })
			}
		},
		onPullDownRefresh() {
			that.getbanner()
		},
		onShareAppMessage() {

		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			getxj(num,item){
				var xj=num
				xj=xj*item.rate*0.01
				xj=xj.toFixed(5)
				xj=xj*1
				return xj
			},
			formatTime_fuc(date) {
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				if (month < 10) month = '0' + month
				if (day < 10) day = '0' + day
				var hour = date.getHours()
				var minute = date.getMinutes()
				var second = date.getSeconds()

				console.log(year)
				return year + '-' + month + '-' + day
				// return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
			},
			getimg(img) {
				return service.getimg(img)
			},
			getbanner() {

				///api/info/list

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
						that.htmlReset = 0
						that.shell = res.shell
						that.banner = datas
						console.log(datas)
						if (res.shell == 1) {
							that.curDate = that.formatTime_fuc(new Date())
							//获取用户收藏的货币



						}

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
								title: '操作失败'
							})
						}
					}
				}).catch(e => {

					that.htmlReset = 1
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



			longtapFormSet: function(event) {
				var that = this

				wx.showActionSheet({
					itemList: ['设 ' + event.currentTarget.dataset.text + ' 为主货币？', '删除 ' + event.currentTarget.dataset.text + '?'],
					success: function(res) {
						if (!res.cancel) {
							if (res.tapIndex == 0) {
								var temppp = that.data.myMainCur;

								const length = that.data.mySelectCurs.length;
								for (let i = 0; i < length; i++) {
									if (event.currentTarget.dataset.id == that.data.mySelectCurs[i].name) {
										that.data.myMainCur = that.data.mySelectCurs[i];
										that.data.myMainCur.amount = temppp.amount;
										that.data.mySelectCurs[i] = temppp;
										break;
									}
								}
								that.setData({
									mySelectCurs: that.data.mySelectCurs
								})
								that.setData({
									myMainCur: that.data.myMainCur
								})


								wx.setStorage({
									key: "myMainCur",
									data: that.data.myMainCur
								})

								wx.setStorage({
									key: "mySelectCurs",
									data: that.data.mySelectCurs
								})

								that.rateCount(that.data.myMainCur.amount);
							}

							if (res.tapIndex == 1) {
								wx.showModal({
									title: '系统提示',
									content: '确定要删除：' + event.currentTarget.dataset.text + '?',
									success: function(res) {
										if (res.confirm) {
											util.removeByValue(that.data.mySelectCurs, event.currentTarget.dataset.id);
											that.setData({
												mySelectCurs: that.data.mySelectCurs
											})

											wx.setStorage({
												key: "mySelectCurs",
												data: that.data.mySelectCurs
											})
										}
									}
								})
							}
						}
					}
				})
			},

			//增加货币
			bindAddCur: function() {
				var thisUrl = '../addCur/addCur'
				wx.navigateTo({
					url: thisUrl
				})
			},
			bindViewTap: function() {},

			bindKeyInput: function(e) {
				var that = this
				that.myMainCur.amount = e.detail.value;
				// wx.setStorage({
				// 	key: "myMainCur",
				// 	data: that.data.myMainCur
				// })
				that.rateCount(that.myMainCur.amount);
			},

			rateCount: function(e) {
				var that = this
			
				const length = that.mySelectCurs.length;
				if (length > 0) {
					var toss = that.mySelectCurs[0].name;
					for (let i = 1; i < length; i++) {
						toss = toss + "," + that.mySelectCurs[i].name;
					}

				console.log(toss)
					/*var jsonn = util.json2Form({
						"from": that.myMainCur.name,
						"tos": toss,
						"amount": e
					});*/

				

				}
			},

		}
	}
</script>

<style scoped>
	.h_box {
		width: 100%;
		padding: 0 20upx;

	}

	.top_box {
		width: 100%;
		height: 195upx;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 42upx;
		color: #37424A;
	}

	.top_box view {
		position: relative;
		z-index: 10;
	}

	.top_img {
		width: 100%;
		height: 195upx;
		position: absolute;
		z-index: 1;
		/* margin-bottom: 10upx; */
	}

	.main_box {
		flex-wrap: wrap;
		width: 100%;
	}

	.main_box view {
		width: 50%;
		height: 470upx;
		padding: 10upx;
	}

	.main_box view image {
		width: 100%;
		height: 100%;
	}






	/**index.wxss**/
	.userinfo {
		display: flex;
		flex-direction: row;
		align-items: left;
	}

	.userinfo-avatar {
		width: 60rpx;
		height: 60rpx;
		margin-left: 30rpx;
		margin-top: -6rpx;
		margin-right: 10rpx;
		margin-bottom: 0rpx;
		border-radius: 50%;
	}

	.userinfo-nickname {
		font-size: 12pt;
		color: black;
	}

	.pageHead {
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.addCur {
		font-family: "serif";
		font-size: 28pt;
		color: blue;
		margin-top: -24rpx;
		margin-right: 24rpx;
		overflow: hidden;
	}

	.datetimeTxt {
		/* margin-top: -10rpx; */
	}

	.addImage {
		margin-right: 30rpx;
	}

	.cur_main {
		display: flex;
		flex-direction: row;
		padding: 24rpx;
		/* margin-top: 28rpx; */
		background-color: #f3f3f3;
		border-top: 1rpx solid #d0d0d0;
		border-bottom: 1rpx solid #d0d0d0;
	}

	.cur_logo {
		width: 138rpx;
		height: 90rpx;
	}

	.amountInput {
		padding-left: 10rpx;
		margin-top: 6rpx;
		margin-right: 60rpx;
		border: 1rpx solid #888;
		font-size: 14pt;
	}

	.rateTxt {
		margin-top: 1rpx;
		font-size: 16pt;
	}

	.middle {
		flex: 1;
		margin-left: 20rpx;
	}

	.right {
		font-size: 9pt;
		margin-top: 50rpx;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		display: flex;
		padding: 24rpx;
		margin-left: 8rpx;
		margin-right: 8rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #d0d0d0;
	}
</style>
