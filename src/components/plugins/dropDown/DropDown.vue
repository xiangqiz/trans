<template>
	<div class="dropdown" v-if="defaults.isShow" 
	:style='[showOffset,defaults.dropDownStyle]'>
		<ul class="ul-dropdown" @keydown.down @click.stop >
			<div class="dropdown-title" v-if="defaults.title">{{defaults.title}}</div>
			<!-- 搜索框div -->
			<li class="li-search" v-if="defaults.isSearch" :style="[defaults.liSearchStyle]" @click.stop>
				<div class="btn-search" id="btn-search">
					<button class="button-i" type="button">
						<i class="icon iconfont icon-search"></i>
					</button>
				</div>
				<input 
				class="input-search" 
				type="text" 
				v-model="searchName" 
				@keydown.stop
				@keyup.stop="matchItems"
				:placeholder="defaults.placeholder"/>
			</li>
			<nanoscrollerComponent :properties="{height:myScrollH,width:'100%'}">
				<div>
					<li 
						v-if="!defaults.isTree"
						class="li-dropdown" 
						v-for="(item,index) in myDropItems" 
						:value='item[defaults.realField]' 
						:title="item[defaults.showField]"
						:style="[defaults.liDropStyle]"
						@click.stop="chooseItem(item)" @mousedown.stop.prevent 
						:class="{'is-divered':defaults.isDiver,
						'disabled':(itemsChoosed.length===defaults.multiLength) && (!itemsChoosed.includes(item)),
						'active':itemsChoosed.includes(item)}">
						<!-- 列表小圆点 -->
						<i class="icon iconfont" v-if="defaults.isDecorate"
						:class="{[defaults.listDecorate]:defaults.isDecorate}"></i>
						<!-- 多选框checkbox -->
						<i class="icon iconfont" v-if="defaults.isMultiple"
						:class="{[defaults.checkOk]:defaults.isMultiple && itemsChoosed.includes(item),
						[defaults.checkNo]:defaults.isMultiple && !itemsChoosed.includes(item)}"
						></i>
						{{item[defaults.showField]}}
					</li>
					<Item v-if="defaults.isTree" :sourceData="defaults.dropItems" 
						:treeT="{
						name:defaults.showField,
						id:defaults.realField,
						pId:defaults.pidField,
						defaultItem:defaults.defaultItem,
						addDefField: defaults.addDefField,
						defaultExpand: defaults.defaultExpand,
						validate:defaults.validate,
						validateError:defaults.validateError
						}"
						@chooseTreeItem="choTree">
					</Item>
					<li class="nodata" v-if="myDropItems.length===0" :style="[defaults.noDataStyle]">
						{{defaults.noData}}
					</li>
				</div>
			</nanoscrollerComponent>
		</ul>
	</div>
