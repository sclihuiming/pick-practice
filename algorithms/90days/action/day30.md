有个内含单词的超大文本文件，给定任意两个单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗?

示例：

输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
输出：1
提示：

words.length <= 100000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-closest-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```golang
func findClosest(words []string, word1 string, word2 string) int {
    len1, len2 := -1, -1
    ans := len(words)
    for index, value := range words{
        if word1 == value{
            len1 = index
        }
        if word2 == value{
            len2 = index
        }
        if len1 > -1 && len2 > -1{
            dis := len1 - len2
            if dis < 0{
                dis = len2 - len1
            }
            if dis < ans{
                ans = dis
            }
        }
    }
    return ans
}
```