<template>
	<view class="minh100" id="choose">
		<z_text></z_text>
		<!-- 说明 -->
		<view class="explain" @tap="jump" data-url="/pagesA/explain/explain">
			<image :src="getimg('/static/img/explain.png')" mode=""></image>
			<text>使用</text><br>
			<text>说明</text>
		</view>
		
			
		<view class="search nameSearch" hairline type="info" size="large" @tap="jump" data-url="/pages/nameSearch/nameSearch">
			<image :src="getimg('/static/img/nameSearch.png')" mode="aspectFit"></image>
		</view>
		<view class="search contentSearch" hairline type="info" size="large" @tap="jump" data-url="/pagesA/contentSearch/contentSearch">
			
				<image :src="getimg('/static/img/contentSearch.png')" mode="aspectFit"></image>
		</view>
		<!-- 查看收藏 -->
		<view class="collection" @tap="jump" data-url="/pagesA/collect/collect"  mode="aspectFit"></image>
			<image :src="getimg('/static/img/collect.png')">
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

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		methods: {

			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			getimg(img){
				return service.getimg(img)
			},
			web_login(){
				
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
	#choose {
		width: 100%;
		height: 100%;
		text-align: center;
		background: rgb(242, 246, 250);
		/* background: url("../static/img/bg1.png") repeat;
        background-position-y: top;
        background-size: 100%; */
		/* padding-bottom:30px; */
		padding-top: 160px;
	}

	.explain {
		text-align: center;
		font-size: 15px;
		line-height: 20px;
		position: absolute;
		top: 20px;
		right: 0;
		width: 60px;
		padding: 6px;
		padding-left: 12px;
		/* background: url("/static/img/explain.png"); */
		background-size: 100% 100%;
		color: #fff;
	}
	.explain image{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.explain  text{
		position: relative;
		z-index: 11;
	}
	#choose .van-button {
		width: 80%;
		margin-top: 60px;
		/* background: #3998f6da;
        box-shadow: 2px 4px 10px rgb(188, 189, 190); */
	}

	#choose .van-button::after {
		border: none;
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
		/* width: 70px;
        height:20px;
        line-height: 20px; */
		text-align: center;
		border-radius: 4px;
		/* text-shadow: 2px 2px 2px rgba(188, 189, 190, 0.39); */
		/* background: linear-gradient(-30deg,#9890f6, #647ef1);
        box-shadow: 2px 4px 10px rgb(188, 189, 190); */
	}

	.collection image {
		width: 100%;
		height: 100%;
	}

	/* .nameSearch {
		background: url("/static/img/nameSearch.png");
		background-size: 100% 100%;
	}

	.contentSearch {
		background: url("/static/img/contentSearch.png");
		background-size: 100% 100%;
	} */
	.nameSearch,
	.contentSearch{
		width: 600upx;
		height: 100upx;
		margin: 0 auto;
	}
	.contentSearch{
		margin-top: 120upx;
	}
	.nameSearch image,
	.contentSearch image{
		width: 100%;
		height: 100%;
	}
</style>
