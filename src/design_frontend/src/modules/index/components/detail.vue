<template>
<section  class="datail_main">
    <div style="padding-left:40px;" class="tit" @click="toggleSection($event)">1. 定位文件</div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="路径">
            <el-input  class="Pathinput" v-model="form.path"  v-bind:icon="pathLocal?'star-on':'star-off'" :on-icon-click="pathSaveTake" ></el-input>
            <el-button type="primary" @click="onRestore">恢复全部布局</el-button>
            <el-button @click="onLocation">读取整体布局</el-button>
        </el-form-item>   
        <!--   
        <el-form-item>
            <el-button type="primary" @click="onSubmit">定位文件</el-button>
             <el-button type="primary" @click="onRestore">恢复布局</el-button>
        </el-form-item>
        -->
    </el-form>
    <div class="detail-item-wrap">
        <div class="tit">2. 组件 <p class="tips" style="display:inline">【提示】拖拽下列模块到布局中查看效果</p></div>
        <!--样式属性列表-->
        <div class="css-prop-list">
            <div class="detail-item" id="block">block</div>
            <div class="demo-detail-item" id="demo-block">
                <div style="background:#ccc">block</div>
            </div>

            <div class="detail-item" id="float-left">float left</div>
            <div class="demo-detail-item" id="demo-float-left">
                <div style="float:left;background:red">float left</div>
            </div>

            <div class="detail-item" id="float-right">float right</div>
            <div class="demo-detail-item" id="demo-float-right">
                <div style="float:right;background:green">float right</div>
            </div>

            <div class="detail-item" id="inline-block">inline-block</div>
            <div class="demo-detail-item" id="demo-inline-block">
                <div style="display:inline-block;background:yellow">inline block</div>
            </div>                       

            <div class="detail-item" id="inline">inline</div>
            <div class="demo-detail-item" id="demo-inline">
                <div style="display:inline-block;background:orange">inline</div>
            </div>
        </div>
        <div class="css-prop-list">
            <div class="detail-item" id="logo">logo</div>
            <div class="demo-detail-item" id="demo-logo">
                <div style="display:inline-block;background:yellow">logo</div>
            </div>

            <div class="detail-item el-item" id="input">input</div>
            <div class="demo-detail-item" id="demo-input">
                <el-input v-model="input" style="width:200px;" placeholder="请输入内容"></el-input>
            </div>

            <div class="detail-item el-item" id="nav-menu">nav-menu</div>
            <div class="demo-detail-item" id="demo-nav-menu">
                <el-menu theme="dark" class="el-nav-menu" mode="horizontal">
                    <el-menu-item index="1">材料管理</el-menu-item>
                    <el-menu-item index="2">财务管理</el-menu-item>
                </el-menu>
            </div>

            <div class="detail-item el-item" id="tree-menu">tree-menu</div>
            <div class="demo-detail-item" id="demo-tree-menu">
                <el-menu default-active="1" class="el-tree-menu">
                    <el-menu-item index="1"><i class="el-icon-menu"></i>导航一</el-menu-item>
                    <el-menu-item index="2"><i class="el-icon-setting"></i>导航二</el-menu-item>
                </el-menu>
            </div>

            <div class="detail-item el-item" id="breadcrumb">bread-crumb</div>
            <div class="demo-detail-item" id="demo-breadcrumb">
                <el-breadcrumb separator="/" >
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div> 

            <div class="detail-item el-item" id="button">button</div>
            <div class="demo-detail-item" id="demo-button">
                <el-button type="primary" icon="search">搜索</el-button>
            </div> 

            <div class="detail-item el-item" id="table">table</div>
            <div class="demo-detail-item" id="demo-table">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                </el-table>
            </div>                                                

            <div class="detail-item el-item" id="pagination">pagination</div>
            <div class="demo-detail-item" id="demo-pagination">
                <el-pagination 
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </div>
        <div class="css-prop-list custom-prop-list">
            <template v-for="customItem in customList">
                <div class="detail-item el-item" :id="customItem.name">{{customItem.name}}<i class="el-icon-delete el-icon--right" @click="deleteComponent(customItem, $event)"></i></div>
                <div v-if="customItem.isVueComponent" class="demo-detail-item" :id="'demo-'+ customItem.name">
                    <component :is="customItem.name"></component>
                </div>
                <div v-else class="demo-detail-item" :id="'demo-'+ customItem.name" v-html="customItem.html">                    
                </div>
            </template>
            <div class="add-attr-icon"><i class="el-icon-plus" @click="toggleComponent"></i></div>
        </div>

        <div class="add-component-dom" v-show="addComponentDom">
            <!--<div><label>name:</label> <el-input v-model="addCmpName"></el-input></div>
            <div><label>html:</label> <el-input v-model="addCmpHtml" type="textarea" :rows="4"></el-input></div>-->
            <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Html" prop="html">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.html"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="isVueComponent">
                    <el-switch on-text="" off-text="" v-model="ruleForm.isVueComponent"></el-switch> &nbsp;&nbsp;是否Vue组件
                    <!-- <el-checkbox v-model="ruleForm.isVueComponent">是否Vue组件</el-checkbox> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addComponent">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>   

        <div class="tit">3. 样式</div>
        <!--样式属性值列表-->
        <div class="css-prop-value-list">
            <div class="setting block-setting">
                <h3>block:</h3>
                <el-input v-model="margin" placeholder="margin"></el-input>
                <el-input v-model="padding" placeholder="padding"></el-input>
                <el-input v-model="height" placeholder="height"></el-input>
                <el-input v-model="text" placeholder="text"></el-input>
                <el-input v-model="backgroundColor" placeholder="background-color"></el-input>
                
            </div>
            <div class="setting float-left-setting">
                <h3>float-left:</h3>
                <el-input v-model="margin" placeholder="margin"></el-input>
                <el-input v-model="padding" placeholder="padding"></el-input>
                <el-input v-model="height" placeholder="height"></el-input>
                <el-input v-model="width" placeholder="width"></el-input>
                <el-input v-model="text" placeholder="text"></el-input>
                <el-input v-model="backgroundColor" placeholder="background-color"></el-input>
            </div>
            <div class="setting float-right-setting">
                <h3>float-right:</h3>
                <el-input v-model="margin" placeholder="margin"></el-input>
                <el-input v-model="padding" placeholder="padding"></el-input>
                <el-input v-model="height" placeholder="height"></el-input>
                <el-input v-model="width" placeholder="width"></el-input>
                <el-input v-model="text" placeholder="text"></el-input>
                <el-input v-model="backgroundColor" placeholder="background-color"></el-input>
            </div>
            <div class="setting inline-block-setting">
                <h3>inline-block:</h3>
                <el-input v-model="margin" placeholder="margin"></el-input>
                <el-input v-model="padding" placeholder="padding"></el-input>
                <el-input v-model="height" placeholder="height"></el-input>
                <el-input v-model="width" placeholder="width"></el-input>
                <el-input v-model="text" placeholder="text"></el-input>
                <el-input v-model="backgroundColor" placeholder="background-color"></el-input>
            </div>        
            <div class="setting inline-setting">
                <h3>inline:</h3>
                <el-input v-model="margin" placeholder="margin"></el-input>
                <el-input v-model="padding" placeholder="padding"></el-input>
                <el-input v-model="height" placeholder="height"></el-input>
                <el-input v-model="text" placeholder="text"></el-input>
                <el-input v-model="backgroundColor" placeholder="background-color"></el-input>
            </div>
            <div class="setting logo-setting">
                <h3>logo:</h3>
                <el-input v-model="margin" placeholder="margin"></el-input>
                <el-input v-model="padding" placeholder="padding"></el-input>
                <el-input v-model="height" placeholder="height"></el-input>
                <el-input v-model="width" placeholder="width"></el-input>
                <el-input v-model="text" placeholder="text"></el-input>
                <el-input v-model="backgroundColor" placeholder="background-color"></el-input>
            </div>
            <div>
                <div class="add-attr-line" v-for="(item,index) in attrs">
                    <el-input v-model="item.key" placeholder="属性" class="add-attr" @change="setAttr(item)"></el-input> : <el-input v-model="item.val" placeholder="值" class="add-attr" @change="setAttr(item)"></el-input>
                    <div class="add-attr-icon" v-show="index!==0"><i class="el-icon-minus" @click="removeAttr(index)"></i></div>
                    <div class="add-attr-icon" v-show="index==attrs.length-1"><i class="el-icon-plus" @click="addAttr"></i></div>
                </div>
            </div>              
        </div>
        <div style="padding:0 0 10px 0px;" @click="toggleSection">4. 效果</div>
        <div class="preview-cnt">
            
        </div>
        <el-button class="on-save-btn" type="primary" @click="onSave">保存布局</el-button> 
        
    </div>  
