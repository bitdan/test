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

    function setpztt() {
        jQuery("#field11499").val("ZO");             //凭证类型
        jQuery("#field11499span").text("");

        var lcbh = jQuery("#field11478span").text();
        jQuery("#field11500").val(lcbh);//参照
        jQuery("#field11500span").text("");

        jQuery("#field11495").val("生活津贴计提");
        jQuery("#field11495span").text("");

        var gs = jQuery("#field11471span").text();
        var fd = jQuery("#field11480span").text();
        var fx = jQuery("#field11472span").text();

        if (gs.indexOf("加纳") >= 0) {

            jQuery("#field11490").val("GH01");//公司代码
            jQuery("#field11490span").text("GH01");
            jQuery("#field11491").val("Sunda (GH) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {

            jQuery("#field11490").val("GF01");//公司代码
            jQuery("#field11490span").text("GF01");
            jQuery("#field11491").val("Sunda (GF02) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("五金厂") >= 0) {

            jQuery("#field11490").val("GF02");//公司代码
            jQuery("#field11490span").text("GF02");
            jQuery("#field11491").val("Sunda (GF02) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            jQuery("#field11490").val("RE01");//公司代码
            jQuery("#field11490span").text("RE01");
            jQuery("#field11491").val("Realestate company Ltd");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("加纳") >= 0 && fd.indexOf("Homepro") >= 0) {
            jQuery("#field11490").val("GH02");//公司代码
            jQuery("#field11490span").text("GH02");
            jQuery("#field11491").val("Homepro company Ltd");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("肯尼亚") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field11490").val("KF01");//公司代码
            jQuery("#field11490span").text("KF01");
            jQuery("#field11491").val("KENYA FACTORY");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("肯尼亚") >= 0) {
            jQuery("#field11490").val("KE01");//公司代码
            jQuery("#field11490span").text("KE01");
            jQuery("#field11491").val("Sunda (KE) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {

            jQuery("#field11490").val("TF01");//公司代码
            jQuery("#field11490span").text("TF01");
            jQuery("#field11491").val("Tanzania KEDS Factory");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0 && fx.indexOf("瓷") >= 0) {

            jQuery("#field11490").val("TF02");//公司代码
            jQuery("#field11490span").text("TF02");
            jQuery("#field11491").val("Twyford Tile (TZ) Factory");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0) {
            jQuery("#field11490").val("TZ01");//公司代码
            jQuery("#field11490span").text("TZ01");
            jQuery("#field11491").val("SUNDA (TZ)INVESTMENT");//公司代码名称
            jQuery("#field11491span").text("");
        } else if (gs.indexOf("秘鲁") >= 0) {
            jQuery("#field11490").val("PE01");//公司代码
            jQuery("#field11490span").text("PE01");
            jQuery("#field11491").val("SUNDA (PE)INVESTMENT");//公司代码名称
            jQuery("#field11491span").text("");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field11490").val("CO01");//公司代码
            jQuery("#field11490span").text("CO01");
            jQuery("#field11491").val("SUNDA (CO)INVESTMENT");//公司代码名称
            jQuery("#field11491span").text("");
        } else {
            jQuery("#field11490").val("CN01");//公司代码
            jQuery("#field11490span").text("CN01");
            jQuery("#field11491").val("广州市森大贸易有限公司");//公司代码名称
            jQuery("#field11491span").text("");
        }

        Action_Util.getCurrentDateTimeFormat("currentdate", function (data) {
            jQuery("#field11492").val(data);//过账日期
            jQuery("#field11492span").text(data);
            jQuery("#field11493").val(data);//凭证日期
            jQuery("#field11493span").text(data);
        });

    }

    function setjf(xuh) {
        var indexnum0 = parseFloat(jQuery("#indexnum0").val());
        if (parseFloat(xuh) < indexnum0) {
            jQuery("#field11518_" + xuh).val("40");//记账码
            jQuery("#field11518_" + xuh + "span").text("40");

            var fymxzy = jQuery("#field11510_" + xuh + "span").text();//摘要
            jQuery("#field11519_" + xuh).val(fymxzy);//文本
            jQuery("#field11519_" + xuh + "span").text("");

            var fymxje = jQuery("#field11543_" + xuh + "span").text().replace(/,/gm, '');//申报金额
            jQuery("#field11523_" + xuh).val(fymxje);//金额
            jQuery("#field11523_" + xuh + "span").text("");

            var fymxbmid = jQuery("#field11509_" + xuh).val();//归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";

                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";

                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field11539_" + xuh).val(data);//成本中心编号
                    jQuery("#field11539_" + xuh + "span").text(data);
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
                    jQuery("#field11540_" + xuh).val(data);//成本中心编号
                    jQuery("#field11540_" + xuh + "span").text("");
                });
            }


            var fymxkmid = jQuery("#field11535_" + xuh).val();//三级科目ID
            if (fymxkmid != "") {
                var fieldname = "racct";
                var tablename = "FnaBudgetfeeType";
                var strWhere = "id=" + fymxkmid;
                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field11520_" + xuh).val(data);//科目编号
                    jQuery("#field11520_" + xuh + "span").text(data);
                    if (data == "1221050000") {
                        jQuery("#field11518_" + xuh).val("29");
                        jQuery("#field11518_" + xuh + "span").text("29");
                        jQuery("#field11548_" + xuh).val("8");
                        jQuery("#field11548_" + xuh + "span").html("8");
                        jQuery("#field11549_" + xuh + "span").html("<IMG src='/images/BacoError.gif' align=absMiddle>");
                    }
                });

                Action_Util.getTabValue("name", tablename, strWhere, function (data) {
                    jQuery("#field11521_" + xuh).val(data);//科目编号
                    jQuery("#field11521_" + xuh + "span").html("");
                });
            }
        }
    }

    function setdf(xuh) {
        if (xuh == "0") {
            var jzm = "50";
            jQuery("#field11524_" + xuh).val(jzm);//记账码
            jQuery("#field11524_" + xuh + "span").text(jzm);

            var riqi= jQuery("#field24286").val();
            //var tmp=riqi.split('-')
            // var year=tmp[0];
            // var month=tmp[1];
            var year=riqi.substr(0,4);
            var month=riqi.substr(4,6);
            var txt= year+"年"+month+"月"+"生活津贴计提";
            // alert(txt);

            jQuery("#field11525_" + xuh).val(txt);
            jQuery("#field11525_" + xuh + "span").html("");

            jQuery("#field11526_" + xuh).val("2241170000");
            jQuery("#field11526_" + xuh + "span").html("2241170000");

            jQuery("#field11527_" + xuh).val("其他应付款_生活津贴");
            jQuery("#field11527_" + xuh + "span").html("");

            var sumje = jQuery("#sumvalue11523").val().replace(/,/gm, '');
            jQuery("#field11530_" + xuh).val(sumje);//金额
            jQuery("#field11530_" + xuh + "span").text("");
        }
    }

    if (spantxt) {//申请或编辑状态
        setpztt();
        var bt_add = parseFloat(jQuery("#indexnum0").val());
        var hsbt = parseFloat(jQuery("#indexnum1").val());

        if (hsbt < bt_add) {
            for (var i = 0; i < bt_add; i++) {
                //addRow1(1);
                jQuery("button[name='addbutton1']").click();
            }
        }

        var hsdf = parseInt(jQuery("#indexnum2").val());
        if (hsdf == 0) {
            jQuery("button[name='addbutton2']").click();
        }

    }

    function checkjdfje() {
        var jfje = 0;
        var sjf = document.getElementsByName("check_node_1");
        var sijf = sjf.length;
        for (var x = 0; x < sijf; x++) {
            var i = sjf[x].value;
            var jejf = jQuery("#field11523_" + i).val().replace(/,/gm, '');
            if (jejf == "") {
                jejf = "0"
            }
            jfje = jfje + parseFloat(jejf);

            var jfzy = jQuery("#field11519_" + i).val();
            if (jfzy.length > 50) {
                var n = parseInt(i) + 1;

                var str = "The " + n + "th row description of credit too long";
            }
        }

        var dfje = 0;
        var sdf = document.getElementsByName("check_node_2");
        var sidf = sdf.length;
        for (var x = 0; x < sidf; x++) {
            var j = sdf[x].value;
            var jedf = jQuery("#field11530_" + j).val().replace(/,/gm, '');
            if (jedf == "") {
                jedf = "0"
            }
            dfje = dfje + parseFloat(jedf);
        }

        jfje = Math.round(parseFloat(jfje) * 10000) / 10000;
        dfje = Math.round(parseFloat(dfje) * 10000) / 10000;

        if (Math.formatFloat(jfje, 4) != Math.formatFloat(dfje, 4)) {
            if (confirm("The amount of debit and credit is difference！" + Math.formatFloat(jfje, 4) + ";" + Math.formatFloat(dfje, 4) + ",Submit or Not ?")) {
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

    function checksd_bz() {
        //return true;
        var bz_h = jQuery("#field11473").val();
        var df_node = document.getElementsByName("check_node_2");
        var df_l = df_node.length;
        for (var x = 0; x < df_l; x++) {
            var j = df_node[x].value;
            var km = jQuery("#field11526_" + j).val();
            var bz_str = jQuery("#field11527_" + j).val();
            var bzs = bz_str.split("_");
            if (isArray(bzs)) {
                if (km.substr(0, 4) == "1002") {
                    var bz_mx = bzs[2];
                    if (bz_mx != bz_h) {
                        alert("Currency mismatch!");
                        return false;
                    }
                } else if (km.substr(0, 4) == "1001" || km.substr(0, 4) == "1003") {
                    var bz_mx = bzs[1];
                    if (bz_mx != bz_h) {
                        alert("Currency mismatch!");
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

    checkCustomize = function () {
        return checkjdfje() && checksd_bz();
    }

});