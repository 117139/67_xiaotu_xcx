<template>
	<view id="wrap" class="wrap">
		<form @submit="formSubmit" @reset="formReset" class="add_form">
			<view class="add_list">
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">投保人</view> <input name="applicant" type="text" placeholder="请输入" class="c3 tac flex_1">
				</view>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">被保险人</view> <input name="insured" type="text" placeholder="请输入" class="c3 tac flex_1">
				</view>
				<!---->
			</view>
			<view class="add_list">
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">保险公司</view> <input name="insurance_ent" type="text" placeholder="请输入保险公司" class="c3 tac flex_1">
				</view>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">保险产品</view> <input name="insured_name" type="text" placeholder="请输入产品名称" class="c3 tac flex_1">
				</view>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">保单号</view> <input name="insured_sn" type="text" placeholder="请输入保单号(选填）" class="c3 tac flex_1">
				</view>
				<picker class="add_li" @change="bindPickerChange" data-type="lb" :value="index_lb" :range="array_lb">
					<view class="add_li dis_flex ju_b aic">
						 <view class="c6 add_li_name">类别</view>
						 <!-- <view class="c3">重疾险</view> -->
						 <input name="insured_type" :value="array_lb[index_lb]" disabled> 
						 <i class="iconfont icon-next c9"></i>
					</view>
				</picker>
				<!-- <picker class="add_li" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindTimeChange"> -->
				<view class="add_li dis_flex ju_b aic"  @tap="tk_show1=true">
					<view class="c6 add_li_name">缴费时间</view> 
					<input type="text" name="fees_end_time1" :value="month_list[fees_end_time[0]] +'月'+day_list[fees_end_time[1]]+'日'" class="flex_1 tac" disabled> 
					<input type="text" name="fees_end_time" :value="month_list[fees_end_time[0]] +'-'+day_list[fees_end_time[1]]" style="width: 0;opacity: 0;" disabled> 
					<!-- <input name="fees_end_time" type="hidden" value="1606752000"> -->
					<i class="iconfont icon-next c9"></i>
				</view>
				<!-- </picker> -->
				<picker class="add_li" @change="bindPickerChange" data-type="qx" :value="index_qx" :range="array_qx">
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">缴费期限</view>
					<view><span style="color: #1F8FFF;">{{array_qx[index_qx]}}</span> 年</view> 
					<!-- <input name="fees_day" type="hidden" value="1"> -->
					
					<input name="insured_type" :value="array_lb[index_lb]" disabled style="display: none;"> 
					<i class="iconfont icon-next c9"></i>
				</view>
				</picker>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">保费</view> 
					<input name="fees_price" type="text" placeholder="请输入保费" class="c3 tac flex_1">
					<view class="c6">元</view>
				</view>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">保额</view> 
					<input name="coverage" type="text" placeholder="请输入保额" class="c3 tac flex_1"> 
					<picker class="dis_flex ju_b aic" @change="bindPickerChange" data-type="be" :value="index_be" :range="array_be">
						<view class="dis_flex ju_b aic">
							<input  name="coverage_unit" :value="array_be[index_be]" disabled="" style="width: 2em;">
							 <i class="iconfont icon-next c9"></i>
						</view>
					 </picker>
				</view>
				<!---->
				<picker class="add_li" @change="bindPickerChange" data-type="bz" :value="index_bz" :range="array_bz">
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">保障期限</view>
					<input name="safeguard_type" type="hidden" :value="array_bz[index_bz]" disabled style="opacity: 0;"> 
					<view class="c3 tac flex_1" style="flex:none">{{array_bz[index_bz]}}</view> 
					<input name="safeguard_time" type="hidden" v-model="safeguard_time" disabled style="opacity: 0;">
					<i class="iconfont icon-next c9"></i> 
					<!-- <input name="safeguard_type" type="hidden" value="终身"> 
					<input name="safeguard_time" type="hidden" value="2021/02/01"> -->
				</view>
				</picker>
				
				<picker v-if="array_bz[index_bz]=='定期'" class="add_li" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindTimeChange" data-type="end">
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">到期时间</view>
					<!-- <view class="c3 tac flex_1 ">2021/02/01</view> -->
					<input name="safeguard_time" placeholder="请选择到期时间" type="hidden"v-model="safeguard_time" disabled>
					<i class="iconfont icon-next c9"></i>
				</view>
				</picker>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">缴费账户</view> <input name="fees_account" type="text" placeholder="请输入缴费账户" class="c3 tac flex_1">
				</view>
				<picker class="add_li" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindTimeChange" data-type="buy">
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">购买时间</view>
					<!-- <view class="c3 tac flex_1 ">2021/02/01</view> -->
					<input name="buy_time" placeholder="请选择购买时间" type="hidden"v-model="buy_time" disabled>
					<i class="iconfont icon-next c9"></i>
				</view>
				</picker>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">是否生效</view> 
					<input name="is_effect" type="hidden" v-model="is_effect" disabled style="opacity: 0;">
					<switch checked @change="switch1Change" data-num="1" disabled color="#D8D8D8"/>
				</view>
				<view class="add_li dis_flex ju_b aic">
					<view class="c6 add_li_name">自动提醒</view> 
					<input name="is_remind" type="hidden" v-model="is_remind" style="opacity: 0;">
					<switch checked @change="switch1Change" data-num="2" color="#D8D8D8"/>
					
				</view>
			</view>
			<view class="add_list1">
				<view>上传保单</view>
				<view class="img_boxs">
					<view class="dis_flex">
						<view v-if="sj_img" class="upbtn upbtn2" @tap="upimg"><image :src="getimg(sj_img)" mode="aspectFit"></image></view>
						<view v-else class="upbtn upbtn2" @tap="upimg"><image :src="getimg('/static/web/images/upimg.png')" mode="aspectFit"></image></view>
						<input type="text" :value="getimg(sj_img)" style="width: 0;opacity: 0;">
						<!-- <p type="" class="flex_1  dis_flex aic bd_name" style="font-size: 0.2rem;"></p> <input type="hidden" name="warranty_pic"> -->
					</view>
					<!-- <p class="up_tip">文档、图片、PDF等格式</p> -->
				</view>
			</view>
			<view class="add_footer dis_flex aic ju_c"><button form-type="submit" class=" dis_flex aic ju_c">完成</button></view>
		</form>
		<!-- tk -->
		<view v-if="tk_show1" class="tk_box dis_flex_c">
			<view class="tk_off"  @tap="tk_show1=false"></view>
			<view class="tk_main" style="border-radius: 0;">
				<view class=" dis_flex aic ju_b w100" style="height: 100upx;padding: 0 30upx;border-bottom: 1px solid #eee;font-size: 32upx;">
					<text @tap="tk_show1=false">关闭</text> 
					<text @tap="zhxq_fuc" style="color: #2cca78;">确定</text>
				</view>
				<picker-view class="tk_picker_box" :indicator-style="indicatorStyle" :value="zhxq" 
				@change="bindPickerChange" data-type="zhxq" @pickend="pick_fuc">
						<picker-view-column data-idx="0">
								<view class="item" v-for="(item,index) in month_list" :key="index+1">{{index+1}}月</view>
						</picker-view-column>
						<picker-view-column >
							<block v-if="fees_end_time[0]==0||fees_end_time[0]==2||fees_end_time[0]==4||fees_end_time[0]==6||fees_end_time[0]==7||fees_end_time[0]==9||fees_end_time[0]==11">
								<view v-if="index<30" class="item" v-for="(item,index) in day_list" :key="index">{{index+1}}日</view>
							</block>
							<block v-if="fees_end_time[0]==3||fees_end_time[0]==5||fees_end_time[0]==8||fees_end_time[0]==10">
								<view v-if="index<29" class="item" v-for="(item1,index) in day_list" :key="index">{{index+1}}日</view>
							</block>
							<block v-if="fees_end_time[0]==1">
								<view v-if="index<28" class="item" v-for="(item1,index) in day_list" :key="index">{{index+1}}日</view>
							</block>
								
								
						</picker-view-column>
				</picker-view>
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
				array_lb:[],
				index_lb:0,
				month_list:['01','02','03','04','05','06','07','08','09','10','11','12'],
				day_list:  ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
				fees_end_time:[0,0],
				array_qx:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',],
				
				index_qx:0,
				array_be:[
					'元',
					'万元',
				],
				index_be:0,
				array_bz:[
					'终身',
					'定期',
				],
				index_bz:0,
				insured_type:'',
				safeguard_type:'',
				safeguard_time:'',
				buy_time:'',
				is_effect:true,
				is_remind:true,
				startDate:'1900-01-01',
				endDate:'2800-12-30',
				tk_show1:false,
				sj_img:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			that=this
			that.getdata()
		},
		methods: {
			pick_fuc(e){
				console.log(e)
			},
			zhxq_fuc(e){
				console.log(e)
				this.tk_show1=false
				if(this.zhxq.length==0){
					this.fees_end_time=[0,0]
				}
			},
			bindPickerChange(e){
				if(e.currentTarget.dataset.type=='lb'){
									 that.index_lb=e.target.value
				}
				if(e.currentTarget.dataset.type=='qx'){
									 that.index_qx=e.target.value
				}
				if(e.currentTarget.dataset.type=='be'){
									 that.index_be=e.target.value
				}
				if(e.currentTarget.dataset.type=='bz'){
									 that.index_bz=e.target.value
				}
				if(e.currentTarget.dataset.type=='zhxq'){
					this.fees_end_time=e.detail.value
					console.log(this.fees_end_time)
					
				}
			},
			bindTimeChange(e){
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				var val=e.target.value+''
				if(e.currentTarget.dataset.type=='buy'){
					that.buy_time=val.split('-').join('/')
				}
				if(e.currentTarget.dataset.type=='end'){
					that.safeguard_time=val.split('-').join('/')
				}
				// gettime
			},
			getdata() {
				var that = this
				var data = {
					token:that.loginDatas.userToken
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/policy/getBdCate'
				
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
						that.array_lb=datas.policyData
						that.policyData=datas.InsuranceCompanyData
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
			layerMsg(msg){
				uni.showToast({
					icon:'none',
					title:msg
				})
			},
			formSubmit: function(e) {
					console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					var formdata = e.detail.value
					uni.showModal({
							content: '表单数据内容：' + JSON.stringify(formdata),
							showCancel: false
					});
					var us=formdata
					if(us.applicant==''){
							that.layerMsg('请先填写投保人');return;
					}
					if (us.insured==''){
							that.layerMsg('请先填写被保险人');return;
					}
					if (us.insurance_ent==''){
							that.layerMsg('请先填写保险公司');return;
					}
					if (us.insured_name==''){
							that.layerMsg('请先填写保险产品');return;
					}
					if (us.insured_type==''){
							that.layerMsg('请先选择类别');return;
					}
					if (us.fees_end_time==''){
							that.layerMsg('请先选择缴费时间');return;
					}
					if (us.fees_day==''){
							that.layerMsg('请先选择缴费期限');return;
					}
					if (us.fees_price==''){
							that.layerMsg('请先填写保费');return;
					}
					if (us.coverage==''){
							that.layerMsg('请先填写保额');return;
					}
					if (us.safeguard_type==''){
							that.layerMsg('请先选择保障期限');return;
					}
					if (us.fees_account==''){
							that.layerMsg('请先填写缴费账户');return;
					}
					if (us.buy_time==''){
							that.layerMsg('请先选择购买时间');return;
					}
					if (us.sj_img==''){
							that.layerMsg('请上传保单');return;
					}
					
					var data = {
						token:that.loginDatas.userToken
					}
					//selectSaraylDetailByUserCard
					var jkurl = '/policy/getBdCate'
					
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
							that.layerMsg('提交成功')
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
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
							title: '操作失败'
						})
					})
			},
			formReset: function(e) {
					console.log('清空数据')
			},
			upimg() {
				var that = this
				// 从相册选择1张图
				// var z_count=9-that.sj_img.length
				var z_count=1
				uni.chooseImage({
					count: z_count,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						console.log(res)
						const tempFilePaths = res.tempFilePaths
			
						const imglen = that.sj_img.length
						
						if (imglen == 9) {
							wx.showToast({
								icon: 'none',
								title: '最多可上传九张'
							})
							return
						}else{
							// that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
						}
						// return
						that.upimg1(tempFilePaths, 0)
					}
				});
			},
			upimg1(imgs, i) {
				var that = this
				const imglen = that.sj_img.length
				var newlen = Number(imglen) + Number(i)
				if (imglen == 9) {
					wx.showToast({
						icon: 'none',
						title: '最多可上传九张'
					})
					return
				}
				
				uni.uploadFile({
					url: service.IPurl+'/upload/streamImg', //仅为示例，非真实的接口地址
					filePath: imgs[i],
					name: 'file',
					formData: {
						type:1,
						token: that.loginDatas.userToken
					},
					success(res) {
						// console.log(res.data)
						var ndata = JSON.parse(res.data)
						if (ndata.code == 1) {
							console.log(imgs[i], i, ndata.img_url)
							// var newdata = that.sj_img
							console.log(i)
							that.sj_img=ndata.msg
							/*that.sj_img = that.sj_img.concat(ndata.img_url)
							// i++
							// that.upimg(imgs, i)
							
							var news1 = that.sj_img.length
							if (news1 < 9 && i < imgs.length - 1) {
								i++
								that.upimg1(imgs, i)
							}*/
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				})
			},
			imgdel(e){
				var that =this
				console.log(e.currentTarget.dataset.idx)
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定',e.currentTarget.dataset.type)
								that.sj_img=''
								// that.sj_img.splice(e.currentTarget.dataset.idx,1)
							
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			
			gettime(value){
					var seperator1 = "/";
					value=new Date(value)
	
					var year = value.getFullYear();
					// console.log(year)
					var month = value.getMonth() + 1;
					var strDate = value.getDate();
					if (month >= 1 && month <= 9) {
							month = "0" + month;
					}
					if (strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
					}
					var currentdate = year + seperator1 + month + seperator1 + strDate;
					return currentdate
			},
			switch1Change(e){
				 console.log('switch1 发生 change 事件，携带值为', e.currentTarget.dataset.num)
				 if(e.currentTarget.dataset.num==1){
					 that.is_effect=e.target.value
				 }
				 if(e.currentTarget.dataset.num==2){
					 that.is_remind=e.target.value
				 }
				 console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>
	body {
		background: #F7F7F7;
		padding-top: 4px;
	}

	.add_form {
		width: 100%;

	}

	.add_list {
		width: 100%;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 4upx;
	}

	.add_li {
		width: 100%;
		height: 90upx;
	}

	.add_li+.add_li {
		border-top: 1px solid #F7F7F7;
	}
	.add_li_name{
		width: 120upx;
		flex: none;
	}
	.add_li input {
		min-width: 0;
		text-align: center;
	}
	.add_li .c9{
		color: #999;
	}
	.van-switch {
		background: #D8D8D8 !important;
	}

	.van-switch--on {
		background-color: #43BFFF !important;
	}

	.add_list1 {
		width: 100%;
		height: 260upx;
		padding: 24upx 32upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
		color: #666;
		font-size: 26upx;
	}

	.img_boxs {
		width: 100%;
		margin-top: 10px;
	}

	.upbtn {
		width: 129upx;
		height: 129upx;
		background-size: 100% 100%;
		/* background-position: center; */
		background-repeat: no-repeat;
		/* background-image: url('/static/web/images/upimg.png'); */
	}
	.upbtn image{
		width: 100%;
		height: 100%;
	}
	.upbtn input {
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.up_tip {
		color: #D8D8D8;
		font-size: 20upx;
	}

	.add_footer {
		width: 100%;
		height: 200upx;
	}

	.add_footer button {
		width: 585upx;
		height: 85upx;
		border-radius: 85upx;
		background: rgba(67, 191, 255, 1);
		box-shadow: 0upx 0upx 10upx 0upx rgba(0, 0, 0, 0.1);
		font-size: 34upx;
		color: #fff;
	}

	.picker-calendar-year-picker {
		display: none;
	}

	.picker-calendar-month-picker {
		margin: 0 auto;
	}

	.bjtc {
		background: #eee;
		padding: 0 10px;
		max-width: 30%;
		height: 70upx;
		line-height: 70upx;
	}
	
	
	.tk_box{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 900;
		background: rgba(0,0,0,.5);
		align-items: stretch;
	}
	.tk_off{
		flex: 1;
	}
	
	
	.tk_main{
		width: 100%;
		/* height: 647upx; */
		background: #FFFFFF;
		border-radius: 15upx 15upx 0px 0px;
		transform: translate3d(0, 0, 0);
		transition: all .15s;
	}
	.tk_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #454545;
		position: relative;
		border-bottom: 1px solid #E7E7E7;
	}
	.tk_tit view{
		position: absolute;
		top: 0;
		right: 30upx;
		height: 100upx;
		display: flex;
		align-items: center;
		
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
	}
	.tk_sq_box{
		width: 100%;
		padding: 0 30upx 0;
		/* border-bottom: 1px solid #E7E7E7; */
	}
	.tk_sq_li{
		height: 50px;
		
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		/* border-bottom: 1px solid #EDEDED; */
	}
	.tk_sq_li+.tk_sq_li{
		border-top: 1px solid #EDEDED;
	}
	.tk_sq_li input,.tk_sq_li .tel{
		text-align: right;
		padding: 0 20upx;
		
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
	}
	.icon-xiugai{
		color: #AAA;
		font-size: 30upx;
	}
	.lx_li{
		width: 100%;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		padding: 10upx 0;
		margin-top: 20upx;
	}
	.lx_li image{
		width: 26upx;
		height: 26upx;
	}
	.lx_time{
		
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.lx_time text{
		font-size: 20upx;
	}
	.sub_btn{
		width: 667upx;
		height: 77upx;
		background: #3775F6;
		border-radius: 39upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		margin: 38upx auto;
		color: #FFFFFF;
	}
	.lxr_name_del{
		
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #EF4747;
	}
	
	
	.tk_picker_box{
		height: 400upx;
	}
	.tk_picker_box .item{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
