# 30. 串联所有单词的子串

给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

示例 1：

```text
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
```

示例 2：

```text
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func findSubstring(s string, words []string) []int {
    sSize := len(s)
    count := len(words) //单词个数
    res := []int{}
    if count == 0{
        return res
    }
    wordLen := len(words[0])
    wordDict := map[string]int{}
    for _, word := range words{
        wordDict[word] += 1
    }

    // 循环的范围是 0 - sSize - wordLen * count + 1
    for index := 0; index < sSize - wordLen * count + 1; index++{
        tmpLen := index + wordLen * count
        // 截取和words相同大小的字符串
        cur := s[index: tmpLen]
        matchDict := map[string]int{}
        j := 0
        for ; j < tmpLen - index; j += wordLen{
            // 按照单词长度进行拆分
            word := cur[j: j+wordLen]
            // 如果不存在于words中，那么剪枝
            if _, ok := wordDict[word]; !ok{
                break
            }
            // 给相应的字典 +1
            matchDict[word] += 1

            // 如果 word  > words中的相关单词数量，那么剪枝
            if matchDict[word] > wordDict[word]{
                break
            }
        }
        //如果数量 words的单词数量，存入数组
        if j == tmpLen - index{
            res = append(res, index)
        }
    }
    return res
}

```
