<!--
	树形组件，单选，
	用法：父组件
	//sourceData为原始数据，（必传）
	//treeT为属性设置(object格式)，（必传）
	<Tree 
		:sourceData="optTree.dropItems" 
		:treeT="optTree.options"
		v-if="optTree.isShow"
		@chooseTreeItem="getTreeData"
		@changeNewName="getAddData"
		@changeDbNewName="getChangeData"//接收双击改名字的值
		@getDefaultData="getDefaultData"
		@getDragData="getDragData"//接收拖拽的对象及新的父元素
		>
	</Tree>
	外部通过ref调用setSelect方法

	optTree:{
					name:'tree',
					isShow:false,
					// isSearch:true,
					dropItems:[
					{element:'首页',id:'1',pid:'0'},
					{element:'轮播',id:'2',pid:'1'},
					{element:'轮播小图',id:'3',pid:'2'},
					{element:'轮播大图',id:'4',pid:'2'},
					{element:'产品',id:'5',pid:'2'},
					{element:'蔬菜',id:'6',pid:'5'},
					{element:'有机蔬菜',id:'7',pid:'6'},
					{element:'无机蔬菜',id:'8',pid:'6'},
					{element:'水果',id:'9',pid:'0'},
					{element:'有机水果',id:'10',pid:'9'},
					{element:'有机大水果',id:'11',pid:'10'},
					{element:'有机小水果',id:'12',pid:'10'},
					{element:'无机水果',id:'13',pid:'9'},
					],
					options:{
					    isDrag :false,//是否可拖拽
						isDbClick:false,//能不能双击改名字 true false
						defaultItem:6,//id(默认选中值),true(默认第一个),false（无默认）
						defaultExpand:'none',//默认展开的情况 'none'（都不展开）,'first'（只第一层级展开）,'all'（全部展开）
						id:'id',
						name:'element',
						pId:'pid',
						addDefField:'新建文件夹',//默认的文件夹名字
						'validate': function(data){//是否可以向插件使用者传 文件夹级数据
							if( data.dm_showtype === 'dir' ){
								return false;
							}else{
								return true;
							}
						},
						'validateError': '不能选择文件夹节点',//是否可以向插件使用者传 文件夹级数据，验证失败显示的字段
					},
					isAdd:false,//是否增加选项 true新建 false不新建 root新建根文件夹
				},
