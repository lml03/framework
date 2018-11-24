Vue.component('header-component', {
    data () {
        return {
            currentNav: 1
        }
    },
    props: ['navlist'],
    methods: {
        getNav (navId) {
            this.currentNav = navId;
        }
    },
    template: '<header><div class="header-center"><nav class="nav-list"><a v-bind:class="{current: currentNav === nav.id}" v-for="nav in navlist" :key="nav.id" href="javascript:;" @click="getNav(nav.id)">{{nav.name}}</a></nav></div></header>'
});
