给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

 



图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

 

示例：

输入：[1,8,6,2,5,4,8,3,7]
输出：49

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```go
func maxArea(height []int) int {
    pre, last := 0, len(height) - 1
    maxArea := 0
    for pre <= last{
        h := height[pre]
        width := last - pre
        if height[last] < h{
            h = height[last]
            last = last - 1
        } else {
            pre = pre + 1
        }
        tempArea := width * h
        if tempArea > maxArea{
            maxArea = tempArea
        }
    }
    return maxArea
}
```

```js
/**
 * @param {number[]} height
 * @return {number}
 */
let maxArea = function(height) {
    // let length = height.length;
    // let area = 0;
    // for(let i = 0;i<length-1;i++){
    //     for(let j=i+1;j<length;j++){
    //         let hh = Math.min(height[i],height[j]);
    //         area = Math.max(area, hh*(j-i));
    //     }
    // }
    // return area;
    
     let area = 0, l = 0, r= height.length-1;
    while (l<r){
        area = Math.max(area,Math.min(height[l],height[r])*(r-l));
        if(height[l]<height[r]){
            l++;
        }else{
            r--;
        }
    }
    return area;
};
```