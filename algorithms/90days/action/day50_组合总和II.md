给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func combinationSum2(candidates []int, target int) [][]int {
    result := [][]int{}
    track := []int{}
    size := len(candidates)
    sort.Ints(candidates)
    var backtrack func( calTarget int, start int)
    backtrack = func(calTarget int, start int){
        if calTarget == 0{
            realTrack := make([]int, len(track))
            copy(realTrack, track)
            result = append(result, realTrack)
            return
        } else if calTarget < 0{
            return
        }
        for index := start; index < size; index++{
            if index > start && candidates[index] == candidates[index - 1]{
                continue
            }
            track = append(track, candidates[index])
            backtrack(calTarget - candidates[index], index + 1)
            track = track[:len(track) - 1]
        }
    }
    backtrack(target, 0)
    return result
}
```



