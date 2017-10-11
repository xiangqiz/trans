const loadingCom = {};
/* global $ */
loadingCom.install = function (Vue, options) {
    if (loadingCom.installed) {
        return;
    }
    loadingCom.install.installed = true;

    // let defaultOpt = {
    //     show: false
    // };

    let opt = {};
    for (let property in options) {
        opt[property] = options[property];
    }

    let templateHtml = '<div class="loadingBox"><div class="loadingBlock"></div></div>';
    Vue.directive('loading', {
        // 只执行一次
        bind (el, { value, modifiers }) {
            if (value.show) {
                $(el).append(templateHtml);
            }
        }, // 更新就执行
        update (el, { value, modifiers }) {
            if (value.show) {
                $(el).append(templateHtml);
            } else {
                $(el).children('.loadingBox').remove();
            }
        },
        unbind (el, binding, vnode, oldVnode) {
            $(el).children('.loadingBox').remove();
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(loadingCom);
}
export default loadingCom;
