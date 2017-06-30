<!-- loading使用说明：
	使用说明：
		此组件的外层标签需设置position，设置后，此组件可遮住外层标签的大小位置
	props传值说明：
	properties:{
		show:false,//是否显示
		loadingForm:'circle',//加载时的显示图案
		textShow:false,//是否显示加载文字
		loadingText:'拼命加载中',//加载时的显示文字
		loadingStyle:{},//加载条的样式
	}
-->
<template>
	<div v-show="defaults.show" class="loadingBox" id="loadingBox" :style="[defaults.loadingStyle]">
		<div class="loadingBlock">
			<!-- <div class="loadingText" v-show="defaults.textShow">{{defaults.loadingText}}</div> -->
		</div>
	</div>
</template>
<script>
export default{
	name:'loading',
	props: {
		'properties': { //需传入的设置
			type: Object,
		}
	},
	data(){
		return{
			defaultSet:{
				show:false,
				// loadingForm:'circle',
				// loadingText:'拼命加载中',
				// textShow:false,
				loadingStyle:{},
			}
		}
	},
	computed:{
		defaults(){
			let obj=$.extend(true, {},this.defaultSet, this.properties);
			return obj;
		},
	},
}
</script>
<style lang="scss" scoped>

	.loadingBox{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(200,200,200,0.1);
		// text-align:center;
		.loadingBlock{
			// display:inline-block;
			width: 30%;
			height: 30%;
			margin:auto;
			max-height: 40px;
        	max-width: 40px;
			position: absolute;
			left: 0;
			top: 0;
			right:0;
			bottom:0;

			background-image: url("../../../assets/img/loading.gif");
			background-position: center;
			background-size: contain;
			background-repeat:no-repeat;
			// .loadingText{
			// 	font-size:16px;
			// 	font-weight: bolder;
			// }
		}
	}
</style>