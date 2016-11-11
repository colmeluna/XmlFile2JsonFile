1、

打包成可执行文件。
打包工具
nwbuilder。
打包命令：
nwbuild -p osx64 ./ -v 0.18.6 
（指定打包成mac app， 执行nwbuild版本为当前0.18.6）

2、 

创建任意文件夹  例：   Descktop/MyTest   
将编译完成的 xmlfile2jsonfile.app 拷贝至MyTest 。

Mytest目录结构 
     xmlfile2Jsonfile.app
    -/xml/
    -/json/
    -tmp/    

执行xmlfile2jsonfile.app即可。