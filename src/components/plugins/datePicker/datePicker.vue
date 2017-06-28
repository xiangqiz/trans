<template>
	<div class="datepicker" v-show="mergeSetting.isShow" :style="[showOffset]">
		<div class="datepicker-header ">
			<div class="pre-btn dib mid-align" @click.stop="calcPreYearDays"> << </div>
			<div class="pre-btn dib mid-align"
				@click.stop="calcPreMonthDays"
				@mousedown.stop="mouseDownPre($event)"
				@mouseup.stop="mouseUp"
				> < </div>
			<div class="show-year-month dib mid-align">{{currentYear}}年{{currentMonth+1}}月</div>
			<div class="next-btn dib mid-align"
				@click.stop="calcNextMonthDays"
				@mousedown.stop="mouseDownNext($event)"
				@mouseup.stop="mouseUp"> > </div>
			<div class="next-btn dib mid-align" @click.stop="calcNextYearDays"> >> </div>
		</div>
		<div class="datepicker-body">
			<table class="datepicker-table">
				<tr class="datepicker-table-head">
					<th class="datepicker-table-weekday" v-for="weekday in weekdays">{{weekday}}</th>
				</tr>
				<tr class="datepicker-table-body" v-for="dateRow in currentMonthDate">
					<td class="datepicker-table-everyday" v-for="day in dateRow">{{day}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
	export default{
		name:'datepicker',
		props:{
			'datePickerData':{
				type: Object,//检测类型
			},
		},
		data(){
			return{
				weekdays:['日','一','二','三','四','五','六'],
				defaultSetting:{
					isShow:false,
				},
				currentMonthDate:[],
				currentMonth:0,
				currentYear:2017,
				preInterval:null,
				nextInterval:null,
				preTimeout:null,
				nextTimeout:null,
				showOffset:{},
				isMouseDown:false,
			}
		},
		computed:{
			mergeSetting(){
				let _obj=$.extend(true, {} ,this.defaultSetting, this.datePickerData);
				return _obj;
			},
		},
		watch:{
			mergeSetting(){
				if(this.mergeSetting.isShow){
					this.calcCurrentMonthDays(new Date());
					this.show(this.mergeSetting.el);
				}else{
					this.currentMonthDate=[];
				}
			},
		},
		methods:{
			mouseUp(){
				clearTimeout(this.preTimeout);
				clearTimeout(this.nextTimeout);
				clearInterval(this.preInterval);
				clearInterval(this.nextInterval);
				this.isMouseDown=false;
			},
			mouseDownPre(event){
				let _this=this;
				this.preTimeout=setTimeout(function(){
					this.isMouseDown=true;
					console.log('123');
					let that=_this;
					_this.preInterval=setInterval(function(){
						that.calcPreMonthDays();
					},500)
				},300)
			},
			mouseDownNext(event){
				let _this=this;
				this.nextTimeout=setTimeout(function(){
					this.isMouseDown=true;
					console.log('123');
					let that=_this;
					_this.nextInterval=setInterval(function(){
						that.calcNextMonthDays();
					},500)
				},300)
			},
			//计算上个月数据 currentMonth 0~11对应1-12月
			calcPreMonthDays(){
				clearTimeout(this.preTimeout);
				clearTimeout(this.nextTimeout);
				if(!this.isMouseDown){
					this.currentMonthDate=[];
					this.currentMonth=this.currentMonth-1;
					if(this.currentMonth<0){
						this.currentYear=this.currentYear-1;
						this.currentMonth=11;
					}
					this.calcCurrentMonthDays(new Date(this.currentYear,this.currentMonth,1));
				}
				// else{
				// 	this.isMouseDown=false;
				// }
			},
			//计算下个月数据
			calcNextMonthDays(){
				clearTimeout(this.preTimeout);
				clearTimeout(this.nextTimeout);
				if(!this.isMouseDown){
					this.currentMonthDate=[];
					this.currentMonth=this.currentMonth+1;
					if(this.currentMonth>11){
						this.currentYear=this.currentYear+1;
						this.currentMonth=0;
					}
					this.calcCurrentMonthDays(new Date(this.currentYear,this.currentMonth,1));
				}
				// else{
				// 	this.isMouseDown=false;
				// }
			},
			calcPreYearDays(){
				this.currentMonthDate=[];
				this.currentYear=this.currentYear-1;
				this.calcCurrentMonthDays(new Date(this.currentYear,this.currentMonth,1));
			},
			calcNextYearDays(){
				this.currentMonthDate=[];
				this.currentYear=this.currentYear+1;
				this.calcCurrentMonthDays(new Date(this.currentYear,this.currentMonth,1));
			},
			//计算当月的日期   默认显示当日日期
			calcCurrentMonthDays(date){
				let _arr=[];
				let curMonthDaysShowArr=[];
				let currentDate=date;//2017.5.7
				this.currentYear=currentDate.getFullYear();//2017
				this.currentMonth=currentDate.getMonth();//4
				let curMonthFirstDay=new Date(this.currentYear,this.currentMonth,1);
				let curMonthLastDay=new Date(this.currentYear,this.currentMonth+1,0);
				let curMonthFirstWeekday=curMonthFirstDay.getDay();
				for(let i=0;i<curMonthFirstWeekday;i++){
					curMonthDaysShowArr.push('无');
				}
				for(let j=1;j<=curMonthLastDay.getDate();j++){
					curMonthDaysShowArr.push(j);
				}
				for(let k=0;k<42-curMonthFirstWeekday-curMonthLastDay.getDate();k++){
					curMonthDaysShowArr.push('无');
				}
				let str=curMonthDaysShowArr.join('');
				for(let m=0;m<6;m++){
					let subArr=curMonthDaysShowArr.slice(7*m,7*(m+1));
					this.currentMonthDate.push(subArr);
				}
			},
			calcWidthAndHeight(){
				let bodyHeight=$(document).height();
				let bodyWidth=$(document).width();
				// let datePicker=$(this.$el).find('.datepicker')[0];
				let widgetHeight=$(this.$el).height();
				let widgetWidth=$(this.$el).width();
				console.log({bodyHeight,bodyWidth,widgetHeight,widgetWidth});
				return {bodyHeight,bodyWidth,widgetHeight,widgetWidth};
			},
			show(ev){
				let widthAndHeight=this.calcWidthAndHeight();

				let bodyHeight=widthAndHeight.bodyHeight;
				let bodyWidth=widthAndHeight.bodyWidth;
				let widgetHeight=widthAndHeight.widgetHeight;
				let widgetWidth=widthAndHeight.widgetWidth;

				let offset=$(ev).offset();

				let top=0;
				let left=0;
				//超出浏览器宽度，则向左展开
				let a=offset.left+widgetWidth
				if((offset.left+widgetWidth)>bodyWidth){
					left=offset.left+ev.offsetWidth-widgetWidth;
				}else{
					left=offset.left;
				}
				//超出浏览器高度，则向上展开
				let	totalH=offset.top+ev.offsetHeight+widgetHeight;
				if(totalH>bodyHeight){
				    top=offset.top-widgetHeight;
				}else{
					top=offset.top+ev.offsetHeight;
				}
				let _obj = {
					'left': left+'px',
					'top': top+'px',
				}
				this.showOffset = Object.assign({},this.showOffset,_obj);
			},
		},
	}
</script>
<style lang="scss">
	$datepicker-color:#c5e5ce;
	.mid-align{
		&:after{
				content:'';
				width:0;
				vertical-align:middle;
				height:100%;
				display:inline-block;
			}
	}
	.dib{
		display:inline-block;
	}
	.datepicker{
		width:300px;
		height:260px;
		background:$datepicker-color;
		position:fixed;
		font-size: 15px;
		.datepicker-header{
			width:100%;
			height:15%;
			text-align:center;
			border-bottom:1px solid #ffffff;
			.pre-btn{
				width:10%;
				height:100%;
			}
			.next-btn{
				width:10%;
				height:100%;
			}
			.show-year-month{
				width:30%;
				height:100%;
			}
		}
		.datepicker-body{
			width:100%;
			height:85%;
			.datepicker-table{
				width:100%;
				height:100%;
				.datepicker-table-head{
					width:100%;
					height:29px;
					.datepicker-table-weekday{
						height:100%;
					}
				}
				.datepicker-table-body{
					width:100%;
					height:30px;
					border:1px solid #eee;
					border-collapse: collapse;
					.datepicker-table-everyday{
						text-align:center;
					}
				}
			}
		}
	}
</style>