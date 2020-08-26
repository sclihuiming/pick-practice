# 配置笔记

```json
{
  "name": "调试 Node.js 程序",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/src/index.js",
//   "runtimeExecutable": "node",
}
```

- `type`，必填项，调试类型，当前为 node，如果是 PHP 调试，则在安装 PHP 调试插件后写 php；
- `request`，必填项，有两种类型，分别是 `launch` 和 `attach`，前者的意思就是 VSCode 会打开这个程序然后进入调试，后者的意思是你已经打开了程序，然后接通 Node.js 的内部调试协议进行调试；
- `program`，程序的启动入口；
- `runtimeExecutable`使用什么命令启动.比如 node2, ts-node等

## ts-node 配置

```json
{
  "name": "调试 TS Node 程序 - args",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "node",
  "runtimeArgs": [
    "-r",
    "ts-node/register"
  ],
  "args": [
    "${workspaceFolder}/src/index.ts"
  ]
}
```

- `runtimeArgs` 是为 `runtimeExecutable` 环境提供的配置，而 args 是为程序提供的配置。这个 JSON 的意思是：通过 node 来启动 `/src/index.ts`，在启动时为 node 注入一个 `ts-node/register` 模块，以便可以执行 ts 类型的文件。实际执行代码为：

    ```shell
    node --inspect-brk=DEBUG_PORT -r ts-node/register ./src/index.ts
    ```

## 调试已启动的 Node.js 程序

```json
{
  "name": "Attach to node",
  "type": "node",
  "request": "attach",
  "processId": "${command:PickProcess}"
}
```

推荐使用 `${command:PickProcess}` 作为 `processId` 的值，因为 VSCode 会遍历所有的 Node PID 列出来让你选择

## 调试网页js代码

VSCode 允许你在安装了 `Debugger for Chrome` 插件后，直接在 VSCode 调试 JS 代码，让你的代码和调试融为一体，提升开发体验

```json
{
  "name": "调试网页的 JS 文件",
  "request": "launch",
  "type": "chrome",
  "file": "${workspaceFolder}/index.html"
}
```

注意，这里的 type 是 `chrome`，默认会启动一个 Chrome 浏览器（新用户）加载 `file` 字段对应的文件地址（通过 `file://` 协议加载），文件中用到的 JS 都可以断点调试

[vscode debugger官方文档](https://code.visualstudio.com/Docs/editor/debugging#_launchjson-attributes)
