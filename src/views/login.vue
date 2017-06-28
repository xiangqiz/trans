<template>
	<div id="login">
		<div>
			用户: <input type="text" v-model="username">
			密码: <input type="password" v-model="password">
			<div class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me"> 记住我
                </label>
            </div>
			<input type="button" value="登录" @click="userLogin">
		</div>
	</div>
</template>
<script>
	export default{
		name:'login',
		data(){
			return{
				username:'100477074@163.com',
				password:'yu789987shi',
			}
		},
		methods:{
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

		},
	}
</script>