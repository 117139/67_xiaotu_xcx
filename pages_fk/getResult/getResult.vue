<template>
	<view class="minh100">
		<z_text></z_text>
		<view id="wrap" class="wrap" style="padding-top: 40upx;">
			<view class="ss_box dis_flex aic">
				<i class="iconfont icon-sousuo1"></i> 
				<input type="text" placeholder="搜索词条" v-model="search_key" class="flex_1">
				<!-- <view class="select_ss"><span>全文</span><img src="/static/web/images/xsj.png" alt=""></view> -->
				<picker @change="bindPickerChange" :value="index"  :range="columns">
						<!-- <view class="columns_pick">{{columns[index].text}} <text class="iconfont icon-xiaosanjiao"></text></view> -->
						<view class="select_ss"><span>{{columns[index]}}</span><img :src="getimg('/static/web/images/xsj.png')" alt=""></view>
				</picker>
				<view @tap="onRetry" class="ss_btn dis_flex aic ju_c">开始检索</view>
			</view>
			<view class="s_list">
				<view @tap="jump" v-for="(item,index) in datas" :data-url="'/pages_fk/lexicnDetails/lexicnDetails?id='+item.id">
					<view class="d1 oh1">{{item.title}}</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="zanwu">到底了~~</view>
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
				datas: '',
				search_key:'',
				columns: [
					'全文',
					'条目',
				],
				index:0,
				page:1,
				size:20,
				data_last:false
			}
		},
		
		onLoad(option) {
			that=this
			// console.log(that.$store.state.v_type==1)
			if(that.$store.state.v_type==1){
				uni.redirectTo({
					url:'/pages_fk/details/details'
				})
				return
			}
			that.search_key=option.title
			that.index=option.type=='全文'?0:1
			that.onRetry()
		},
		methods: {
			bindPickerChange(e) { //投保人
				console.log(e)
				this.index = e.detail.value;
				// this.nameValue =this.columns[e.detail.value].value
				// this.showPicker = false;
			},
			onRetry(){
				that.page=1
				that.datas=[]
				that.data_last=false
				that.getdata()
			},
			getdata(){
				if(that.btn_kg==1){
					return
				}
				if(that.data_last){
					return
				}
				that.btn_kg=1
				var jkurl = '/search/list'
				var data={
					type:that.columns[that.index],
					title:that.search_key,
					page:that.page,
					size:that.size
				}
				var page_that=that.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// that.datas = datas
						if(page_that==1){
							that.datas = datas
						}else{
							if(datas.data.length==0){
								that.data_last=true
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
			getimg(img){
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>


	.ss_box {
		margin: 0 auto 40upx;
		width: 690upx;
		height: 77upx;
		border: 2upx solid rgba(51, 51, 51, 1);
		border-radius: .1upx;
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

	.s_list {
		width: 100%;

		margin-bottom: 2.2upx;
	}

	.s_list>view {
		display: block;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

	}

	.s_list .d1 {
		font-size: 40upx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #333;
		/* margin-bottom: 17upx; */
	}

	.s_list .d2 {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		line-height: 46upx;
	}

	.s_list>view+view {
		border-top: 8upx solid #f7f7f7;
	}
</style>
