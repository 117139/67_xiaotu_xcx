<template>
	<view class="minh100">
		<!-- <web-view src="https://www.baidu.com"></web-view> -->
		<web-view  :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(option) {

			this.src = uni.getStorageSync('web_url') || ''
			console.log(this.src)
		},
		onUnload() {
			uni.setStorageSync('web_url','')
		},
		methods: {

		}
	}
</script>

<style>

</style>
