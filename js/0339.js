jQuery(document).ready(function () {
    var _sdzjm= f_sdzjm;
    var _sdzjks=f_sdzjks;
    jQuery("#_sdzjm").bind("propertychange", function (){
        //alert(jQuery(this).val());
        var Depreciationcode = jQuery(this).val();//折旧码
        if (Depreciationcode=='Z003') {
            //alert(1);
            jQuery("#"+_sdzjks).val(""); //普通折旧开始日期
            jQuery("#"+_sdzjks+span).text("");//普通折旧开始日期
            jQuery("#"+_sdzjks+span).prev().attr("disabled", "disabled"); //设置只读
        }else{
            jQuery("#"+_sdzjks+span).prev().attr('disabled',false);
        }
    })
})