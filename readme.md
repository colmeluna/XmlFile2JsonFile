# **一、说明：**
    基于nodejs，实现 *.xml文件转换为  *.json文件。
## 二、安装所需的库:
    npm install node-xml2js --save
    npm install fs-extra --save
## 三、目录说明：
    xml文件夹下存放 *.xml文件
    json文件夹生成对应的 *.json文件
    tmp文件夹用于存储历史*.json文件
## 四、转换示例:
   Xml:
   ````xml
 <ROWDATA>
         <ROW name="蓝色" image="bu_blue.png" key="1"></ROW>
         <ROW name="灰色" image="bu_hui.png" key="2"></ROW>
         <ROW name="绿色" image="bu_lv.png" key="3"></ROW>
         <ROW name="红色" image="bu_red.png" key="4"></ROW>
         <ROW name="黄色" image="bu_yellow.png" key="5"></ROW>
         <ROW name="紫色" image="bu_zi.png" key="6"></ROW>
       </ROWDATA> 
````
   Json:
```json
{
            "1": {
                "name": "蓝色", 
                "image": "bu_blue.png"
            }, 
            "2": {
                "name": "灰色", 
                "image": "bu_hui.png"
            }, 
            "3": {
                "name": "绿色", 
                "image": "bu_lv.png"
            }, 
            "4": {
                "name": "红色", 
                "image": "bu_red.png"
            }, 
            "5": {
                "name": "黄色", 
                "image": "bu_yellow.png"
            }, 
            "6": {
                "name": "紫色", 
                "image": "bu_zi.png"
            }
        }
```

## 五、转换说明：
        Json内去除ROOT ROWDATA
        将原有属性'key' 取出作为 jsonObject key 。