/* 自定义指令 v-loadingLinear
    1、用法:
    <div v-loadingLinear="loadingBarSetting"></div>
    比如发ajax请求时：
    开始：
    this.loadingBarSetting.show='start';
    请求成功：
    .then(function(){
        this.loadingBarSetting.show='finish';
    })
    请求失败：
    .catch(function(){
        this.loadingBarSetting.show='error';
    })
    提示：上面这种写法不可以，推荐把loadingBarSetting写成计算属性computed
    2、配置：
    loadingBarSetting:{
        show:'', //可取三个值：'start'：开始调用加载条；'finish'：加载完成时调用；'error':加载出错时调用
        barStyle:{
            height:'3px', //加载条的高度
            finishColor:'blue', //成功时加载条的颜色
            errorColor:'red' //失败时加载条的颜色
        }
    }
*/

const loadingLinearCom = {};
/* global $ */
loadingLinearCom.install = function (Vue, options) {
    if (loadingLinearCom.installed) {
        return;
    }
    loadingLinearCom.install.installed = true;

    function replaceClass (el, removeArr, add = '') {
        for (let i = 0; i < removeArr.length; i++) {
            $(el).removeClass(removeArr[i]);
        }
        $(el).addClass(add);
    }

    let templateHtml = '<div class="loadingBar" id="loadingBar"><div class="loadingBarInner"></div></div>';
    Vue.directive('loadingLinear', {
        // 只执行一次
        bind (el, { value, modifiers }) {
            // 判断body中是否已有loadingBar(只在body中插入一次)
            let oldBar = $('body').children('.loadingBar')[0];
            if (oldBar === undefined) {
                $('body').append(templateHtml);
            }
            $('body').children('.loadingBar').css('opacity', 0);
            if (value.barStyle && value.barStyle.height) {
                $('body').children('.loadingBar').css('height', value.barStyle.height);
            }
            let loadingBarInner = $('body').find('.loadingBarInner');
            if (value.show === 'start') {
                $('#loadingBar').css('opacity', 1);
                replaceClass(loadingBarInner, ['barInnerError', 'barInnerFinish'], 'barInnerStart');
            }
        }, // 更新就执行(start 为什么执行两次:bind + update; update)
        update (el, { value, oldValue, modifiers }) {
            if (value.show === oldValue.show) {
                return;
            }
            let loadingBar = $('body').children('.loadingBar');
            let loadingBarInner = $('body').find('.loadingBarInner');
            if (value.show === 'start') {
                $(loadingBar).css('opacity', 1);
                replaceClass(loadingBarInner, ['barInnerError', 'barInnerFinish'], 'barInnerStart');
            }
            if (value.show === 'finish') {
                $(loadingBar).css('opacity', 1);
                replaceClass(loadingBarInner, ['barInnerError', 'barInnerStart'], 'barInnerFinish');
                if (value.barStyle && value.barStyle.finishColor) {
                    $(loadingBarInner).css('background', value.barStyle.finishColor);
                }
            }
            if (value.show === 'error') {
                $(loadingBar).css('opacity', 1);
                replaceClass(loadingBarInner, ['barInnerFinish', 'barInnerStart'], 'barInnerError');
                if (value.barStyle && value.barStyle.errorColor) {
                    $(loadingBarInner).css('background', value.barStyle.errorColor);
                }
            }
            let element = $('body').find('.loadingBarInner')[0];
            element.addEventListener('transitionend', function (ev) {
                if ($(ev.target).hasClass('barInnerFinish') || $(ev.target).hasClass('barInnerError')) {
                    $(loadingBar).css('opacity', 0);
                    replaceClass(loadingBarInner, ['barInnerFinish', 'barInnerStart', 'barInnerError']);
                }
            }, false);
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(loadingLinearCom);
}
export default loadingLinearCom;
