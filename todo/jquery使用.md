1.checkbox是否选中显示隐藏表单内容

```stylus
.class 选择器
#id 选择器
```



```css
    <style type="text/css">
        .as {
            display: none;
        }
        .tbox{
            display: none;
        }
        .tbox1{
            display: none;
        }
    </style>
```



```js
    jQuery(document).ready(function () {
        jQuery('#field23839').click(function () {
            if (jQuery(".tbox").css('display') == 'none') {
                // tbox部分先设置不显示
                // jQuery(".tbox2").css("display", "block");
                jQuery(".tbox").show();
            } else {
                //jQuery(".tbox2").css("display", "none");
                jQuery(".tbox").hide();
            }
        })

    }); 
    jQuery(document).ready(function () {
        jQuery('#field22373').change(function(){
            //检测到事件变化, 例如选择内容变了
            alert(jQuery(this).val());
            if(jQuery(this).val()=="2"){
                //记得使用F12查看内容,以最终页面显示为准,源代码会有解析的情况解析
                jQuery(".tbox1").show();
            }
            else{
                jQuery(".tbox1").hide();
            }
        })
    }); 
```

