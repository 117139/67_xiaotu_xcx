<template>
	<view class="minh100">
		<view class="groupBox" v-if="isActive != -1">
			<view class="title">
				<text>{{checkText}}</text>
			</view>
			<view class="bgBox">
				<view class="detailSearchBox" v-for="(val,index1) in detailSearchOption[index]" :key="index1">
					<view class="detailSearchBox_title">{{val.title}}</view>
					<view class="detaiChoose">
						<!-- detail[index1] == vals.value ? 'checked':'' -->
						<block v-for="(vals,index2) in val.value">
							<text v-if="!val.check" :class="{checked: detail[index1] == vals.value}" @tap="checkdetail(index1,vals.value,index2,false)">
								{{vals.text}}
								<!-- {{detail[index1] == vals.value}} -->
							</text>
							<text v-else  :class=" val.check && detail[index1][index2] == vals.value ? 'checked' : '' " @tap="checkdetail(index1,vals.value,index2,val.check)">{{vals.text}}</text>
						</block>
						
						<!-- <text v-else>
							1
						</text> -->
						
					</view>
				</view>
			</view>

		</view>
		<view class="btnBox" v-else>
			<view v-for="(val,index) in nameOption" :key="index" @tap="contentget(index,val.text,val.value)">
				{{val.text}}
			</view>
		</view>
		<view class="contentSearchs" v-if="isActive != -1">
			<view @tap="contentReset">重置</view>
			<view @tap="contentSearch">确定</view>
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
				text: '首页',
				index: -1,
				checkText: '',
				type: '',
				detailSearchOption: [
					[{
							title: '消费类型',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '消费型',
									value: 'xf',
									clicked: false
								},
								{
									text: '储蓄型',
									value: 'cx',
									clicked: false
								}
							],
						},
						{
							title: '赔付方式',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '单次赔付',
									value: 'danci',
									clicked: false
								},
								{
									text: '多次赔付',
									value: 'duoci',
									clicked: false
								}
							],
						},
						{
							title: '保险期限',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '一年期',
									value: 'ynq',
									clicked: false
								},
								{
									text: '定期',
									value: 'dq',
									clicked: false
								},
								{
									text: '终身',
									value: 'zs',
									clicked: false
								},
							],
						},
						{
							title: '分组',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '不分组',
									value: '0',
									clicked: false
								},
								{
									text: '分组',
									value: '1',
									clicked: false
								},
							],
						},
						{
							title: '保额≥',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-50万',
									value: '0',
									clicked: false
								},
								{
									text: '50万以上',
									value: '50+',
									clicked: false
								},
								{
									text: '100万以上',
									value: '100+',
									clicked: false
								},
							],
						},
						{
							title: '投保人豁免',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '核保方式(多选)',
							check: '1',
							value: [{
									text: '网络核保',
									value: 'net',
									clicked: true
								},
								{
									text: '智能核保',
									value: 'zn',
									clicked: false
								},
								{
									text: '人工核保',
									value: 'rg',
									clicked: false
								},
							],
						},
						{
							title: '特定重疾多次赔付',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
								{
									text: '恶性肿瘤',
									value: 'ex',
									clicked: false
								},
								{
									text: '心脑血管',
									value: 'xnxg',
									clicked: false
								},
							],
						},
						{
							title: '投保年龄',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-17岁',
									value: '17',
									clicked: false
								},
								{
									text: '50岁以下',
									value: '50',
									clicked: false
								},
								{
									text: '50岁以上',
									value: '50+',
									clicked: false
								},
							],
						},
					], //重疾险
					[{
							title: '种类',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '百万医疗险',
									value: 'bwyl',
									clicked: false
								},
								{
									text: '防癌险',
									value: 'fa',
									clicked: false
								},
								{
									text: '门诊医疗',
									value: 'mz',
									clicked: false
								},
								{
									text: '高端医疗',
									value: 'gd',
									clicked: false
								}
							],
						},
						{
							title: '投保年龄',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-17岁',
									value: '17',
									clicked: false
								},
								{
									text: '50岁以下',
									value: '50',
									clicked: false
								},
								{
									text: '50岁以上',
									value: '50+',
									clicked: false
								},
							],
						},
						{
							title: '职业范围',
							value: [{
									text: '不限',
									value: '',
									clicked: true
								},
								{
									text: '1-4级',
									value: '1-4',
									clicked: false
								},
								{
									text: '5-6级',
									value: '5-6',
									clicked: false
								},
							],
						},
						{
							title: '特需医疗',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '保证续保',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '用药范围(多选)',
							check: '1',
							value: [{
									text: '限社保用药',
									value: 'sb',
									clicked: true
								},
								{
									text: '不限社保用药',
									value: 'bxsb',
									clicked: false
								},
								{
									text: '院外购药',
									value: 'yw',
									clicked: false
								},
							],
						},
						{
							title: '保额≥',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-50万',
									value: '0',
									clicked: false
								},
								{
									text: '50万以上',
									value: '50+',
									clicked: false
								},
								{
									text: '100万以上',
									value: '100+',
									clicked: false
								},
							],
						},
						{
							title: '家庭计划',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '核保方式(多选)',
							check: '1',
							value: [{
									text: '网络核保',
									value: 'net',
									clicked: true
								},
								{
									text: '智能核保',
									value: 'zn',
									clicked: false
								},
								{
									text: '人工核保',
									value: 'rg',
									clicked: false
								},
							],
						},
					], //医疗险
					[{
							title: '种类',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '综合意外险',
									value: 'zhyw',
									clicked: false
								},
								{
									text: '交通意外险',
									value: 'jtyw',
									clicked: false
								},
								{
									text: '航空意外险',
									value: 'hkyw',
									clicked: false
								},
								{
									text: '驾乘险',
									value: 'jc',
									clicked: false
								},
								{
									text: '运动意外险',
									value: 'ydyw',
									clicked: false
								},
								{
									text: '特殊保障',
									value: 'tsbz',
									clicked: false
								}
							],
						},
						{
							title: '期限',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '短期',
									value: 'dq',
									clicked: false
								},
								{
									text: '一年期',
									value: 'ynq',
									clicked: false
								},
								{
									text: '长期',
									value: 'cq',
									clicked: false
								},
							],
						},
						{
							title: '分类',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '儿童',
									value: 'et',
									clicked: false
								},
								{
									text: '老人',
									value: 'lr',
									clicked: false
								},
								{
									text: '女性',
									value: 'nx',
									clicked: false
								},
								{
									text: '高危职业',
									value: 'gwzy',
									clicked: false
								},
							],
						},
						{
							title: '猝死责任',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '医疗责任',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '投保年龄',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-17岁',
									value: '17',
									clicked: false
								},
								{
									text: '50岁以下',
									value: '50',
									clicked: false
								},
								{
									text: '50岁以上',
									value: '50+',
									clicked: false
								},
							],
						},
						{
							title: '职业范围',
							value: [{
									text: '不限',
									value: '',
									clicked: true
								},
								{
									text: '1-4级',
									value: '1-4',
									clicked: false
								},
								{
									text: '5-6级',
									value: '5-6',
									clicked: false
								},
							],
						},
						{
							title: '最高保额≥',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-50万',
									value: '0',
									clicked: false
								},
								{
									text: '50万以上',
									value: '50+',
									clicked: false
								},
								{
									text: '100万以上',
									value: '100+',
									clicked: false
								},
							],
						},
					], //意外险
					[{
							title: '种类',
							value: [{
									text: '全部',
									value: "",
									clicked: true
								},
								{
									text: '定期寿险',
									value: "dq",
									clicked: false
								},
								{
									text: '终身寿险',
									value: "zs",
									clicked: false
								},
							],
						},
						{
							title: '职业范围',
							value: [{
									text: '不限',
									value: "",
									clicked: true
								},
								{
									text: '1-4级',
									value: "1-4",
									clicked: false
								},
								{
									text: '5-6级',
									value: '5-6',
									clicked: false
								},
							],
						},
						{
							title: '最高保额≥',
							value: [{
									text: '全部',
									value: "",
									clicked: true
								},
								{
									text: '0-50万',
									value: "0",
									clicked: false
								},
								{
									text: '50以上',
									value: "50+",
									clicked: false
								},
								{
									text: '100万以上',
									value: "100+",
									clicked: false
								},
								{
									text: '200万以上',
									value: "200+",
									clicked: false
								},
							],
						},
						{
							title: '核保方式(多选)',
							check: '1',
							value: [{
									text: '网络核保',
									value: 'net',
									clicked: true
								},
								{
									text: '智能核保',
									value: 'zn',
									clicked: false
								},
								{
									text: '人工核保',
									value: 'rg',
									clicked: false
								},
							],
						},
						{
							title: '区分身体条件',
							value: [{
									text: '全部',
									value: "",
									clicked: true
								},
								{
									text: '有',
									value: "1",
									clicked: false
								},
								{
									text: '无',
									value: "0",
									clicked: false
								},
							],
						},
						{
							title: '区分吸烟',
							value: [{
									text: '全部',
									value: "",
									clicked: true
								},
								{
									text: '有',
									value: "1",
									clicked: false
								},
								{
									text: '无',
									value: "0",
									clicked: false
								},
							],
						},
						{
							title: '区分年收入',
							value: [{
									text: '全部',
									value: "",
									clicked: true
								},
								{
									text: '有',
									value: "1",
									clicked: false
								},
								{
									text: '无',
									value: "0",
									clicked: false
								},
							],
						},
					], //寿险
					[{
							title: '种类',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '国内旅游',
									value: 'gn',
									clicked: false
								},
								{
									text: '国外旅游',
									value: 'gw',
									clicked: false
								},
								{
									text: '海外留学',
									value: 'hw',
									clicked: false
								},
								{
									text: '其它',
									value: 'qt',
									clicked: false
								},
							],
						},
						{
							title: '国家',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '申根国家',
									value: 'sg',
									clicked: false
								},
								{
									text: '美加',
									value: 'mj',
									clicked: false
								},
								{
									text: '澳新',
									value: 'ax',
									clicked: false
								},
								{
									text: '日韩',
									value: 'rh',
									clicked: false
								},
								{
									text: '东南亚',
									value: 'dny',
									clicked: false
								},
								{
									text: '港澳台',
									value: 'gat',
									clicked: false
								},
							],
						},
						{
							title: '猝死责任',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '医疗责任',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '有',
									value: '1',
									clicked: false
								},
								{
									text: '无',
									value: '0',
									clicked: false
								},
							],
						},
						{
							title: '特定责任',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '无',
									value: 'wu',
									clicked: true
								},
								{
									text: '高风险运动',
									value: 'gfx',
									clicked: false
								},
								{
									text: '高原反应',
									value: 'gy',
									clicked: false
								},
								{
									text: '中暑',
									value: 'zs',
									clicked: false
								},
							],
						},
						{
							title: '最高保额≥',
							value: [{
									text: '全部',
									value: '',
									clicked: true
								},
								{
									text: '0-50万',
									value: '0',
									clicked: false
								},
								{
									text: '50万以上',
									value: '50+',
									clicked: false
								},
								{
									text: '100万以上',
									value: '100+',
									clicked: false
								},
							],
						},
					], //旅游险

				],
				detail: [],
				nameOption: [{
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
					// { text: '年金险', value: 'T5' },
					{
						text: '旅游险',
						value: 'T6'
					}
				],
			}
		},
		computed: {
			isActive() {
				return this.$store.state.activeName;
			}
		},
		onLoad() {
			that=this
		},
		onUnload(){
			this.$store.state.activeName = -1
		},
		methods: {
			contentget(index, val, type) {
				that.$store.state.activeName = 0;
				that.index = index;
				that.checkText = val;
				that.type = type;
				that.detail = [];
				var new_d=that.detailSearchOption[index]
				for(var i=0;i<new_d.length;i++){
					if (new_d[i].check) {
						let arr = [];
						new_d[i].value.forEach((v1, i1) => {
							arr.push('')
						});
						that.detail.push(arr);
						console.log(2)
					} else {
						console.log(1)
						that.detail.push([new_d[i].value[0].value]);
					}
				}
				// that.detailSearchOption[index].forEach((v, i) => {
				// 	if (v.clicked) {
				// 		let arr = [];
				// 		v.value.forEach((v1, i1) => {
				// 			arr.push('')
				// 		});
				// 		that.detail.push(arr);
				// 	} else {
				// 		that.detail.push([v.value[0].value]);
				// 	}
				// });
			},
			contentReset() {
				console.log('清空')
				this.detail = [];
				this.$store.state.activeName = -1;
			},
			contentSearch(val) {
				let datas = {};
				that.detail.forEach((v, i) => {
					let arr = [];
					if (v.length > 1) {
						v.forEach((v1, i1) => {
							if (v1 != '') {
								arr.push(v1)
							}
						})
						Vue.set(datas, "name" + (i + 1), arr);
					} else {
						Vue.set(datas, "name" + (i + 1), v[0]);
					}
				});
				let data = {
					flag: 1,
					type: this.type,
					keyword: '',
					data: datas,
				}
				// sessionStorage.setItem('contentSearchData', JSON.stringify(data));
				uni.setStorageSync('contentSearchData', JSON.stringify(data))
				uni.setStorageSync('froms', 'contentSearch')
				// this.$router.push({
				// 	name: `index`,
				// });
				uni.setStorageSync('title', "按名称搜索");
				uni.navigateTo({
					url:'/pagesA/xtcpk_index/xtcpk_index?title=按内容搜索'
				})
				this.$store.state.title = "按内容搜索";
			},
			checkdetail(val1, val2, index, check) {
				console.log(val1, val2, index, check)
				if (check) {
					if (that.detail[val1][index] != '') {
						Vue.set(that.detail[val1], index, '');
					} else {
						Vue.set(that.detail[val1], index, val2);
					}
				} else {
					Vue.set(that.detail, val1, val2);
				}

			}
		}
	}
