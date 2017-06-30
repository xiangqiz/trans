	/**
	 * 传入字符串，获取字符串中每个字符的首字母
	 * 如：‘微软雅黑’   return 'WRYH'
	 * 也可开启多音字功能，比如'长大'  return ["ZD", "CD"]
	 */
    import pinyinFt from './pinyinFirstLetter.js';

	function getFirstLetter(str,poly){
		let dict={};
		if(pinyinFt){
			dict.firstLetter=pinyinFt;
		}
		//多音字支持，默认为false
		let polyphone=poly==undefined?false:poly;
		//若str非汉字，则直接返回
		let reg=/[\u4e00-\u9fa5]/g; 
		let hasChinese=reg.test(str);
		if(str && hasChinese){
			if(dict.firstLetter){
				let result=[];
				for(let i=0;i<str.length;i++){
					let unicode=str.charCodeAt(i);
					let ch='';
					if(unicode>=19968 && unicode<=40869){
						ch=dict.firstLetter.all.charAt(unicode-19968);
						if(polyphone){
							ch=dict.firstLetter.polyphone[unicode]||ch;
						}
					}else{
						ch='';
					}
					if(ch){
						result.push(ch);
					}
				}
				if(!polyphone){
					return result.join('');
				}else{
					return handlePolyphone(result,'','');
				}
			}
		}else{
			return '';
		}
	}
	/**
	 * 处理多音字，将类似['D', 'ZC', 'F']转换成['DZF', 'DCF']
	 * 或者将 ['chang zhang', 'cheng'] 转换成 ['chang cheng', 'zhang cheng']
	 */
	function handlePolyphone(array, splitter, joinChar)
	{
		splitter = splitter || '';
		let result = [''], temp = [];
		for(let i=0; i<array.length; i++)
		{
			temp = [];
			let t = array[i].split(splitter);
			for(let j=0; j<t.length; j++)
			{
				for(let k=0; k<result.length; k++)
					temp.push(result[k] + (result[k]?joinChar:'') + t[j]);
			}
			result = temp;
		}
		return simpleUnique(result);
	}
	// 简单数组去重
	function simpleUnique(array)
	{
		let result = [];
		let hash = {};
		for(let i=0; i<array.length; i++)
		{
			let key = (typeof array[i]) + array[i];
			if(!hash[key])
			{
				result.push(array[i]);
				hash[key] = true;
			}
		}
		return result;
	}
	export default getFirstLetter;