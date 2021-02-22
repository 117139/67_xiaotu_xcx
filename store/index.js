import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		
		forcedLogin: false,
		hasLogin: false,
		platform:'',
		userName: "游客",
		loginDatas:{
				avatarurl:'http://51daiyan.test.upcdn.net/resource/api/img/20200716/3eb26483a34058663c1adf01cf90901d.png',
				nickname:'刘明',
				tel:'1786352362',
				gs:'智慧家物联网科技有限公司',
				openId:'123456',
			
		},
		company:'',
		uid:'',
		phone:'',
		token:'',
		laheiArr:[],
		uuid:'',
		
		
		
		pageSize:20,
		
		
		activeName:-1,
		
		
		xcx_status:1,     //0 商家端  1 用户端  2智能安装端
		v_type:1
	},
	mutations: {
		settype(state, v_type) {
			state.v_type = v_type || '1';
		},
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log(userName)
			console.log(state.userName)
		},
		lahei(state, id) {
			// state.userName = userName || '新用户';
			// state.hasLogin = true;
			state.laheiArr.push(id)
			console.log(state.laheiArr)
		},
		logindata(state, logindata) {
			state.loginDatas = logindata || '';
			Vue.set(state,'loginDatas',logindata)
			// state.company=logindata.company
			// state.uid= logindata.id
			// state.phone= logindata.phone
			// state.token= logindata.token
			console.log(logindata)
			console.log(state.loginDatas)
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		logout(state) {
			state.userName = "游客";
			state.hasLogin = false;
		},
		
		// ****************************************
		//评论操作
		setnew_xz(state, new_xz) {
			state.new_xz = new_xz||[];
		},
		//新题
		setnew_problem(state, new_problem) {
			state.new_problem = new_problem||[] ;
		},
	}
})

export default store