-->
<!--<template>-->
	<!--<ul class="ul-tree"  -->
	<!--:class="{'first-level':!toNext,cursorMove:defaultTreeT.isDrag && trueTreeDragData.isDraggable}"-->
		<!--@mousemove.stop="dragMouseMove($event)"-->
		<!--@mouseup.stop="dragMouseUp($event)"-->
		<!--@mouseleave.stop="mouseLeave"-->
		<!--@contextmenu.prevent-->
		<!--@selectstart.prevent>-->
	    <!--<div class="show-validate" v-if="showValidate">	-->
	    	<!--{{defaultTreeT.validateError}}-->
	    <!--</div>-->
		<!--<li v-for="model in treeData" class="tree-wrapper">-->
			<!--<div class="show-node" :class="{-->
				<!--'dragToNode':trueDragSelected[0]===model[defaultTreeT.id]}">-->
				<!--<span class="toggle" @click.stop="toggle(model)">-->
					<!--<i class="icon iconfont icon-hide-folder" v-show="!trueOpenName.includes(model[defaultTreeT.id])"></i>-->
					<!--<i class="icon iconfont icon-show-folder" v-show="(trueOpenName.length>0 && trueOpenName.includes(model[defaultTreeT.id]))"></i>-->
				<!--</span>-->
				<!--<i class="icon iconfont icon-folder"></i>-->
				<!--<div class="node"-->
				<!--v-show="!(isDbClicked && (trueDbSelected.length>0) && (trueDbSelected[0]==model[defaultTreeT.id]))"-->
				<!--:title="model[defaultTreeT.name]"-->
				<!--:class="{-->
				<!--choosed:(trueSelected.length>0) && (trueSelected[0]==model[defaultTreeT.id]),-->
				<!--cursorMove:defaultTreeT.isDrag && trueTreeDragData.isDraggable-->
				<!--}"-->
				<!--@mousedown.stop="dragMouseDown(model,$event)"-->
				<!--@click.stop="chooseTreeItem(model)"-->
				<!--@dblclick.stop="changeFolderName(model)">-->
					<!--{{model[defaultTreeT.name]}}-->
					<!--<span id="show-id" :style="{display:'none'}">{{model[defaultTreeT.id]}}</span>-->
				<!--</div>-->
				<!--<input class="db-change-input" type="text" :value="model[defaultTreeT.name]" v-model="dbChangeNewName" v-show="treeT.isDbClick && isDbClicked && (trueDbSelected.length>0) && (trueDbSelected[0]==model[defaultTreeT.id])" @blur.stop="changeDbNewName(model)" v-focus @keydown.stop/>-->
			<!--</div>-->
			<!--<div class="add-children" v-show="isAdd===true && (trueSelected.length>0) && (trueSelected[0]==model[defaultTreeT.id])">-->
				<!--<span class="toggle">-->
					<!--<i class="icon iconfont icon-hide-folder"></i>-->
				<!--</span>-->
				<!--<i class="icon iconfont icon-folder" ></i>-->
				<!--<input  class="add-children-input" :value="newName" v-model="newName"-->
					<!--@blur.stop="changeNewName(model)" v-focus @keydown.stop/>-->
			<!--</div>-->
			<!--&lt;!&ndash; 第二级往后的 &ndash;&gt;-->
			<!--<item v-if="model.children.length>0" v-show="trueOpenName.length>0 && trueOpenName.includes(model[defaultTreeT.id])"-->
				<!--:sourceData="model.children"-->
				<!--:totalSourceData="uniqueData"-->
				<!--:treeT="treeT"-->
				<!--:isTrans="false"-->
				<!--:isAdd="isAdd"-->
				<!--:toNext="{selected:trueSelected,openName:trueOpenName,dbSelected:trueDbSelected,-->
				<!--dragSelected:trueDragSelected,dragData:trueTreeDragData}"-->
				<!--@chooseTreeItem="chooseTreeItem"-->
				<!--@changeNewName="changeT"-->
				<!--@changeDbNewName="changeDbNewNameT"-->
				<!--@getDragData="getDragDataT"-->
				<!--@getFromNextData="getFromNextData">-->
			<!--</item>-->
			<!--&lt;!&ndash; getFromNextData方法，负责向外传值，但是不传到使用此插件的地方 &ndash;&gt;-->
		<!--</li>-->
		<!--<div class="add-root" v-show="(!toNext) && isAdd==='root'">-->
			<!--<span class="toggle">-->
				<!--<i class="icon iconfont icon-hide-folder"></i>-->
			<!--</span>-->
			<!--<i class="icon iconfont icon-folder"></i>-->
			<!--<input  class="add-root-input" :value="newName" v-model="newName" @blur.stop="changeNewName()" v-focus @keydown.stop/>-->
		<!--</div>-->
		<!--<div class="move-tree-block" -->
			<!--v-show="defaultTreeT.isDrag && trueTreeDragData.isDraggable && (!toNext)" -->
			<!--:style="{top:trueTreeDragData.top+'px',left:trueTreeDragData.left+'px'}" -->
			<!--@click.stop @selectstart.prevent>-->
			<!--<span>-->
				<!--<i class="icon iconfont icon-hide-folder"></i>-->
			<!--</span>-->
			<!--<i class="icon iconfont icon-folder" ></i>-->
			<!--<div class="node">-->
				<!--{{trueTreeDragData.currentDragModel[defaultTreeT.name]}}-->
			<!--</div>-->
		<!--</div>-->
	<!--</ul>-->
