##### 1.ERROR: for grafana  Cannot create container for service grafana: user declined directory sharing Creating mysql         



在Docker for Windows 应用程序中更新文件共享配置（2.2.0.0 中有一个新的安全强化，具有激进的默认值）, 添加需要的所有文件夹，然后重新启动 Docker for Windows。

##### ![image-20220208105741788](https://s2.loli.net/2022/02/08/1P85nyJeFEompj3.png)2.goctl更新

```
go install github.com/zeromicro/go-zero/tools/goctl@latest
```



vscode代码补齐太慢, 

进入vscode settings搜索Go Language Server Experimental Features把勾勾去掉
