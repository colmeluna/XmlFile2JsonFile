var fs = require("fs-extra");
var readXmlAndWriteToJson = require('./readXmlAndWriteToJson')

//copy json下所有文件 至tmp/timestamp   文件夹下
    var time = new Date();
    var timestampDirName = time.getTime().toString();
    console.log(timestampDirName);
    fs.move('./json/', './tmp/'+timestampDirName, function (err) {
        if (err) return console.error(err)
        console.log("copy  old json to tmp/ success!")
        //清空./json文件夹下的所有文件
        fs.emptyDirSync('./json');
    })

//读取./xml文件夹下的所有文件 并 转换成 .json文件 写入 ./json文件夹下

    fs.readdir("./xml",function(err, files){
        if (err) {
            return console.error(err);
        }

        console.log('go read file');
        files.forEach( function (file){
            console.log( '当前文件名称:'+file );
            readXmlAndWriteToJson.readXmlFileAndWriteToJson(file,function (err) {
                if(err)
                    throw  err;
                console.log(file+' is done');
            });
        });
    });






