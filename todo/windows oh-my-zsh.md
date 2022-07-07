在管理员状态下的 PowerShell (Core) 中运行下面的命令安装 oh my posh 及相关组件：

```
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

中途遇到询问全部选是。这可能会自动在电脑上安装包管理器 NuGet；[Posh-Git](https://github.com/dahlbyk/posh-git) 提供了 Git 状态信息的提示，并为 Git 命令、参数、远程和分支名称等添加 tab 自动补全； [Oh-My-Posh](https://github.com/JanDeDobbeleer/oh-my-posh) 为 PowerShell 提供主题了功能。

```
set-ExecutionPolicy RemoteSigned
```



```
code $PROFILE
```



```
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme Paradox
```

