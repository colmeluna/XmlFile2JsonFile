var fs = require("fs");
var readXmlAndWriteToJson = require('./readXmlAndWriteToJson')

// fs.readdir("./xml",function(err, files){
//     if (err) {
//         return console.error(err);
//     }
//     console.log('go read file');
//     files.forEach( function (file){
//         console.log( '当前文件名称:'+file );
//         readXmlAndWriteToJson.readXmlFileAndWriteToJson(file,function (err) {
//             if(err)
//             throw  err;
//             console.log(file+' is done');
//         });
//     });
// });

        var file = 'Task.xml';
        readXmlAndWriteToJson.readXmlFileAndWriteToJson(file,function (err) {
            if(err)
            throw  err;
            console.log(file+' is done');
        });