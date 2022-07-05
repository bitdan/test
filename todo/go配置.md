##### 1、GO设置代理

Go 版本是 1.13 及以上

```javascript
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct
```

取消代理

```javascript
$ go env -u GOPROXY
```

查看GO的配置

```javascript
$ go env
//以JSON格式输出
$ go env -json
```

path环境变量会自己添加

go get -v -u all 所有依赖



##### 2、Go debug

原文链接 https://github.com/go-delve/delve/tree/master/Documentation/installation

```
go get -u github.com/go-delve/delve/cmd/dlv

or
go install github.com/go-delve/delve/cmd/dlv@latest
```

