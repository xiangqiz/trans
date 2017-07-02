<!--<template>-->
	<!--<div v-show="defaults.show" class="loadingBox" id="loadingBox" :style="[defaults.loadingStyle]">-->
		<!--<div class="loadingBlock">-->
			<!--&lt;!&ndash; <div class="loadingText" v-show="defaults.textShow">{{defaults.loadingText}}</div> &ndash;&gt;-->
		<!--</div>-->
	<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default{-->
	<!--name:'loading',-->
	<!--props: {-->
		<!--'properties': { //需传入的设置-->
			<!--type: Object,-->
		<!--}-->
	<!--},-->
	<!--data(){-->
		<!--return{-->
			<!--defaultSet:{-->
				<!--show:false,-->
				<!--loadingStyle:{},-->
			<!--}-->
		<!--}-->
	<!--},-->
	<!--computed:{-->
		<!--defaults(){-->
			<!--let obj=$.extend(true, {},this.defaultSet, this.properties);-->
			<!--return obj;-->
		<!--},-->
	<!--},-->
<!--}-->
<!--</script>-->
<!--<style lang="scss" scoped>-->
	<!--.loadingBox{-->
		<!--position: absolute;-->
		<!--width: 100%;-->
		<!--height: 100%;-->
		<!--top: 0;-->
		<!--left: 0;-->
		<!--background: rgba(200,200,200,0.1);-->
		<!--.loadingBlock{-->
			<!--width: 30%;-->
			<!--height: 30%;-->
			<!--margin:auto;-->
			<!--max-height: 40px;-->
        	<!--max-width: 40px;-->
			<!--position: absolute;-->
			<!--left: 0;-->
			<!--top: 0;-->
			<!--right:0;-->
			<!--bottom:0;-->

			<!--background-image: url("../../../assets/img/loading.gif");-->
			<!--background-position: center;-->
			<!--background-size: contain;-->
			<!--background-repeat:no-repeat;-->
		<!--}-->
	<!--}-->
<!--</style>-->