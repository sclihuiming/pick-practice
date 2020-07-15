1. 网易面试题

```
有一个班级有 n 个人，给出 n 个元素，第 i 个元素代表 第 i 位同学的考试成绩，接下进行 m 次询问，每次询问给出一个数值 t ，表示第 t 个同学，然后需要我们输出第 t 个同学的成绩超过班级百分之几的人，百分数 p 可以这样算：p = (不超过第 t 个同学分数的人数 ) / n * 100%。输出的时候保留到小数点后 6 位，并且需要四舍五入。

输入描述：第一行输入两个数 n 和 m，两个数以空格隔开，表示 n 个同学和 m 次询问。第二行输入 n 个数值 ni，表示每个同学的分数，第三行输入 m 个数值mi，表示每次询问是询问第几个同学。（注意，这里 2<=n，m<=100000，0<=ni<=150，1<=mi<=n）

输出描述：输出 m 行，每一行输出一个百分数 p，代表超过班级百分之几的人。

示例1：

输入 ：

3 2

50 60 70

1 2

输出

33.333333%

66.666667%
```

1. [1371. 每个元音包含偶数次的最长子字符串](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/)
2. [560. 和为K的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

其他：

- 308
- 525
- 1139
- 1176
- 1182
- 1277
- 1292
- 1314
- 1504


## 网易面试题
```golang
func find(scores []int, peeks []int)[] string{
    prefixSum := make([]int, 151)
    result := make([]string, len(peeks))

    for index := 0; index < len(scores); index++{
        prefixSum[scores[index]] = prefixSum[scores[index]] + 1
    }

    for index := 1; index < len(prefixSum); index++{
        prefixSum[index] += prefixSum[index - 1]
    }

    total := len(scores)

    for _, val := range peeks{
        lowCount := prefixSum[scores[val - 1]]
        result = append(result, fmt.Sprintf("%.6f%", lowCount / total * 100))
    }
    return result
    
}

```

## 2
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
时间复杂度O(n)
空间复杂度O(s) 其中s = 2 ^ 字符个数
## 3

```golang
func subarraySum(nums []int, k int) int {
    mapper := make(map[int]int)
    mapper[0] = 1
    sum, count := 0, 0
    for _, num := range nums{
        sum += num
        if _, ok := mapper[sum - k]; ok{
            count += mapper[sum - k]
        }
        mapper[sum] = mapper[sum] + 1
    }
    return count
}
```
时间复杂度O(n)
空间复杂度O(n)