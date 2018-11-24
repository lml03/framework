import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
    data: {
        eventHub: new Vue()
    }
})
