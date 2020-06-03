给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:

输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
进阶：

一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
你能想出一个仅使用常数空间的一趟扫描算法吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```typescript
var sortColors = function(nums: number[]): void {
    let pre:number = 0;
    let cur:number = 0;
    let last:number = nums.length - 1;

    while(cur <= last){
        if(nums[cur] === 0){
            [nums[pre++], nums[cur++]] = [nums[cur], nums[pre]];
        }else if(nums[cur] === 2){
            [nums[cur], nums[last--]] = [nums[last], nums[cur]]
        }else{
            cur++;
        }
    }
};
```
#### 解题思路

3个指针,前置指针与当前指针默认是数组第一个,后置指针默认书组最后一个.

判断当前指针的值:
  === 0, 就将当前指针和前置指针的值交换,并且2个指针都向后移动一位.
  === 2, 将当前指针和后置指针的值交换,并且后置指针向前移动,前置指针不作移动的步骤
  === 1, 这个就直接将当前指针向后移动一位,不作值交换

