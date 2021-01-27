<template>
	<view class="minh100">
		<div class="groupBox" v-if="isActive != -1">
			<h2 class="title">
				<span>{{checkText}}</span>
			</h2>
			<div class="bgBox">
				<div class="detailSearchBox" v-for="(val,index1) in detailSearchOption[index]" :key="index1">
					<h4 class="detailSearchBox_title">{{val.title}}</h4>
					<div class="detaiChoose">
						<!-- detail[index1] == vals.value ? 'checked':'' -->
						<span v-for="(vals,index2) in val.value" :key="index2" :class=" !val.check && detail[index1] == vals.value || val.check && detail[index1][index2] == vals.value ? 'checked' : '' "
						 @click="checkdetail(index1,val.check,vals.value,index2)">
							{{vals.text}}
						</span>
					</div>
				</div>
			</div>

		</div>
		<div class="btnBox" v-else>
			<van-col span="12" v-for="(val,index) in nameOption" :key="index">
				<van-button hairline type="info" size="large" @click="contentget(index,val.text,val.value)">{{val.text}}</van-button>
			</van-col>
		</div>
		<van-row class="contentSearchs" v-if="isActive != -1">
			<van-col span="12">
				<van-button class="reset" hairline round type="warning" @click="contentReset">重置</van-button>
			</van-col>
			<van-col span="12">
				<van-button class="sure" hairline round type="info" @click="contentSearch()">确定</van-button>
			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
	}

	.btnBox .van-col {
		text-align: center;
	}

	.btnBox .van-button {
		width: 70%;
		margin-top: 20px;
		background: rgb(131, 177, 249);
		box-shadow: 2px 4px 10px rgb(188, 189, 190);
		border-radius: 30px;
		background-size: 100% 100%;
		border: none;
	}

	.btnBox .van-button::after {
		border: none;
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

	.detaiChoose span {
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

	/* .title{
        color:rgb(131,177,249);
        font-size: 24px;
        line-height: 50px;
        font-weight: 400;
    }
    .title span{
        padding:0 50px;
        display: inline-block;
        background: url("../static/img/title_bg.png") no-repeat;
        background-size: 100%;
        background-position-y: center;
    } */
	.detailSearchBox_title {
		border-bottom: 1px solid rgba(188, 189, 190, 0.29);
	}
</style>
