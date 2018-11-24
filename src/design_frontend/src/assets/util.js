/**
 * Created by Administrator on 2017/6/6 0006.
 */

function getBrowserAndVersion(){
    var browser={};
    if (/(chrome\/[0-9]{2})/i.test(navigator.userAgent)) {
        browser.agent = navigator.userAgent.match(/(chrome\/[0-9]{2})/i)[0].split("/")[0];
        browser.version  = parseInt(navigator.userAgent.match(/(chrome\/[0-9]{2})/i)[0].split("/")[1]);
    } else if (/(firefox\/[0-9]{2})/i.test(navigator.userAgent)) {
        browser.agent = navigator.userAgent.match(/(firefox\/[0-9]{2})/i)[0].split("/")[0];
        browser.version  = parseInt(navigator.userAgent.match(/(firefox\/[0-9]{2})/i)[0].split("/")[1]);
    } else if (/(MSIE\ [0-9]{1})/i.test(navigator.userAgent)) {
        browser.agent = navigator.userAgent.match(/(MSIE\ [0-9]{1})/i)[0].split(" ")[0];
        browser.version  = parseInt(navigator.userAgent.match(/(MSIE\ [0-9]{1})/i)[0].split(" ")[1]);
        if(browser.version == 1){
            browser.version = parseInt(navigator.userAgent.match(/(MSIE\ [0-9]{2})/i)[0].split(" ")[1]);
        }
    } else if (/(Opera\/[0-9]{1})/i.test(navigator.userAgent)) {
        browser.agent = navigator.userAgent.match(/(Opera\/[0-9]{1})/i)[0].split("/")[0];
        browser.version  = parseInt(navigator.userAgent.match(/(Opera\/[0-9]{1})/i)[0].split("/")[1]);
    } else if (/(Trident\/[7]{1})/i.test(navigator.userAgent)) {
        browser.agent = "MSIE";
        browser.version  = 11;
    } else {
        browser.agent = false;
        browser.version  = false;
    }
    return browser;
}

const browserInfo = getBrowserAndVersion();


const myBrowser = ()=>{
    return browserInfo.agent;
}

const openPhotograph = (index=0)=>{
    let count = LaCtrl.GetCameraCount();
    if(count > 0){
        for(let i = 0 ; i < count; i++){
            LaCtrl.StopPreview(i);
        }
        LaCtrl.StartPreview(index);
    }
}
const openPhotographOld = (index=0)=>{
    if(index==0){
        if (!VideoInputCtl.IsDeviceOpened(1)){
            window.VideoInputCtl.CloseDevice(1)
        }

    }else {
        if (!VideoInputCtl.IsDeviceOpened(0)){
            window.VideoInputCtl.CloseDevice(0)
        }
    }
    window.VideoInputCtl.OpenDevice(index);

    window.VideoInputCtl.StartPlayDevice(index);
    window.VideoInputCtl.SetDeviceFormatIndex(index,4);
}
const judgmentBrowser = ()=>{
    let t = true
    if(!window.LaCtrl){
        $("#faceCompare").remove();
        alert("此浏览器不支持高拍仪，请使用ie9及以上浏览器并安装高拍仪插件。")
        return false
    }
    if(LaCtrl.GetCameraCount <= 0 && myBrowser()=='MSIE'){
        $("#faceCompare").remove();
        alert("请插入高拍仪，并安装插件")
        t = false
    }else if(LaCtrl.GetCameraCount === undefined){
        t = false
        $("#faceCompare").remove();
        alert("此浏览器不支持高拍仪，请使用ie9及以上浏览器并安装高拍仪插件。")
    }
    return t;
}
const judgmentBrowserOld = ()=>{
    let t = true
    try{
        if(!window.VideoInputCtl){
            $("#faceCompare").remove();
            alert("此浏览器不支持高拍仪，请使用ie9及以上浏览器并安装高拍仪插件。")
            return false
        }
        else if(VideoInputCtl.GetDeviceCount() == 0 && myBrowser()=='MSIE'){
            $("#faceCompare").remove();
            alert("请插入高拍仪，并安装插件")
            t = false
        }
        return t;
    }catch(e){
        $("#faceCompare").remove();
        alert("请插入高拍仪，并安装插件")
        return t;
    }

}
const readIdCard = ()=>{
    if(!LaCtrlIdCard){
        return false
    }
    if(LaCtrlIdCard.GetCameraCount < 0 && myBrowser()=='MSIE'){
        return false
    }
    if (window.LaCtrlIdCard.ReadIDCard) {
        var idcardinfo = {
            name: $.trim(window.LaCtrlIdCard.GetIDName()),
            sex: $.trim(window.LaCtrlIdCard.GetIDSex()),
            nation: $.trim(window.LaCtrlIdCard.GetIDNation()),
            birthYear: window.LaCtrlIdCard.GetIDBirthYear(),
            birthMonth: window.LaCtrlIdCard.GetIDBirthMonth(),
            birthDay: window.LaCtrlIdCard.GetIDBirthDay(),
            address: $.trim(window.LaCtrlIdCard.GetIDAddress()),
            idNum: window.LaCtrlIdCard.GetIDNum(),
            idDepart: window.LaCtrlIdCard.GetIDDepart(),
            idTermDay: window.LaCtrlIdCard.GetIDTermDay(),
            idImg:window.LaCtrlIdCard.GetIDHeadImageBase64(),
            prosConsImg:window.LaCtrlIdCard.MakeIDCardImageBase64()
        };
        return idcardinfo;
    }else {
        return false
    }
}

