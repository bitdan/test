设置权限,  powershell管理员运行

```stylus
set-executionpolicy remotesigned
```

运行

```stylus
Install-Module posh-git
Install-Module DirColors
Install-Module oh-my-posh
```

需要安装VSCODE

```stylus
code $profile
```

打开配置文件后

```stylus
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme Agnoster   or  Sorin
Import-Module DirColors
```

