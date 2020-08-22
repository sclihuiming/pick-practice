```js
function isPCBroswer() {  
  let e = window.navigator.userAgent.toLowerCase()  
    , t = "ipad" == e.match(/ipad/i)  
    , i = "iphone" == e.match(/iphone/i)  
    , r = "midp" == e.match(/midp/i)  
    , n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)  
    , a = "ucweb" == e.match(/ucweb/i)  
    , o = "android" == e.match(/android/i)  
    , s = "windows ce" == e.match(/windows ce/i)  
    , l = "windows mobile" == e.match(/windows mobile/i);
  return !(t || i || r || n || a || o || s || l)  
}
```