// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from "axios";
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
import { Table, TableColumn, Button, Tooltip, Popover, Upload, Message, Form, FormItem, Input, Select, Checkbox, CheckboxGroup, Radio, Pagination, Loading, Empty } from 'element-ui';
Vue.prototype.$message = Message
Vue.prototype.$axios = axios
Vue.config.productionTip = false


let rootApi = process.env.ENV_PATH === 'pro' ? 'https://ah5game.com/' : 'http://game.afantai.com/'
Vue.prototype.$baseUrl = rootApi

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Empty)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
