import item from './Item.vue';

const itemCom = {};
itemCom.install = function (Vue) {
    if (itemCom.installed) {
        return;
    }
    itemCom.install.installed = true;

    Vue.component('Item', item);
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(itemCom);
}
export default itemCom;
