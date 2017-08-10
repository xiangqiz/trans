<template>
	<div >
		<div>
			新密码: <input type="text" v-model="newPassword">
			确密码: <input type="text" v-model="confirmPassword">
			<button class="changePsd" @click.stop="changePassword">改密码</button>
		</div>
	</div>
</template>
<script>
	export default{
		name:'login',
		data(){
			return{
				newPassword:'11111',
				confirmPassword:'11111',
				user:{
					username:'100477074@163.com',
				},
			}
		},
		// created(){
		// 	let url='http://127.0.0.1:8999/mysession';
	 //        this.$http({
	 //        	method:'get',
	 //        	url:url,
	 //        }).then(function(result){
	 //            if(result.status==200){
	 //                console.log(result.body);
	 //                this.user=result.body
	 //            }
	 //        }).catch(function(err){
	 //            console.log('会话失败：'+err);
	 //            let target='http://localhost:9999/#/login';
		// 		window.open(target,"_blank");
	 //        });
	 //    },
		methods:{
			changePassword(){
				if( this.confirmPassword && this.newPassword){
					let _this=this;
					let _obj={
						newPassWord:this.newPassWord,
						confirmPassword:this.confirmPassword,
						user:this.user,
					};
					let url='http://127.0.0.1:8999/password';
					this.$http({
						url:url,
						method:'post',
						params:_obj,
						headers: {'Content-Type': 'multipart/form-data'},
					}).then(function(res){
						console.log(res);
						console.log('修改密码成功！');
					}).catch(function(error){
						// console.log(error.response.data);
						console.log(error);
					})
				}
			},
		},
	}
</script>