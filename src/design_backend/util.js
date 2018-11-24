var util = {
    getTemplate: function(content){
        var reg = /<template>([\s\S]*)<\/template>/
        var ret = reg.exec(content);
        return (ret && ret.length===2 && ret[0]) || '';
    },
    getScript: function(content){
        var reg = /<script>([\s\S]*)<\/script>/
        var ret = reg.exec(content);
        return (ret && ret.length===2 && ret[0]) || '';
    },     
    getStyle: function(content){
        var reg = /<style lang=\"scss\">([\s\S]*)<\/style>/
        var ret = reg.exec(content);
        return (ret && ret.length===2 && ret[0]) || '';
    },   
    replaceTemplate: function(targetContent, sourceTemplate){
        var reg = /<template>([\s\S]*)<\/template>/;
        return targetContent.replace(reg, sourceTemplate);
    },
    replaceScript: function(targetContent, sourceTemplate){
        var reg = /<script>([\s\S]*)<\/script>/;
        return targetContent.replace(reg, sourceTemplate);
    },    
    replaceScss: function(targetContent, sourceTemplate){
        var reg = /<style lang=\"scss\">([\s\S]*)<\/style>/;
        return targetContent.replace(reg, sourceTemplate);
    },
    appendScss: function(targetContent, sourceTemplate){
        var reg = /<\/style>/;
        return targetContent.replace(reg, sourceTemplate + '</style>');
    },
}
module.exports = util;