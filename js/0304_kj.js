jQuery(document).ready(function () {

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }
    //适用chrome浏览器方法
    jQuery("button[name='addbutton1']").bind("click", function () {
        var indexnum1 = 0;
        if (document.getElementById("indexnum1")) {
            indexnum1 = document.getElementById("indexnum1").value * 1.0 - 1;
        }
        if (spantxt) {
            setjf(indexnum1);
        }
    });

    jQuery("button[name='addbutton2']").bind("click", function () {
        var indexnum2 = 0;
        if (document.getElementById("indexnum2")) {
            indexnum2 = document.getElementById("indexnum2").value * 1.0 - 1;
        }
        if (spantxt) {
            setdf(indexnum2);
        }
    });

    // jQuery("#indexnum1").bind("propertychange",function(){
    //     var index1 = parseFloat(this.value) - 1;
    //     if(spantxt){
    //         setjf(index1);
    //     }
    // });

    // jQuery("#indexnum2").bind("propertychange",function(){
    //     var index2 = parseFloat(this.value) - 1;
    //     if(spantxt){
    //         setdf(index2);
    //     }
    // });


    function setpztt() {
        jQuery("#field9805").val("ZO");
        jQuery("#field9805span").text("");

        var lcbh = jQuery("#field6563span").text();
        jQuery("#field9806").val(lcbh);//参照
        jQuery("#field9806span").text("");

        jQuery("#field6943").val("CN01");//公司代码
        jQuery("#field6943span").text("CN01");
        jQuery("#field6944").val("广州市森大贸易有限公司");//公司代码名称
        jQuery("#field6944span").text("");
    }

    function setjf(xuh) {
        var indexnum0 = parseFloat(jQuery("#indexnum0").val());
        if (parseFloat(xuh) < indexnum0) {
            jQuery("#field6949_" + xuh).val("40");//记账码
            jQuery("#field6949_" + xuh + "span").text("40");

            var fymxzy = jQuery("#field10155_" + xuh + "span").text();//摘要
            jQuery("#field6950_" + xuh).val(fymxzy);//文本
            jQuery("#field6950_" + xuh + "span").text("");

            var fymxje = jQuery("#field10494_" + xuh + "span").text().replace(/,/gm, '');//申报金额
            jQuery("#field6954_" + xuh).val(fymxje);//金额
            jQuery("#field6954_" + xuh + "span").text("");
            if (fymxje < 0) {
                jQuery("#field6949_" + xuh).val("50");// 负数时，借方记账码为50
                jQuery("#field6949_" + xuh + "span").text("50");
                jQuery("#field6954_" + xuh).val(Math.abs(fymxje));//负数时，金额取绝对值
                jQuery("#field6954_" + xuh + "span").text("");
            }

            var fymxbmid = jQuery("#field6691_" + xuh).val();//归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";

                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";

                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field9090_" + xuh).val(data);//成本中心编号
                    jQuery("#field9090_" + xuh + "span").text(data);
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
                    jQuery("#field9091_" + xuh).val(data);//成本中心编号
                    jQuery("#field9091_" + xuh + "span").text("");
                });
            }

            var fymxkmid = jQuery("#field9762_" + xuh).val();//三级科目ID
            if (fymxkmid != "") {
                var fieldname = "racct";
                var tablename = "FnaBudgetfeeType";
                var strWhere = "id=" + fymxkmid;

                var isndyt = jQuery("#field6602_" + xuh).val();//是否冲减年度预提
                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    if (data != "" && isndyt == "1") {
                        Action_Util.getYtkm("", data, "", function (ytkm) {
                            if (ytkm != "") {
                                var sapytkm = ytkm.substr(0, 10);
                                var sapytkmmc = ytkm.substr(10);
                                jQuery("#field6951_" + xuh).val(sapytkm);//科目编号
                                jQuery("#field6951_" + xuh + "span").text(sapytkm);
                                jQuery("#field6952_" + xuh).val(sapytkmmc);
                            } else {
                                //jQuery("#field6951_"+xuh).val(data);//科目编号
                                //jQuery("#field6951_"+xuh+"span").text(data);
                            }
                        });
                    } else {
                        jQuery("#field6951_" + xuh).val(data);//科目编号
                        jQuery("#field6951_" + xuh + "span").text(data);
                    }
                });
            }
            var fykmmc = jQuery("#field9762_" + xuh + "span").text();//三级科目名称
            jQuery("#field6952_" + xuh).val(fykmmc);//科目名称
            jQuery("#field6952_" + xuh + "span").text("");
        }
    }

    //由原来只有一行贷方, 改为费用项目多行一一对应
    function setdf(xuh) {

        var jzm = "50";
        jQuery("#field6955_" + xuh).val(jzm);//记账码
        jQuery("#field6955_" + xuh + "span").text(jzm);
        if (checkiscj()) {
            jzm = "35";
            jQuery("#field6955_" + xuh).val(jzm);//记账码
            jQuery("#field6955_" + xuh + "span").text(jzm);
        }
        var amount = jQuery("#field10706_" + xuh).val(); //业务金额
        jQuery("#field6961_" + xuh).val(amount);//金额
        jQuery("#field6961_" + xuh + "span").text("");

        var Thirdsubject = jQuery("#field9762" + xuh + "span").text(""); //三级科目
        //负数时并且三级科目非薪酬奖金时贷方记账码为29
        if (amount < 0 && Thirdsubject.indexOf("660110") >= 0) {
            jQuery("#field6955_" + xuh).val("29");//负数并且三级科目非薪酬奖金时，贷方记账码为29
            jQuery("#field6955_" + xuh + "span").text("29");
            jQuery("#field6961_" + xuh).val(Math.abs(amount));//负数并且三级科目非薪酬奖金时，金额取绝对值
            jQuery("#field6961_" + xuh + "span").text("");
            jQuery("#field10218_" + xuh).val("7");//负数并且三级科目非薪酬奖金时，总账标识为7
            jQuery("#field10218_" + xuh + "span").text("7");
        }
        jQuery("#field6959_" + xuh).val("15");//原因代码编号
        jQuery("#field6959_" + xuh + "span").text("15");
        jQuery("#field6960_" + xuh).val("支付的其他与经营活动有关的现金");//原因代码名称
        jQuery("#field6960_" + xuh + "span").text("");

    }

    //jQuery("#sdAddMx").attr("type","button");
    //jQuery("#sdAddMx").bind("click",function(){
    //alert(1);
    //fn_setMx2();calSum(2);
    //});
    jQuery("#sdAddMx").click(function () {
        fn_setMx2();
        calSum(2);
    });

    function fn_setMx2() {
        var kmbh = "", kmmc = "", yydmbh = "", yydmmc = "";
        var s = document.getElementsByName("check_node_2");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            if (x == 0) {
                kmbh = jQuery("#field6957_" + i).val();
                kmmc = jQuery("#field6958_" + i).val();
                yydmbh = jQuery("#field6959_" + i).val();
                yydmmc = jQuery("#field6960_" + i).val();
            }
            s[x].checked = "checked";
        }
        deleteRow2(2, true);

        var hsdf = parseInt(jQuery("#indexnum1").val());
        for (var m = 0; m < hsdf; m++) {
            jQuery("button[name='addbutton2']").click();
        }

        var s = document.getElementsByName("check_node_2");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var jzm = "50";
            var cj = jQuery("#field9800_" + x).val();//是否有冲减标识
            if (cj == "1") {
                jzm = "35"
            }
            jQuery("#field6955_" + i).val(jzm);//记账码
            jQuery("#field6955_" + i + "span").text(jzm);
            var jfwb = jQuery("#field6950_" + x).val();//借方文本
            jQuery("#field6956_" + i).val(jfwb);//文本
            jQuery("#field6956_" + i + "span").text("");
            var jfje = jQuery("#field6954_" + x).val();//借方金额
            jQuery("#field6961_" + i).val(jfje);//金额
            jQuery("#field6961_" + i + "span").text("");
            jQuery("#field6957_" + i).val(kmbh);
            jQuery("#field6957_" + i + "span").text(kmbh);
            jQuery("#field6958_" + i).val(kmmc);
            jQuery("#field6958_" + i + "span").text("");
            jQuery("#field6959_" + i).val(yydmbh);
            jQuery("#field6959_" + i + "span").text(yydmbh);
            jQuery("#field6960_" + i).val(yydmmc);
            jQuery("#field6960_" + i + "span").text("");
        }
    }

    function checkiscj() {//明细是否有冲减标识
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var cj = jQuery("#field9800_" + i).val();
            if (cj == "1") {
                return true;
            }
        }
        return false;
    }

    if (spantxt) {//申请或编辑状态
        setpztt();
        var bt_add = parseFloat(jQuery("#indexnum0").val());
        var hsbt = parseFloat(jQuery("#indexnum1").val());

        if (hsbt < bt_add) {
            for (var i = 0; i < bt_add; i++) {
                //addRow1(1); 适用chrome浏览器方法
                jQuery("button[name='addbutton1']").click();
                //
            }
        }
        //适用chrome浏览器方法
        // var hsdf = parseInt(jQuery("#indexnum2").val());
        // if (hsdf == 0) {
        //     jQuery("button[name='addbutton2']").click();
        // }
        var hsdf = parseInt(jQuery("#indexnum2").val());
        if (hsdf < bt_add) {
            for (var i = 0; i < bt_add; i++) {
                jQuery("button[name='addbutton2']").click();
            }
        }
    }

    function checkjdfje() {
        var jfje = 0;
        var sjf = document.getElementsByName("check_node_1");
        var sijf = sjf.length;
        for (var x = 0; x < sijf; x++) {
            var i = sjf[x].value;
            var jejf = jQuery("#field6954_" + i).val().replace(/,/gm, '');
            if (jejf == "") {
                jejf = "0"
            }
            jfje = jfje + parseFloat(jejf);
        }

        var dfje = 0;
        var sdf = document.getElementsByName("check_node_2");
        var sidf = sdf.length;
        for (var x = 0; x < sidf; x++) {
            var j = sdf[x].value;
            var jedf = jQuery("#field6961_" + j).val().replace(/,/gm, '');
            if (jedf == "") {
                jedf = "0"
            }
            dfje = dfje + parseFloat(jedf);
        }

        jfje = Math.round(parseFloat(jfje) * 10000) / 10000;
        dfje = Math.round(parseFloat(dfje) * 10000) / 10000;
        if (Math.formatFloat(jfje, 2) != Math.formatFloat(dfje, 2)) {
            if (confirm("借贷方金额不相等！" + Math.formatFloat(jfje, 4) + ";" + Math.formatFloat(dfje, 4) + ",是否提交?")) {
                return true;
            } else {
                return flase;
            }

        }

        return true;
    }

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }

    checkCustomize = function () {
        return checkjdfje() && checksd_bz();
    }

    function checksd_bz() {
        //return true;
        var bz_h = jQuery("#field9804").val();
        var df_node = document.getElementsByName("check_node_2");
        var df_l = df_node.length;
        for (var x = 0; x < df_l; x++) {
            var j = df_node[x].value;
            var km = jQuery("#field6957_" + j).val();
            var bz_str = jQuery("#field6958_" + j).val();
            var bzs = bz_str.split("_");
            if (isArray(bzs)) {
                if (km.substr(0, 4) == "1002") {
                    var bz_mx = bzs[2];
                    if (bz_mx != bz_h) {
                        alert("表头付款币种与付款科目币种不一致!");
                        return false;
                    }
                } else if (km.substr(0, 4) == "1001" || km.substr(0, 4) == "1003") {
                    var bz_mx = bzs[1];
                    if (bz_mx != bz_h) {
                        alert("表头付款币种与付款科目币种不一致!");
                        return false;
                    }
                }
            }
        }
        return true;
    }


    function isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    }
});