<template>
	<view class="content_wrap">
	
		<view class="xieyi_main">
				我们致力于保护您在使用我们网站时所提供的私隐、私人资料以及个人的资料(统称“个人资料”)，使我们在收集、使用、储存和传送个人资料方面符合(与个人资料私隐有关的法律法规)及消费者保护方面的最高标准。
				为确保您对我们在处理个人资料上有充分信心，您切要详细阅读及理解隐私政策的条文。
				<br>特别是您一旦使用我们的网站，将被视为接受、同意、承诺和确认；
				您在自愿下连同所需的同意向我们披露个人资料；您会遵守本隐私政策的全部条款和限制；您在我们的网站上作登记、资料会被收集；
				您同意日后我们对隐私政策的任何修改；您同意我们的分公司、附属公司、雇员、就您可能会感兴趣的产品和服务与您联络(除非您已经表示不想收到该等讯息)。
				被收集的个人资料的种类经您的同意，我们会收集、管理和监控个人资料。
				<br>为了向您提供我们的各项服务，您需要提供个人资料信息，其中包括个人资料和不具名的资料，
				包括但不限于：个人资料（您的姓名、性别、年龄、出生日期、电话号码、传真号码、住址或通讯地址、电子邮箱地址）。
				<br>收集个人资料及不具名的资料的目的及用途如下: 
				通过我们的网站向您提供我们的各项服务；当您使用我们的网站时，能辨认以及确认您的身份；让您使用我们的网站时得到为您而设的服务；
				我们的顾客服务人员有需要时可以与您联系；统计我们网站使用量的数据；让您在使用我们网站时更方便；为改进我们的产品、服务及网站内容而进行市场研究调查；
				为我们搞的活动、市场销售和推广计划收集资料；遵守法律、政府和监管机关的规定，包括但不限于对个人资料披露及通知的规定；就我们提供的各项服务、分析、
				核对或审查您的信用、付款或地位；处理在您要求下的任何付款指示，直接扣帐或信用安排；使您能运作您的账户以及使我们能从账户支取尚欠的服务费；
				您提供给我们的个人资料及不具名资料，只保留到搜集的目的已达到的时候，除非应适用的法律法规之规定而继续保留。
				个人资料的拥有权及披露在我们网站上所搜集的一切资料都由我们所拥有，不会出租或出售给任何无关的第三方。
		</view>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				title:'隐私协议',
				type:0,
				datas:''
			}
		},
		onLoad(Option) {
			var that =this
			console.log(Option)
		
			
			
			// this.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','fj_data']),
		},
		
		methods: {
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(keyword){
				
				///api/info/list
				var that =this
				var data = {
					key:keyword
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/data/protocol'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						
						that.datas = datas
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
			}
		}
	}
</script>

<style scoped>
	.cu-custom{
		border-bottom: 1px solid #DBDBDB;
	}
	.content_wrap{
		width: 100%;
		min-height: 100%;
		background: #fff;
	}
	 .xieyi_main{
		 width: 100%;
		 padding: 30upx;
		 -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
		 box-sizing: border-box;
		 font-size: 28upx;
		 color: #333;
	 }
	 
</style>
