<template>
    <div class="f-left-right">
        <div class="f-left"></div><!--
        --><div class="f-right"></div>
    </div>
</template>
<style lang="scss">
.f-left-right{
    display: block;
}
.f-left{
    display:inline-block;
    width:100px;
    background-color: rgb(49,56,71);
    height: 200px;
    vertical-align: top;
}
.f-right{
    display:inline-block;
    width:calc(100% - 100px);
    height: 200px;
    background: gray;
    vertical-align: top;
}
</style>

