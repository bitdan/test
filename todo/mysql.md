https://cloud.tencent.com/developer/article/1599509

mysql忘记密码



怎么安装

职级下载解压包

添加环境变量

初始化

```
mysqld --initialize --console
```

这一步会生成密码



**管理员添加服务**

```
mysqld install
```

启动输入以下命令即可：

```
net start mysql
```



win查看端口占用

```shell
netstat -aon|findstr "8081"
```

查看指定 PID 的进程

```shell
tasklist|findstr "9088"
```

结束进程

强制（/F参数）杀死 pid 为 9088 的所有进程包括子进程（/T参数）：

```shell
taskkill /T /F /PID 9088 
```

窗口函数

CUME_DIST() 分布

DENSE_RANK分区排名

FIRST_VALUE()函数获取窗口框架的第一行

LEAD()函数访问当前行中后续行的数据

NTH_VALUE()函数从结果集的第N行获取值

NTILE()函数将行分配到指定数量的组中



explain https://segmentfault.com/a/1190000023565685
