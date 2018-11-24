<template>
    <div class="f-holy-grail-layout">
        <div class="header">
      
        </div>
        <div class="main">
            <div class="center">
                <div class="main-inner">
                   
                </div>
            </div>
            <div class="left">
               
            </div>
            <div class="right">
               
            </div>
        </div>
        <div class="footer">
           
        </div>
    </div>
</template>
<style lang="scss">
.f-holy-grail-layout{
    margin: 0 auto;
}

.header,.footer{
    height: 60px;
    background: #313847;
    overflow: hidden;
}
.main{
    height: 200px;
}
.center,.left,.right{
    height: 100%;
    float: left;
}
.center{
    width: 100%;
    background: #ffffff;
}
.left{
    background: #eaecf5;
    width: 15%;
    margin-left: -100%;
}
.right{
    background: #eaecf5;
    width: 15%;
    margin-left: -15%;
}
.main-inner{
    padding-left: 15%;
    height: 200px;
    padding-right: 15%;
}
</style>
