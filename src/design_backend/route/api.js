var fs = require('fs');
var express = require('express');
var router = express.Router();

var u = require('../util');

// router.use(function(req, res, next){
//     bodyParser.json()
// });
//router.use(multer); // for parsing multipart/form-data
// 该路由使用的中间件
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.post('/layout', function (req, res) {
    if(!req.body.layout || !req.body.path){
        return res.json({code:1, msg:'layout和path不可为空'});
    }
    var layoutSourcePath = `./source/layout/${req.body.layout}.vue`;
    var targetPath = req.body.path;   

    var layoutP = new Promise((resolve, reject)=>{
        fs.stat(layoutSourcePath, function(err, stat){
            if(err || !stat.isFile()){
                reject('layout非法');
                return;
            }
            resolve();
        })
    });

    var pathP = new Promise((resolve, reject)=>{
        fs.stat(targetPath, function(err, stat){
            if(err || !stat.isFile()){
                reject('路径非法');
                return;
            }
            resolve();
        })
    });

    Promise.all([layoutP, pathP]).then(()=>{
        var sourceContent = fs.readFileSync(layoutSourcePath).toString();
        var targetContent = fs.readFileSync(targetPath).toString();
        var sourceTemplate = u.getTemplate(sourceContent);
        var sourceStyle = u.getStyle(sourceContent);
        var sourceScript = u.getScript(sourceContent);
        targetContent = u.replaceTemplate(targetContent, sourceTemplate);
        targetContent = u.replaceScss(targetContent, sourceStyle);
        targetContent = u.replaceScript(targetContent, sourceScript);
        fs.writeFileSync(targetPath, targetContent);
        res.json({code:0});

    }).catch((error)=>{
        return res.json({code:1, msg:error});
    })
});

router.get('/detail/path', function (req, res) {
    var targetPath = req.query.path;
    if(!targetPath){
        return res.json({code:1, msg:'path不可为空'});
    }
    var pathP = new Promise((resolve, reject)=>{
        fs.stat(targetPath, function(err, stat){
            if(err || !stat.isFile()){
                reject('路径非法');
                return;
            }
            resolve();
        })
    });

    pathP.then(()=>{
        var targetContent = fs.readFileSync(targetPath).toString();
        targetContent = u.getTemplate(targetContent);
        var files = fs.readdirSync('../design_backend/source/layout');
        var clsPrefix = 'f-';
        for(let file of files){
            let dotIndex = file.indexOf('.');
            let fileHumpName = file.substr(0, dotIndex);
            let fileUnderscoreName = fileHumpName.replace(/([A-Z])/g,"-$1").toLowerCase();
            let cls = clsPrefix + fileUnderscoreName;
            if(targetContent.indexOf(cls)!== -1){
                let content = fs.readFileSync(`../design_backend/source/layout/${fileHumpName}.vue`).toString();
                let htmlStartIndex = 11;
                let htmlEndIndex = content.indexOf("</template>");
                let htmlContent = content.slice(htmlStartIndex, htmlEndIndex);
                content = u.replaceTemplate(content, htmlContent);
                res.json({code:0, data:content});
                return;
            }
        }
        return res.json({code:1, msg:'无法找到匹配的布局'});
        //for the future plan:
        //1.run Vue for web
        //2.use casperjs get the web html
        //3.bind click event for the key div( class prefix f-) 
    }).catch((error)=>{
        return res.json({code:1, msg:error});
    });
});

router.post('/detail/path', function (req, res) {
    var html = req.body.html;
    var vue = '';
    if(!html){
        res.json({code:1, msg:'html不可为空'});
        return;
    }
    vue = html;
    var styleStart = '<style>';
    var styleStartIndex = vue.indexOf(styleStart);
    vue = vue.slice(0, styleStartIndex);
    vue = '<template>' + vue + '</template>';

    var targetPath = req.body.path;
    if(!targetPath){
        return res.json({code:1, msg:'path不可为空'});
    }
    var pathP = new Promise((resolve, reject)=>{
        fs.stat(targetPath, function(err, stat){
            if(err || !stat.isFile()){
                reject('路径非法');
                return;
            }
            resolve();
        })
    });

    pathP.then(()=>{
        var targetContent = fs.readFileSync(targetPath).toString();
        targetContent = u.replaceTemplate(targetContent, vue);
        fs.writeFileSync(targetPath, targetContent);
        // fs.writeFileSync("../design_backend/source/temp/temp.html", html);
        res.json({code:0});
    }).catch((error)=>{
        return res.json({code:1, msg:error});
        
    });
});

router.get('/detail/restore', function (req, res) {
    var targetPath = req.query.path;
    if(!targetPath){
        return res.json({code:1, msg:'path不可为空'});
    }
    var pathP = new Promise((resolve, reject)=>{
        fs.stat(targetPath, function(err, stat){
            if(err || !stat.isFile()){
                reject('路径非法');
                return;
            }
            resolve();
        })
    });

    pathP.then(() => {
        var content = fs.readFileSync(targetPath).toString();

        var stylePrefix = '.f-';
        var styleIndex = content.indexOf(stylePrefix);
        var style = content.substr(styleIndex);
        style = '<style> \n' + style;

        var htmlPrefix = "<div";
        var htmlIndex = content.indexOf(htmlPrefix);
        var htmlEnd = content.indexOf('</template>');
        var html = content.substr(htmlIndex , htmlEnd-htmlIndex);

        res.json({ code: 0, data: html + style });
        return res.json({ code: 1, msg: '无法找到匹配的布局' });

    }).catch((error) => {
        return res.json({ code: 1, msg: error });
    });
});

module.exports = router;