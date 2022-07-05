##### 1.jdk1.8下载 

https://download.oracle.com/otn/java/jdk/8u321-b07/df5ad55fdd604472a86a45a217032c7d/jdk-8u321-windows-x64.exe

##### 2.一路点击安装, 选择jdk即可,jdk包含jre

##### 3.配置环境变量

###### ①新建 JAVA_HOME, 变量值为**jdk**路径

###### <img src="https://s2.loli.net/2022/02/22/mbjhGt4NdeExOc1.png" alt="image-20220215142808955" style="zoom: 67%;" />

###### ②新建CLASSPATH

```stylus
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
```

<img src="https://s2.loli.net/2022/02/22/pAeEigoaRc1m9d4.png" alt="image-20220215142943055" style="zoom:67%;" />

###### ③添加系统path, 并放置顶部

```stylus
%JAVA_HOME%\bin
```

<img src="https://s2.loli.net/2022/02/22/3npfKUZyaCJIVX9.png" alt="image-20220215143058288" style="zoom: 67%;" />