<template>
	<view>
		<div id="detail">
			<div id="getBack">
				<view class="getback" @tap="back">
					<image src="/static/img/back.png" mode="aspectFit"></image>返回
				</view>
				<view @click="collection" :class="isLike != 0?'van-button--warning':'van-button--info'" class="collection">
					<!-- <i :class="isLike != 0?'van-icon-like':'van-icon-like-o'" class="van-icon  van-button__icon"></i> -->
					<text class="iconfont" :class="isLike != 0?'icon-yishoucang':'icon-shoucang'"></text>
					<span class="van-button__text">
						{{isLike != 0?'已收藏':'收藏'}}
					</span>
				</view>
			</div>
			<!-- <van-button class="collection" :type="isLike != 0?'warning':'info'" hairline round  :icon="isLike != 0 ?'like':'like-o'" @click="collection" size="small">
						{{isLike != 0?'已收藏':'收藏'}}
				</van-button> -->


			<view class="tableBox">
				<view class="table" :style="'width:'+ tableWidth">
					<!-- 左侧分级表头 -->
					<view class="tableCol_left">
						<view class="row_left" v-for="(val,index) in compareLeftData" :key="index">
							<view v-if="val.value.length>0" style="borderTop:0;flex-wrap: wrap;" class="dis_flex aic">
								<view class="col_left_1" :class="{canClick : val.link == 'true'}">
									<view class="oh2">{{val.name}}</view>
								</view>
								<view style="border:0">
									<view class="col_left col-leftIn dis_flex aic ju_c" :class="{canClick : valLeft.slink == 'true',detail : valLeft.sdetail != ''}"
									 v-for="(valLeft,indexLeft) in val.value" :key="indexLeft">
										<!-- <span @click="toCompareDetail(valLeft.slink,valLeft.sid)">{{valLeft.sname}}</span> -->
										<!-- <van-icon name="question-o" v-if="valLeft.sdetail != ''" class="icons red"/> -->
										<img src="/static/img/icons.png" v-if="valLeft.sdetail != ''" class="questionIcon">
										<view class="oh2">
											<span @tap="showPopup(valLeft.slink,valLeft.sid,valLeft.sname,valLeft.sdetail)">{{valLeft.sname}}</span>
										</view>
									</view>
								</view>
							</view>
							<view class="col_left" v-else style="width:100%;marginLeft:0;borderTop:0" :class="{canClick : val.link == 'true', col_left_One : index == 0,detail : val.detail != ''}">
								<!-- <span @click="toCompareDetail(val.link,val.sid)">{{val.name}}</span> -->
								<!-- <van-icon name="question-o" v-if="val.detail != ''" class="icons red"/> -->
								<img src="/static/img/icons.png" v-if="val.detail != ''" class="questionIcon">
								<!-- <van-icon name="more-o" v-if="val.link == 'true'" class="icons"/> -->
								<view class="oh2">
									<span@tap="showPopup(val.link,val.sid,val.name,val.detail)">{{val.name}}</span>
								</view>
							</view>
						</view>
					</view>
					<!-- 右侧内容数据 -->
					<view class="tableCol_right" :class="index == 0 ? 'tableCol_rightMargin' : ''" v-for="(val,index) in compareInfo.length"
					 :key="index">
						<view class="row_right" :class="indexInfo == 0 ? 'row_rightTop' : ''" v-for="(valInfo,indexInfo) in compareInfo[index]"
						 :key="indexInfo" style=" width: clac(100vw - 150px)">
							<span class="tobuy" v-if="valInfo.indexOf('buyNet') !=-1" @tap="buy_fuc(valInfo)">
								购买
							</span>
							<span v-else :class="[valInfo.indexOf('Tel') !=-1 ? 'tels':'',valInfo.split('Length')[1]== undefined ? '':'canClick']"
							 @tap="rightShowPopup(valInfo)">
								{{valInfo.split("Tk,")[0].split("Tel")[0].split('Length')[0]}}
							</span>
						</view>
					</view>
				</view>
			</view>
			<view class="xt_tk" v-if="popShow">
				<view class="flex_1" style="width: 100%;" @tap="popShow=false"></view>
				<view class="popContainer">
					<p class="popText">{{popText}}</p>
					<p class="popTexts" v-for="(val,index) in popDetail" :key="index">{{val}}</p>
					<view class="btnLeft" v-if="thisLink == 'true'">
						<!-- <van-button hairline type="info" size="small" @click="toCompareDetail(thisLink)">
							点击查看
						</van-button> -->
						<view @tap="toCompareDetail(thisLink)">
							点击查看
						</view>
					</view>
					
				</view>
				<view class="flex_1" style="width: 100%;" @tap="popShow=false"></view>
			</view>
			<!--
			<van-popup v-model="popShow">
				<div class="popContainer">
					<p class="popText">{{popText}}</p>
					<p class="popTexts" v-for="(val,index) in popDetail" :key="index">{{val}}</p>
					<div class="btnLeft" v-if="thisLink == 'true'">
						<van-button hairline type="info" size="small" @click="toCompareDetail()">
							点击查看
						</van-button>
					</div>
				</div>
			</van-popup>
			<van-popup v-model="rightPopShow">
				<div class="popContainer">
					<p class="popText" v-for="(val,index) in rightPopText" :key="index">{{val}}</p>
					<div class="btnLeft both">
						<a class="btnTel" :href="'tel:'+ rightPopText" v-if="canTel">立即咨询</a>
						<van-button hairline type="info" size="small" v-if="seeAdr != undefined" @click="rightPop(seeAdr)">
							点击查看
						</van-button>
						<van-button hairline type="danger" size="small" v-if="downloadAdr != undefined" @click="rightPop(downloadAdr)">
							点击下载
						</van-button>
					</div>
				</div>
			</van-popup>



			-->
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
	var type
	var ids
	var openId
	export default {
		data() {
			return {
				tableWidth: 0,
				compareLeftData: [],
				compareInfo: [],
				type: '',
				rightWidth: 0,
				isLike: false,
				popShow: false,
				rightPopShow: false,
				popText: '',
				popDetail: '',
				rightPopText: '',
				thisSid: '',
				thisLink: false,
				seeAdr: '',
				downloadAdr: '',
				canTel: true,
				ids: '',
				openId: '',

				btnkg: 0
			}
		},
		onLoad() {
			that = this
			type = JSON.parse(uni.getStorageSync('details')).type;
			ids = JSON.parse(uni.getStorageSync('details')).id;
			openId = uni.getStorageSync('openId');

			that.getdata()
			
			/*this.compareLeftData = resdata.data.name.slice(0, 1)[0];
			this.compareInfo = resdata.data.name.slice(1);
			var width = this.compareInfo.length * 70 + 70;
			this.tableWidth = '100vw';
			this.isLike = this.compareLeftData[0].issc;*/
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			buy_fuc(valInfo){
				var url=valInfo.split('buyNet')[1].split('Length')[0]
				uni.setStorageSync('web_url',url)
				uni.navigateTo({
					url:'/pages/new_html/new_html'
				})
			},
			getdata() {
				if (that.btnkg == 1) {
					return
				}
				that.btnkg = 1
				var serchData = JSON.parse(uni.getStorageSync('detailData'));
				let datas = {
					fid: "S0007",
					type: type,
					openId: this.$store.state.loginDatas.openId,
					keyword: "",
					ids: ids,
					sorts: false
				}
				var jkurl = service.imgurl_w+'/bx/mobile'
				var header = {
					'content-type': 'application/json'
				}
				var page_that = this.pageIndex
				service.P_post(jkurl, datas, header).then(res => {
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

						that.compareLeftData = datas.name.slice(0, 1)[0];
						that.compareInfo = datas.name.slice(1);
						var width = that.compareInfo.length * 70 + 70;
						that.tableWidth = '100vw';
						// that.rightWidth = w - 70;
						that.isLike = that.compareLeftData[0].issc;

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
			toCompareDetail() {
				let data = {
					type: type,
					sid: this.thisSid,
					num: this.compareInfo.length,
				}
				// this.$router.push({
				// 	name: `compareDetail`,
				// 	params: {
				// 		data: data
				// 	}
				// });
				// window.location.href = 'compareDetail.html'
				uni.navigateTo({
					url:'/pagesA/compareDetail/compareDetail?data='+JSON.stringify(data)
				})
			},
			collection() {
				var that = this
				if (that.btnkg == 1) {
					return
				}
				that.btnkg = 1
				if (this.isLike == 0) {
					this.isLike = 1;
				} else {
					this.isLike = 0;
				}
				// return
				var details = JSON.parse(uni.getStorageSync('details'));
				let datas = {
					fid: "S0019",
					openId: this.$store.state.loginDatas.openId,
					flag: this.isLike,
					id: details.id[0],
				}
				var jkurl = service.imgurl_w+'/bx/mobile'
				var header = {
					'content-type': 'application/json'
				}
				service.P_post(jkurl, datas, header).then(res => {
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
			showPopup(key, val, name, detail) {
				this.popShow = true;
				this.thisLink = key;
				this.thisSid = val;
				this.popText = name;
				let str = detail;
				str = str.split("\\n");
				this.popDetail = str;
				/*uni.showModal({
					title: that.popText,
					content: that.popDetail.join(';'),
					showCancel: false,
					confirmText: '关闭',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});*/
			},
			rightShowPopup(val) {
				if (val.indexOf('Tel') != -1) {
					this.canTel = true;
				} else {
					this.canTel = false;
				}
				this.seeAdr = val.split("Tk,")[1];
				this.downloadAdr = val.split("Tk,")[2];
				if (this.downloadAdr && this.downloadAdr.indexOf('Length') != -1) {
					this.downloadAdr = this.downloadAdr.split("Length")[0];
				}
				this.rightPopShow = true;
				console.log(val)
				that.rightPopText = val.split("Tk,")[0].split("Tel")[0].split("Length")[0].split("\\n");
				console.log(that.rightPopText)
				if (that.canTel) {
					uni.showModal({
						title: '系统提示',
						content: '是否拨打' + that.rightPopText + '?',
						success: function(res) {
							if (res.confirm) {
								wx.makePhoneCall({
									phoneNumber: that.rightPopText + ''
								})
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (that.downloadAdr) {
					uni.showModal({
						title: '系统提示',
						content: that.rightPopText.join(''),
						confirmText: '下载查看',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								that.down_fuc(that.downloadAdr)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.showModal({
						title: '系统提示',
						content: that.rightPopText.join(''),
						showCancel: false,
						confirmText: '关闭',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			rightPop(val) {
				console.log(val)
				window.location.href = val;
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
					url: url,
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
							// uni.saveFile({
							//      tempFilePath: res.tempFilePath,
							//      success: function (res) {
							// 			uni.hideLoading()
							// 			uni.showToast({
							// 				icon:'none',
							// 				title:'保存成功'
							// 			})
							// 			console.log(res)
							//        // var savedFilePath = res.savedFilePath;
							//      }
							//    });
						}
					}
				});
			},

		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		min-height: 100%;
		background: rgb(242, 246, 250);
		/* background: url("../static/img/bg1.png") repeat;
		        background-position-y: top;
		        background-size: 100%; */
		/* padding-bottom:30px; */
	}



	.tableBox {
		width: 100%;
		height: 100%;
		overflow-x: scroll;
		text-align: center;
	}

	.tableCol_left {
		position: absolute;
		top: 100upx;
		left: 0;
		background: #5c93e6;
		color: #fff;
		z-index: 2;
	}

	.tableCol_left_scoll {
		position: fixed;
	}

	.tableCol_right {
		position: relative;
		/* padding-top:30px; */
		padding-top: 40px;
	}

	.tableCol_rightMargin {
		margin-left: 150px;
	}

	.row_rightTop {
		position: absolute;
		top: 0px;
		left: 0;
		right: 0;
	}

	.row_left {
		width: 150px;
		/* min-height:30px; */
		/* min-height: 40px; */
		min-height: 40px;
		position: relative;
		border: none;
	}

	.row_left+.row_left {
		position: relative;
		/* border-top: 1px solid #e0e0e0; */
		border-left: 1px solid #e0e0e0;
		border-right: 1px solid #e0e0e0;
	}

	.row_left+.row_left::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 1px;
		background: #e0e0e0;
	}

	.col_left_One {
		/* border-top: 1px solid #e0e0e0 !important; */
		border-right: 1px solid #e0e0e0 !important;
		border-left: 1px solid #e0e0e0;
		position: relative;
	}

	.col_left_One::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 1px;
		background: #e0e0e0;
	}

	.row_left view.col_left_1 {
		width: 78px;
		/* position: absolute;
		top: 50%;
		transform: translateY(-50%); */
		border: 0;
		/* line-height: 12px; */
		line-height: 20px;
	}

	.col_left {
		/* height:30px; */
		min-height: 40px;
		line-height: 30upx;
		width: 70px;
		font-size: 24upx;
		overflow-y: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.row_left .col-leftIn {
		border: 0;
		border-bottom: 1px solid #e0e0e0;
		border-left: 1px solid #e0e0e0;
		/* border-right: 1px solid #e0e0e0; */
	}

	.row_left .col-leftIn:last-child {
		border-bottom: 0;
		/* height: 29px; */
		height: 39px;
	}

	.row_right {
		/* width: 150px; */
		/* height:30px; */
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #e0e0e0;
		border-right: 1px solid #e0e0e0;
		/* overflow-x: auto;
		        white-space: nowrap; */
		overflow-y: hidden;
		background: #fff;
	}

	.row_right:nth-child(odd) {
		background: rgba(241, 241, 241, 0.197);
	}

	.row_right:first-child {
		background: #5c93e6;
		color: #fff;
		border: 1px solid #e0e0e0;
		border-left: 0;
	}

	.canClick {
		color: #4343f6;
		/* text-decoration: underline; */
	}

	.detail {
		/* color:rgb(24, 103, 194);
		        text-decoration: underline; */
	}

	.canSort {
		color: rgb(214, 186, 26);
		text-decoration: underline;
	}

	.van-dropdown-menu {
		/* width: 30% */
		color: rgb(55, 55, 248);
	}

	.van-dropdown-menu::after {
		border: none;
	}

	.sortsBox {
		height: 50px;
		position: relative;
	}



	.van-popup {
		border-radius: 10px;
	}

	.popContainer {
		width: 280px;
		min-height: 150px;
		padding: 15px;
		text-align: center;
		position: relative;
	}

	.popText {
		font-size: 16px;
		font-weight: 500;
		white-space: pre-wrap;
		/* color:rgb(55, 55, 248); */
		/* text-decoration: underline; */
	}

	.popTexts {
		text-align: left;
		margin-top: 12px;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: .2px;
		color: rgb(0, 0, 255);
		white-space: pre-wrap;
	}

	.btnLeft {
		position: absolute;
		transform: translateX(-50%);
		left: 50%;
		bottom: 10px;
		width: 100%;
	}

	.btnLeft .van-button {
		box-shadow: 2px 4px 6px rgb(188, 189, 190);
	}

	.btnLeft.both .van-button {
		margin: 0 15px;
	}

	.icons {
		transform: translateY(2px);
		margin-right: 5px;
		color: rgb(240, 117, 69);
	}

	.red {
		color: red;
	}

	.btnTel {
		display: block;
		width: 80px;
		height: 30px;
		margin: 0 auto;
		line-height: 30px;
		color: #fff;
		background: rgba(57, 152, 246, 0.855);
		border-radius: 4px;
		box-shadow: 2px 4px 6px rgb(188, 189, 190);
		font-size: 14px;
	}

	.tels {
		color: rgb(67, 67, 246);
		text-decoration: underline;
	}

	.questionIcon {
		width: 24upx;
		height: 24upx;
		/* transform: translateY(2px); */
		/* margin-right:5px; */
		margin-right: 1px;
	}

	.tobuy  {
		color: rgb(67, 67, 246);
		text-decoration: underline;
	}

	#getBack {
		width: 100%;
		height: 100upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 30upx;
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

	.getback image {
		width: 14upx;
		height: 30upx;
		margin-right: 10upx;
	}

	.collection {
		box-shadow: 2px 4px 5px rgb(188, 189, 190);
		min-width: 120upx;
		height: 60upx;
		padding: 0 8upx;
		font-size: 24upx;
		line-height: 60upx;
		overflow: hidden;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background-color: #1989fa;
		border: 1px solid #1989fa;
	}

	.van-button--warning {
		background-color: #ff976a;
		border: 1px solid #ff976a;
	}

	.collection text {
		font-size: 24upx;
		margin-right: 5upx;
	}
	
	.xt_tk{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.7);
		z-index: 2025;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	
	
	.popContainer {
		width: 280px;
		min-height: 150px;
		padding: 15px;
		text-align: center;
		position: relative;
		background: #fff;
		border-radius: 10px;
	}
	
	.popText {
		font-size: 16px;
		font-weight: 500;
		white-space: pre-wrap;
		/* color:rgb(55, 55, 248); */
		/* text-decoration: underline; */
	}
	
	.popTexts {
		text-align: left;
		margin-top: 12px;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: .2px;
		color: rgb(0, 0, 255);
		white-space: pre-wrap;
	}
	
	.btnLeft {
		position: absolute;
		transform: translateX(-50%);
		left: 50%;
		bottom: 10px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.btnLeft view{
		min-width: 100upx;
		height: 60upx;
		padding: 0 15upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1989fa;
		font-size: 24upx;
		color: #fff;
	}
	.btnLeft view+view{
		
		background-color: #f44;
	}
	.canClick {
	    color: #4343f6;
	}
</style>
