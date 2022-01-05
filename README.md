### Git常用操作命令:


```javascript
{	//本地命令迁移仓库使用
    //移除gitee远端（不移除也可以，但github要改名不能也叫origin）
    git remote remove origin
    //添加github远端
    git remote add origin https://gitee.com/Xiyang7/QuantumultX.git
}

1、git clone https://gitee.com/Xiyang7/QuantumultX.git (下载项目)

1.5、git clone -b (分支名称) https://gitee.com/Xiyang7/QuantumultX.git (下载分支项目)

2、git pull (拉取代码)

3、git add . (暂存需要提交的文件)

4、git status （查看当前项目中哪些文件被修改过）

5、git commit -m '备注'   (提交已暂存的文件)

6、git push -u origin master   (同步到服务器)
    
7、若报错，请如下指令之后便会正常:
   git push -u origin master -f  (强制push)

```

#### 简易的Git命令行入门教程:

Git 全局设置:

```shell
git config --global user.name "Xiyangle"
git config --global user.email "Xiyangle@vip.qq.com"
```

创建 git 仓库:

```shell
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

```shell
cd existing_git_repo
git remote add origin https://gitee.com/Xiyang7/ah-ah.git
git branch -M master
git push -u origin master
```