const oldReadIdCard = ()=>{
    let CVR_IDCard = document.getElementById("CVR_IDCard");
    let strReadResult = CVR_IDCard.ReadCard(),idcardinfo = {};
    if(strReadResult == "0"){
        idcardinfo = {
            name: CVR_IDCard.Name,
            sex:  CVR_IDCard.Sex,
            nation: CVR_IDCard.Nation,
            born: CVR_IDCard.Born,
            address: $.trim(CVR_IDCard.Address),
            idNum: CVR_IDCard.CardNo,
            idImg:CVR_IDCard.Picture,
            idTermDay: CVR_IDCard.ExpiredDate
        }
        return idcardinfo
    }else {
        return false
    }
}

const HSReadIdCard = ()=>{
    let CVR_IDCard = document.getElementById("CVR_IDCard");
    let strReadResult = CVR_IDCard.ReadCard(),idcardinfo = {};
    if(strReadResult == "0"){
        idcardinfo = {
            name: CVR_IDCard.Name,
            sex:  CVR_IDCard.Sex,
            nation: CVR_IDCard.Nation,
            born: CVR_IDCard.Born,
            address: $.trim(CVR_IDCard.Address),
            idNum: CVR_IDCard.CardNo,
            idImg:CVR_IDCard.Picture,
            idTermDay:CVR_IDCard.EffectedDate+'-'+CVR_IDCard.ExpiredDate,
            authority:CVR_IDCard.IssuedAt
        }
        return idcardinfo
    }else {
        return false
    }
}

const LTReadIdCard = () => {
    function ReadIDCard() {
        if (plugin().Global_InitIdCard()) {
            var ret = plugin().Global_ReadIdCard(),idcardinfo;
            if (ret) {
                let image = plugin().Global_GetIdCardImage(1); //1表示头像， 2表示正面， 3表示反面 ...
                let idBase64 = plugin().Image_GetBase64(image, 2, 0);
                let name = plugin().Global_GetIdCardData(1);
                let sex = plugin().Global_GetIdCardData(2);
                let nation = plugin().Global_GetIdCardData(3);
                let birthday = plugin().Global_GetIdCardData(4)+"-"+plugin().Global_GetIdCardData(5)+"-"+plugin().Global_GetIdCardData(6);
                let address = plugin().Global_GetIdCardData(7);
                let idNumber = plugin().Global_GetIdCardData(8);
                let authority = plugin().Global_GetIdCardData(9);
                let expirationDateStart = plugin().Global_GetIdCardData(10)+"."+plugin().Global_GetIdCardData(11)+"."+plugin().Global_GetIdCardData(12);
                let expirationDateEnd = plugin().Global_GetIdCardData(13)+"."+plugin().Global_GetIdCardData(14)+"."+plugin().Global_GetIdCardData(15);
                idcardinfo = {
                    name: $.trim(name),
                    sex: $.trim(sex),
                    nation: $.trim(nation),
                    birthDay: birthday,
                    born: birthday,
                    address: $.trim(address),
                    idNum: $.trim(idNumber),
                    idTermDay:expirationDateStart+"-"+expirationDateEnd,
                    idImg:idBase64,
                    authority:authority
                }
                //a) 二代证 姓名  1 性别  2 民族  3 出生年 4 出生月 5 出生日 6 住址  7 身份证号码 8 签发机关  9
                //有效期限年(起) 10 有效期限月(起) 11 有效期限日(起) 12 有效期限年(止) 13 有效期限月(止) 14 有效期限日(止) 15 芯片序列号 16
            }
            plugin().Global_DeinitIdCard();
            return idcardinfo
        }
    }
    return ReadIDCard();
}

