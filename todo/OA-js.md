###### 1.部门跟随变化

```js
jQuery(document).ready(function () {
    function setbm() {
        var indexnum = document.getElementById("indexnum0").value * 1.0;
        //alert(indexnum);
        var bz = jQuery("#field11469span").text();
        //alert(bz);
        for (var i = 0; i < indexnum; i++) {
            //alert(2);
            jQuery("#field11509_" + i).val(bz);
            jQuery("#field11509_" + i + "span").text(bz);
        }
    }
    jQuery("#field11469span").bind("propertychange", function () {
        setbm();
    });
    jQuery("#indexnum0").bind("propertychange", function () {
        setbm();
    });
});
```

2.明细行数, 在编辑里面查看是哪一个对应的

3.设置只读

```js
$("#btn_change_datasource").attr('disabled',false);//设置disabled属性为false，按钮可用
$("#btn_change_datasource").attr('disabled',true);//设置disabled属性为true，按钮不可用 
$('#btn_change_datasource‘).removeattr("disabled"); //移除disabled属性

```





DJJBNE$)#990
