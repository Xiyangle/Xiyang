# QuantumultX 

###### ***By Xiyang***



1、git clone https://gitee.com/Xiyang7/QuantumultX.git

2、git pull (拉取代码)

3、git add . (暂存需要提交的文件)

4、 git status （查看当前项目中哪些文件被修改过）

5、git commit -m '备注'   (提交已暂存的文件)

6、git push -u origin master   (同步到服务器)



#### 简易的命令行入门教程:

Git 全局设置:

```javascript
git config --global user.name "Xiyang"
git config --global user.email "94444455@qq.com"
```

创建 git 仓库:

```javascript
mkdir ah-ah
cd ah-ah
git init
touch README.md
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://gitee.com/Xiyang7/QuantumultX.git
git push -u origin master
```

已有仓库?

```javascript
cd existing_git_repo
git remote add origin https://gitee.com/Xiyang7/ah-ah.git
git branch -M master
git push -u origin master
```

