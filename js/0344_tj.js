jQuery(document).ready(function () {
    var indexnum0 = document.getElementById("indexnum0").value * 1.0;

    var _hzzrje = dt1_hzzrje;        //	坏账责任金额
    var _jthzbl = dt1_jthzbl;	    // 计提坏账比例(5%-20%)
    var _yjthzzrje = dt1_yjthzzrje;//应计提坏账责任金额

    var _workflowdate = f_workflowdate;//申请日期 
    _workflowdate = jQuery("#" + _workflowdate).val();
    var _workflowdate1 = _workflowdate.replace(/-/g, "/");

    var _dep = f_dep; //	部门
    var _depid = jQuery("#" + _dep).val();

    var _deptxt = jQuery("#" + _dep + "span").text();
    // var _deptxt = jQuery("#field24608span").text();

    for (var i = 0; i < indexnum0; i++) {
        //	坏账责任金额
        jQuery("#" + _hzzrje + "_" + i).bind("propertychange", function () {
            Commission(i);
        });
        // 计提坏账比例(5%-20%)
        jQuery("#" + _jthzbl + "_" + i).bind("propertychange", function () {
            Commission(i);
        });
    }

    jQuery("#indexnum0").bind("propertychange", function () {
        var i = parseFloat(this.value) - 1;

        //	坏账责任金额
        jQuery("#" + _hzzrje + "_" + i).bind("propertychange", function () {
            Commission(i);
        });
        // 计提坏账比例(5%-20%)
        jQuery("#" + _jthzbl + "_" + i).bind("propertychange", function () {
            Commission(i);
        });

    });
})