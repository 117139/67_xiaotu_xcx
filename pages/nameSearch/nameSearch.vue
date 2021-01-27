<template>
	<view class="minh100">
		<view id="nameSearch">
			<view class="namesearchBox">
				<view class="dis_flex aic ju_b" style="padding: 0 30upx;">
					<view class="ss_box">
						<text class="iconfont icon-sousuo flex_0"></text>
						<input type="search" placeholder="请输入搜索关键词" v-model="search_key" class="flex_1">
						<picker @change="bindPickerChange" :value="index" range-key="text" :range="columns">
								<view class="columns_pick">{{columns[index].text}} <text class="iconfont icon-xiaosanjiao"></text></view>
						</picker>
					</view>
					<view  @click="nameSearch()"  class="namesearchBoxBtn">搜索</view>
					<!-- 	<van-popup v-model="showPicker" position="bottom">
						<van-picker show-toolbar :columns="columns" value-key="text" @cancel="showPicker = false" @confirm="onConfirm" />
					</van-popup> -->
				</view>
				<view class="nameChoose">
					<text :class="active== 'T0'? 'checked':''" @click="active_fuc('T0')">
						全部
					</text>
					<text v-for="(item,index) in list" :class="active==item.value?'checked':''" @click="active_fuc(item.value)">
						{{item.text}}
					</text>
				</view>
			</view>
		
		</view>
		<!-- 查看收藏 -->
		<view class="collection"  @tap="jump" data-url="/pagesA/collect/collect"  mode="aspectFit"></image>
			<image src="/static/img/collect.png">
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
				columns: [{
						text: '全部',
						value: 'all'
					},
					{
						text: '产品名称',
						value: 'name'
					},
					{
						text: '条款名称',
						value: 'tk'
					},
					{
						text: '公司名称',
						value: 'com'
					},
				
				
				
				],
				index:0,
				value: '全部',
				nameValue: 'all',
				list: [{
						text: '重疾险',
						value: 'T1'
					},
					{
						text: '医疗险',
						value: 'T2'
					},
					{
						text: '意外险',
						value: 'T3'
					},
					{
						text: '寿险',
						value: 'T4'
					},
					{
						text: '旅游险',
						value: 'T6'
					},
					{
						text: '年金险',
						value: 'T5'
					}
				],
				active: 'T0',
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		methods: {
			
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			active_fuc(num) {
				this.active = num
			},
			bindPickerChange(e) { //投保人
				console.log(e)
				this.index = e.detail.value;
				this.nameValue =this.columns[e.detail.value].value
				// this.showPicker = false;
			},
			nameSearch() { //跳转首页展示搜索结果
				let data = {
					flag: 0,
					type: this.active,
					keyword: this.search_key,
					qType: this.nameValue,
				}
				// sessionStorage.setItem('detailData', JSON.stringify(data));
				uni.setStorageSync('detailData', JSON.stringify(data));
				uni.setStorageSync('title', "按名称搜索");
				uni.setStorageSync('froms', "nameSearch");
				// this.$router.push({
				// 	name: `index`,
				// });
				// window.location.href="xtcpk_index.html"
				uni.navigateTo({
					url:'/pagesA/xtcpk_index/xtcpk_index'
				})
				// this.$store.state.title = "按名称搜索";
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
			}
		}
	}
</script>

<style scoped>
	.minh100{
		background: #f2f6fa;
	}
	.collection {
		position: fixed;
		right: 20upx;
		bottom: 50upx;
		width: 150upx;
		height: 150upx;
		color: #fff;
		font-size: 30upx;
		padding: 8upx 10upx;
		text-align: center;
		border-radius: 4px;
	}
	
	.collection image {
		width: 100%;
		height: 100%;
	}
	
	.nameChoose {
	    width: 100%;
	    margin-top: 20px;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
			flex-wrap: wrap;
	    -ms-flex-pack: distribute;
	    justify-content: flex-start;
	    color: #585757;
	    font-size: 14px;
	}
	.nameChoose text{
		margin-right: 10px;
		line-height: 20px;
		padding-left: 5px;
	}
	.nameChoose text.checked{
	    color: #83b1f9;
	}
	.namesearchBox {
	   padding-top: 40%;
	}
	.van-dropdown-menu{
		height: auto;
	}
	.dropDown span:after {
	    top: 8px;
	}
	.van-dropdown-menu__item{
		border-left: 1px solid #ddd;
	}
	.namesearchBox input{
		width: 90%;
	}
	.namesearchBoxBtn{
		width: 120upx;
		height: 80upx;
		background: #83b1f9;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 24upx;
		border-radius: 40upx;
	}
	.ss_box{
		width: 560upx;
		height: 80upx;
		border-radius: 40upx;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0 10upx 0 20upx;
	}
	.icon-sousuo{
		font-size: 32upx;
		color: #666;
		margin-right: 10upx;
	}
	.columns_pick{
		flex:none;
		padding: 0 10upx;
		min-width: 100upx;
		height: 50upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: 1px solid #ccc;
	}
	.icon-xiaosanjiao{
		font-size: 20upx;
		color: #666;
		margin-left: 6upx;
	}
</style>