</template>
<script>
	import Item from '../tree/Item.vue';
	import nanoscrollerComponent from '../nanoscroller/nanoScroller.vue';
	import getChinesePyFirst from './dropdownPy/pinyinUtils.js';
	export default {
		name: 'dropdown',
		components:{Item,nanoscrollerComponent},
		props:['optObj'],//外部传入的下拉框数据对象
		data () {
			return {
				myScrollH:'',//计算nanoScroller的高度
				searchName:'',//搜索功能input处显示值
				itemsChoosed:[],//存放多选结果集
				searchFlag:false,//搜索功能开关
				showOffset: {},//存放dropdown的定位信息
				defaultSet:{
					title:'', //下拉框标题
					defaultItem:'',//选中项
					dropItems:[],//下拉框选项
					showField:undefined,//展示值字段
					realField:undefined,//真实值字段
					isShow:false,//初始化 是否显示下拉框
					isSearch:false,//是否要搜索功能
					isDiver:true,//是否显示分割线
					isTree:false,//是否以树状形式展示
					isMultiple:false,//是否可以多选
					noData:this.$t('message.plugins.dropDownNoData'),
					noSearchData:this.$t('message.plugins.dropDownNoSearchData'),
					placeholder:this.$t('message.plugins.dropDownEnter'),
					addDefField: this.$t('message.plugins.dropDownNew'),//新建选项时默认名字
					defaultExpand: 'none',//树形下拉框默认展开第几层
					dropDownStyle:{//下拉框整体样式
						maxHeight:'230px',
					},
					liSearchStyle:{//搜索框样式
						height:'30px',
					},
					liDropStyle:{//每个选项的样式
						height:'35px',
					},
					noDataStyle:{//无选项字段样式
						textAlign:'center',
						height:'40px',
					},
					// isFolderChoose:true,
					checkOk:'icon-checkbox',//多选时选中的图标
					checkNo:'icon-checkbox-no',//多选时未选中的图标
					isDecorate:false,//是否显示选项前边的装饰小圆点
					listDecorate:'icon-dot',//选项前边的装饰小圆点图标
				},
			}
		},
		computed:{
			//将外部传入的数据与本插件的默认设置合并
			defaults (){
				let _obj = $.extend(true,{},this.defaultSet,this.optObj);

				if(_obj.isMultiple && !_obj.multiLength){
					_obj.multiLength=_obj.dropItems.length;
				}
				if(!this.optObj.realField && this.optObj.showField){
					_obj.realField = this.optObj.showField;
				}
				if( this.optObj.realField && !this.optObj.showField){
					_obj.showField = this.optObj.realField;
				}
				return _obj;
			},
			//显示的下拉选项（包括搜索功能）
			myDropItems(){
				if(this.defaults.isSearch && this.searchFlag && this.searchName){
					return this.addSearchTomyDropItems();//搜索结果集
				}else{
					return this.defaults.dropItems;//原始结果集
	           	}
			},
		},
		watch:{
			myDropItems(){
				this.showFixed();
			},
			defaults(){
				//清除当前数据
				this.clearCurrentData();
				if(this.defaults.isShow){
					//设置默认选中项
					this.pushDefaultItems();
					//计算滚动条实际高度，下拉框定位数据
					this.showFixed();
				}
			},
		},
		methods:{
			//设置默认选中项
			pushDefaultItems(){
				let arr=[];
				if(this.defaults.defaultItem!==undefined){
					if(this.defaults.isMultiple){
						arr=this.defaults.defaultItem;
					}else{
						arr.push(this.defaults.defaultItem);
					}
					for(let i=0;i<arr.length;i++){
						for(let j=0;j<this.defaults.dropItems.length;j++){
							if(String(arr[i])===String(this.defaults.dropItems[j][this.defaults.realField])){
								this.itemsChoosed.push(this.defaults.dropItems[j]);
							}
						}
					}
				}
			},
			//点击选中
			chooseItem(item){
				if(this.defaults.isMultiple){
					//若已选中项达到最大值，则未选中的选项呈禁用状态，点击无反应
		        	if((this.itemsChoosed.length===this.defaults.multiLength) && (!this.itemsChoosed.includes(item))){
		        		return ;
		        	}else{
		        		this.chooseMulti(item);
		        	}
				}else{
	            	this.itemsChoosed=[];
		        	this.itemsChoosed.push(item);
		            this.$emit('chooseItem',item);
	            }
	        },
	        //多选，由在不在结果集内来判断 选中/取消选中
	        chooseMulti(item){
	        	let flag= this.itemsChoosed.includes(item);
				if(!flag){
					this.itemsChoosed.push(item);
					this.$emit('chooseItem',this.itemsChoosed);
				}else{
		            for(let i=0;i<this.itemsChoosed.length;i++){
		            	if(item[this.defaults.realField]===this.itemsChoosed[i][this.defaults.realField]){
		            		this.itemsChoosed.splice(i,1);
		            		this.$emit('chooseItem',this.itemsChoosed);
		            	}
		            }
		        }
		    },
		    //树形下拉框选择选项  此函数是树形插件的回调
		    choTree(msg){
				if(typeof this.defaults.validate==='function'){
					if(!this.defaults.validate(msg)){
						return;
					}else{
						this.$emit('chooseItem',msg);
					}
				}else{
					this.$emit('chooseItem',msg);
				}
			},
			 //搜索匹配
	        matchItems(){
	        	this.searchFlag=true;
	        },
	        //按搜索字段搜索
			addSearchTomyDropItems(){
				let _myDropItems=[];
				let _dropItems=this.defaults.dropItems;//数组
				let length=this.defaults.dropItems.length;
				let searchName=this.searchName.toLowerCase();
				let type=this.defaults.showField;
				//搜索字符是否包含在条目中
				for(let i=0;i<length;i++){
					if(String(_dropItems[i][type]).toLowerCase().includes(searchName)){
						_myDropItems.push(_dropItems[i]);
					}
				}
				//搜索字符是否匹配条目中汉字拼音的首字母（声母，韵母呢？）
				let isSearchFit=(searchName.length===1) && (/^[A-Za-z]+$/.test(searchName));
				if(isSearchFit){
					for(let j=0;j<length;j++){
						let hasChinese=/[\u4e00-\u9fa5]/g.test(_dropItems[j][type]);
						if(hasChinese){
							let fResult=getChinesePyFirst(_dropItems[j][type],false);//比如‘ZD’
                            if(fResult[0].toLowerCase()===searchName){
                            	_myDropItems.push(_dropItems[j]);
                            }
						}
					}
				}
				this.searchFlag=false;
				return _myDropItems;
			},
			//下拉框定位
			showFixed(){
				let _this=this;
				setTimeout(function(){
					//计算ul-dropdown的宽度
					_this.calcShowWidth();
					//计算nanoscroller的高度
					_this.calcNanoHeight();
					//下拉框定位
					_this.show(_this.defaults.el);
				},0)
			},
			//计算下拉框的宽度
			calcShowWidth(){
				if(this.defaults.dropDownStyle && this.defaults.dropDownStyle.width){
					if(this.defaults.dropDownStyle.width!=='auto'){
						this.$set(this.showOffset,'width',this.defaults.dropDownStyle.width);
					}else{
						let _width=$($(this.$el)).width();
						this.$set(this.showOffset,'width',_width+'px');
					}
				}else{
					this.$set(this.showOffset,'width',this.defaults.el.offsetWidth+'px');
				}
				this.$set(this.showOffset,'min-width',this.defaults.el.offsetWidth+'px');
			},
			//计算滚动条的高度（因为下拉选项个数是不确定的）
			calcNanoHeight(){
				let _this=this;
				let maxHeight=parseFloat(_this.defaults.dropDownStyle.maxHeight.split('px')[0]);//300
				let customHeight=0;
				let length=_this.myDropItems.length;
				let liSearchH=parseFloat(_this.defaults.liSearchStyle.height.split('px')[0]);
				if(_this.myDropItems.length){
					if(_this.defaults.isTree){
						_this.myScrollH=maxHeight+'px';
					}else{
						//若不是树，则ul的高度自己计算
						let liDropH=parseFloat(_this.defaults.liDropStyle.height.split('px')[0]);//30
						if((length*liDropH)<maxHeight){
							customHeight=length*liDropH;
						}else{
							customHeight=maxHeight;
						}
						_this.myScrollH=customHeight+'px';
					}
				}else{
					let noDataH=parseFloat(_this.defaults.noDataStyle.height.split('px')[0]);
					_this.myScrollH=noDataH+'px';
				}
				if(_this.defaults.isSearch){
					let totalH=parseFloat(customHeight)+parseFloat(liSearchH);
					_this.$set(_this.showOffset,'height',totalH+'px');
				}else{
					let totalH=parseFloat(customHeight);
					_this.$set(_this.showOffset,'height',totalH+'px');
				}
			},
			//计算document和该组件的宽高，用于定位
			calcWidthAndHeight(){
				let bodyHeight=$(document).height();
				let bodyWidth=$(document).width();
				let widgetHeight=parseFloat(this.showOffset.height.split('px')[0]);
				let widgetWidth=parseFloat(this.showOffset.width.split('px')[0]);
				return {bodyHeight,bodyWidth,widgetHeight,widgetWidth};
			},
			//设置下拉框定位数据
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
	        clearCurrentData(){
				this.itemsChoosed=[];
				this.myScrollH='';
				this.showOffset={};
				this.searchName='';
				this.searchFlag=false;
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '~src/assets/sass/param/common.scss';
	//默认下拉框整体样式
	$dropdown-border:solid 1px #dad2d2;
	$hover-color:#eee;
	$ul-fixed:fixed;
	$active-color:#eeefff;
	$disabled-opacity:0.5;
	.dropdown{
		position:$ul-fixed;
	}
	//垂直居中
	.mid-align{
		&:after{
				content:'';
				width:0;
				vertical-align:middle;
				height:100%;
				display:inline-block;
			}
	}
	.dropdown-title{
		width:calc(100% - 20px);
		height:30px;
		text-align:center;
		padding-top:3px;
		font-size:15px;
		border-bottom:1px solid #d8c8c8;
		margin:0 10px;
	}
	.ul-dropdown{
		border:$dropdown-border;
		border-radius: 3px;
		background:#fff;
		.li-dropdown{
			cursor:pointer;
			width:100%;
			padding:1px 10px;
			font-size:15px;
			border-radius:3px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow:hidden;
			@extend .mid-align;
			&:hover{
				background:$hover-color,
			}
			.icon-dot{
				width:20px;
				height:100%;
				font-size:20px;
			}
		}
		.nodata{
			width:100%;
			@extend .mid-align;
		}
	}
	.li-search{
		position:relative;
		.input-search{
			@include width-height(80%,100%);
			position: absolute;
			top: 0;
			right: 0;
		}
		.btn-search{
			@include width-height(20%,100%);
			vertical-align:middle;
			color: #999;
			.button-i{
				height: 100%;
				width: 100%;
				font-size:14px;
			}
		}
	}
	.active{
		background:$active-color !important;
	}
	.is-divered{
		width:90%;
		border-bottom:1px solid #fbe8e8;
	}
	.disabled{
		opacity:$disabled-opacity;
		cursor:default !important;
	}
</style>
