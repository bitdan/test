```
拉镜像:

 docker pull bitnami/etcd
启动:

docker run -it -d -p 2379:2379 -p 2380:2380 --name etcd quay.io/coreos/etcd
查询:

docker exec -it etcd etcdctl member list

```

