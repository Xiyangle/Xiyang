### 更改root模式登录命令

````shell
1、sudo -i
2、vi /root/.ssh/authorized_keys
3、把ssh-rsa之前的内容都删除掉.
4、vi /etc/ssh/sshd_config
5、找到PermitRootLogin, 把前面的#去掉
   更改为PermitRootLogin yes
6、找到PasswordAuthentication
  更改为PasswordAuthentication yes
  退出编辑
7、passwd  更改密码
8、reboot   重启vps
````

### 所用到的命令

```shell
vi   文本编辑器
cd   进入目录
pwd  查看当前位置
ls      查看当前文件夹文件
ls -a   查看当前文件夹所有文件
vi 编辑器命令
i   进入编辑模式
esc  回到命令模式
:wq  保存并退出
```

### 注意Ubuntu系统下：

###### 开放所有端口

```shell
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
iptables -F
```

###### Ubuntu镜像默认设置了Iptable规则，关闭它

```shell
apt-get purge netfilter-persistent
reboot
或者强制删除
rm -rf /etc/iptables && reboot
```

###### 启用ubuntu自带bbr：      

```shell
sudo bash -c 'echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf'
sudo bash -c 'echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf'
sysctl -p
```

###### 查看bbr是否开启成功

```shell
lsmod | grep bbr
```

###### CentOs关闭防火墙

```shell
systemctl stop firewalld.service
systemctl disable firewalld.service
```

