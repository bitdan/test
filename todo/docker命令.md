1.进入容器

```stylus
 docker exec -it 35e6f932a6f7 bash
```

2.复制本地文件到docker容器中

```stylus
docker cp F:\golang\mall/. 35e6f932a6f7:/usr/src/code/mall
```

3.进入docker容器数据库

```stylus
docker exec -it 442686bbb7a5 /bin/bash   //进入容器
```



4.在[docker](https://so.csdn.net/so/search?q=docker&spm=1001.2101.3001.7020)容器里，我们要查看操作系统时，正确的方法是：

```shell
cat /etc/issue
```





在docker启动容器可以增加参数来达到,当docker 服务重启之后 自动启动容器.
命令如下：

```
docker run –restart=always
```

当然如果你的容器已经启动,可以通过update命令进行修改.
命令如下：

```
docker update –restart=always <CONTAINER ID>
```

如果你想取消掉
命令如下:

```
docker update --restart=no <CONTAINER ID>
```

取消全部

```
docker update --restart=no $(docker ps -q)
```

