<template>
    <div class="f-top-left">
        <header class="f-top"></header>
        <div class="f-left"></div>
        <div class="f-content"></div>
    </div>
</template>
<style lang="scss">
.f-top-left .f-top{
    height: 60px;
    position: absolute;
    top:0;
    z-index:999;
    background-color: rgb(49,56,71);
    color:#fff;
    width:100%;
}
.f-top-left .f-left{
    position: absolute;
    top: 60px;
    left: 0;
    width: 180px;
    height: 200px;
    background: gray;
}
.f-content{
    position: absolute;
    top: 60px;
    left: 180px;
    height:200px;           
    width: calc(100% - 180px);
    background: #ccc;
}
</style>

