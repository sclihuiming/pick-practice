# Notes on the EVM

## 安装evm-tools

<!-- ---
**NOTE**
It works with almost all markdown flavours (the below blank line matters).

--- -->

> **_NOTE:_**   用此工具来调试bytecode

- [安装Golang](https://golang.org/doc/install)
- [设置`$GOPATH`系统环境变量](https://github.com/golang/go/wiki/SettingGOPATH)
- 将`$GOPATH/bin`也设置成环境变量
- [安装dep](https://github.com/golang/dep#installation)

执行下面的命令安装evm-tools

```shell
mkdir -p $GOPATH/src/github.com/CoinCulture
git clone https://github.com/CoinCulture/evm-tools $GOPATH/src/github.com/CoinCulture/evm-tools
cd $GOPATH/src/github.com/CoinCulture/evm-tools
dep ensure
make
```

这将安装 evm, disasm, evm-deploy 命令到你的 `$GOPATH/bin`

## 使用

```shell
# --debug标志在每个步骤为我们打印堆栈，内存和存储的当前状态，并向我们显示每个操作码和gas成本
evm --debug --code 6005600401
```

```shell
echo 60056004016000526001601ff3  | disasm
# 输出信息
60056004016000526001601ff3
0      PUSH1  => 05
2      PUSH1  => 04
4      ADD
5      PUSH1  => 00
7      MSTORE
8      PUSH1  => 01
10     PUSH1  => 1f
12     RETURN
```

## python

使用 `sha3` 和 `rlp`

> **_NOTE:_** `sha3`有2个不同的版本, Ethereum 使用的是 `Keccak` 版本:

```python
virtualenv evm-tools
source evm-tools/bin/activate
pip install pysha3==0.3 rlp==0.6.0
```

```python
$ python -c "import sha3; print sha3.sha3_256('').hexdigest()"
c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```

## 工具地址

[https://github.com/CoinCulture/evm-tools](https://github.com/CoinCulture/evm-tools)
