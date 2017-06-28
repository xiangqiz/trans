<template>
	<div id="register">
		<div>
			用户: <input type="text" v-model="username">
			密码: <input type="password" v-model="password">
			确认密码: <input type="password" v-model="confirmPassword">
			<input type="button" value="注册" @click="userRegister">
		</div>
	</div>
</template>
<script>
	export default{
		name:'register',
		data(){
			return{
				username:'100477074@163.com',
				password:'yu789987shi',
				confirmPassword:'yu789987shi',
			}
		},
		methods:{
			userRegister(){
				if(this.username && this.password && this.confirmPassword){
					let _this=this;
					let _obj={
						username:this.username,
						password:this.password,
						confirmPassword:this.confirmPassword
					};
					let url='http://127.0.0.1:8999/reg';
					this.$http({
						url:url,
						method:'post',
						params:_obj,
						headers: {'Content-Type': 'multipart/form-data'},
					}).then(function(res){
						console.log('注册成功！');
					}).catch(function(error){
						// console.log(error.response.data);
						console.log(error);
					})
				}
			},

		},
	}
</script>