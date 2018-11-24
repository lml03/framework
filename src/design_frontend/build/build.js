require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var fs = require('fs')
var spinner = ora('building for production...')
spinner.start()






function setDebug(){
    var fileList2 = [
        config.build.assetsPublicPath+"/src/assets/mixin/service.js"
    ];
    
    
    for(var i=0, j=fileList2.length; i<j; i++){
        var file = fileList2[i];
        var ret = fs.readFileSync(file,'utf-8');
        var replaceArgs = 'prod';
        ret = ret.replace(/const debugLevel = [\S]*/, 'const debugLevel = "'+replaceArgs+'";');
        fs.writeFileSync(file, ret, 'utf-8');
    }
}

setDebug();



rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
      let cssWhiteList = ["bootstrap.min.css"]
      console.log(config.build.assetsRoot)
      fs.readdir(config.build.assetsRoot+"/static/css", function(err, files) {
          files.forEach(function(filename) {
              if(cssWhiteList.indexOf(filename) != -1){
                  return;
              }
              console.log(filename);
              if(/^.*css$/.test(filename)){
                  fs.readFile(config.build.assetsRoot+"/static/css/"+filename,'utf-8',function(err,data){
                      if(err) return
                      data = data.replace(/url\(static/g,"url(../../static");
                      fs.writeFile(config.build.assetsRoot+"/static/css/"+filename, data, (err) => {
                          if (err) throw err;
                          console.log('It\'s saved!');
                      });
                  });
              }
          });
      });

      var fileList = ['service.js'],fileDataList = [];
      for(let i = 0 ; i < fileList.length; i++){
          fileDataList.push(fs.readFileSync(config.build.assetsPublicPath+'src/assets/mixin/'+fileList[i],'utf-8'))
      }
      for(let i = 0 ; i < fileDataList.length; i++){
          fileDataList[i] = fileDataList[i].replace(/const debugLevel = \"build\"/g, 'const debugLevel = "dev"')
          fs.writeFileSync(config.build.assetsPublicPath+'src/assets/mixin/'+fileList[i], fileDataList[i]);
      }


      console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
