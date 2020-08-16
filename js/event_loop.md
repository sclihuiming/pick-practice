# event_loop

讨论地址 : [https://cnodejs.org/topic/57d68794cb6f605d360105bf](https://cnodejs.org/topic/57d68794cb6f605d360105bf)

```c++
//deps/uv/src/unix/core.c
int uv_run(uv_loop_t *loop, uv_run_mode mode) {
    int timeout;
    int r;
    int ran_pending;
    //uv__loop_alive返回的是event loop中是否还有待处理的handle或者request
    //以及closing_handles是否为NULL,如果均没有,则返回0
    r = uv__loop_alive(loop);
    //更新当前event loop的时间戳,单位是ms
    if (!r)
        uv__update_time(loop);
    while (r != 0 && loop->stop_flag == 0) {
        //使用Linux下的高精度Timer hrtime更新loop->time,即event loop的时间戳
        uv__update_time(loop);
        //执行判断当前loop->time下有无到期的Timer,显然在同一个loop里面timer拥有最高的优先级
        uv__run_timers(loop);
        //判断当前的pending_queue是否有事件待处理,并且一次将&loop->pending_queue中的uv__io_t对应的cb全部拿出来执行
        ran_pending = uv__run_pending(loop);
        //实现在loop-watcher.c文件中,一次将&loop->idle_handles中的idle_cd全部执行完毕(如果存在的话)
        uv__run_idle(loop);
        //实现在loop-watcher.c文件中,一次将&loop->prepare_handles中的prepare_cb全部执行完毕(如果存在的话)
        uv__run_prepare(loop);

        timeout = 0;
        //如果是UV_RUN_ONCE的模式,并且pending_queue队列为空,或者采用UV_RUN_DEFAULT(在一个loop中处理所有事件),则将timeout参数置为
        //最近的一个定时器的超时时间,防止在uv_io_poll中阻塞住无法进入超时的timer中
        if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
            timeout = uv_backend_timeout(loop);
        //进入I/O处理的函数(重点分析的部分),此处挂载timeout是为了防止在uv_io_poll中陷入阻塞无法执行timers;并且对于mode为
        //UV_RUN_NOWAIT类型的uv_run执行,timeout为0可以保证其立即跳出uv__io_poll,达到了非阻塞调用的效果
        uv__io_poll(loop, timeout);
        //实现在loop-watcher.c文件中,一次将&loop->check_handles中的check_cb全部执行完毕(如果存在的话)
        uv__run_check(loop);
        //执行结束时的资源释放,loop->closing_handles指针指向NULL
        uv__run_closing_handles(loop);

        if (mode == UV_RUN_ONCE) {
            //如果是UV_RUN_ONCE模式,继续更新当前event loop的时间戳
            uv__update_time(loop);
            //执行timers,判断是否有已经到期的timer
            uv__run_timers(loop);
        }
        r = uv__loop_alive(loop);
        //在UV_RUN_ONCE和UV_RUN_NOWAIT模式中,跳出当前的循环
        if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
            break;
        }

    //标记当前的stop_flag为0,表示当前的loop执行完毕
    if (loop->stop_flag != 0)
        loop->stop_flag = 0;
    //返回r的值
    return r;
}
```