</script>

<style scoped>
	#contentSearch {
		text-align: left;
		width: 100%;
		min-height: 100%;
		background: rgb(242, 246, 250);
		/* background: url("../static/img/bg1.png") repeat;
        background-position-y: top;
        background-size: 100%; */
		/* padding-bottom:30px; */
	}

	#contentSearch .van-cell-group {
		position: relative;
	}

	#contentSearch .select {
		width: 30%;
		position: absolute;
		right: 0;
		top: -3px;
		background: none;
		border: none;
	}

	.contentSearchs {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 16px;
		/* margin:50px 0; */
		background: rgba(255, 255, 255, .8);
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.contentSearchs view {
		background: rgba(57, 152, 246, .85);
		width: 120px;
		height: 44px;
		border-radius: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #fff;
	}

	.contentSearchs .van-button {
		width: 120px;
	}

	.select::after {
		border: none;
	}

	.select .van-cell {
		color: #aaa;
	}

	.btnBox {
		width: 100%;
		position: absolute;
		right: 0;
		top: 30%;
		display: flex;
		flex-wrap: wrap;
	}

	.btnBox view {
		width: 292upx;
		height: 50px;
		background: #83b1f9;
		box-shadow: 2px 4px 10px #bcbdbe;
		border-radius: 30px;
		background-size: 100% 100%;
		border: none;
		margin: 0 40upx 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #fff;
	}



	.bgBox {
		background: #eee;
		padding-bottom: 200px;
	}

	.groupBox h2 {
		text-align: center;
		margin-bottom: 30px;
	}

	.detailSearchBox {
		margin: 8px 0;
		background: #fff;
		margin-bottom: 5px;
		padding: 4px 10px;
	}

	.detailSearchBox h4 {
		font-weight: normal;
		font-size: 15px;
		padding: 10px;
	}

	.detaiChoose {
		/* background: rgba(219, 219, 219, 0.185); */
		/* display: flex;
        justify-content: space-around; */
		padding: 10px 10px;
		font-size: 14px;
	}

	.detaiChoose text {
		margin: 6px 16px;
		padding: 4px 6px;
		display: inline-block;
		text-align: center;
		min-width: 60px;
		text-shadow: 2px 2px 2px rgba(188, 189, 190, 0.29);
	}

	.checked {
		padding: 4px 6px;
		background: rgb(131, 177, 249);
		color: #fff;
		border-radius: 30px;
		/* background: url("../static/img/contentSearch_button_checked.png");
        background-size: 100% 100%; */
	}

	.contentSearchs .van-button.reset {
		box-shadow: 2px 4px 10px rgb(188, 189, 190);
		border: none;
	}

	.contentSearchs .van-button.sure {
		background: #3998f6da;
		box-shadow: 2px 4px 10px rgb(188, 189, 190);
		border: none;
	}

	.title{
        color:rgb(131,177,249);
        font-size: 24px;
        line-height: 50px;
        font-weight: 400;
				display: flex;
				align-items: center;
				justify-content: center;
    }
	.detailSearchBox_title {
		height: 40px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(188, 189, 190, 0.29);
	}
</style>