<!--</template>-->
<!--<script>-->
	<!--export default{-->
		<!--name:'item',-->
		<!--props:{-->
			<!--//此字段说明是否需要将平级数据转化为树形数据（第一层转化，里面的不转化）-->
			<!--'isTrans': {-->
				<!--type: Boolean,-->
				<!--default: true,-->
			<!--},-->
			<!--//父组件传的数据对象-->
			<!--'treeT':{-->
				<!--type: Object,//检测类型-->
			<!--},-->
			<!--//新建开关-->
			<!--'isAdd':{-->
				<!--default:false,-->
			<!--},-->
			<!--//上一层传递给下一层的数据-->
			<!--'sourceData': {-->
				<!--type: Array,-->
				<!--default: [],-->
			<!--},-->
			<!--//所有的平级数据，在拖拽的时候使用-->
			<!--'totalSourceData': {-->
				<!--default: null,-->
			<!--},-->
			<!--//此字段用于第一级向第二级及以后的层级传递数据，外部不可传入-->
			<!--'toNext':{-->
				<!--default:false,//false:第一层tree，不是false为下一层级的tree-->
			<!--},-->
		<!--},-->
		<!--data(){-->
			<!--return{-->
				<!--selected:[],//单选选中值，字符串id-->
				<!--dbSelected:[],//双击选中值，id-->
				<!--dragSelected:[],//拖拽选中值-->
				<!--openName:[],//当前展开的树-->
				<!--dbChangeNewName:'',//双击改名字的新值-->
				<!--newName:'',//单击新建的名字，  新建子目录（isAdd=true）+点击新建根目录（isAdd=root）-->
				<!--showValidate:false,//验证错误提示（能否选择文件夹）-->
				<!--treeSearchFather:[],//父节点-->
				<!--//默认属性-->
				<!--defaultSet:{-->
					<!--id: 'model_id',-->
					<!--name: 'model_clname',-->
					<!--pId: 'parent_id',-->
					<!--defaultItem: true,-->
					<!--addDefField:this.$t('message.plugins.treeNew'),-->
					<!--defaultExpand: 'none',-->
					<!--isDbClick:false,-->
					<!--isDrag:false,-->
				<!--},-->
				<!--isDbClicked:false,//是否双击-->
				<!--singleChooseClick:null,//单击延迟事件-->
				<!--dragSetTimeOut:null,//鼠标按下延迟时间-->
	            <!--treeDragData:{//拖拽事件数据对象-->
	            	<!--top:0,-->
	            	<!--left:0,-->
		            <!--isDraggable:false,//记录每层是否开启了拖拽事件-->
		            <!--currentDragModel:{},//当前拖拽的对象-->
	            <!--},-->
			<!--}-->
		<!--},-->
		<!--//自定义指令v-focus-->
		<!--directives: {-->
			<!--focus(el){-->
                <!--el.focus();-->
			<!--}-->
		<!--},-->
		<!--computed:{-->
			<!--//合并后的数据对象-->
			<!--defaultTreeT (){-->
				<!--let _obj = $.extend(true,{}, this.defaultSet,this.treeT);-->
				<!--return _obj;-->
			<!--},-->
			<!--//外部传入的平级数据（拖拽时用）-->
			<!--uniqueData(){-->
				<!--if(!this.toNext){-->
					<!--return this.sourceData;-->
				<!--}else{-->
					<!--return this.totalSourceData;-->
				<!--}-->
			<!--},-->
			<!--//生成树形dom需要的树形数据，需要由平级数据转化-->
			<!--treeData (){-->
				<!--let _new = this.sourceData;//不是第一层，sourceData为树形结构，所以不用转化-->
				<!--if( this.isTrans){//是第一层的话，sourceData为平级结构，需要转化-->
				 	<!--let data=this.sourceData;-->
					<!--_new = this.transTreeData(data);-->
				<!--}-->
				<!--return _new;-->
			<!--},-->
			<!--//由于树形实例是递归的，为了保证各个层级的数据是一致的，所以需要将各个层级的数据放在最外层（toNext===false）处理-->
			<!---->
			<!--//各级共享的单击选中值-->
			<!--trueSelected(){-->
				<!--if(!this.toNext){-->
					<!--return this.selected;-->
				<!--}else{-->
					<!--return this.toNext.selected;-->
				<!--}-->
			<!--},-->
			<!--//各级共享的双击选中值-->
			<!--trueDbSelected(){-->
				<!--if(!this.toNext){-->
					<!--return this.dbSelected;-->
				<!--}else{-->
					<!--return this.toNext.dbSelected;-->
				<!--}-->
			<!--},-->
			<!--//各级共享的当前展开的节点值-->
			<!--trueOpenName(){-->
				<!--if(this.toNext){-->
					<!--return this.toNext.openName;-->
				<!--}else{-->
					<!--return this.openName;-->
				<!--}-->
			<!--},-->
			<!--//各级共享的拖拽选中值-->
			<!--trueDragSelected(){-->
				<!--if(this.toNext){-->
					<!--return this.toNext.dragSelected;-->
				<!--}else{-->
					<!--return this.dragSelected;-->
				<!--}-->
			<!--},-->
			<!--//各级共享的拖拽事件的数据对象-->
			<!--trueTreeDragData(){-->
				<!--if(this.toNext){-->
					<!--return this.toNext.dragData;-->
				<!--}else{-->
					<!--return this.treeDragData;-->
				<!--}-->
			<!--},-->
		<!--},-->
		<!--watch:{-->
			<!--//新建子目录时展开所有父级及自己-->
			<!--isAdd(){-->
				<!--this.newName=this.defaultTreeT.addDefField;-->
				<!--this.treeSearchFather=[];//清空存放的父元素-->
				<!--if((this.isAdd===true) && (!this.toNext)){-->
					<!--for(let i=0;i<this.sourceData.length;i++){-->
						<!--if(this.trueSelected[0]==this.sourceData[i][this.defaultTreeT.id]){-->
							<!--this.findFather(this.sourceData[i][this.defaultTreeT.pId]);-->
						<!--}-->
					<!--}-->
					<!--//展开所有父级-->
					<!--this.openName.push(...this.treeSearchFather);-->
					<!--//展开自己-->
					<!--this.openName.push(this.trueSelected[0]);-->
					<!--//去重-->
					<!--this.openName=[...new Set(this.openName)];-->
				<!--}else{-->
					<!--return ;-->
				<!--}-->
			<!--},-->
		<!--},-->
		<!--created(){-->
			<!--this.newName=this.defaultTreeT.addDefField;-->
			<!--if(!this.toNext){-->
				<!--//默认选中项-->
				<!--this.handleDefaultItem();-->
				<!--//默认展开层级-->
				<!--this.handleDefaultExpand();-->
			<!--}-->
		<!--},-->
		<!--methods:{-->
			<!--//拖拽时计算鼠标状态-->
			<!--fixMouseState(e){-->
				<!--let moveDiv=$(this.$el).find('.move-tree-block')[0];-->
				<!--let moveDivH=$(moveDiv).outerHeight()/2;-->
				<!--let ulTreeOffset=this.calcUlTreeOffset(e);-->
				<!--this.$set(this.treeDragData,'top',e.pageY-ulTreeOffset.top-moveDivH);-->
				<!--this.$set(this.treeDragData,'left',$(this.$el).find('.show-node').offset().left-ulTreeOffset.left);-->
			<!--},-->
			<!--//收起要拖拽的树 开启拖拽状态 isDraggable $event(top left) currentDragModel-->
			<!--dragMouseDown(model,e){-->
				<!--if(this.treeT.isDrag && !this.trueTreeDragData.isDraggable){-->
					<!--let _this=this;-->
					<!--clearTimeout(this.dragSetTimeOut);-->
					<!--this.dragSetTimeOut=setTimeout(function(){-->
						<!--if(_this.trueOpenName.includes(model[_this.defaultTreeT.id])){-->
							<!--_this.toggle(model);-->
						<!--}-->

						<!--if(!_this.toNext){-->
							<!--_this.treeDragData.isDraggable=true;-->
							<!--_this.treeDragData.currentDragModel=model;-->
							<!--_this.fixMouseState(e);-->
						<!--}else{-->
							<!--_this.$emit('getFromNextData',{mouseState:{isDragStart:true,event:e,curDragMol:model}});-->
						<!--}-->
					<!--},200)-->
				<!--}-->
			<!--},-->
			<!--//计算辅助块位置，显示鼠标所到之处的辅助框-->
			<!--dragMouseMove(e){-->
				<!--if(this.treeT.isDrag && this.trueTreeDragData.isDraggable){-->
					<!--if(!this.toNext){-->
						<!--this.fixMouseState(e);-->
					<!--}else{-->
						<!--this.$emit('getFromNextData',{mouseState:{isDragStart:true,event:e}});-->
					<!--}-->
					<!--let parentId=this.findMouseUpNode(e);-->
					<!--//不能移到自身文件夹内-->
					<!--if(parentId!==this.trueTreeDragData.currentDragModel[this.defaultTreeT.id]){-->
						<!--if(!this.toNext){-->
							<!--this.dragSelected=[];-->
							<!--this.dragSelected.push(parentId);-->
						<!--}else{-->
							<!--this.$emit('getFromNextData',{dragSelected:parentId});-->
						<!--}-->
					<!--}else{-->
						<!--if(!this.toNext){-->
							<!--this.dragSelected=[];-->
						<!--}else{-->
							<!--this.$emit('getFromNextData',{dragSelected:[]});-->
						<!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//关闭拖拽状态 isDraggable $event-->
			<!--dragMouseUp(e){-->
				<!--if(this.treeT.isDrag && this.trueTreeDragData.isDraggable){-->
			    	<!--if(!this.toNext){-->
			    		<!--this.treeDragData.isDraggable=false;-->
			    		<!--this.handleMouseUp(e);-->
			    		<!--this.clearTreeDragData();-->
			    	<!--}else{-->
						<!--this.$emit('getFromNextData',{mouseState:{isDragStart:false,event:e}});-->
			    	<!--}-->
				<!--}-->
			<!--},-->
			<!--//从里层向最外层传递数据。this.toNext=false说明为第一层，则做相应处理；若不是第一层，继续向外传递-->
			<!--getFromNextData(msg){-->
				<!--if(this.toNext){-->
					<!--this.$emit('getFromNextData',msg);-->
				<!--}else{-->
					<!--if(msg.choosed){-->
						<!--this.selected=[];-->
						<!--this.selected.push(msg.choosed);-->
					<!--}-->
					<!--if(msg.dbChoosed){-->
						<!--this.dbSelected=[];-->
						<!--this.dbSelected.push(msg.dbChoosed);-->
					<!--}-->
					<!--if(msg.openItem){-->
						<!--let model=msg.openItem;-->
						<!--if(!this.openName.includes(msg.openItem)){-->
						    <!--this.openName.push(msg.openItem);-->
						<!--}else{-->
							<!--for(let i=0;i<this.openName.length;i++){-->
								<!--if(msg.openItem==this.openName[i]){-->
									<!--this.openName.splice(i,1);-->
								<!--}-->
							<!--}-->
						<!--}-->
					<!--}-->
					<!--if(msg.dragSelected){-->
						<!--this.dragSelected=[];-->
						<!--this.dragSelected.push(msg.dragSelected);-->
					<!--}-->
					<!--if(msg.mouseState){-->
						<!--if(msg.mouseState.curDragMol){-->
							<!--this.treeDragData.currentDragModel=msg.mouseState.curDragMol;-->
						<!--}-->
						<!--if(msg.mouseState.isDragStart){-->
							<!--this.treeDragData.isDraggable=true;-->
							<!--this.fixMouseState(msg.mouseState.event);-->
						<!--}else{-->
							<!--this.treeDragData.isDraggable=false;-->
							<!--this.handleMouseUp(msg.mouseState.event);-->
							<!--this.clearTreeDragData();-->
						<!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//鼠标离开时清楚拖拽状态-->
			<!--mouseLeave(){-->
				<!--if(this.treeT.isDrag && this.trueTreeDragData.isDraggable && !this.toNext){-->
					<!--this.treeDragData.isDraggable=false;-->
					<!--this.clearTreeDragData();-->
				<!--}-->
			<!--},-->
			<!--//清楚拖拽状态-->
			<!--clearTreeDragData(){-->
				<!--this.dragSelected=[];-->
				<!--this.treeDragData.currentDragModel={};-->
				<!--this.treeDragData.top=0;-->
				<!--this.treeDragData.left=0;-->
				<!--this.dragSetTimeOut=null;-->
			<!--},-->
			<!--//鼠标抬起，向外层传选中值-->
			<!--handleMouseUp(e){-->
				<!--let parentId=this.findMouseUpNode(e);-->
				<!--if(parentId==='root'){-->
					<!--this.$emit('getDragData',{dragData:this.trueTreeDragData.currentDragModel,parentData:parentId});-->
				<!--}else{-->
					<!--//不能移到自身文件夹内-->
					<!--if(parentId!==this.trueTreeDragData.currentDragModel[this.defaultTreeT.id]){-->
						<!--let sourceData=this.uniqueData;-->
						<!--let pModel={};-->
						<!--for(let k=0;k<sourceData.length;k++){-->
							<!--if(sourceData[k][this.defaultTreeT.id]===parentId){-->
								<!--pModel=sourceData[k];-->
							<!--}-->
						<!--}-->
						<!--this.$emit('getDragData',{dragData:this.trueTreeDragData.currentDragModel,parentData:pModel});-->
						<!--//放手后，将放手的树展开，直接看到放成功了-->
						<!--if(!this.trueOpenName.includes(pModel[this.defaultTreeT.id])){-->
							<!--this.toggle(pModel);-->
						<!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//找出当前拖拽可以放入的节点-->
			<!--findShowNodes(){-->
				<!--let showNodes=[];-->
				<!--if(!this.toNext){-->
					<!--showNodes=$(this.$el).find('.show-node');-->
				<!--}else{-->
					<!--showNodes=$(this.$el).parents('.first-level').find('.show-node');-->
				<!--}-->
				<!--let showNodesArr=[];-->
				<!--let ulOffset=this.calcUlTreeOffset();-->
				<!--for(let i=0;i<showNodes.length;i++){-->
					<!--let _domtop=$(showNodes[i]).offset().top+$(showNodes[i]).outerHeight()/2-ulOffset.top;-->
					<!--if(_domtop>=0){-->
						<!--showNodesArr.push({_dom:showNodes[i],_pos:_domtop});-->
					<!--}-->
				<!--}-->
				<!--return showNodesArr;-->
			<!--},-->
			<!--//鼠标松手时在的节点-->
			<!--findMouseUpNode(e){-->
				<!--let ulTreeOffset=this.calcUlTreeOffset(e);-->
		    	<!--let showNodesArr=this.findShowNodes();-->
				<!--//当前鼠标在树形组件里的位置  判断鼠标在哪个dom上松手-->
				<!--let _mousePos=e.pageY-ulTreeOffset.top;-->
				<!--let parentDom=null;-->
				<!--for(let j=0;j<showNodesArr.length;j++){-->
					<!--if(j===0){-->
						<!--if(_mousePos<=showNodesArr[j]._pos){-->
							<!--parentDom=showNodesArr[j]._dom;-->
							<!--break;-->
						<!--}-->
					<!--}else if(j===showNodesArr.length-1){-->
						<!--if(_mousePos>=showNodesArr[j]._pos){-->
							<!--parentDom='root';-->
							<!--break;-->
						<!--}-->
					<!--}-->
					<!--if( showNodesArr[j]._pos < _mousePos && _mousePos < showNodesArr[j+1]._pos ){-->
						<!--parentDom=showNodesArr[j+1]._dom;-->
						<!--break;-->
					<!--}-->
				<!--}-->
				<!--if(parentDom!=='root'){-->
					<!--let dragToId=$(parentDom).find('#show-id').text().trim();-->
					<!--return dragToId;-->
				<!--}else{-->
					<!--return parentDom;//'root'-->
				<!--}-->
			<!--},-->
			<!--//双击事件改名字-->
			<!--changeFolderName(model){-->
				<!--clearTimeout(this.singleChooseClick);-->
				<!--if(this.treeT.isDbClick){-->
					<!--this.isDbClicked=true;//什么时候变为false-->
					<!--this.dbChangeNewName=model[this.defaultTreeT.name];-->
					<!--//点击后先向第一层传选中的值，确认那个被选中-->
					<!--if(this.toNext){-->
						<!--this.$emit('getFromNextData',{dbChoosed:model[this.defaultTreeT.id]});-->
					<!--}else{-->
						<!--this.dbSelected=[];-->
						<!--this.dbSelected.push(model[this.defaultTreeT.id]);-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//计算整棵树的位置信息-->
			<!--calcUlTreeOffset(e){-->
				<!--let ulTreeOffset={};-->
				<!--if(!this.toNext){-->
					<!--ulTreeOffset=$(this.$el).offset();-->
				<!--}else{-->
					<!--ulTreeOffset=$(this.$el).parents('.first-level').offset();-->
				<!--}-->
				<!--return ulTreeOffset;-->
			<!--},-->
			<!--//点击小三角展开或收起树-->
			<!--toggle(model){-->
				<!--if(!this.isAdd && !this.isDbClicked){-->
					<!--clearTimeout(this.dragSetTimeOut);-->
					<!--if(this.toNext){-->
						<!--this.$emit('getFromNextData',{openItem:model[this.defaultTreeT.id]});-->
					<!--}else{//点击第一层-->
						<!--if(!this.trueOpenName.includes(model[this.defaultTreeT.id])){-->
							<!--this.openName.push(model[this.defaultTreeT.id]);-->
						<!--}else{-->
							<!--for(let i=0;i<this.trueOpenName.length;i++){-->
								<!--if(model[this.defaultTreeT.id]==this.trueOpenName[i]){-->
									<!--this.openName.splice(i,1);-->
								<!--}-->
							<!--}-->
						<!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//单击事件选中-->
			<!--chooseTreeItem(model){-->
				<!--if(!this.isAdd && !this.isDbClicked){-->
					<!--let _this=this;-->
					<!--clearTimeout(this.dragSetTimeOut);-->
					<!--clearTimeout(this.singleChooseClick);-->
					<!--this.singleChooseClick=setTimeout(function(){-->
						<!--//点击后先向第一层传选中的值，显示选中效果-->
						<!--if(_this.toNext){-->
							<!--_this.$emit('getFromNextData',{choosed:model[_this.defaultTreeT.id]});-->
						<!--}-->
						<!--if(_this.isAdd){//若点击了新建按钮（isAdd=true 或 root），则不向外传递数据-->
							<!--return ;-->
						<!--}else{//验证可不可以向插件使用者传 文件夹-->
							<!--if(typeof _this.defaultTreeT.validate==='function'){-->
								<!--if(!_this.defaultTreeT.validate(model)){-->
									<!--_this.showValidate=true;-->
									<!--return;-->
								<!--}else{-->
									<!--_this.sendData(model);-->
								<!--}-->
							<!--}-->
							<!--_this.sendData(model);-->
						<!--}-->
					<!--},200)-->
				<!--}-->
			<!--},-->
			<!--//双击后失去焦点事件-->
			<!--changeDbNewName(model){-->
				<!--let _obj={};-->
				<!--_obj.oldModel=model;-->
				<!--_obj.newChangeName=this.dbChangeNewName;-->
				<!--this.$emit('changeDbNewName',_obj);-->
				<!--this.isDbClicked=false;-->
				<!--this.dbChangeNewName='';-->
			<!--},-->
			<!--//内层触发事件-->
			<!--changeDbNewNameT(msg){-->
				<!--this.$emit('changeDbNewName',msg);-->
			<!--},-->
			<!--getDragDataT(msg){-->
				<!--this.$emit('getDragData',msg);-->
			<!--},-->
			<!--changeT(msg){-->
				<!--this.$emit('changeNewName',msg);-->
			<!--},-->
			<!--//设置默认选中节点-->
			<!--handleDefaultItem(){-->
				<!--if(this.defaultTreeT){-->
					<!--let defItem=this.defaultTreeT.defaultItem;-->
					<!--if(defItem===true){//true选第一个-->
					    <!--if(this.treeData.length>0){-->
						    <!--this.selected=[];-->
							<!--this.selected.push(this.treeData[0][this.defaultTreeT.id]);-->
							<!--this.$emit('getDefaultData',this.treeData[0]);-->
					    <!--}-->
					<!--}else if((typeof(this.defaultTreeT.defaultItem)==='string') || (typeof(this.defaultTreeT.defaultItem)==='number')){//传具体id，匹配后要展开-->
						<!--for(let i=0;i<this.sourceData.length;i++){-->
					     	<!--if(defItem==this.sourceData[i][this.defaultTreeT.id]){-->
					     		<!--this.selected=[];-->
					     		<!--this.selected.push(this.sourceData[i][this.defaultTreeT.id]);-->
					     		<!--this.$emit('getDefaultData',this.sourceData[i]);-->
					     	<!--}-->
					     <!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//设置默认展开层级-->
			<!--handleDefaultExpand(){-->
				<!--if(this.defaultTreeT.defaultExpand==='first'){-->
					<!--for(let j=0;j<this.treeData.length;j++){-->
						<!--this.openName.push(this.treeData[j][this.defaultTreeT.id]);-->
					<!--}-->
					<!--//传入的是个id值-->
					<!--if((typeof(this.defaultTreeT.defaultItem)==='string') || (typeof(this.defaultTreeT.defaultItem)==='number')){-->
						<!--for(let i=0;i<this.sourceData.length;i++){-->
							<!--if(this.defaultTreeT.defaultItem==this.sourceData[i][this.defaultTreeT.id]){-->
								<!--this.findFather(this.sourceData[i][this.defaultTreeT.pId]);-->
								<!--this.openName.push(...this.treeSearchFather);-->
							<!--}-->
						<!--}-->
					<!--}-->
					<!--this.openName=[...new Set(this.openName)];//去重-->
				<!--}else if(this.defaultTreeT.defaultExpand==='all'){-->
					<!--for(let k=0;k<this.sourceData.length;k++){-->
						<!--this.openName.push(this.sourceData[k][this.defaultTreeT.id]);-->
					<!--}-->
				<!--}else if(this.defaultTreeT.defaultExpand==='none'){-->
					<!--if(this.defaultTreeT.defaultItem===true){-->
						<!--if(this.treeData.length>0){-->
							<!--this.openName.push(this.treeData[0][this.defaultTreeT.id]);-->
						<!--}-->
					<!--}else if((typeof(this.defaultTreeT.defaultItem)==='string') || (typeof(this.defaultTreeT.defaultItem)==='number')){-->
						<!--for(let i=0;i<this.sourceData.length;i++){-->
							<!--if(this.defaultTreeT.defaultItem==this.sourceData[i][this.defaultTreeT.id]){-->
								<!--this.findFather(this.sourceData[i][this.defaultTreeT.pId]);-->
								<!--if(this.treeSearchFather.length>0){-->
									<!--this.openName.push(...this.treeSearchFather);-->
								<!--}-->
							<!--}-->
						<!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//找到所有父元素的ID,放进treeSearchFather，（没有把自己放进去）-->
			<!--findFather(fatherId){-->
				<!--let items=this.sourceData;-->
				<!--let pid=this.defaultTreeT.pId;-->
				<!--let id=this.defaultTreeT.id;-->
				<!--for(let i=0;i<items.length;i++){-->
					<!--if(fatherId==items[i][id]){-->
						<!--this.treeSearchFather.push(items[i][id]);-->
						<!--this.findFather(items[i][pid]);-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//失去焦点改名字-->
			<!--changeNewName(model){-->
				<!--let _obj={};-->
				<!--if(!this.toNext && this.isAdd==='root'){-->
					<!--_obj.parent='root';-->
				<!--}else{-->
					<!--_obj.parent=model;-->
				<!--}-->
				<!--_obj.addValue=this.newName;-->
				<!--this.$emit('changeNewName',_obj);-->
			<!--},-->
			<!--//触发父节点事件-->
			<!--sendData(model){-->
				<!--this.selected=[];//清空-->
				<!--this.selected.push(model[this.defaultTreeT.id]);-->
				<!--this.$emit('chooseTreeItem',model);-->
			<!--},-->
			<!--//设置选中值-->
			<!--setSelect ( data ){-->
				<!--if( data === true ){-->
					<!--//选中第一个-->
					<!--if(this.treeData.length>0){-->
						<!--this.sendData(this.treeData[0]);-->
					<!--}-->
				<!--}else if( data === 'empty' ){-->
					<!--//清空选中值-->
					<!--this.selected=[];//清空-->
					<!--this.$emit('chooseTreeItem',{});-->
				<!--}else if( data ){-->
					<!--//把选中值设为传进来的id值-->
					<!--for(let i=0;i<this.sourceData.length;i++){-->
						<!--if(this.sourceData[i][this.defaultTreeT.id]===data){-->
							<!--this.sendData(this.sourceData[i]);-->
						<!--}-->
					<!--}-->
				<!--}-->
			<!--},-->
			<!--//平级数据转化为树形数据-->
			<!--transTreeData(items){-->
				<!--if(items.length>0){-->
					<!--let curPid= 0 //pid=0，为最上层节点 ，即无父节点-->
					<!--let parent=this.findChild(curPid);//数组-->
					<!--return parent;-->
				<!--}else{-->
					<!--return [];-->
				<!--}-->
			<!--},-->
			<!--//找子节点-->
			<!--findChild (curPid){-->
				<!--let _arr = [];-->
				<!--let items=this.sourceData;-->
				<!--let length=items.length;-->
				<!--for(let i = 0; i < length; i++){-->
					<!--if(items[i][this.defaultTreeT.pId] == curPid){-->
						<!--let _obj = {...items[i]};-->
						<!--_obj.children = this.findChild(_obj[this.defaultTreeT.id]);-->
						<!--_arr.push(_obj);-->
					<!--}-->
				<!--}-->
				<!--return _arr;-->
			<!--},-->
		<!--},-->
	<!--}-->
<!--</script>-->
<!--<style lang="scss" scoped>-->
	<!--$node-hover-color:#e8dede;-->
	<!--$choosed-color:#eee;-->
	<!--$validate-wrong-color:#ff0000;-->
	<!--.move-tree-block{-->
		<!--width:100%;-->
		<!--opacity:0.8;-->
		<!--background:#e6f5e9;-->
		<!--position: absolute;-->
		<!--cursor:move;-->
		<!--span{-->
			<!--width:20px;-->
		<!--}-->
		<!--.iconfont{-->
			<!--width:20px;-->
		<!--}-->
		<!--.node{-->
			<!--width:calc(100% - 60px);-->
			<!--display:inline-block;-->
		<!--}-->
	<!--}-->
	<!--.add-children{-->
		<!--width:calc(100% - 20px);-->
		<!--padding-left: 10px;-->
		<!--margin:5px 10px;-->
	<!--}-->
	<!--.add-root{-->
		<!--width:calc(100% - 20px);-->
		<!--margin:5px 10px;-->
	<!--}-->
	<!--.db-change-input,.add-root-input,.add-children-input{-->
		<!--border:1px solid #616161;-->
		<!--width:calc(100% - 60px);-->
		<!--white-space: nowrap;-->
		<!--overflow:hidden;-->
		<!--text-overflow:ellipsis;-->
		<!--vertical-align: middle;-->
	<!--}-->
	<!--//第一层不缩进，里面的才缩进-->
	<!--.tree-wrapper>.ul-tree{-->
		<!--padding-left:10px;-->
		<!--line-height:25px;-->
	<!--}-->
	<!--.ul-tree{-->
		<!--line-height:25px;-->
		<!--width:100%;-->
		<!--height:auto;-->
	<!--}-->
	<!--.first-level{-->
		<!--padding-top:15px;-->
		<!--padding-bottom:100px;-->
	<!--}-->
	<!--.cursorMove{-->
		<!--cursor:move !important;-->
	<!--}-->
	<!--.tree-wrapper{-->
		<!--width:calc(100% - 10px);-->
		<!--height:auto;-->
		<!--margin:5px 0px;-->
		<!--margin-left:10px;-->
	<!--}-->
	<!--.show-node{-->
		<!--border:1px dashed transparent;-->
		<!--border-radius:3px;-->
		<!--width:100%;-->
		<!--.iconfont{-->
			<!--width:20px;-->
		<!--}-->
		<!--.toggle{-->
			<!--margin-right:5px;-->
			<!--display:inline-block;-->
			<!--height:100%;-->
			<!--width:22px;-->
			<!--cursor:pointer;-->
			<!--.icon-hide-folder,.icon-show-folder{-->
				<!--font-size:18px;-->
			<!--}-->
		<!--}-->
		<!--.node{-->
			<!--width:calc(100% - 60px);-->
			<!--display:inline-block;-->
			<!--text-overflow: ellipsis;-->
			<!--white-space: nowrap;-->
			<!--overflow:hidden;-->
			<!--vertical-align: middle;-->
			<!--cursor:pointer;-->
			<!--&:hover{-->
				<!--background:$node-hover-color,-->
			<!--}-->
		<!--}-->
	<!--}-->
	<!--.dragToNode{-->
		<!--border:1px dashed #90908c;-->
		<!--border-radius:3px;-->
	<!--}-->
	<!--.choosed{-->
		<!--background:$choosed-color !important;-->
	<!--}-->
	<!--.show-validate{-->
		<!--color:$validate-wrong-color;-->
		<!--margin-left:10px;-->
		<!--margin-top:10px;-->
	<!--}-->
<!--</style>-->