<template>
	<view>
		<z_text></z_text>
		<div class="box">
			<h1>保险产品库使用说明</h1>
			<h2>
				<span class="weight">一、</span>
				使用产品库不需要注册，大家就可以查阅全部的内容。但为了方便大家的使用，注册的朋友，可以使用
				<span class="stress">收藏夹功能</span>
				和
				<span class="stress">保单管理功能</span>
			</h2>
			<h2>
				<span class="weight">二、</span>
				产品库可以采取“
				<span class="stress">按产品名称</span>
				”和“
				<span class="stress">按产品种类</span>
				”两种搜索方式。
			</h2>
			<h2>
				<span class="weight">三、</span>
				“按产品名称”搜索支持模糊搜索和精确搜索，但需要时保险产品名称，而不是具体的条款名称。
			</h2>
			<h2>
				<span class="weight">四、</span>
				“按产品种类”搜索只能通过选取特定的条件进行搜索。
			</h2>
			<h2>
				<span class="weight">五、</span>
				在产品按列表显示的时候，可以选择“
				<span class="stress">按最高保额排序</span>
				”或“
				<span class="stress">按保费排序</span>
				”。按保费排序时会按一个默认的条件下的保费进行排序。
			</h2>
			<h2>
				<span class="weight">六、</span>
				每次可以选择5种及以下产品进行对比。在对比模式下，可以点击“保费”的某个条件，会进行自动排序。
			</h2>
			<h2>
				<span class="weight">七、</span>
				因为展示空间有限，对产品信息的展示较为省略，比如“周岁”简称为“岁”，有些内容以“√”形式表示存在此种情况，有些内容需进一步查询条款内容。
			</h2>
			<h2>
				<span class="weight">八、</span>
				需要对表格中内容进行注释说明时，会在表格的左上方看到“？”的显示，点击即可显示注释内容。
			</h2>
			<h2>
				<span class="weight">九、</span>
				产品表格最左侧一列，如果以
				<span class="blue">蓝色字体</span>
				显示，可以点击查看二级页面内容。
			</h2>
			<h2>
				<span class="weight">十、</span>
				重疾险产品因为病种数量较多，因此我们结合相关专业数据，在重疾、中症、轻症三类，仅选取发生率、赔付率较高病种，供大家参考。因为重疾的第1-25项是统一规定，故未在表格中显示。
			</h2>
			<h2>
				<span class="weight">十一、</span>
				保费是我们根据各位产品的主要购买人群和相关条件进行测算的，仅供参考。
			</h2>
			<h2>
				<span class="weight">十二、</span>
				因为涉及相关法规制度规定，我们无法把产品的销售链接进行展示。部分个人可以销售的产品在表格最下方有“购买链接”，也可以在“保险商城”中查到。
				<br>
				其他产品大家也可以通过:
				<br>
				微信号: <span class="stress">13661396112 </span>
				<br>
				电子邮箱: <span class="stress">xiaotubaoxian@126.com</span>
				<br>
				与我们联系，我们将及时免费提供购买链接。
			</h2>
			<span class="stress"></span>
		</div>
	</view>
</template>
<script>
	var that
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			that=this
			// console.log(that.$store.state.v_type==1)
			// if(that.$store.state.v_type==1){
			// 	uni.redirectTo({
			// 		url:'/pages_fk/details/details'
			// 	})
			// 	return
			// }
		},
		methods: {

		}
	}
</script>

<style scoped>
	#explain {
		text-align: center;
		width: 100%;
		min-height: 100%;
		background: rgb(242, 246, 250);
		/* background: url("../static/img/bg1.png") repeat;
        background-position-y: top;
        background-size: 100%; */
		/* padding-bottom:30px; */
	}

	h1 {
		margin-top: 15px;
		font-size: 22px;
		color: rgb(131, 177, 249);
		font-weight: 400;
	}

	h2 {
		font-size: 14px;
		color: rgb(8, 8, 8);
		font-weight: 400;
		line-height: 22px;
		margin: 20px 10px;
		text-align: left;
		letter-spacing: 2px;
	}

	.weight {
		font-weight: 600;
	}

	.stress {
		color: rgb(250, 114, 79);
	}

	.blue {
		color: rgb(55, 55, 248);
		text-decoration: underline;
	}

	.box {
		margin: 10px 10px;
		background: #fff;
		/* border:1px solid #eee; */
		box-shadow: 1px 1px 3px #eee;
		padding: 6px 15px;
	}
</style>
