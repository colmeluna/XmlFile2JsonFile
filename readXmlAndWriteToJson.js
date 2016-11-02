var fs=require('fs-extra');
var xml2js = require('xml2js');

exports.readXmlFileAndWriteToJson = function(filename, callback){
    fs.readFile('xml/'+filename,function(err,data) {
        if (err)
            throw err;
        var xmlParser = new xml2js.Parser({explicitArray: false, ignoreAttrs: false, explicitRoot: false, mergeAttrs:true});

        xmlParser.parseString(data, function (err, json) {
            console.log(JSON.stringify(json));
            var jsonROW =  json.ROW;
            var newJson = new Object();
            if (jsonROW.length == undefined){ //jsonROW.length !== undefined
                newJson[jsonROW['key']] =  jsonROW;
                delete newJson[jsonROW['key']].key;
            }
            else{
                for(var i in jsonROW){
                    newJson[jsonROW[i].key] = jsonROW[i];
                    delete newJson[jsonROW[i].key]["key"];
                }
            }
            //console.log(JSON.stringify(newJson));
            var jsonFileName = filename.substring(0,filename.lastIndexOf('.'));
            var jsonFileNameFullName = jsonFileName+".json";
            var writeJsonString = JSON.stringify(newJson);
            //console.log('writeJsonString '+writeJsonString);

            //写入.json 文件
            fs.writeFile('json/'+jsonFileNameFullName,writeJsonString,function(err){
                if(err) throw err;
                console.log("write JSON into "+jsonFileName+".json file success!");
                callback(err);
            });
        });
    });
}

//test run

// this.readXmlFileAndWriteToJson('Card.xml',function(err){
//
// });