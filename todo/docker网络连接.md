1. fatal: unable to access xxx: Failed to connect to 127.0.0.1 port 7890: Connection refused

取消http代理

```stylus
git config --global --unset http.proxy
```

2. **unable to locate package**

更新一下

```stylus
apt-get update
```

3.在docker容器中安装oh-my-zsh

查看当前shell

```stylus
 echo $SHELL 
/bin/bash
```

安装zsh包

CentOS 系统

```
$ yum -y install zsh
```

Debian/Ubuntu 系统

```
$ apt-get install -y zsh
```

切换默认 Shell 为 OhMyZsh

```
chsh -s /bin/zsh
```

重启服务器



安装 OhMyZsh

```stylus
curl sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

or

wget sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```



4. curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused

打开https://www.ipaddress.com/, 输入raw.githubusercontent.com

在host文件添加以下内容

```
vim /etc/hosts

查到的ip地址  raw.githubusercontent.com
```

然后执行

```stylus
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```



修改主题

```
vim ~/.zshrc

设置 crunch
```

