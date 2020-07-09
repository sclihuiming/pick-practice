给定一个整数数组，你需要寻找一个连续的子数组，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

你找到的子数组应是最短的，请输出它的长度。

示例 1:

输入: [2, 6, 4, 8, 10, 9, 15]
输出: 5
解释: 你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
说明 :

输入的数组长度范围在 [1, 10,000]。
输入的数组可能包含重复元素 ，所以升序的意思是<=。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```golang
func findUnsortedSubarray(nums []int) int {
    pre, last := 0, len(nums) - 1
    // 找出左右边界
    for pre<len(nums)-1{
        if nums[pre] > nums[pre + 1]{
            break
        }
        pre++
    }

    for last > 0{
        if nums[last] < nums[last-1]{
            break
        }
        last--
    }

    if pre >= last {
        return 0
    }
    // 获取左右边界的最值
    leftMin, rightMax := nums[pre], nums[last]
    for k := pre; k<= last;k++{
        if nums[k] < leftMin{
            leftMin = nums[k]
        }
        if nums[k] > rightMax{
            rightMax = nums[k]
        }
    }
    // 计算真正的区间
    pre, last = 0, len(nums) - 1
    for pre < last && nums[pre] <= leftMin{
        pre++;
    }

    for pre < last && nums[last] >= rightMax{
        last--
    }
    if(last == pre){
        return 0
    }
    return last - pre + 1
}
```
