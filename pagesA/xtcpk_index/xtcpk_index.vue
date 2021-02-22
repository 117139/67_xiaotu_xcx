<template>
	<view class="minh100">
		<z_text></z_text>
		<view id="index">
			<view>
				<view class="top_box">
					<view class="getback" @tap="back"><image src="/static/img/back.png" mode="aspectFit"></image>返回</view>
					<view class="dataNum">共{{pcount}}条/{{Insurances.length}}条</view>
				</view>
				<view id="buttonBox">
					<button class="compare van-button van-button--default van-button--normal" @click="toCompare" v-if="Insurances.length>0"
					 :class="compare ? 'compareing':''">
						<span class="van-button__text">
							{{compare ? '确定':'对比'}}
						</span>
					</button>
				</view>
				<view class="compare" @click="toCompare" v-if="Insurances.length>0" :class="compare ? 'compareing':''">
					{{compare ? '确定':'对比'}}
				</view>
				<view class="dataBox">
					
					<ul v-if="Insurances.length>0" class="insurancesData">
						<view class="ss_li" :id="item.id" v-for="(item,index) in Insurances" :class="[checkedData.indexOf(item.pid) != -1 ? 'compareChecked':'',item.isOnline == '0' ? 'unOnline':'']"
						 @click="goDetail(item.pid,item.ptypeCode)">
							<text class="liIcon">{{item.ptype[0]}}</text>
							<view class="flex_1 text-cut">{{item.pname}}<span v-if="item.isBuy==1" class="shop">购</span></view>
							
							
						 <image src="/static/img/detail_icon.png" mode="" class="liked"></image>
						</view>

						<li v-if="data_last" class="getMore">
							到底了~~~
						</li>
						<li v-else class="getMore"  @tap="moreAndMore">
							加载更多
						</li>
					</ul>
					<view v-else class="zanwu">暂无数据</view>
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
				search_key: '',
				showPicker: false, //投保人

				compare: false,
				Insurances1: [],
				checkedData: [],
				pageIndex: 1,
				detailData: [],
				type: 'T0',
				froms: '',
				pcount: "",
				Insurances: [],
				data_last:false
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
			uni.setNavigationBarTitle({
				title:option.title
			})
			var froms = uni.getStorageSync("froms")
			uni.showLoading({
				mask:true,
				title:'正在请求数据'
			})
			if (froms == "nameSearch") {
				that.getMore();
			} else if (froms == "contentSearch") {
				that.contentGetMore();
			}
		},
		onShow(){
			
				this.compare = false;
				this.checkedData = [];
				this.type = "T0";
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			moreAndMore() {
				uni.showLoading({
					mask:true,
					title:'正在请求数据'
				})
				var froms = uni.getStorageSync("froms")
				if (froms == "nameSearch") {
					that.getMore();
				} else if (froms == "contentSearch") {
					that.contentGetMore();
				}
			},
			getMore() {
				if (that.btnkg == 1) {
					return
				}
				that.btnkg = 1
				var serchData = JSON.parse(uni.getStorageSync('detailData'));
				var data = {
					fid: 'S0004',
					openId: this.$store.state.loginDatas.openId,
					flag: String(serchData.flag),
					type: serchData.type,
					qType: serchData.qType,
					keyword: serchData.keyword,
					pageSize: this.$store.state.pageSize,
					pageIndex: this.pageIndex,
				}
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
			contentGetMore() {
				if (that.btnkg == 1) {
					return
				}
				that.btnkg = 1
				// var serchData = JSON.parse(sessionStorage.getItem('contentSearchData'));
				var serchData = JSON.parse(uni.getStorageSync('contentSearchData'));
				var data = {
					fid: 'S0004',
					openId: this.$store.state.loginDatas.openId,
					flag: String(serchData.flag),
					type: serchData.type,
					keyword: serchData.keyword,
					contentArray:serchData.data,
					pageSize: this.$store.state.pageSize,
					pageIndex: this.pageIndex,
				}
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
			toCompare: function() { //数据对比
				if (this.compare) {
					if (this.checkedData.length <= 1) {
						uni.showToast({
							icon:'none',
							title:'请至少选择两项内容'
						})
						this.compare = false;
						return false;
					} else {
						// this.$router.push({
						// 	name: `compare`,
						// 	params: {
						// 		compareId: this.checkedData,
						// 		type: this.type
						// 	}
						// });
						var params = {
							compareId: this.checkedData,
							type: this.type
						}
						// window.sessionStorage.setItem('compareInfo', JSON.stringify(params));
						uni.setStorageSync('compareInfo', JSON.stringify(params));
						// window.location.href = 'compare.html'
						uni.navigateTo({
							url:'/pagesA/compare/compare'
						})
					}
				} else {
					this.compare = !this.compare;
				}
			},
			goDetail: function(val, type) { //跳转详情
				if (this.compare) {
					if (this.type == 'T0') {
						this.type = type;
					}
					// } else {
						console.log('对比')
						if (type != this.type) {
							
							uni.showToast({
								icon:'none',
								title:'请选择相同类型对比'
							})
							this.checkedData = [];
							this.type = 'T0';
						} else {
							let thisIndex = this.checkedData.indexOf(val);
							if (thisIndex == -1) {
								if (this.checkedData.length >= 5) {
									// layer.msg('最多可对比五项内容');
									uni.showToast({
										icon:'none',
										title:'最多可对比五项内容'
									})
								} else {
									this.checkedData.splice(0, 0, val);
								}
							} else {
								this.checkedData.splice(thisIndex, 1);
							}
						}
					// }
				} else {
					let detailData = {
						type: type,
						id: [val]
					}
					// this.$store.state.detailData = detailData;
					// sessionStorage.setItem("details", JSON.stringify(detailData));
					uni.setStorageSync("details", JSON.stringify(detailData))
					
					// this.$router.push({
					// 	name: `detail`,
					// });
					// jump('detail.html')
					// window.location.href = 'detail.html'
					uni.navigateTo({
						url:'/pagesA/cp_detail/cp_detail'
					})
				}
			},
			iconCode(code) {
				switch (code) {
					case 'T1':
						return "/static/img/1.png";
						break;
					case 'T2':
						return "/static/img/2.png";
						break;
					case 'T3':
						return "/static/img/3.png";
						break;
					case 'T4':
						return "/static/img/4.png";
						break;
					case 'T5':
						return "/static/img/5.png";
						break;
					case 'T6':
						return "/static/img/6.png";
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
	#index {
		position: relative;
		width: 100%;
		min-height: 100%;
		background: rgb(247, 251, 255);
		/* background: url("../static/img/bg1.png") repeat;
        background-position-y: top;
        background-size: 100%; */
		/* padding-bottom:30px; */
	}

	

	.noData {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		font-size: 16px;
		color: #c9c9c9;
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
		width: 14upx;
		height: 20upx;
		
	}

	.loadingBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .7);
		color: #fff;
	}

	.van-loading__text {
		color: #fff;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.dataBox {
		/* margin-top: 20px; */
		background: rgb(249, 253, 255);
		/* background: linear-gradient( rgba(227, 237, 245, 0.523) , rgba(227, 237, 245, 0)); */
	}

	.getBackBtn {
		padding-top: 20px;
	}



	.getMore {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: none;
		text-align: center;
		font-size: 14px;
		color: rgba(64, 123, 231, 0.932);
		text-shadow: 2px 2px 2px rgba(188, 189, 190, 0.39);
	}
	.compare {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		position: fixed;
		right: 40upx;
		bottom: 150upx;
		box-shadow: 3upx 6upx 10upx #c5c4c44d;
		background: #58acffec;
		color: #fff;
		box-shadow: 2px 4px 8px rgb(188, 189, 190);
		background: linear-gradient(-30deg, #9991e9, #5e78ec);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		color: #fff;
	}
	
	.compareing {
		background: #f33f48;
	}
	.liIcon {
		width: 30upx;
		height: 30upx;
		/* transform: translateY(5px); */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16upx;
		color: #fff;
		background: linear-gradient(-30deg,#9991e9,#5e78ec);
		border-radius: 50%;
		margin-right: 10upx;
	}
	.insurancesData {
		font-size: 16px;
		padding: 10px 10px 10px 10px;
		/* padding-bottom:60px; */
	}
	
	.ss_li {
		width: 100%;
		padding: 10px 0;
		border-bottom: 1px solid rgba(192, 183, 183, 0.363);
		display: flex;
		align-items: center;
		
	}
	
	.ss_li.compareChecked {
		color: #fff;
		background: rgba(76, 123, 231, 0.753);
	}
	
	.ss_li.unOnline {
		color: #aaa;
	}
	
	.ss_li .shop {
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
