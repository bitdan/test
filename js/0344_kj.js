jQuery(document).ready(function () {

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }
    var _zy = dt5_zy;//	摘要
    _zytxt = jQuery("#" + _zy + "_" + 0).val();

    var _workflowdate = f_workflowdate;//申请日期 
    var workflowdate = jQuery("#" + _workflowdate).val();

    jQuery("button[name='addbutton1']").bind("click", function () {
        var indexnum1 = 0;
        if (document.getElementById("indexnum1")) {
            indexnum1 = document.getElementById("indexnum1").value * 1.0 - 1;
        }
        //alert(indexnum1 + "借方");
        setjf(indexnum1);
    });


    jQuery("button[name='addbutton2']").bind("click", function () {
        var indexnum2 = 0;
        if (document.getElementById("indexnum2")) {
            indexnum2 = document.getElementById("indexnum2").value * 1.0 - 1;
        }
        //alert(indexnum2 + "贷方方");
        setdf(indexnum2);
    });

    if (spantxt) { //申请或编辑状态
        setpztt();
        var bt_add = parseFloat(jQuery("#indexnum4").val());
        var hsbt = parseFloat(jQuery("#indexnum1").val());
        var df = parseFloat(jQuery("#indexnum2").val());

        if (hsbt < bt_add) {
            for (var i = 0; i < bt_add; i++) {

                // setTimeout(function () {
                //     jQuery("button[name='addbutton1']").click();
                // }, 900);
                jQuery("button[name='addbutton1']").click();
            }
        }

        if (df < bt_add) {
            for (var i = 0; i < bt_add; i++) {
                // setTimeout(function () {
                //     jQuery("button[name='addbutton2']").click();
                // }, 1000);
                jQuery("button[name='addbutton2']").click();
            }
        }
    }

    function setpztt() {
        // var no = jQuery("#field24604span").text();
        // jQuery("#field24629").val(no); //会计-参照
        // var _sqlxtxt = jQuery("#disfield24681").find("option:selected").text();
        // jQuery("#field24627").val(_sqlxtxt); //会计-凭证抬头文本
        var _bianhao = f_bianhao;//	编号
        var no = jQuery("#" + _bianhao + "span").text();
        var _cz = f_cz;	//	会计-参照
        jQuery("#" + _cz).val(no); //会计-参照
        var _sqlx = f_sqlx;//	申请类型
        var _sqlxtxt = jQuery("#dis" + _sqlx).find("option:selected").text();
        var _pzwb = f_pzwb;	//会计-凭证抬头文本
        jQuery("#" + _pzwb).val(_sqlxtxt); //会计-凭证抬头文本

    }





    function setjf(xuh) {

        var _je = dt5_je;//	金额
        _jemoney = jQuery("#" + _je + "_" + xuh).val();


        // jQuery("#field24642_" + xuh).val("50"); //记账码
        // jQuery("#field24642_" + xuh + "span").text("50");

        // jQuery("#field24643_" + xuh).val(_zytxt); //文本
        // jQuery("#field24643_" + xuh + "span").text("");

        // jQuery("#field24644_" + xuh).val("6601100000");
        // jQuery("#field24644_" + xuh + "span").text("6601100000");
        // jQuery("#field24645_" + xuh).val("营业费用_非薪酬奖金");


        // jQuery("#field24647_" + xuh).val(Math.abs(_jemoney)); //金额
        // jQuery("#field24647_" + xuh + "span").text("");

        // var fenxian = jQuery("#disfield24682").find("option:selected").text();//fenxian

        var _jfjzm = dt2_jfjzm;//	借方记账码

        jQuery("#" + _jfjzm + "_" + xuh).val("50"); //记账码
        jQuery("#" + _jfjzm + "_" + xuh + "span").text("50");

        var _jftxt = dt2_jftxt;//	借方文本
        jQuery("#" + _jftxt + "_" + xuh).val(_zytxt); //记账码
        jQuery("#" + _jftxt + "_" + xuh + "span").text("");

        var _jfkm = dt2_jfkm;//	借方科目编号
        jQuery("#" + _jfkm + "_" + xuh).val("6601100000");
        jQuery("#" + _jfkm + "_" + xuh + "span").text("6601100000");

        var _jfkmmc = dt2_jfkmmc;//	借方科目名称
        jQuery("#" + _jfkmmc + "_" + xuh).val("营业费用_非薪酬奖金");
        jQuery("#" + _jfkmmc + "_" + xuh + "span").text("");

        var _jfje = dt2_jfje;//	借方金额
        jQuery("#" + _jfje + "_" + xuh).val(Math.abs(_jemoney)); //金额
        jQuery("#" + _jfje + "_" + xuh + "span").text("");

        var _fenxian = f_fenxian;//	分线
        var fenxian = jQuery("#dis" + _fenxian).find("option:selected").text();//fenxian

        var _cbzx = dt2_cbzx;    //	成本中心编号
        var _cbzxmc = dt2_cbzxmc;  //	成本中心名称
        if (fenxian.indexOf("建材") >= 0) {
            // jQuery("#field24648_" + xuh).val("CN0101262"); //成本中心编号
            // jQuery("#field24648_" + xuh + "span").text("CN0101262");

            // jQuery("#field24649_" + xuh).val("建材销售管理部"); //成本中心编号
            // jQuery("#field24649_" + xuh + "span").text("");


            jQuery("#" + _cbzx + "_" + xuh).val("CN0101262");  //	成本中心编号
            jQuery("#" + _cbzx + "_" + xuh + "span").text("CN0101262");


            jQuery("#" + _cbzxmc + "_" + xuh).val("建材销售管理部");  //	成本中心名称
            jQuery("#" + _cbzxmc + "_" + xuh + "span").text("");

        } else if (fenxian.indexOf("快消") >= 0) {
            // jQuery("#field24648_" + xuh).val("CN0102272"); //成本中心编号
            // jQuery("#field24648_" + xuh + "span").text("CN0102272");

            // jQuery("#field24649_" + xuh).val("快消销售管理部"); //成本中心编号
            // jQuery("#field24649_" + xuh + "span").text("");

            jQuery("#" + _cbzx + "_" + xuh).val("CN0102272");  //	成本中心编号
            jQuery("#" + _cbzx + "_" + xuh + "span").text("CN0102272");

            jQuery("#" + _cbzxmc + "_" + xuh).val("快消销售管理部");  //	成本中心名称
            jQuery("#" + _cbzxmc + "_" + xuh + "span").text("");
        } else if (fenxian.indexOf("五金") >= 0) {
            // jQuery("#field24648_" + xuh).val("CN0103282"); //成本中心编号
            // jQuery("#field24648_" + xuh + "span").text("CN0103282");

            // jQuery("#field24649_" + xuh).val("五金销售管理部"); //成本中心编号
            // jQuery("#field24649_" + xuh + "span").text("");

            jQuery("#" + _cbzx + "_" + xuh).val("CN0103282");  //	成本中心编号
            jQuery("#" + _cbzx + "_" + xuh + "span").text("CN0103282");

            jQuery("#" + _cbzxmc + "_" + xuh).val("五金销售管理部");  //	成本中心名称
            jQuery("#" + _cbzxmc + "_" + xuh + "span").text("");

        }
    }

    function setdf(xuh) {

        var _je = dt5_je;//	金额
        _jemoney = jQuery("#" + _je + "_" + xuh).val();

        // jQuery("#field24656_" + xuh).val("50"); //记账码
        // jQuery("#field24656_" + xuh + "span").text("50");

        // jQuery("#field24657_" + xuh).val(_zytxt); //文本
        // jQuery("#field24657_" + xuh + "span").text("");
        // var jobno = jQuery("#field24715_" + xuh).val();//工号

        // jQuery("#field24658_" + xuh).val(jobno);
        // jQuery("#field24658_" + xuh + "span").text(jobno);

        // jQuery("#field24659_" + xuh).val(t4_xmtxt);
        // jQuery("#field24659_" + xuh + "span").text("");

        // jQuery("#field24660_" + xuh).val(Math.abs(_jemoney)); //金额
        // jQuery("#field24660_" + xuh + "span").text("");

        // jQuery("#field24665_" + xuh).val("7"); //贷方特别总帐标识
        // jQuery("#field24665_" + xuh + "span").text("7");

        // jQuery("#field24661_" + xuh).val(workflowdate); //贷方基准日
        // jQuery("#field24661_" + xuh + "span").text(workflowdate);

        // jQuery("#field24664_" + xuh).val(jobno); //贷方借款人账号
        // jQuery("#field24664_" + xuh + "span").text(jobno);

        var _dfjzm = dt3_dfjzm;//	贷方记账码
        jQuery("#" + _dfjzm + "_" + xuh).val("50");
        jQuery("#" + _dfjzm + "_" + xuh + "span").text("50");

        var _dftxt = dt3_dftxt;//	贷方文本
        jQuery("#" + _dftxt + "_" + xuh).val(_zytxt);
        jQuery("#" + _dftxt + "_" + xuh + "span").text();

        var _gh = dt5_gh;//	工号
        var jobno = jQuery("#" + _gh + "_" + xuh).val();

        var _dfkm = dt3_dfkm;//	贷方科目编号 
        jQuery("#" + _dfkm + "_" + xuh).val(jobno);
        jQuery("#" + _dfkm + "_" + xuh + "span").text(jobno);

        var _xm = dt4_xm; //姓名
        var t4_xm = jQuery("#" + _xm + "_" + xuh).val();
        var t4_xmtxt = jQuery("#" + _xm + "_" + xuh + "span").text();

        var _dfkmmc = dt3_dfkmmc;//	贷方科目名称
        jQuery("#" + _dfkmmc + "_" + xuh).val(t4_xmtxt);
        jQuery("#" + _dfkmmc + "_" + xuh + "span").text("");

        var _dfje = dt3_dfje;//	贷方金额
        jQuery("#" + _dfje + "_" + xuh).val(Math.abs(_jemoney));
        jQuery("#" + _dfje + "_" + xuh + "span").text("");

        var _tbzzbs = dt3_tbzzbs;//	贷方特别总帐标识
        jQuery("#" + _tbzzbs + "_" + xuh).val("7");
        jQuery("#" + _tbzzbs + "_" + xuh + "span").text("7");

        var _dfjzr = dt3_dfjzr;//	贷方基准日
        jQuery("#" + _dfjzr + "_" + xuh).val(workflowdate);
        jQuery("#" + _dfjzr + "_" + xuh + "span").text(workflowdate);

        var _dfjkr = dt3_dfjkr;//	贷方借款人账号
        jQuery("#" + _dfjkr + "_" + xuh).val(jobno);
        jQuery("#" + _dfjkr + "_" + xuh + "span").text(jobno);

    }
})