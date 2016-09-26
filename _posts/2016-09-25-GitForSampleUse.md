---
layout: post
title: "【Git】操作指南"
date: 2014-09-25
categories: Git
---

文章记述了通过终端命令行使用git频率较高的一些操作，这些操作包括仓库管理，远程仓库，分支管理,标签管理等。
***
##### 仓库管理
本地初始化仓库

`$ git init`


克隆一个远程仓库

`$ git clone htts://xx.xx.xx.xx.git`

查看仓库状态
`$ git status [-s]`

工作区文件丢弃（discard）
`$ git checkout -- <file>`

添加修改内容到暂存区
`$ git add [name | .]` 

暂存区文件恢复到工作区(unstage)
`$ git reset HEAD <file>`

提交暂存区内容到分支
`$ git commit -m '描述'`


#### 远程分支
关联一个仓库到远程分支
`$ git remote add origin git@0.0.0.0:/path/test.git`

推送分支到远程
`$ git push -u origin <branchName>`

查看最新分支(远程主机所有更新)
`$ git fetch <主机名>`

查看远程分支列表（红色标记）
`$ git branch -a`

查看远程分支详细信息
`$ git remote show origin`

拉取远程分支
`$ git pull origin branchName:branchName `

命令删除远程分支
`$ git push origin --delete <branchName>`

推送空分支删除远程分支
`$ git push origin :<branchName>`

#### 分支管理
创建分支
`$ git branch <name>`

查看本地所有分支
`$ git branch`

切换分支
`$ git checkout <name>`

合并dev分支到当前分支
`$ git merge dev`

修改本地分支名字
`$ git branch -m devel develop`

删除本地分支
`$ git branch -D branchName`

#### 标签管理
添加一个带注解的'v1.0'标签
`$ git tag -a v1.0`

推送本地tag到远程
`$ git push --tags`

获取远程tag
`$ git fetch origin tag <tagname>`

删除远程tag标签
`$ git push origin --delete tag <tagName>`





