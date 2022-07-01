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
        jQuery("#field18331").val("ZO"); //凭证类型
        jQuery("#field18331span").text("");

        var lcbh = jQuery("#field18348span").text();
        jQuery("#field18322").val(lcbh); //参照
        jQuery("#field18322span").text("");

        var gs = jQuery("#field18327span").text();
        var fd = jQuery("#field18346span").text();
        var fx = jQuery("#field18334span").text();

        if (gs.indexOf("加纳") >= 0) {

            jQuery("#field18329").val("GH01"); //公司代码
            jQuery("#field18329span").text("GH01");
            jQuery("#field18350").val("Sunda (GH) Investment"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {

            jQuery("#field18329").val("GF01"); //公司代码
            jQuery("#field18329span").text("GF01");
            jQuery("#field18350").val("Sunda (GF02) Investment"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("五金厂") >= 0) {

            jQuery("#field18329").val("GF02"); //公司代码
            jQuery("#field18329span").text("GF02");
            jQuery("#field18350").val("Sunda (GF02) Investment"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            jQuery("#field18329").val("RE01"); //公司代码
            jQuery("#field18329span").text("RE01");
            jQuery("#field18350").val("Realestate company Ltd"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("Homepro") >= 0) {
            jQuery("#field18329").val("GH02"); //公司代码
            jQuery("#field18329span").text("GH02");
            jQuery("#field18350").val("Homepro company Ltd"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("肯尼亚") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field18329").val("KF01"); //公司代码
            jQuery("#field18329span").text("KF01");
            jQuery("#field18350").val("KENYA FACTORY"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("肯尼亚") >= 0) {
            jQuery("#field18329").val("KE01"); //公司代码
            jQuery("#field18329span").text("KE01");
            jQuery("#field18350").val("Sunda (KE) Investment"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {

            jQuery("#field18329").val("TF01"); //公司代码
            jQuery("#field18329span").text("TF01");
            jQuery("#field18350").val("Tanzania KEDS Factory"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("坦桑") >= 0 && fx.indexOf("瓷") >= 0) {

            jQuery("#field18329").val("TF02"); //公司代码
            jQuery("#field18329span").text("TF02");
            jQuery("#field18350").val("Twyford Tile (TZ) Factory"); //公司代码名称
            jQuery("#field18350span").text("");

        } else if (gs.indexOf("坦桑") >= 0) {
            jQuery("#field18329").val("TZ01"); //公司代码
            jQuery("#field18329span").text("TZ01");
            jQuery("#field18350").val("SUNDA (TZ)INVESTMENT"); //公司代码名称
            jQuery("#field18350span").text("");
        } else if (gs.indexOf("秘鲁") >= 0) {
            jQuery("#field18329").val("PE01"); //公司代码
            jQuery("#field18329span").text("PE01");
            jQuery("#field18350").val("SUNDA (PE)INVESTMENT"); //公司代码名称
            jQuery("#field18350span").text("");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field18329").val("CO01"); //公司代码
            jQuery("#field18329span").text("CO01");
            jQuery("#field18350").val("SUNDA (CO)INVESTMENT"); //公司代码名称
            jQuery("#field18350span").text("");
        } else { }
    }
    // 0    配送（Delivery）-0
    // 1    转储（Transfer）-1
    // 2    调拨移库（Allocate Transter）-1
    // 3    其他
    function setjf(xuh) {
        var indexnum0 = parseFloat(jQuery("#indexnum0").val());
        if (parseFloat(xuh) < indexnum0) {
            var jzm = "40";
            //var fymxzy=jQuery("#field11510_"+xuh+"span").text();//摘要
            var sqr = jQuery("#field18328span").text().substr(0, 5); //罗盛华申请修改取5个字符,申请人
            var riqi = jQuery("#field18324span").text(); //申请日期
            var ydh = jQuery("#field18369_" + xuh + "span").text(); //运单号
            var ydhs = ydh.split(";");
            var sapzcd = jQuery("#field19616_" + xuh + "span").text(); //转储单号
            var sapjhd = jQuery("#field18572_" + xuh + "span").text(); //SAP单号
            //jQuery("#field18401_"+xuh).val(sqr+riqi+"报销"+ydh+"运费");//文本
            jQuery("#field18401_" + xuh + "span").text("");  //借方行项目文本

            var fymxje = jQuery("#field18396_" + xuh + "span").text().replace(/,/gm, ''); //申报金额
            jQuery("#field18373_" + xuh).val(fymxje); //金额
            jQuery("#field18373_" + xuh + "span").text("");

            var khbm = jQuery("#field18362_" + xuh + "span").text(); //客户编码
            var lx = jQuery("#field18352").val(); //类型
            var cdf = jQuery("#disfield18581_" + xuh).val(); //费用承担方
            var khms = jQuery("#field18363_" + xuh + "span").text(); //客户描述
            if (lx == "0") {
                jQuery("#field18401_" + xuh).val(sqr + "报配送" + ydhs[0]); //借方行项目文本
            } else if (lx == "1") {
                jzm = "25";
                jQuery("#field18401_" + xuh).val(sqr + "报转储" + sapzcd); //借方行项目文本
            } else {
                jQuery("#field18401_" + xuh).val(sqr + "报调拨" + sapjhd); //借方行项目文本
            }
            jQuery("#field18356_" + xuh).val(jzm); //记账码
            jQuery("#field18356_" + xuh + "span").text(jzm);

            if ((lx == "0" && cdf == "0") || lx == "2") {
                jQuery("#field18382_" + xuh).val("6601340000"); //科目编码
                jQuery("#field18382_" + xuh + "span").text("6601340000");
                jQuery("#field18357_" + xuh).val("营业费用_运输费"); //科目描述
                jQuery("#field18357_" + xuh + "span").text("");
            } else {
                jQuery("#field18382_" + xuh).val(khbm); //科目编码
                jQuery("#field18382_" + xuh + "span").text(khbm);
                jQuery("#field18357_" + xuh).val(khms); //科目描述
                jQuery("#field18357_" + xuh + "span").text("");
            }
            var fymxbmid = jQuery("#field18582_" + xuh).val(); //归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";
                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";
                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field18376_" + xuh).val(data); //成本中心编号
                    jQuery("#field18376_" + xuh + "span").text(data);

                    jQuery.ajax({
                        url: "/sunda/xy/commom/opt.jsp",
                        async: false,
                        data: {
                            "method": "getkzfw",
                            "costno": data,
                            "ran": Math.random()
                        },
                        dataType: "json",
                        success: function (res) {
                            jQuery("#field18402_" + xuh).val(res.GSBER); //业务范围
                            jQuery("#field18402_" + xuh + "span").text(res.GSBER); //业务范围
                            jQuery("#field24288_" + xuh).val(res.KOKRS);
                            if (res.KOKRS == "3000" && (lx == "2")) {
                                jQuery("#field18382_" + xuh).val("5101340000"); //科目编码
                                jQuery("#field18382_" + xuh + "span").text("5101340000");
                                jQuery("#field18357_" + xuh).val("制造费用_运输费"); //科目描述
                                jQuery("#field18357_" + xuh + "span").text("");
                            }
                        }
                    });
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
                    jQuery("#field18378_" + xuh).val(data); //成本中心编号
                    jQuery("#field18378_" + xuh + "span").text("");
                });

            }


        }
    }

    function setdf(xuh) {
        if (xuh == "0") {
            var jzm = "50";
            if (checkiscj()) {
                jzm = "35"
            }
            jQuery("#field11524_" + xuh).val(jzm); //记账码
            jQuery("#field11524_" + xuh + "span").text(jzm);

            var sumje = jQuery("#sumvalue11523").val().replace(/,/gm, '');
            jQuery("#field11530_" + xuh).val(sumje); //金额
            jQuery("#field11530_" + xuh + "span").text("");
        }
    }

    function checkiscj() { //明细是否有冲减标识
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var cj = jQuery("#field11531_" + i).val();
            if (cj == "1") {
                return true;
            }
        }
        return false;
    }

    if (spantxt) { //申请或编辑状态
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
        var dfje = 0;
        var sjf = document.getElementsByName("check_node_1");
        var sijf = sjf.length;
        for (var x = 0; x < sijf; x++) {
            var i = sjf[x].value;
            var jejf = jQuery("#field18373_" + i).val().replace(/,/gm, '');
            var jzm = jQuery("#field18356_" + i).val();
            if (jejf == "") {
                jejf = "0"
            }
            if (jzm == "01" || jzm == "09" || jzm == "29" || jzm == "25" || jzm == "40") {
                jfje = jfje + parseFloat(jejf);
            }
            if (jzm == "11" || jzm == "19" || jzm == "39" || jzm == "35" || jzm == "31" || jzm == "50") {
                dfje = dfje + parseFloat(jejf);
            }

            var jfzy = jQuery("#field18401_" + i).val();
            if (jfzy.length > 50) {
                var n = parseInt(i) + 1;

                var str = "The " + n + "th row description of credit too long";
            }
        }

        jfje = Math.round(parseFloat(jfje) * 10000) / 10000;
        dfje = Math.round(parseFloat(dfje) * 10000) / 10000;

        if (Math.formatFloat(jfje, 4) != Math.formatFloat(dfje, 4)) {
            alert("借贷方金额不相等，请检查！");
            return flase;
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