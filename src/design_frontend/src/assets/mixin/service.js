var commonAjaxSetting = {
    'get': {
        dataType: "json",
        cache: false
    },
    'post': {
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        data: {},
        cache: false
    },  
    'put': {
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        data: {},
        cache: false
    },
    'delete': {
        dataType: "json",
        cache: false
    }
};

var ajaxCall = function(setting, type) {
    if (type === undefined) {
        type = 'get';
    }
    var sendData = commonAjaxSetting[type];
    sendData.type = type;
    sendData = $.extend({}, sendData, setting);
    if (sendData.headers && sendData.headers['Content-Type'] == "application/json") {
        sendData.data = JSON.stringify(sendData.data);
    }
    return $.ajax(sendData);
};

const baseUrl = "/api/";
const info = {
    defaultErrorMsg: '网络异常，请稍后再试'
};

export default {
    data() {
        return {
        }
    },
    methods: {
        successCheckCode(ret) {
            if (ret.code === 100) {
                return false;
            } else if (ret.code !== 0) {
                this.$message.error(ret.msg && Object.prototype.toString.call(ret.msg) != "[object Object]" ? ret.msg : info.defaultErrorMsg);
                return false;
            }
            return true;
        },
        successCheckCodeText(ret) {
            try {
                ret = JSON.parse(ret);
            } catch (error) {
                this.$message({
                    showClose: true,
                    message: '网络异常，请稍后再试',
                    type: 'error'
                });
                return false;
            }
            return ret;
        },        
        autoAjaxCall(setting, type) {
            var xhr = ajaxCall(setting, type);
            xhr.fail((jqxhr,textStatus) => {
                if(textStatus!='abort'){
                    this.$message({
                        showClose: true,
                        message: info.defaultErrorMsg,
                        type: 'error'
                    });
                }

            });
            return xhr;
        },
        //get 时拼接参数的方法
        parseParams(obj) {
            let params = '?';
            for (let param in obj) {
                if (obj[param]) {
                    params += param + '=' + encodeURIComponent(obj[param]) + '&';
                }
            }
            return params.slice(0, params.length - 1)
        },
        //please use "get set del add" as prefix
        postLayout(data){
            return this.autoAjaxCall({ url: baseUrl + 'layout', data: data }, 'post');
        },
        getDetailPath(data){
            return this.autoAjaxCall({ url: baseUrl + 'detail/path', data: data });
        },
        postDetailPath(data){
            return this.autoAjaxCall({ url: baseUrl + 'detail/path', data: data }, 'post');
        },
        getRestoreLayout(data){
            return this.autoAjaxCall({ url: baseUrl + 'detail/restore', data: data });
        },
    }
}

