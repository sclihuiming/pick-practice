# 438. 找到字符串中所有字母异位词

给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
示例 1:

```text
输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
```

 示例 2:

```text
输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/find-all-anagrams-in-a-string>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func findAnagrams(s string, p string) []int {
    sSize := len(s)
    pSize := len(p)
    res := []int{}
    if sSize < pSize{
        return res
    }

    countP, countS := make([]int, 26), make([]int, 26)
    // 初始化countP countS
    for index, value := range p{
        countP[value - 97] += 1
        countS[s[index] - 97] += 1
    }

    if isSame(countP, countS){
        res = append(res, 0)
    }
    left, right := 0, pSize - 1
    for right < sSize - 1{
        countS[s[left] - 97] -= 1
        left++
        right++
        countS[s[right] - 97] += 1
        if isSame(countP, countS){
            res = append(res, left)
        }
    }
    return res
}

func isSame(a, b []int) bool{
    for index, value := range a{
        if value != b[index]{
            return false
        }
    }
    return true
}
```
