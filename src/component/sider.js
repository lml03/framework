
Vue.component('sider-component', {
    data () {
        return {
            currentMenu: 1,
            currentSubMenu: 11
        }
    },
    props: ['menulist'],
    methods: {
        getMenu (menuId) {
            this.currentMenu = menuId;
            this.menulist.map((menu) => {
                if(menu.id === menuId){
                    menu.showChildren = !menu.showChildren;
                }
            });
        },
        getSubMenu (subMenuId) {
            this.currentSubMenu = subMenuId;
        }
    },
    template:'' +
    '<section class="sider">' +
        '<nav>' +
            '<ul class="menu-wrap">' +
                '<li class="menu-list" :class="{current: currentMenu === menu.id}" v-for="menu in menulist" :key="menu.id" @click="getMenu(menu.id)">' +
                    '<h3>{{menu.name}}</h3>' +
                    '<ul class="sub-menu-wrap" v-show="menu.showChildren">' +
                        '<li class="sub-menu-list" :class="{current: currentSubMenu === subMenu.id}" v-for="subMenu in menu.children" :key="subMenu.id" @click.stop="getSubMenu(subMenu.id)">' +
                            '<h3>{{subMenu.name}}</h3>' +
                        '</li>' +
                    '</ul>' +    
                '</li>' +
            '</ul>' +
        '</nav>' +
    '</section>'
});
