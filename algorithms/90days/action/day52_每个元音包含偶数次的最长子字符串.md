给你一个字符串 s ，请你返回满足以下条件的最长子字符串的长度：每个元音字母，即 'a'，'e'，'i'，'o'，'u' ，在子字符串中都恰好出现了偶数次。

 

示例 1：

输入：s = "eleetminicoworoep"
输出：13
解释：最长子字符串是 "leetminicowor" ，它包含 e，i，o 各 2 个，以及 0 个 a，u 。
示例 2：

输入：s = "leetcodeisgreat"
输出：5
解释：最长子字符串是 "leetc" ，其中包含 2 个 e 。
示例 3：

输入：s = "bcbcbc"
输出：6
解释：这个示例中，字符串 "bcbcbc" 本身就是最长的，因为所有的元音 a，e，i，o，u 都出现了 0 次。
 

提示：

1 <= s.length <= 5 x 10^5
s 只包含小写英文字母。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```golang
func findTheLongestSubstring(s string) int {
    // 暴力法
    // originalSound := []string{"a" , "e" , "i" , "o", "u"}
    // for i := len(s) ; i > 0; i-- {
    //     for j := 0; j < len(s) - i + 1; j++{
    //         str := s[j:j + i]
    //         has_odd_word := false
    //         for _, v := range originalSound{
    //             count := 0
    //             for _, value := range str{
    //                 if v == string(value) {
    //                     count++
    //                 }
    //             }
    //             if count % 2 != 0{
    //                 has_odd_word = true
    //                 break
    //             }
    //         }
    //         if !has_odd_word{
    //             return i 
    //         }
    //     }
    // }
    // return 0

    //前缀和-状态压缩
    ans, status := 0, 0
    pos := make([]int, 32)
    for i := 0; i < len(pos); i++{
        pos[i] = -1
    }
    pos[0] = 0
    for i := 0; i < len(s); i++{
        switch s[i]{
            case 'a':
                status ^= 1 << 0
            case 'e':
                status ^= 1 << 1
            case 'i':
                status ^= 1 << 2
            case 'o':
                status ^= 1 << 3
            case 'u':
                status ^= 1 << 4
        }
        if pos[status] >= 0 {
            ans = Max(ans, i + 1 - pos[status])
        } else {
            pos[status] = i + 1
        }
    }
    return ans
}

func Max(x, y int) int {
    if x > y {
        return x
    }
    return y
}
```



