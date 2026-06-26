---
title: "Git 常用命令整理"
date: 2026-06-24
draft: false
categories: ["学习笔记"]
tags: ["Git", "命令行", "版本控制"]
description: "整理日常开发中最常用的 Git 命令，方便查阅。"
---

## 初始化与克隆

```bash
git init                  # 在当前目录初始化仓库
git clone <url>           # 克隆远程仓库到本地
```

## 日常提交流程

```bash
git status                # 查看文件状态
git add .                 # 暂存所有修改
git add <file>            # 暂存指定文件
git commit -m "说明"      # 提交并写备注
git push                  # 推送到远程
```

## 分支操作

```bash
git branch                # 查看所有分支
git branch <name>         # 创建新分支
git checkout <name>       # 切换分支
git checkout -b <name>    # 创建并切换
git merge <name>          # 合并分支到当前
```

## 撤销与回退

```bash
git restore <file>        # 丢弃工作区的修改
git reset HEAD <file>     # 撤销暂存
git log --oneline         # 查看提交历史（简洁版）
```

## 小技巧

- `git diff` 可以看具体改了什么内容
- `git stash` 可以临时保存未完成的修改
- `.gitignore` 文件里写上不想追踪的文件名
