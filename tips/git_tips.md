# git 操作

查看git 配置信息

```shell

```

github多账号如何切换？

```text
mac os。原因是即便更新了username和email，mac在git push时还是会使用历史账号的密码。
解决方法如下：
1.进入Keychain Access (不知道在哪儿的可以command+space查找)
2.在搜索框输入'git'进行查找，将找到的文件删掉，这里保存了历史账号的信息
3.删除之后重新用git config --global更新username和email即可，之后git push会要求你输入username和password
4.done!
```
