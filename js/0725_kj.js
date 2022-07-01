jQuery(document).ready(function () {
    jQuery("#field23810").bind("propertychange", function (){
        //alert(jQuery(this).val());
        var Depreciationcode = jQuery(this).val();//折旧码
        if (Depreciationcode=='Z003') {
            //alert(1);
            jQuery("#field23766").val(""); //普通折旧开始日期
            jQuery("#field23766span").text("");//普通折旧开始日期
            jQuery("#field23766span").prev().attr("disabled", "disabled"); //设置只读
        }else{
            jQuery("#field23766span").prev().attr('disabled',false);
        }
    })
})