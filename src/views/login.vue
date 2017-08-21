<template>
	<div id="login">
		<div>
			用户: <input type="text" v-model="username">
			密码: <input type="password" v-model="password">
			<input type="button" value="登录" @click.stop="userLogin">
			<input type="button" value="注册" @click.stop="toRegisterView">
			<button class="changePsd" @click.stop="toResetPsdView">改密码</button>
			<button @click.stop="changeVuex('tree')">测试vuex</button>
			<input :value="vuexMessage" />
		</div>
	</div>
</template>
<script>
	import { mapState ,mapActions} from 'vuex'
	export default{
		name:'login',
		data(){
			return{
				username:'100477074@163.com',
				password:'yu789987shi',
				newPassWord:'123456',
			}
		},
		// computed:mapState({
		// 	vuexMessage:state=>state.message,
		// 	// vuexMessage(){
		// 	// 	return this.$store.state.message;
		// 	// },
		// }),
		computed: {
		  	...mapState({
				vuexMessage:state=>state.plugins.currentPlugin,
			})
		},
		methods:{
			...mapActions({
				changeVuex:'changePlugins',
			}),
			// changeVuex(str){
			// 	this.$store.dispatch('changeMessage', {
			// 	  newMsg: '10'
			// 	})
			// },
			toResetPsdView(){
				let target='http://localhost:9999/#/resetPsd';
				window.open(target,"_blank");
			},
			userLogin(){
				if(this.username && this.password){
					let _this=this;
					let _obj={
						username:this.username,
						password:this.password,
					};
					let url='http://127.0.0.1:8999/login';
					this.$http({
						url:url,
						method:'post',
						params:_obj,
						headers: {'Content-Type': 'multipart/form-data'},
					}).then(function(res){
						console.log(res);
						console.log('登录成功！');
					}).catch(function(error){
						// console.log(error.response.data);
						console.log(error);
					})
				}
			},
			toRegisterView(){
				let target='http://localhost:9999/#/register';
				window.open(target,"_blank");
			},

		},
	}
</script>