const GZReadIdCard = ()=>{
    if(!LaCtrlIdCard){
        return false
    }
    if(LaCtrlIdCard.GetCameraCount < 0 && myBrowser()=='MSIE'){
        return false
    }
    if (window.LaCtrlIdCard.ReadIDCard) {
        var idcardinfo = {
            name: $.trim(window.LaCtrlIdCard.GetIDName()),
            sex: $.trim(window.LaCtrlIdCard.GetIDSex()),
            nation: $.trim(window.LaCtrlIdCard.GetIDNation()),
            birthYear: window.LaCtrlIdCard.GetIDBirthYear(),
            birthMonth: window.LaCtrlIdCard.GetIDBirthMonth(),
            birthDay: window.LaCtrlIdCard.GetIDBirthDay(),
            address: $.trim(window.LaCtrlIdCard.GetIDAddress()),
            idNum: window.LaCtrlIdCard.GetIDNum(),
            idDepart: window.LaCtrlIdCard.GetIDDepart(),
            idTermDay: window.LaCtrlIdCard.GetIDTermDay(),
            idImg:window.LaCtrlIdCard.GetIDHeadImageBase64(),
            prosConsImg:window.LaCtrlIdCard.MakeIDCardImageBase64()
        };
        return idcardinfo;
    }else {
        return false
    }
}

const ReadIdCard = (type=1)=>{
    /*
    * type :1 光阵高拍仪
    * type :2 华视读卡器
    * type :3良田高拍仪
    */
    if(type == 1){
        return GZReadIdCard()
    }else if(type == 2){
        return HSReadIdCard();
    }else if(type == 3){
        return LTReadIdCard();
    }else {
        return false
    }
}
/* validate related begin */
const validateList = {
    identify: {
        errTip : '请输入正确的证件号码',
        validate: [{
            rule: function(){
                return /^((\d{17}[0-9xX])|(\d{14}[0-9xX]))$/
            },
            maxlength: 18
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        }]
    },
    companyName: {
        errTip: "请输入单位证件上的名称",
        rule: function(){
            return /\S/
        }
    },
    // code: {
    //     errTip: "请输入单位证件上的统一社会信用代码",
    //     rule: function(){
    //         return /^[0-9a-zA-Z]{18}$/
    //     },
    //     maxlength: 18
    // },
    companyAddress: {
        errTip: "请输入单位证件上的有效地址",
        rule: function(){
            return /\S/
        }
    },
    phoneNum: {
        errTip: "请输入正确的手机号码",
        rule: function(){
            return /^1[3456789]\d{9}$/
        },
        maxlength: 11
    },
    name: {
        errTip: "请输入单位证件上的法人姓名",
        rule:function () {
            return /^[^\s^\d][^\d]*[^\s^\d]$/g
        },
        checkErrTip:"请输入经办人姓名"
    },
    registerCardNumber: {
        errTip: "请输入登记卡编号",
        rule: function(){
            return /\S/
        }
    },
    holderName: {
        errTip: "请输入持章人姓名",
        rule:function () {
            return /^[^\s^\d][^\d]*[^\s^\d]$/g
        }
    },
    holderAddress: {
        errTip: "请输入持章人住址",
        rule:function () {
            return /\S/
        }
    },
    // address:{
    //     errTip: "请输入经办人住址",
    //     rule: function(){
    //         return /\S/
    //     }
    // },
    // businessLicenseNumber:{
    //     errTip: "请输入旧营业执照号",
    //     rule: function(){
    //         return /^[0-9a-zA-Z]{15}$/
    //     },
    //     maxlength: 15
    // }
    operatorIdcardNumber: {
        errTip : '请输入正确的证件号码',
        validate: [{
            rule: function(){
                return /^((\d{17}[0-9xX])|(\d{14}[0-9xX]))$/
            },
            maxlength: 18
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        },
        {
            rule: function(){
                return /\S/
            },
            maxlength: 20
        }]
    },
    operatorPhone: {
        errTip: "请输入正确的手机号码",
        rule: function(){
            return /^1[3456789]\d{9}$/
        },
        maxlength: 11
    },
    operatorName: {
        errTip: "请输入单位证件上的法人姓名",
        rule:function () {
            return /^[^\s^\d][^\d]*[^\s^\d]$/g
        },
        checkErrTip:"请输入经办人姓名"
    },
};

