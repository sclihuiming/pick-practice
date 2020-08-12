# 78. 子集

给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

```text
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/subsets>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func subsets(nums []int) [][]int {
    result := make([][]int, 0)
    var generate2 func(pos int, size int, item []int)
    generate2 = func(pos int, size int, item []int) {
        if len(item) == size {
            tmp := make([]int, len(item))
            copy(tmp, item)
            result = append(result, tmp)
            return
        }
        for i := pos; i < len(nums); i++ {
            item = append(item, nums[i])
            generate2(i+1, size, item)
            item = item[:len(item)-1]
        }
    }

    for i := 0; i <= len(nums); i++ {
        item := make([]int, 0, i)
        generate2(0, i, item)
    }
    return result
}
```
