var fs = require("fs-extra");
var path = require('path');
var async = require('async');
var readXmlAndWriteToJson = require('./readXmlAndWriteToJson');


//copy json下所有文件 至tmp/timestamp   文件夹下
var time = new Date();
var timestampDirName = time.getTime().toString();
var cwdPath = process.cwd();
var nowPath = path.resolve(cwdPath, '../../../../');
//nowPath = '';
var jsonfilePath = nowPath + '/json/';
var tmpfilePath = nowPath + '/tmp/';
var xmlfilePath = nowPath + '/xml/';

exports.doConvert = function() {
    async.series([
        function (callback){
            fs.copy(jsonfilePath, tmpfilePath+timestampDirName, function (err) {
                if (err)
                    throw err;
            });
            callback(null,'copy done');
        },
        function (callback){
            fs.emptyDir(jsonfilePath, function (err) {
                if (!err) console.log('success!')
            });
            callback(null,'empty done');
        },
        function (callback){
            //读取./xml文件夹下的所有文件 并 转换成 .json文件 写入 ./json文件夹下
            //alert(xmlfilePath);
            fs.readdir(xmlfilePath,function(err, files){
                if (err) {
                    return console.error(err);
                }
                console.log('go read file');
                files.forEach( function (file){
                   // alert('执行当前文件:'+file);
                    readXmlAndWriteToJson.readXmlFileAndWriteToJson(file);
                });
            });
            callback(null,'convert done');
        }
    ], function (err, results) {
        console.log(results);
    });
}
    /*function copy(callback){
        fs.copy(jsonfilePath, tmpfilePath+timestampDirName, function (err) {
            if (err)
                throw err;
        });
        callback(null,'copy done');
    }
    function emptyDir(callback){
        fs.emptyDir(jsonfilePath, function (err) {
            if (!err) console.log('success!')
        });
        callback(null,'empty done');
    }
    function goConvert(callback){
        //读取./xml文件夹下的所有文件 并 转换成 .json文件 写入 ./json文件夹下
        fs.readdir(xmlfilePath,function(err, files){
            if (err) {
                return console.error(err);
            }
            console.log('go read file');
            files.forEach( function (file){
                alert('执行当前文件:'+file);
                readXmlAndWriteToJson.readXmlFileAndWriteToJson(file,function (err) {
                    if(err)doConvert
                        throw  err;
                });
            });
        });
        callback(null,'convert done');
    }
*/
//this.doConvert();