const documentTypeMapping = {
    "11":[
        {
            "name": "居民二代身份证证件照片",
            "sort": "34",
            "value": "0034"
        }
    ],
    "13":[
        {
            "name": "经办人身份证件（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "7",
            "value": "0006"
        },
        {
            "name": "经办人身份证件补充（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "8",
            "value": "0044"
        }
    ],
    "12":[
        {
            "name": "经办人身份证件（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "7",
            "value": "0006"
        },
        {
            "name": "经办人身份证件补充（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "8",
            "value": "0044"
        }
    ],
    "14":[
        {
            "name": "经办人身份证件（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "7",
            "value": "0006"
        },
        {
            "name": "经办人身份证件补充（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "8",
            "value": "0044"
        }
    ],
    "15":[
        {
            "name": "经办人身份证件（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "7",
            "value": "0006"
        },
        {
            "name": "经办人身份证件补充（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "8",
            "value": "0044"
        }
    ],
    "16":[
        {
            "name": "经办人身份证件（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "7",
            "value": "0006"
        },
        {
            "name": "经办人身份证件补充（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "8",
            "value": "0044"
        }
    ],
    "17":[
        {
            "name": "经办人身份证件（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "7",
            "value": "0006"
        },
        {
            "name": "经办人身份证件补充（身份证、回乡证、台胞证、护照、公证书、领事认证书）",
            "sort": "8",
            "value": "0044"
        }
    ],
    "portrait": {
        "name": "经办人现场照片",
        "sort": "35",
        "value": "0035"
    }
}
const removeArrItem = function(index,arr){
    if(Array.isArray(index)){
        for(let item of index){
            arr[item] = '';
        }
        arr = arr.filter((value)=>{
            return value != ''
        })
    }else {
        for(let i =0;i <arr.length;i++){
            let temp = arr[i];
            if(!isNaN(index)){
                temp = i;
            }
            if(temp == index){
                for(let j = i;j <arr.length;j++){
                    arr[j]=arr[j+1];
                }
                arr.length = arr.length-1;
            }
        }
    }
    return arr
};

const equalScale = (dom,parameter)=>{
    let rate ,h ,w  ,maxNum,jqDom;
    jqDom = $(dom)
    if(isNaN(dom.clientHeight)||dom.clientHeight == 0){
        jqDom.load(()=>{
            maxNum = Math.max(dom.clientHeight,dom.clientWidth)
            rate =  parameter / maxNum
            h =  dom.clientHeight * rate;
            w = dom.clientWidth * rate;
            jqDom.css({
                width:w + 'px',
                height:h + 'px'
            })
        })
    }else {
        maxNum = Math.max(dom.clientHeight,dom.clientWidth)
        rate =  parameter / maxNum
        h =  dom.clientHeight * rate;
        w = dom.clientWidth * rate;
        jqDom.css({
            width:w + 'px',
            height:h + 'px'
        })
    }

}

