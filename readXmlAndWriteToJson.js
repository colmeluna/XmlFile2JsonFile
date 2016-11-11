var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var xml2js = require('xml2js');

var cwdPath = process.cwd();
var nowPath = path.resolve(cwdPath, '../../../../');
//nowPath = '';
var jsonfilePath = nowPath+'/json/';
var xmlfilePath = nowPath+'/xml/';


/*

function write(jsonFileNameFullName,writeJsonString,callback){
    fs.writeFile(jsonfilePath + jsonFileNameFullName, writeJsonString, function (err) {
        if (err) throw err;
        console.log("write JSON into " + '' + ".json file success!");
        callback(err);
    })
}
function read(filename,callback) {
    var jsonFileNameFullName='';
    var writeJsonString = '';
    fs.readFile(xmlfilePath + filename, function (err, data) {
        if (err)
            throw err;
        var xmlParser = new xml2js.Parser({
            explicitArray: false,
            ignoreAttrs: false,
            explicitRoot: false,
            mergeAttrs: true
        });

        xmlParser.parseString(data, function (err, json) {
            console.log(JSON.stringify(json));
            var jsonROW = json.ROW;
            var newJson = new Object();
            if (jsonROW.length == undefined) { //jsonROW.length !== undefined
                newJson[jsonROW['key']] = jsonROW;
                delete newJson[jsonROW['key']].key;
            }
            else {
                for (var i in jsonROW) {
                    newJson[jsonROW[i].key] = jsonROW[i];
                    delete newJson[jsonROW[i].key]["key"];
                }
            }
            var jsonFileName = filename.substring(0, filename.lastIndexOf('.'));
            jsonFileNameFullName= jsonFileName + ".json";
            writeJsonString= JSON.stringify(newJson);
        });
    });
    callback(null, jsonFileNameFullName,writeJsonString);
}
*/

exports.readXmlFileAndWriteToJson = function(filename) {
    async.waterfall([
            //读取 xml
            function (callback) {
                fs.readFile(xmlfilePath+filename, function (err, data) {
                    if (err)
                        throw err;
                    callback(null,filename,data);
                });

            },
            //convert
            function(filename,data,callback) {
                var xmlParser = new xml2js.Parser({
                    explicitArray: false,
                    ignoreAttrs: false,
                    explicitRoot: false,
                    mergeAttrs: true
                });
                xmlParser.parseString(data, function (err, json) {
                    console.log(JSON.stringify(json));
                    var jsonROW = json.ROW;
                    var newJson = new Object();
                    if (jsonROW.length == undefined) { //jsonROW.length !== undefined
                        newJson[jsonROW['key']] = jsonROW;
                        delete newJson[jsonROW['key']].key;
                    }
                    else {
                        for (var i in jsonROW) {
                            newJson[jsonROW[i].key] = jsonROW[i];
                            delete newJson[jsonROW[i].key]["key"];
                        }
                    }
                    var writeJsonString = JSON.stringify(newJson);
                    json = writeJsonString;
                    callback(null, filename,json);
                });
            },
            function (filename,writeJsonString,callback){
                var jsonFileName = filename.substring(0, filename.lastIndexOf('.'));
                var jsonFileNameFullName= jsonFileName + ".json";
                fs.writeFile(jsonfilePath+jsonFileNameFullName, writeJsonString, function (err) {
                    if (err) throw err;
                    console.log("write JSON into " + jsonfilePath+jsonFileNameFullName + ".json file success!");
                    if(callback)
                        callback(null,null);
                })
            }
        ],
        function (err, result) {

        })

}

/*

exports.readXmlFileAndWriteToJson = function(filename, callback){
    fs.readFile(xmlfile+filename,function(err,data) {
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
            // alert('写入文件:'+jsonfile+jsonFileNameFullName);
            fs.writeFile(jsonfile+jsonFileNameFullName,writeJsonString,function(err){
                if(err) throw err;
                console.log("write JSON into "+jsonFileName+".json file success!");
                callback(err);
            });
        });
    });
}



*/



//test run

// this.readXmlFileAndWriteToJson('Card.xml',function(err){
//
// });