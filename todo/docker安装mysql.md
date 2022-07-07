1.docker仓库搜索mysql

```stylus
docker search mysql
```

2.docker仓库拉取mysql8.0

```stylus
docker pull mysql:8.0
备注：
docker pull mysql //默认拉取最新版本
```

3.查看本地仓库镜像是否下载成功

```apache
docker images mysql:8.0
```

4.安装运行mysql8.0容器

```stylus
docker run -p 3306:3306 --name mysql8.0 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0
备注：
-p 将本地主机的端口映射到docker容器端口（因为本机的3306端口已被其它版本占用，所以使用3307）
--name 容器名称命名
-e 配置信息，配置root密码
-d 镜像名称
```



5.后记（常用的docker命令）

```stylus
docker search 镜像名称 //搜索镜像
docker pull 镜像名称:版本号 //拉取对应版本的镜像
docker pull 镜像名称 //默认拉取最新的镜像
docker images //查看本地已下载的镜像
docker ps //查看正在运行的容器
docker ps -a //查看所有的容器（包括run、stop、exited状态的）
docker container ls //查看正在运行的容器
docker rm 容器ID //只能删除没有在运行的容器
docker rm -f 容器ID //可以删除正在运行的容器
docker run -p 本地主机端口号:容器服务端口号 --name 容器名字 [-e 配置信息修改] -d 镜像名字
docker start 容器ID //启动容器
docker stop 容器ID //终止容器
docker rmi 镜像名称orID //删除镜像
```