
# Node.js

## 内存调整

可以通过下列参数调整相关空间的默认大小，单位为 MB：

```text
--stack_size 调整栈空间
--min_semi_space_size 调整新生代半空间的初始值
--max_semi_space_size 调整新生代半空间的最大值
--max-new-space-size 调整新生代空间的最大值
--initial_old_space_size 调整老生代空间的初始值
--max-old-space-size 调整老生代空间的最大值
```
其中比较常用的是 --max_new_space_size 和 --max-old-space-size。