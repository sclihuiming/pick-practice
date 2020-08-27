# 935. 骑士拨号器

国际象棋中的骑士可以按下图所示进行移动：

[![image](https://user-images.githubusercontent.com/12479470/91164419-8fb1d000-e701-11ea-9c49-c0254e9f2c92.png)](https://user-images.githubusercontent.com/12479470/91164419-8fb1d000-e701-11ea-9c49-c0254e9f2c92.png)

[![image](https://user-images.githubusercontent.com/12479470/91164392-87599500-e701-11ea-950c-667affdaf74f.png)](https://user-images.githubusercontent.com/12479470/91164392-87599500-e701-11ea-950c-667affdaf74f.png)

这一次，我们将 “骑士” 放在电话拨号盘的任意数字键（如上图所示）上，接下来，骑士将会跳 N-1 步。每一步必须是从一个数字键跳到另一个数字键。

每当它落在一个键上（包括骑士的初始位置），都会拨出键所对应的数字，总共按下 N 位数字。

你能用这种方式拨出多少个不同的号码？

因为答案可能很大，所以输出答案模 10^9 + 7。

示例 1：

```text
输入：1
输出：10
```

示例 2：

```text
输入：2
输出：20
```

示例 3：

```text
输入：3
输出：46
```

提示：

- 1 <= N <= 5000

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/knight-dialer>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
