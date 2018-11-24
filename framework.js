#! /usr/bin/env node

var fs = require('fs');
var path = require('path');

var program = require('commander');
var inquirer = require('inquirer');
var unzip = require("unzip2");
var rimraf = require("rimraf");
const { exec } = require('child_process');


program
.command('init')
.description('选择框架')
.action(function () {
    var prompt = [];
    var config = {};
    prompt.push({
        type: 'list',
        name: 'chooseFramework',
        message: '请选择你需要的框架',
        choices: ['vuejs', 'backbone']
    });
    prompt.push({
        type: 'input',
        name: 'path',
        message: "请输入生成框架的目录",
        default: function () {
            return process.cwd();
        },
        validate: function(path) {
            if (path==process.cwd() ) {
                return "请先输入地址，并且避免使用默认的 Framework 文件地址";
            }                                         
                
            if (fs.existsSync(path)) {
                return true;
            }else{
                fs.mkdirSync(path);
                var isDir = fs.statSync(path).isDirectory();
                if (isDir) {
                    return true;

                }else{
                    fs.rmdirSync(path);
                }        
                    
            }
            
            return '请输入合法地址！';
        }
    });

    inquirer.prompt(prompt).then(answers => {
        config = Object.assign(config, answers);
        console.log("config",config);
        var fileName = "vue_space.zip";         
		var sourceFile = path.join(__dirname,"src/vuejs",fileName);
		var destPath = path.join(answers.path, fileName);		
		var readStream = fs.createReadStream(sourceFile);
		var writeStream = fs.createWriteStream(destPath); 
		readStream.pipe(writeStream);
		

		writeStream.on('finish', () => {
            console.log("Zip移动完成");
			var unzipExtract= unzip.Extract({ path: answers.path})  
			fs.createReadStream(destPath).pipe(unzipExtract);
			fs.unlinkSync(destPath);
			console.log("删除zip了")	
		});		
    });
})

program
.command('addpage')
.description('增加页面')
.action(function () {
    var prompt = [];
    var config = {};
    prompt.push({
        type: 'input',
        name: 'name',
        message: "请输入html页面(module)的名字",
        default: function () {
            return 'index';
        },
        validate: function(value) {
            if (/^[0-9a-zA-Z-_]+$/.test(value)) {
              return true;
            }      
            return '页面名字只能包括数字字母和-_';
        }
    });
    prompt.push({
        type: 'input',
        name: 'path',
        message: "请输入框架根目录",
        default: function () {
            return process.cwd();
        },
        validate: function(path) {
            if (path==process.cwd() ) {
                return "请先输入地址，并且避免使用默认的 Framework 文件地址";
            }                                         
                
            if (fs.existsSync(path)) {
                return true;
            }else{
                fs.mkdirSync(path);
                var isDir = fs.statSync(path).isDirectory();
                if (isDir) {
                    return true;

                }else{
                    fs.rmdirSync(path);
                }        
                    
            }
            
            return '请输入合法地址！';
        }
    });

    inquirer.prompt(prompt).then(answers => {
        config = Object.assign(config, answers);
        console.log(config);
        var fileName = "index.zip";         
        var sourceFile = path.join(__dirname,"src\\pages",fileName);
        var destPath = path.join(answers.path, "src\\modules", fileName); 
        var destDir = path.join(answers.path, "src\\modules");
        var readStream = fs.createReadStream(sourceFile);
        var writeStream = fs.createWriteStream(destPath);
        readStream.pipe(writeStream);
        

        writeStream.on('finish', () => {
            var unzipExtract= unzip.Extract({ path: answers.path+"\\src\\modules"})  
            fs.createReadStream(destPath).pipe(unzipExtract);
            fs.unlink(destPath, (err) => {
                if (err) throw err;
                fs.rename(destDir+"\\index", destDir+"\\"+answers.name, (err) => {
                    if (err) throw err;
                    fs.renameSync(destDir+"\\"+answers.name+"\\index.html", destDir+"\\"+answers.name+"\\"+answers.name+".html");
                    fs.renameSync(destDir+"\\"+answers.name+"\\index.js", destDir+"\\"+answers.name+"\\"+answers.name+".js");
                    console.log("添加完成");
                });
                
            });
            
            
        }); 
    });
})

program
.command('delpage')
.description('删除页面')
.action(function () {
    var prompt = [];
    var config = {};
    prompt.push({
        type: 'input',
        name: 'name',
        message: "请输入html页面(module)的名字",
        default: function () {
            return 'index';
        },
        validate: function(value) {
            if (/^[0-9a-zA-Z-_]+$/.test(value)) {
              return true;
            }      
            return '页面名字只能包括数字字母和-_';
        }
    });
    prompt.push({
        type: 'input',
        name: 'path',
        message: "请输入框架根目录",
        default: function () {
            return process.cwd();
        },
        validate: function(path) {
            if (path==process.cwd() ) {
                return "请先输入地址，并且避免使用默认的 Framework 文件地址";
            }                                         
                
            if (fs.existsSync(path)) {
                return true;
            }
            
            return '请输入合法地址！';
        }
    });

    inquirer.prompt(prompt).then(answers => {
        config = Object.assign(config, answers);
        console.log(config);
      
        var destPath = path.join(answers.path, "src\\modules", answers.name); 
        try{
            if(fs.statSync(destPath).isDirectory()){
                rimraf(destPath, (err) =>{
                    if (err) throw err;
                    console.log("删除成功！")
                });
            }
        }catch(err){
            console.log("目录不存在！");
        }

    });
})

program
.command('design')
.description('设计页面')
.action(function () {
    var exePath = path.resolve(__dirname, './design_frontend_start.bat');
    var batPath = path.resolve(__dirname, './src/design_frontend');    
    exec('node ./build/dev-server.js', {cwd: batPath}, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
});


program.parse(process.argv)