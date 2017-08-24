<template>
	<div id="login">
		<div>
			用户: <input type="text" v-model="username">
			密码: <input type="password" v-model="password">
			<input type="button" value="登录" @click.stop="userLogin">
			<input type="button" value="注册" @click.stop="toRegisterView">
			<button class="changePsd" @click.stop="toResetPsdView">改密码</button>
			<button @click.stop="changeVuex('tree')">vuex</button>
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
		computed: {
			//使用对象展开运算符将对象混入到外部对象中
		  	...mapState({
				vuexMessage:state=>state.plugins.currentPlugin,
			})
		},
		// computed:mapState({
		// 	vuexMessage:state=>state.message,
		// 	// vuexMessage(){
		// 	// 	return this.$store.state.message;
		// 	// },
		// }),
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
<style lang="scss" scoped>
	// 占位符选择器  %用法和. # 有什么不同呢？只是多了一种选择器？
	%bgRed{
		background:pink;
	}
	.designReset{
		@extend %bgRed;
		$height:100px !global;//(加上global才能变成全局的)
	}
	$width:120px;
	.total-text{
		height:$height; //会报错 $height undefined（嵌套内的是局部变量，不在嵌套内的是全局变量）
		width:$width;
	}
	//$只能用在属性值上，而插值#{ }还可以用在属性名和选择器上
	$border:border;
	$design:design;
	.#{$design}Reset{
		#{$border}-bottom:1px solid red;
	}
	// @-Rules和derictive
	.designReset{
		@if 1+1 > 2 {
			background:green;
		}else{
			background:red;
		}
	}
	//through包括4 ; to不包括4
	// @for $n from 1 to 4{
	@for $n from 1 through 4{
		.block#{$n}{
			height:calc(10px * #{$n});
			background:green;
		}
	}
</style>