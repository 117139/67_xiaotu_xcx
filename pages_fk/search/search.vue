<template>
	<view class="minh100">
		<view id="wrap" class="wrap">
			<view class="s_top dis_flex ju_b">
				<view></view> 
				<view @tap="down_fuc(datas.explain)" class="help_btn">
					<img :src="getimg('/static/web/images/help_b.png')" alt="">
				</view>
			</view> 
			<view href="###" class="shouce dis_flex aic ju_c">
				<image :src="getimg('/static/web/images/btnbg.png')" mode=""></image>
				<text>保险条款词条手册</text>
			</view>
			<view class="jump_box dis_flex boxsiz">
				<view class="ss_box dis_flex aic">
					<i class="iconfont icon-sousuo1"></i> 
					<input type="text" placeholder="搜索词条" v-model="search_key" class="flex_1">
					<picker @change="bindPickerChange" :value="index"  :range="columns">
							<!-- <view class="columns_pick">{{columns[index].text}} <text class="iconfont icon-xiaosanjiao"></text></view> -->
							<view class="select_ss"><span>{{columns[index]}}</span><img :src="getimg('/static/web/images/xsj.png')" alt=""></view>
					</picker>
					
					<view @tap="sub" class="ss_btn dis_flex aic ju_c" :style="'color:'+datas.search_name">开始检索</view>
				</view> <view @tap="jump" data-url="/pages_fk/catalogue/catalogue" class="index_list" :style="'background:'+datas.search_dir">目录</view>
			</view>
			<view class="s_tit"><span>推荐文章</span></view>
			<view class="s_list">
				<view v-for="(item,index) in newsData" @tap="jump_web(item.jump_link)"  class="oh1">{{item.title}}</view>
			</view>
			<view class="s_footer">
				<text v-if="datas.wx_number">微信号：{{datas.wx_number}}</text> 
				<text v-if="datas.email" class="sg">|</text> 
				<text v-if="datas.email">邮箱：{{datas.email}}</text>
			</view>
			<!---->
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
				search_data: '',
				showPicker: false,
				value: '全文',
				columns: [
					'全文',
					'条目',
				],
				index:0,
				search_key:'',
				datas:'',
				newsData:[]
			}
		},
		onLoad() {
			that=this
			that.getdata()
		},
		methods: {
			bindPickerChange(e) { //投保人
				console.log(e)
				this.index = e.detail.value;
				// this.nameValue =this.columns[e.detail.value].value
				// this.showPicker = false;
			},
			sub(){
				console.log(1111)
				uni.navigateTo({
					url:'/pages_fk/getResult/getResult?type='+that.columns[that.index]+'&title='+that.search_key
				})
				
			},
			getdata() {
				var that = this
				var data = {}
				//selectSaraylDetailByUserCard
				var jkurl = '/search/index'
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
						that.newsData = datas.newsData
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
			jump_web(url) {
				if (!url) {
					return
				}
				uni.setStorageSync('web_url', url)
				uni.navigateTo({
					url: '/pages/new_html/new_html'
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
			getimg(img){
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
			}
		}
	}
</script>

<style scoped>
	/* 	body {
		background: #fff;
	} */

	.s_top {
		width: 100%;
		padding: 30upx 30upx 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 124upx;
	}

	.help_btn {
		width: 44upx;
		height: 44upx;
	}

	.help_btn img {
		width: 100%;
		height: 100%;

	}

	.shouce {
		margin: 0 auto;
		width: 262upx;
		height: 82upx;
		font-size: 28upx;
		color: #fff;
		border-radius: 10upx;
		background-size: cover;
		/* background-image: url(/static/web/images/btnbg.png); */
		background-repeat: no-repeat;
		background-position: center;
		position: relative;
	}
	.shouce image{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
	}
	.shouce text{
		position: relative;
		z-index: 1;
	}
	.jump_box {
		margin:40upx auto;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 30upx;
	}

	.index_list {
		width: 134upx;
		height: 72upx;
		text-align: center;
		line-height: 72upx;
		background: #16a6f5;
		font-size: 30upx;
		color: #fff;
		margin-left: 10upx;
		flex: none;
		border-radius: 5upx;
	}

	.ss_box {

		height: 77upx;
		border: 2upx solid rgba(51, 51, 51, 1);
		border-radius: 10upx;

		padding: 8upx 0 8upx 22upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.icon-sousuo1 {
		font-size: 37upx;
		color: #999;
		margin-right: 16upx;
	}

	.ss_box input {
		font-size: 30upx;
		min-width: 0;
		max-width: 162upx;
	}

	.select_ss {
		font-size: 28upx;
		color: #666;
		padding: 0 22upx;
	}

	.select_ss img {
		width: 13upx;
		height: 13upx;
		margin-left: 16upx;
	}

	.ss_btn {
		height: 45upx;
		border-left: 3upx solid #40BDFE;
		font-size: 30upx;
		color: #40BEFE;
		width: 160upx;
	}

	.ss_btn img {
		height: 3upx;
	}

	.s_tit {
		width: 100%;
		border-bottom: 1px solid #F7F7F7;
		padding: 60upx 30upx 14upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.s_tit span {
		border-left: 5upx solid #3DBCFE;
		padding-left: 27upx;
		font-size: 30upx;
		font-weight: bold;
		color: #666;
	}

	.s_list {
		width: 100%;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 220upx;
	}

	.s_list>view {
		display: block;
		font-size: 26upx;
		color: #666;
		font-weight: bold;
		height: 115upx;
		line-height: 115upx;
	}

	.s_list>view+view {
		border-top: 1px solid #f7f7f7;
	}

	.s_footer {
		font-size: 24upx;
		height: 80upx;
		line-height: 80upx;
		color: #333;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.s_footer text.sg {
		font-size: 16upx;
		color: #40BDFE;
		margin: 0 10upx;
	}
</style>
