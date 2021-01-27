<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<div class="h_top boxsiz">小兔精选</div>
			<div class="h_tab_box clearfix boxsiz">
				<div class="h_tab_box1">
					<text @tap="getCate(0)" :class="active==0?'cur':''">重疾险</text>
					<text @tap="getCate(1)" :class="active==1?'cur':''">医疗险</text>
					<text @tap="getCate(2)" :class="active==2?'cur':''">寿险</text>
					<text @tap="getCate(3)" :class="active==3?'cur':''">意外险</text>
					<text @tap="getCate(4)" :class="active==4?'cur':''">旅游险</text>
					<text @tap="getCate(5)" :class="active==5?'cur':''">年金险</text>
				</div>
			</div>
			<div class="h_tab_box clearfix boxsiz">
				<div class="h_tab_box2">
					<text id="19" :class="cur==0?'cur':''" @tap="qhcur(0,19,2)">百万医疗</text>
					<text id="28" :class="cur==1?'cur':''" @tap="qhcur(1,28,2)">防癌险</text>
				</div>
			</div>

			<div class="h_list clearfix">
				<div class="h_li  boxsiz" v-for="(item,index) in datas">
					<div class="li_box dis_flex">
						<div class="h_li_img" :style="'background-image: url('+item.photo+');'"></div>
						<div class="flex_1 h_li_msg">
							<div class="li_type" :style="'background:'+item.goodsDataValue.tag_color+';'">{{item.goodsDataValue.tag}}</div>
							<div class="d1 oh1">{{item.goodsDataValue.title}}</div>
							<div class="d2 oh2">{{item.goodsDataValue.trait}}</div>
							<div class="dis_flex ju_b aic">
								<div class="dis_flex" style="align-items: baseline;">
									<span style="color: #FF5655;font-size: 25upx;">￥</span>
									<span style="color: #FF5655;font-size: 37upx;">{{item.goodsDataValue.price}}</span>
									<span style="color: #666;font-size: 25upx;">元</span>
								</div>
								<div class="li_btn_box dis_flex ju_b">
									<text @tap="jump" :data-url="'/pages/new_html/new_html?id='+item.goodsDataValue.buy_url">购买</text>
									<text @tap="jump" :data-url="'/pages/new_html/new_html?id='+item.goodsDataValue.evalua_url">评测</text>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			<view class="h_footer dis_flex ju_a">
				<view @tap="jump" data-url="/pages/choose/choose">
					<image src="/static/images/index2_09.jpg" mode=""></image>
					
					<p>产品库</p>
				</view>
				<view @tap="jump" :data-url="'/pages/new_html/new_html?id='+active">
					<image src="/static/images/index2_11.jpg" mode=""></image>
					<p>保单管理</p>
				</view> 
				<view @tap="jump" :data-url="'/pages/new_html/new_html?id='+active">
					<image src="/static/images/index2_15.jpg" mode=""></image>
					<p>保险词条</p>
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
				htmlReset: -1,
				active: 0,
				cur: -1,
				datas: [{
						photo: 'http://www.xiaotu.top/storage/uploads/admin/Goods/20200403/5912dfa26509613b0efdd6263995b3a8.jpeg',
						goodsDataValue: {
							tag_color: '#2d9ded',
							tag: '123',
							title: '454564',
							trait: '123',
							price: '555.00',
							buy_url: 'https:www.baidu.com',
							evalua_url: 'https:www.baidu.com'
						}
					},
					{
						photo: 'http://www.xiaotu.top/storage/uploads/admin/Goods/20200403/5912dfa26509613b0efdd6263995b3a8.jpeg',
						goodsDataValue: {
							tag_color: '',
							tag: '',
							title: '储蓄保险',
							trait: '超级好111',
							price: '50',
							buy_url: 'https:www.baidu.com',
							evalua_url: 'https:www.baidu.com'
						}
					},
					{
						photo: 'http://www.xiaotu.top/storage/uploads/admin/Goods/20200417/2cb366059dbaf39392ff85018d530de7.png',
						goodsDataValue: {
							tag_color: '#62a3d1',
							tag: '储蓄',
							title: '储蓄',
							trait: '储蓄',
							price: '50',
							buy_url: 'https:www.baidu.com',
							evalua_url: 'https:www.baidu.com'
						}
					},
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			that = this
			that.onRetry()
		},
		onShareAppMessage() {

		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			onRetry() {
				that.htmlReset = 0
			},
			getCate(idx) {
				that.active = idx
				that.cur = -1
			},
			qhcur(num, id, pid) {
				that.cur = num
				that.getProduct(id, pid)
			},
			getProduct(id, pid) {
				return
				$.ajax({
					url: "{$apply}/getProduct",
					dataType: 'json',
					type: 'post',
					data: {
						'id': id,
						pid: pid
					},
					success: function(res) {
						console.log(res);
						$(".h_list").html(res);
					}
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
	.minh100 {
		/* background: #f7f7f7; */
	}

	.h_top {
		width: 100%;
		height: 100upx;
		font-size: 36upx;
		line-height: 36upx;
		padding-left: 30upx;
		color: #1F8FFF;
		display: flex;
		align-items: center;
		background: #fff;
	}

	.h_tab_box {
		width: 100%;
		padding: 0 30upx;
		/* height: .95rem; */
		overflow-x: auto;
	}

	.h_tab_box1 {
		white-space: nowrap;
		font-size: 0;
		border-bottom: 1px solid #f7f7f7;

	}

	.h_tab_box1 text {
		height: 95upx;
		line-height: 95upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		border-bottom: 5upx solid transparent;
		display: inline-flex;
		align-items: center;
	}

	.h_tab_box1 text+text {
		margin-left: 47upx;
	}

	.h_tab_box1 text.cur {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 800;
		color: rgba(51, 51, 51, 1);
		border-bottom: 5upx solid #43BFFF;
	}

	.h_tab_box2 {
		white-space: nowrap;
		font-size: 0;
		padding: 31upx 0 4upx;
	}

	.h_tab_box2 text {
		font-size: 26upx;
		line-height: 26upx;
		padding: 13upx 25upx;
		border-radius: 52upx;
		font-family: PingFang SC;
		font-weight: 500;
		display: inline-block;
		color: rgba(102, 102, 102, 1);
		background: rgba(230, 230, 230, 1);
	}

	.h_tab_box2 text+text {
		margin-left: 27upx;
	}

	.h_tab_box2 text.cur {
		background: rgba(67, 191, 255, 1);
		color: #fff;
	}


	.h_li {
		width: 100%;
		padding: 30upx;
		border-bottom: 13upx solid #f7f7f7;
	}

	.li_box {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 12upx 0px rgba(31, 143, 255, 0.1);
		border-radius: 15upx;
		overflow: hidden;
	}

	.h_li_img {
		width: 241upx;
		height: 230upx;
		/* border-radius:.15rem; */
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

	}

	.h_li_msg {
		position: relative;
		padding-left: 24upx;
	}

	.li_type {
		position: absolute;
		width: 103upx;
		height: 39upx;
		line-height: 39upx;
		text-align: center;
		background: #FF5655;
		color: #FFFFFF;
		font-size: 20upx;
		border-bottom-left-radius: 20upx;
		right: 0;
		top: 0;
		z-index: 9;
	}

	.h_li_msg .d1 {
		font-size: 34upx;
		line-height: 76upx;

		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.h_li_msg .d2 {
		width: 338upx;
		height: 66upx;
		line-height: 33upx;
		color: #999;
		font-size: 20upx;
		margin-bottom: 3upx;
	}

	.li_btn_box {
		width: 222upx;
		padding-right: 10upx;
	}

	.li_btn_box text {
		width: 104upx;
		height: 44upx;
		background: rgba(67, 191, 255, 1);
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		text-align: center;
		font-size: 28upx;
		line-height: 44upx;
		border-radius: 44upx;
		color: #fff;
	}

	.wenti_list {
		border-bottom: 13upx solid #f7f7f7;
	}

	.wenti_list a {
		display: -webkit-box;
		/* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box;
		/* 老版本语法: Firefox (buggy) */
		/*display: -ms-flexbox;*/
		/* 混合版本语法: IE 10 */
		display: -webkit-flex;
		/* 新版本语法: Chrome 21+ */
		display: flex;
		width: 100%;
		height: 124upx;
		padding: 0 30upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		flex-wrap: wrap;
		/*align-content: space-around;*/
		align-items: center;
		/* line-height: .62rem; */
	}

	.wenti_list a+a {
		border-top: 1px solid #F7F7F7;
	}

	.h_footer {
		width: 100%;
		height: 360upx;
		padding-top: 66upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.h_footer view {
		/* width: 1rem; */
		font-size: 26upx;
		color: #333;
		text-align: center;
	}

	.h_footer view image {
		width: 98upx;
		height: 98upx;
		display: block;
		margin: 0 auto 10upx;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 50%;
	}
</style>
