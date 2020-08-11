# 76. 最小覆盖子串

给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。

示例：

```text
输入：S = "ADOBECODEBANC", T = "ABC"
输出："BANC"
```

提示：

* 如果 S 中不存这样的子串，则返回空字符串 ""。
* 如果 S 中存在这样的子串，我们保证它是唯一的答案。

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/minimum-window-substring>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func minWindow(s string, t string) string {
    sSize := len(s)
    tSize := len(t)
    if sSize < tSize{
        return ""
    }
    start, end := 0, 0
    mapS, mapT := map[int]int{}, map[int]int{}
    for _, value := range t{
        mapT[int(value)] += 1
    }
    count, targetCount := 0, len(mapT)
    result := ""
    for end < sSize{
        charCode := int(s[end])
        if _, ok := mapT[charCode]; ok{
            mapS[charCode] += 1
            if mapS[charCode] == mapT[charCode]{
                count++
            }
        }
        for count == targetCount{
            newLen := end - start + 1
            if result == "" || newLen < len(result){
                result = s[start: end + 1]
            }
            char := int(s[start])
            if _, ok := mapS[char]; ok{
                mapS[char] -= 1
                if mapS[char] == (mapT[char] - 1){
                    count--
                }
            }
            start++
        }
        end++
    }
    return result
}
```
