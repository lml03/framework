import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home.vue'
import Quick from '../components/quick.vue'



Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/quick',
            name: 'Quick',
            component: Quick,           
        }

    ]
})
