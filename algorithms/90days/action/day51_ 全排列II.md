
给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]

```golang
func permuteUnique(nums []int) [][]int {
    result := [][]int{}
    track := []int{}
    size := len(nums)
    used := make([]bool, size)
    sort.Ints(nums)
    var backtrack func()
    backtrack = func(){
        if len(track) == size{
            realTrack := make([]int, len(track))
            copy(realTrack, track)
            result = append(result, realTrack)
            return
        }
        for index := 0; index < size; index++{
            if used[index] == true || (index > 0 && used[index - 1] == false && nums[index] == nums[index-1]){
                continue
            }
            track = append(track, nums[index])
            used[index] = true
            backtrack()
            used[index] = false
            track = track[:len(track) - 1]
        }
    }
    backtrack()
    return result
}
```