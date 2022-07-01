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

    jQuery("#sdAddMx").bind("click", function () {
        calSum(4);
        delmx0();
        setmx0();
    });

    
    function delmx0() {
        var s = document.getElementsByName("check_node_4");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            s[x].checked = "checked";
        }
        deleteRow4(4, true);
    }

    function setmx0() {
        // var s4 = document.getElementsByName("check_node_3");
        var indexnum3 = document.getElementById("indexnum3").value * 1.0;
        for (var x = 0; x < indexnum3; x++) {
            jQuery("button[name='addbutton4']").click();
            alert(x);

            var _fsrq = dt5_fsrq; //发生日期
            jQuery("#" + _fsrq + "_" + x).val(_workflowdate);
            jQuery("#" + _fsrq + "_" + x + "span").text(_workflowdate);

            var _fykmej = dt5_fykmej;	//二级科目
            jQuery("#" + _fykmej + "_" + x).val("36");
            jQuery("#" + _fykmej + "_" + x + "span").text("660110非薪酬奖金");

            var _fykmsj = dt5_fykmsj;  //	三级科目
            jQuery("#" + _fykmsj + "_" + x).val("36");
            jQuery("#" + _fykmsj + "_" + x + "span").text("660110非薪酬奖金");

            var _fyhsbm = dt5_fyhsbm;	//费用承担部门
            jQuery("#" + _fyhsbm + "_" + x).val(_depid);
            jQuery("#" + _fyhsbm + "_" + x + "span").text(_deptxt);

            var _ywbz = dt5_ywbz; //业务币种
            jQuery("#" + _ywbz + "_" + x).val("CNY");
            jQuery("#" + _ywbz + "_" + x + "span").text("CNY");

            var _cfje = dt4_cfje;	//处罚金额
            _cfje = jQuery("#" + _cfje + "_" + x).val() * 1.0;
            _cfje = -_cfje;

            var _je = dt5_je;//	金额
            jQuery("#" + _je + "_" + x).val(_cfje);
            // jQuery("#" + _je + "_" + x + "span").text(_cfje);

            var _xm = dt4_xm; //姓名
            var t4_xm = jQuery("#" + _xm + "_" + x).val();
            var t4_xmtxt = jQuery("#" + _xm + "_" + x + "span").text();

            var _gh = dt4_gh; //工号
            jobno = jQuery("#" + _gh + "_" + x + "span").text();
            // alert(jobno);

            var _jzrq = dt4_jzrq;//	截止日期	
            _jzrq = jQuery("#" + _jzrq + "_" + x + "span").text();
            // alert(_jzrq);

            var _xm5 = dt5_xm; //姓名
            jQuery("#" + _xm5 + "_" + x).val(t4_xm);
            jQuery("#" + _xm5 + "_" + x + "span").text(t4_xmtxt);

            var _gh5 = dt5_gh; //工号
            jQuery("#" + _gh5 + "_" + x).val(jobno);
            // jQuery("#" + _gh5 + "_" + x + "span").text(_gh);

            var _jzrq5 = dt5_jzrq;//	截止日期	
            jQuery("#" + _jzrq5 + "_" + x).val(_jzrq);
            jQuery("#" + _jzrq5 + "_" + x + "span").text(_jzrq);

            var txt = "";
            var _sqlx = f_sqlx;	//申请类型  0 超限额坏账责任 1 逾期应收罚息
            var _sqlxvalue = jQuery("#" + _sqlx).val();
            // var _sqlxtxt = jQuery("#field24681").val();
            var _sqlxtxt = jQuery("#" + _sqlx).find("option:selected").text();

            // alert(_sqlxtxt);
            var _ssnd = f_ssnd;             //所属年度
            var _ssyf = f_ssyf;             //所属月份  
            _ssnd = jQuery("#" + _ssnd).val();
            _ssyf = jQuery("#" + _ssyf).val();

            var _xszy = f_xszy; //销售专员
            _xszy = jQuery("#" + _xszy + "span").text();

            // alert(_xszy);
            if (_sqlxvalue == 0) {
                txt = _xszy + "代" + t4_xmtxt + "报" + _jzrq + _sqlxtxt;
            } else if (_sqlxvalue == 1) {
                txt = _xszy + "代" + t4_xmtxt + "报" + _ssnd + "年" + _ssyf + "月" + _sqlxtxt;
            }
            var _zy = dt5_zy;//	摘要
            jQuery("#" + _zy + "_" + x).val(txt);
            // jQuery("#" + _zy + "_" + x + "span").text(txt);


        }
    }


    function Commission(i) {
        tmp_hzzrje = jQuery("#" + _hzzrje + "_" + i).val();
        tmp_jthzbl = jQuery("#" + _jthzbl + "_" + i).find("option:selected").text();
        var tmpamout = tmp_hzzrje * toPoint(tmp_jthzbl);
        jQuery("#" + _yjthzzrje + "_" + i).val(tmpamout); //应计提坏账责任金额
    }
    function toPoint(percent) {
        var str = percent.replace("%", "");
        str = str / 100;
        return str;
    }

    checkCustomize = function () {
        return check();
    }

    function check() {
        var _ssnd = f_ssnd;             //所属年度
        var _ssyf = f_ssyf;             //所属月份  
        _ssnd = jQuery("#" + _ssnd).val();
        _ssyf = jQuery("#" + _ssyf).val();
        var date1 = new Date(_workflowdate1);
        var year = date1.getFullYear();
        var month = date1.getMonth() + 1;

        var flag = true;
        if (_ssnd > year || _ssyf > month) {
            flag = false;
            alert("【所属年份】与【月份】不能大于【申请日期】对应的年月!!!");
        }
        return flag;
    }
})