
import Vue from 'vue';

import dropdown from '../plugins/dropdown/dropInstall'
import tree from '../plugins/tree/itemInstall.js'
// import "./sass/plugins/loading.scss"
import loadingLinear from '../plugins/loadingBar/loadingLinearInstall'
import loading from '../plugins/loadingBar/loadingInstall'

Vue.use(dropdown)
Vue.use(tree)
Vue.use(loadingLinear)
Vue.use(loading)
var Rxports = {};

module.exports = Rxports;
