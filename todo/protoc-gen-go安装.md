![image-20220613145830458](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220613145830458.png)

##### protoc-gen-go 的安装

按照教程，指令如下

```go
go get -u github.com/golang/protobuf/protoc-gen-go
```

但执行后会有如下错误

```bash
go: module github.com/golang/protobuf is deprecated: Use the "google.golang.org/protobuf" module instead.
go get: installing executables with 'go get' in module mode is deprecated.
        Use 'go install pkg@version' instead.
        For more information, see https://golang.org/doc/go-get-install-deprecation
        or run 'go help get' or 'go help install'.
```

报了两个错误

1. 现在想要拉取protoc-gen-go需要去**google.golang.org/protobuf**拉取，原来的路径已经废弃了。
2. 我使用的go版本是1.17。而**Go1.17版使用go install安装依赖**。所以应该按照它下面的格式**go install pkg@version**进行拉取。

所以拉取命令如下

```go
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```