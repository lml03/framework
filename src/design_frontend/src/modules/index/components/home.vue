<template>
    <el-row class="tac">
        <el-col :span="4" class="nav">
            <el-menu :router="true" v-for="parentRoute in $router.options.routes" default-active="0" class="el-menu-vertical-demo" theme="dark">
                <el-menu-item v-if="parentRoute.children" v-for="(childRoute, index) in parentRoute.children" :index="index + ''" :route="childRoute">{{childRoute.name}}</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20" class="conte">    
            <router-view></router-view>
        </el-col>
    </el-row>
</template>
<script>
export default {
    mixins: [],
    components: {},
    data() {
        return {
        };
    },
    mounted() {
        this.initSize();
    },
    methods: {
        initSize(){
            let height=document.body.clientHeight;
            $(".nav").css({"height":height+'px'})
        }
    }
};
</script>
<style lang="scss">
.tac{
    .nav{
        height: 900px;
        background-color:#38475c;
    }
    .conte{
        margin: 20px 0 ;
    }
}
</style>
