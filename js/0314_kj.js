jQuery(document).ready(function () {
    checkCustomize = function () {
        var _cause = f_cause;//	冲销原因
        var cause = jQuery("#" + _cause).find("option:selected").text();
        var _businesstype = f_businesstype;//	款项类型
        var businesstype = jQuery("#" + _businesstype).val();
        var flag=true;
        if (businesstype == "A" && cause == "") {
            alert("冲销原因必填");
            flag=false;
        }
        return flag;
    }
})