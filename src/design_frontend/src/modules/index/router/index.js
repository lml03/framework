import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home.vue'
import Quick from '../components/quick.vue'
import Layout from '../components/layout.vue'
import Detail from '../components/detail.vue'
import Component from '../components/component.vue'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children:[{
                path: '/layout',
                component: Layout,
                name: '整体布局',
            },{
                path: '/detail',
                component: Detail,
                name: '局部布局',
            },{
                path: '/component',
                component: Component,
                name: '组件',
            }]
        },
        {
            path: '/quick',
            name: 'Quick',
            component: Quick,           
        }

    ]
})