</section>
</template>
<script>
var layoutPrefix = 'f-';
var styleEle = null;
var defaulVal = {key:'',val:''};

var dbName = 'framework', version = 1, tabelName = 'customElement', db;

var dropFun = function(e){
    e.preventDefault();
    var id=e.dataTransfer.getData("Text");
    var className="frame-"+e.dataTransfer.getData("Text");
    var ret = $('#demo-'+id).children().eq(0).clone().addClass(className).off().on("contextmenu", function(){
        return false;
    }).on("mousedown", function(e){
        e.stopPropagation();
        if(3 == e.which){
            $(this).remove();
        }
    }).on("dblclick", function(e){
        e.stopPropagation();
        that.setStyleEle(e, id);
        that.resetAttr();
    });
    $(e.target).append(ret);
};

var dragOverFun = function(e){
    e.preventDefault();
};

var dragStartFun = function(e){
    e.dataTransfer.setData("Text", e.target.id);
};

import base from '../mixin/base'
import c from '../config'
export default {
    mixins: [base],
    data() {
        return {
            tableData:[],
            layoutHtml: '',
            margin: '',
            padding: '',
            height: '',
            width: '',
            text: '',
            input: '',
            backgroundColor: '',
            attrs: [],
            customList:[],
            addComponentDom: false,
            form: {path: ''},
            ruleForm: {
                name:'', html:'', isVueComponent: false
            },
            rules:{
                name: [
                    { required: true,validator: this.validateName, trigger: 'blur' }
                ],
                html: [
                    { required: true,validator: this.validateHtml, trigger: 'blur' }
                ]
            }
        };
    },
    watch: {
        margin: function(val){
            val = val + ' ';
            val = val.replace(/\s/g, 'px ');
            styleEle.css('margin', val);
        },
        padding: function(val){
            val = val + ' ';
            val = val.replace(/\s/g, 'px ');
            styleEle.css('padding', val);
        },
        height: function(val){
            styleEle.css('height', val + 'px');
        },
        width: function(val){
            styleEle.css('width', val + 'px');
        },
        backgroundColor: function(val){
            styleEle.css('background-color', val);
        },        
        text: function(val){
            //styleEle.text(val);
            styleEle.html(val + styleEle.html().replace(/^[^\<]+/, ''))
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.elementHtmlMap = $.extend(true, {}, c.elementHtmlMap);
            var promiseReadIDB = this.readIDB();
            this.$nextTick(()=>{
                promiseReadIDB.then(()=>{
                    this.bindMainEl();
                });
            });
        },
        readIDB(){
            var that = this;
            var dtd = $.Deferred();
            
            var request = window.indexedDB.open(dbName, version);

            function readAll() {
                var objectStore = db.transaction([tabelName]).objectStore(tabelName);
                that.customList = [];
                objectStore.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    
                    if (cursor) {
                        console.log('Id: ' + cursor.key);
                        console.log('Name: ' + cursor.value.name);
                        console.log('Html: ' + cursor.value.html);
                        if(cursor.value.isVueComponent){
                            that.elementHtmlMap[cursor.value.name] = cursor.value.html;
                        }
                        that.customList.push({
                            id: cursor.key,
                            name: cursor.value.name,
                            html: cursor.value.html,
                            isVueComponent: cursor.value.isVueComponent
                        });
                        cursor.continue();
                    } else {
                        dtd.resolve();
                        console.log('没有更多数据了！');
                    }
                };
            }
            
            request.onerror = function (event) {
                console.log('数据库打开报错');
            };
            request.onsuccess = function (event) {
                db = event.target.result;
                console.log('数据库打开成功');
                readAll();
            };
            request.onupgradeneeded = function(event) {
                db = event.target.result;
                var objectStore;
                if (!db.objectStoreNames.contains(tabelName)) {
                    objectStore = db.createObjectStore(tabelName, 
                        { autoIncrement: true }
                    );
                }
            }
            
            return dtd.promise();
        },
        bindMainEl(){
            var that = this;
            $(".preview-cnt").off().on("contextmenu", function(){
                return false;
            });
            
            $(".preview-cnt")[0].removeEventListener("drop", dropFun, false);
            $(".preview-cnt")[0].addEventListener("drop", dropFun,false);

            
            $(".preview-cnt")[0].removeEventListener("dragover", dragOverFun,false);
            $(".preview-cnt")[0].addEventListener("dragover",dragOverFun,false);
            /*
            .on('drop', function(e){
                e.preventDefault();
                var id=e.dataTransfer.getData("Text");
                $(e.target).append($('#'+id).clone().removeAttr('id'));
            });
            */
            $('.detail-item').attr('draggable', true)
            
            for(var i=0, j=$('.detail-item').length; i<j; i++){
                $('.detail-item')[i].removeEventListener("dragstart", dragStartFun,false);
                $('.detail-item')[i].addEventListener("dragstart", dragStartFun,false);
            }        
            /*
            .on('dragstart', function(ev){
                ev.dataTransfer.setData("Text", ev.target.id);
            });
            */
        },
        onLocation(){
            this.getDetailPath(this.form).then((ret)=>{
                if(this.successCheckCode(ret)){
                    this.layoutHtml = ret.data;
                    $('.preview-cnt').html(this.layoutHtml);
                    console.log('getDetailPath success');
                    this.bindOtherEl();
                }
            });
        },
        onSave(){
            var cloneDom = $('.preview-cnt').clone();
            
            for(var i in this.elementHtmlMap){
                var elementHtml = this.elementHtmlMap[i];
                if(cloneDom.find('.el-'+i).length>0){
                    $(elementHtml).replaceAll( cloneDom.find('.el-'+i));
                }                
            }
            var postHtml = cloneDom.html();
            var styleStart = '<style lang="scss">';
            var styleStartIndex = postHtml.indexOf(styleStart);
            postHtml = postHtml.slice(0, styleStartIndex);
            this.postDetailPath({html: postHtml, path: this.form.path}).then((ret)=>{
                if(this.successCheckCode(ret)){
                    console.log('postDetailPath success');
                    //this.layoutHtml = ret.data;
                }
            });
        },
        onRestore(){
            var that = this;
            this.getRestoreLayout(this.form).then((ret)=>{
                if(this.successCheckCode(ret)){
                    this.layoutHtml = ret.data;
                    $('.preview-cnt').html(this.layoutHtml);
                    //console.log(this.layoutHtml);
                    this.$nextTick(()=>{
                        //恢复自定义标签为html
                        for(var i in this.elementHtmlMap){
                            var target = $('.preview-cnt').find('el-'+i);
                            if(i=='nav-menu'|| i=='tree-menu'){
                                target = $('.preview-cnt').find('.el-'+i);
                            }
                            if(target.length>0){                                
                                $($('#demo-'+i).html()).replaceAll(target);
                            }            
                        }
                        //绑定事件
                        that.bindOtherEl();
                        var detailList = $('.detail-item');
                        for(var i=0, j=detailList.length; i<j; i++){
                            var item = detailList.eq(i);
                            var id = item.attr('id');
                            (function(id){
                                $('.preview-cnt').find('.frame-'+id).on("mousedown", function(e){
                                    e.stopPropagation();
                                    if(3 == e.which){
                                        $(this).remove();
                                    }
                                }).on("dblclick", function(e){
                                    e.stopPropagation();
                                    that.setStyleEle(e, id);
                                });
                            })(id);
                            
                        }
                        console.log('getRestoreLayout success');
                    })
                   
                }
            });
        },
        setStyleEle(e, id){
            styleEle = $(e.currentTarget);
            $('.setting').hide();
            if(id){
                $('.' + id + '-setting').show();
            }
            this.resetAttr();
        },
        resetAttr(){
            this.attrs = [];
            this.attrs.push($.extend(true, {}, defaulVal));
        },
        setAttr(item){
            if(item.key!='' && item.val!=''){
                var oldVal = styleEle.css(item.key);
                item.oldVal = oldVal;
                styleEle.css(item.key, item.val);
            }
        },
        addAttr(){
            this.attrs.push($.extend(true, {}, defaulVal));
        },
        removeAttr(index){
            styleEle.css(this.attrs[index].key, this.attrs[index].oldVal);
            this.attrs.splice(index, 1);
        },
        bindOtherEl(){
            var that = this;
            $('.preview-cnt>div *').not($(".detail-item")).off("dblclick").on("dblclick", function(e){
                e.stopPropagation();
                that.setStyleEle(e);
            });  
        },
        toggleComponent(){
            this.addComponentDom = !this.addComponentDom;
        },
        addComponent(){
            var that = this;
            function add() {
                var request = db.transaction([tabelName], 'readwrite')
                    .objectStore(tabelName)
                    .add({ name: that.ruleForm.name, html: that.ruleForm.html, isVueComponent: that.ruleForm.isVueComponent });

                request.onsuccess = function (event) {
                    console.log('数据写入成功');
                    that.init()
                };

                request.onerror = function (event) {
                    console.log('数据写入失败');
                }
            }
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                add();
            });          
            
        },
        deleteComponent(customItem, e){
            e.stopPropagation();
            var that = this;
            function remove() {
                var request = db.transaction([tabelName], 'readwrite')
                    .objectStore(tabelName)
                    .delete(customItem.id);

                request.onsuccess = function (event) {
                    console.log('数据删除成功');
                    that.init()
                };
            }

            remove();
        },
        toggleSection(e){
            $(e.target).next().toggle();
        },
        validateName(rule, value, callback){
            if ($.trim(value) === '') {
                return callback(new Error('请输入Name'));
            } else if($("#demo-"+value).length > 0){
                return callback(new Error('Name不可以重复'));
            }
            callback();
        },
        validateHtml(rule, value, callback){
            if ($.trim(value) === '') {
                return callback(new Error('请输入Name'));
            }
            callback();
        },
    }    
}
</script>
<style lang="scss">
.datail_main{
    width: 90%;
    .tit{
        padding: 5px 0;
    }
    .add-component-dom{
        .el-form-item{
            margin-bottom: 26px;
        }
    }
    .el-form-item{
        margin-bottom: 6px;
    }
    h3{
        font-weight: normal;
        margin: 0;
    }
    .preview-cnt>*{
        cursor: pointer;
    }
    .demo-detail-item, .setting {
        display:none;
    }
    .preview-cnt{
        position: relative;
        min-height: 400px;
        border: 1px solid #ccc;
        background-color: #fff;
        overflow: scroll;
    }
    .detail-item-wrap{
        padding-left: 40px;
    }
    .detail-item{
        display: inline-block;
        padding-right: 30px;
    }
    .setting .el-input{
        display: inline-block;
        width: 20%;
        padding: 10px 5px;
    }
    .css-prop-value-list{
        padding-top: 20px;
    }
    .on-save-btn{
        margin-top: 30px;
    }
    .Pathinput{
        width: 70%;
    }
    .css-prop-list>div{
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 140px;
        margin: 6px 0;
        margin-right: 12px;
        padding: 6px 10px;
        text-align: center;
        background-color: #fff;
        cursor: move;
        
    }
    .css-prop-list>div:hover{
        background-color: #f2f2f2;
    }
    .tips{
        color: #999;
    }
    .add-attr-line{
        margin-bottom: 10px;
    }
    .add-attr{
        width: 140px;
    }
    .add-attr-icon{
        border: 1px solid #ccc;
        margin-right: 10px;
        display: inline-block;
        padding: 5px;
    }
}
</style>


