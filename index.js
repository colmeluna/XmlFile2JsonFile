var fs = require("fs-extra");
var path = require('path');
var readXmlAndWriteToJson = require('./readXmlAndWriteToJson');


exports.doConvert = function(){
    //copy json下所有文件 至tmp/timestamp   文件夹下
    var time = new Date();
    var timestampDirName = time.getTime().toString();

    var cwdPath = process.cwd();
    var nowPath = path.resolve(cwdPath, '../../../../');
    var jsonfile = nowPath+'/json/';
    var tmpfile = nowPath+'/tmp/';
    var xmlfile = nowPath+'/xml/';

    alert('json file is in :'+jsonfile);
    alert('xml file is in:'+xmlfile);
    fs.move(jsonfile, tmpfile+timestampDirName, function (err) {
        if (err)
            throw err;
        console.log("copy  old json to tmp/ success!")
        //清空./json文件夹下的所有文件
        alert('清空：'+jsonfile);
        fs.emptyDirSync(jsonfile);
    });

    //读取./xml文件夹下的所有文件 并 转换成 .json文件 写入 ./json文件夹下

    fs.readdir(xmlfile,function(err, files){
        if (err) {
            return console.error(err);
        }

        console.log('go read file');
        files.forEach( function (file){
            alert( '当前文件名称:'+file );
            readXmlAndWriteToJson.readXmlFileAndWriteToJson(file,function (err) {
                if(err)
                    throw  err;
                console.log(file+' is done');
            });
        });
    });
}