const initTakeSealPersonData = (data,takeSealPersonData) => {
    for(let i of takeSealPersonData.userData){
        i.data = data[i.name]
    }
    for(let i of data.fileList){
        if(i.type == '0034'){
            takeSealPersonData.imgData.idImg = i
        }else if(i.type == '0035'){
            takeSealPersonData.imgData.portraitPhoto = i
        }else if(i.type == '0006'){
            takeSealPersonData.imgData.cardFrontImg = i
        }else if(i.type == '0044'){
            takeSealPersonData.imgData.cardBackImg = i
        }
        // if(parseInt(i.type) >= 36 && parseInt(i.type)<= 43){
        //     if(parseInt(i.type)%2 ==0){
        //         takeSealPersonData.imgData.cardFrontImg = i
        //     }else {
        //         takeSealPersonData.imgData.cardBackImg = i
        //     }
        // }

    }
    return takeSealPersonData
}

const loginTips = {
    ie9: '请使用IE9以上的浏览器',
    install: '请先安装USB KEY控件<a href="http://120.77.151.97/filesys/dfs/file/group1/M00/00/5A/rBJ2aVnpTiWAZIXpA5N3c3iq4dQ935.zip">点击下载</a>',
    originTip: '插入USB KEY',
    passTip: 'USB KEY已插入',
    permission: '此用户不能登录该系统',
    password: '密码错误',
    other: '您有控件没有成功下载到本地，是否要下载所有控件安装？安装后请重新进入本功能进行操作。'
};

const checkUsbkeyOnLine = function(){
    var CYSignetPlutoCtrlItem = document.getElementById("CYSignetPlutoCtrl");
    var result = CYSignetPlutoCtrlItem.UsbkeyOnline;
    if (result != 0){
        //this.errInfo = "没有检测到USBKEY";
        return false;
    }
    //this.errInfo = '';
    return true;
};

const checkUsbkey = function(){
    var CYSignetPlutoCtrlItem = document.getElementById("CYSignetPlutoCtrl");
    if (CYSignetPlutoCtrlItem && CYSignetPlutoCtrlItem.object == null) {
        return {code:1, msg:loginTips.install};//code:1 set value to errInfo
    }else if(checkUsbkeyOnLine()){
        return {code:0, msg:loginTips.passTip};
        // that.key = tips.passTip;
        // if(that.errInfo === tips.ie9 || that.errInfo === tips.install){
        //     that.errInfo = "";
        // }
    }else {
        return {code:2, msg:loginTips.originTip};//code:2 set value to key
        //that.key = tips.originTip;
    }
};
const downLoadWidget = function () {
    window.open('http://192.168.1.159:9000/cypt/inspection/download/SETUP.zip')
}
const operationManual = function () {
    window.open('http://192.168.1.159:9000/cypt/inspection/download/SETUP.zip')
}
const  getQueryString = function(name,url='') {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),r;
    if(url){
        r = url.match(reg)
    }else {
        r = window.location.hash.substr(1).match(reg);
    }

    if(r!=null){
        return  decodeURIComponent(r[2]);
    }else {
        return null;
    }
}
const isPdf = function(path) {
    if(path && path.indexOf('?')!==-1){
        path = path.substr(0, path.indexOf('?'));
    }
    if(path && path.substr(-4).toLowerCase() === '.pdf'){
        return true;
    }
    return false;
};
const getFileType = function(path){
    if(!path){
        return '';
    }
    if(path && path.indexOf('?')!==-1){
        path = path.substr(0, path.indexOf('?'));
    }
    var dotIndex = path.lastIndexOf('.');
    if(dotIndex == -1){
        return '';
    }
    var type = path.substr(dotIndex+1).toLowerCase();
    return type;
}
const isVideo=function(path){
    var fileType=getFileType(path)
    if($.inArray(fileType, ['mov','mp4','avi','flv','mpg','mpeg','swf','wmv','3gp']) !== -1){
        return true
    }else{
        return false
    }
}

const isJpg = function(path){
    var fileType=getFileType(path)
    if($.inArray(fileType, ['jpg', 'jpeg', 'png']) !== -1){
        return true
    }else{
        return false
    }
}
/* validate related end */
export {
    openPhotograph,openPhotographOld, readIdCard, judgmentBrowser,judgmentBrowserOld,
    myBrowser, browserInfo, validateList,
    removeArrItem,equalScale,documentTypeMapping,
    initTakeSealPersonData, checkUsbkey,
    checkUsbkeyOnLine, loginTips,
    downLoadWidget,operationManual,oldReadIdCard,getQueryString,ReadIdCard,
    isPdf, getFileType,isVideo, isJpg
}
