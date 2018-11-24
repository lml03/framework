<template>
<section  class="layout_main">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="路径">
            <el-input v-model="form.path"  v-bind:icon="pathLocal?'star-on':'star-off'" :on-icon-click="pathSaveTake" ></el-input>
            <p class="tips">【windows示例】 F:\\git\\home.vue</p>
        </el-form-item>
        <el-form-item label="布局">
            <el-radio-group v-model="form.layout">
            <el-radio label="topMiddleBottom" title="上中下布局">上中下布局</el-radio>
            <el-radio label="leftRight" title="左边固定宽，右边自适应">左右布局</el-radio>
            <el-radio label="topLeft" title="上左导航">上左导航</el-radio>
            <el-radio label="centerLayout" title="居中布局">居中布局</el-radio>
            <el-radio label="holyGrailLayout" title="圣杯布局">圣杯布局</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
    </el-form>        
</section>
</template>
<script>
import base from '../mixin/base'
export default {
    mixins: [base],
    data() {
        return {
        };
    },
    methods:{
        onSubmit(){
            this.postLayout(this.form).then((ret)=>{
                if(this.successCheckCode(ret)){
                    console.log('postLayout success');
                }                
            })
        }
    }
};
</script>
<style lang="scss">
.layout_main{
    width: 90%;
    .tips{
        color: #999;
    }

}
</style>