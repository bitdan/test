###### 1.Please move or remove them before you merge.

```
git clean -d -f 
```



If you want remove all local changes - including files that are untracked by git - from your working copy, simply stash them:

```
git stash push --include-untracked
```

If you don't need them anymore, you now can drop that stash:

```
git stash drop
```

If you don't want to stash changes that you already staged - e.g. with `git add` - then add the option `--keep-index`. Note however, that this will still prevent merging if those staged changes collide with the ones from upstream.

------

If you want to overwrite only specific parts of your local changes, there are two possibilities:

1. Commit everything you don't want to overwrite and use the method above for the rest.
2. Use `git checkout path/to/file/to/revert` for the changes you wish to overwrite. Make sure that file is not staged via `git reset HEAD path/to/file/to/revert`.



```stylus
git add  -A

git commit -m "第21~22周和历史迭代内容"

git push origin develop
```



```stylus
1.首先切换到分支；
git checkout hellomonkey

2.使用git pull 把分支代码pull下来；
git pull

3.切换到主分支；
git checkout master

4.把分支的代码merge到主分支；
git merge hellomonkey

5.git push推上去ok完成,现在 你自己分支的代码就合并到主分支上了。
git push

总结：同样的道理，主分支的文件也可以合并的分支上。 ^o^
```



合并多个commit



1.从HEAD版本开始往过去数3个版本

```stylus
git rebase -i HEAD~3
```

2.指名要合并的版本之前的版本号

```stylus
git rebase -i 3a4226b
```

请注意3a4226b这个版本是不参与合并的，可以把它当做一个坐标

**3,选取要合并的提交**

1.执行了rebase命令之后，会弹出一个窗口，头几行如下：

```stylus
pick 3ca6ec3   '注释**********'

pick 1b40566   '注释*********'

pick 53f244a   '注释**********'
```

2.将pick改为squash或者s,之后保存并关闭文本编辑窗口即可。改完之后文本内容如下：

```stylus
pick 3ca6ec3   '注释**********'

s 1b40566   '注释*********'

s 53f244a   '注释**********'
```

3.然后保存退出，Git会压缩提交历史，如果有冲突，需要修改，修改的时候要注意，保留最新的历史，不然我们的修改就丢弃了。修改以后要记得敲下面的命令：

```stylus
git add .  

git rebase --continue  
```

如果你想放弃这次压缩的话，执行以下命令：

```stylus
git rebase --abort  
```

4.如果没有冲突，或者冲突已经解决，则会出现如下的编辑窗口：

```stylus
# This is a combination of 4 commits.  
#The first commit’s message is:  
注释......
# The 2nd commit’s message is:  
注释......
# The 3rd commit’s message is:  
注释......
# Please enter the commit message for your changes. Lines starting # with ‘#’ will be ignored, and an empty message aborts the commit.
```

5.输入wq保存并推出, 再次输入git log查看 commit 历史信息，你会发现这两个 commit 已经合并了。





###### 撤回提交

```stylus
git reset --soft HEAD^
```

HEAD^的意思是上一个版本，也可以写成HEAD~1

如果你进行了2次commit，想都撤回，可以使用HEAD~2



###### 如果commit注释写错了，只是想改一下注释，只需要：

```stylus
git commit --amend
```



###### 在我们写完代码进行提交的时候我们常常这样做：

```stylus

git add .    // 添加所有修改过的文件待提交
git commit -m "xxxx"    // 提交到本地仓库
git fetch     // fetch 远端代码
git rebase origin/develop  // 拉取远端develop代码进行合并
git push     // 推送到远程分支
```



###### 新建其它分支，将项目push到新建的分支上，后期再进行merge

(1)新建分支

```stylus
git branch 分支名
```

(2)切换分支

```stylus
git checkout 分支名
```

(3)进行项目上传

```stylus
git add .

git commit -m "提交的信息"

git remote add origin 远程仓库地址

git push -u origin 分支名
```



git branch -a：可以查看所有本地分支和远程分支
git branch -r：只查看远程分支
如果gitlab里有，而本地没有，则执行git fetch就可以更新到了。然后，在idea里就可以看到所有的远程分支了（不用重启idea，如果没有最新分支还是重启一下吧）。



###### 删除远程cpdev分支

```stylus
 git push origin --delete cpdev 
```



###### GIT 删除指定COMMIT提交



```stylus
1. git log

找到要删除的提交 Id ( 简写为 Id-a) 之前一次 提交的 Id (简写为 Id-b)；

2. git rebase -i  Id-b

表示回退到之前的版本，并在之后会提交需要的所有提交。

3.删除要删除的提交（skip 变成 drop 或者 删除想要删除的那一行），并保存退出。

4. git push origin branch-name --force
```



备注：

可能存在 git rebase --continue 提示，按照提示执行即可。



查看本地和远程区别

```stylus
git diff origin/master
```

查看简短提交信息

```stylus
git log --oneline
```



###### git rebase使用

https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA

```stylus
检出 experiment 分支，然后将它变基到 master 分支上：

git checkout experiment
git rebase master

回到 master 分支，进行一次快进合并

git checkout master
$ git merge experiment

```

查看修改文件

```stylus
git diff 查看全部修改
git diff 文件   查看单个文件修改内容

```

本地新的分支同步到远程

```stylus
git push --set-upstream origin duran
```

