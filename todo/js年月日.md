日期补 0

```js
var d = new Date();
var ye = d.getFullYear();
var mo = (d.getMonth()+1).toString().padStart(2,'0');
var da = d.getDate().toString().padStart(2,'0');
var time = ye+'-'+mo+'-'+da;
alert(time);
```

/ecology7/WebRoot/sunda/js/0631/hr.js