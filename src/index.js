'use strict'

import Vue from 'vue'
import axios from './utils/http'
import MaskPlugin from 'directives/mask'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'

import 'izitoast/dist/css/iziToast.min.css'
import 'assets/styles/index.scss'

import App from './App.vue'

let toast = ({...params}) => {
    if (params.type === VueNotifications.types.warn) params.type = 'warning'

    let defaultParams = {
        position: 'topCenter',
        timeout: 3000,
        transitionIn: 'fadeInDown',
        toastOnce: true
    }

    return iziToast[params.type](Object.assign(defaultParams, params))
}

const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}

Vue.use(MaskPlugin)
Vue.use(VueNotifications, options)

/* eslint-disable no-new, no-unused-vars */
window.vm = new Vue({
    axios,
    render: h => h(App)
}).$mount('#root')
