jQuery(document).ready(function() {

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }

    jQuery("button[name='addbutton1']").bind("click", function() {
        var indexnum1 = 0;
        if (document.getElementById("indexnum1")) {
            indexnum1 = document.getElementById("indexnum1").value * 1.0 - 1;
        }
        if (spantxt) {
            setjf(indexnum1);
        }
    });

    jQuery("#indexnum2").bind("propertychange", function() {
        var indexnum2 = parseFloat(this.value) - 1;

        if (spantxt) {
            setdf(indexnum2);
        }
    });

    function setGsdm(dm, mc) {
        jQuery("#field16235").val(dm); //公司代码
        jQuery("#field16235span").text(dm);
        jQuery("#field16236").val(mc); //公司代码名称
        jQuery("#field16236span").text("");
    }

    function setpztt() {
        jQuery("#field16247").val("ZO"); //凭证类型
        jQuery("#field16247span").text("");

        var lcbh = jQuery("#field16223span").text();
        jQuery("#field16239").val(lcbh); //参照
        jQuery("#field16239span").text("");

        var sqr = jQuery("#field16215span").text();
        var qyd = jQuery("#field16317span").text();
        var mdd = jQuery("#field16318span").text();
        jQuery("#field16245").val(sqr + "报销" + qyd + "到" + mdd + "运输费");
        jQuery("#field16245span").text("");

        var gs = jQuery("#field16213span").text();
        var fd = jQuery("#field16218span").text();
        var fx = jQuery("#field16219span").text();
        if (gs.indexOf("加纳") >= 0) {
            setGsdm("GH01", "Sunda (GH) Investment");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {
            setGsdm("GF01", "Sunda (GF02) Investment");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("五金厂") >= 0) {
            setGsdm("GF02", "Sunda (GF02) Investment");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            setGsdm("RE01", "Realestate company Ltd");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("Homepro") >= 0) {
            setGsdm("GH02", "Homepro company Ltd");
        } else if (gs.indexOf("肯尼亚") >= 0 && fd.indexOf("瓷") >= 0) {
            setGsdm("KF01", "KENYA FACTORY");
        } else if (gs.indexOf("肯尼亚") >= 0) {
            setGsdm("KE01", "Sunda (KE) Investment");
        } else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {
            setGsdm("TF01", "Tanzania KEDS Factory");
        } else if (gs.indexOf("坦桑") >= 0 && fx.indexOf("瓷") >= 0) {
            setGsdm("TF02", "Twyford Tile (TZ) Factory");
        } else if (gs.indexOf("坦桑") >= 0) {
            setGsdm("TZ01", "SUNDA (TZ)INVESTMENT");
        } else if (gs.indexOf("秘鲁") >= 0) {
            setGsdm("PE01", "SUNDA (PE)INVESTMENT");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            setGsdm("CO01", "SUNDA (CO)INVESTMENT");
        } else if (gs.indexOf("总部") >= 0) {
            setGsdm("CN01", "广州市森大贸易有限公司");
        } else {}
    }
    
    //0725、0726两个oa过账到SAP行项目文本不清晰，需要更改文本生成规则。目前为员工+报销+单号+运输费用。需要修改为 
    //员工名称+报+单据类型+单号 
    //其中员工名称取5个字符，单据类型+单号为（转储+转储采购单号，调拨+调拨单号，配送+提货单号）
    //   配送（Delivery）-0 转储（Transfer）-1 购销转储 代销转储 调拨移库（Allocate Transter）-1 东非跨公司转储转储（Transfer）-1 1
    function setjf(xuh) {
        var sqr = jQuery("#field16215span").text().substr(0, 5); //罗盛华申请修改取5个字符
        var lx = jQuery("#field16325").val(); //类型
        var indexnum0 = parseFloat(jQuery("#indexnum0").val());
        if (parseFloat(xuh) < indexnum0) {
            var jzm = "40";
            var sapjhd = jQuery("#field16300_" + xuh + "span").text();
            var sapydh = jQuery("#field16311_" + xuh + "span").text();
            var sapzcd = jQuery("#field19006_" + xuh + "span").text();
            var khbm = jQuery("#field18743_" + xuh + "span").text(); //客户编码
            var khms = jQuery("#field16303_" + xuh + "span").text(); //客户描述
            var _khbm = khbm.replace(/\b(0+)/gi, "");
            if (lx == 0) {
                jQuery("#field16277_" + xuh).val(sqr + "报配送" + _khbm + "_" + sapydh); //文本
                jQuery("#field16277_" + xuh + "span").text("");
            } else if (lx == 1) {
                jzm = "25";
                jQuery("#field16277_" + xuh).val(sqr + "报转储" + sapzcd); //文本
                jQuery("#field16277_" + xuh + "span").text("");
            } else if (lx == 4) {
                jQuery("#field16277_" + xuh).val(sqr + "报调拨" + sapjhd); //文本
                jQuery("#field16277_" + xuh + "span").text("");
            }
            jQuery("#field16276_" + xuh).val(jzm); //记账码
            jQuery("#field16276_" + xuh + "span").text(jzm);

            var cdf = jQuery("#disfield18744_" + xuh).val(); //承担方
            //var sfsj=jQuery("#field16626_"+xuh).is(':checked');//是否税金
            var sfsj = jQuery("#field16626_" + xuh).val(); //是否税金
            //alert(sfsj);
            if (sfsj == 1) {
                jQuery("#field16278_" + xuh).val("2221010200");
                jQuery("#field16278_" + xuh + "span").text("2221010200");
                jQuery("#field16279_" + xuh).val("应交税费_应交增值税_进项税");
            } else if ((lx == "0" && cdf == "0") || (lx == "4")) {
                jQuery("#field16278_" + xuh).val("6601340000");
                jQuery("#field16278_" + xuh + "span").text("6601340000");
                jQuery("#field16279_" + xuh).val("运输费");
            } else {
                jQuery("#field16278_" + xuh).val(khbm);
                jQuery("#field16278_" + xuh + "span").text(khbm);
                jQuery("#field16279_" + xuh).val(khms);
            }
            jQuery("#field16279_" + xuh + "span").text("");

            var fymxje = jQuery("#field16336_" + xuh + "span").text().replace(/,/gm, ''); //申报金额
            jQuery("#field16280_" + xuh).val(fymxje); //金额
            jQuery("#field16280_" + xuh + "span").text("");

            var fymxbmid = jQuery("#field16335_" + xuh).val(); //归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";
                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";
                Action_Util.getTabValue(fieldname, tablename, strWhere, function(data) {
                    jQuery("#field16294_" + xuh).val(data); //成本中心编号
                    jQuery("#field16294_" + xuh + "span").text(data);
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function(data) {
                    jQuery("#field16295_" + xuh).val(data); //成本中心编号
                    jQuery("#field16295_" + xuh + "span").text("");
                });
            }
        }

    }

    function setjfadd(xuh) {
        //接收值为下标, = 表单行数-1
        var lx = jQuery("#field16325").val(); //类型
        var i = xuh; //可能会添加的行
        for (var index = 0; index <= xuh; index++) {

            var isvalid = jQuery("#field24273_" + index).val() != "" && jQuery("#disfield24272_" + index).val() != "";
            //扣款事由和扣款金额不为空时添加一行
            if (isvalid) {
                jQuery("button[name='addbutton1']").click();
                i++;

                //“扣款事由”及“扣款金额”非空项时
                // 0   配送（Delivery）-0
                // 1   转储（Transfer）-1
                // 4   调拨移库（Allocate Transter）-1
                // 6    采购类型 -1
                var jzm = "50";

                var Deductionmoney = jQuery("#field24273_" + index).val(); //扣款金额
                var fymxbmid = jQuery("#field16335_" + index).val(); //费用承担部门
                if (fymxbmid != "") {
                    var fieldname = "hsdm";
                    var fieldnamet = "hsmc";
                    var tablename = "CostAccountingCenter";
                    var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";
                    Action_Util.getTabValue(fieldname, tablename, strWhere, function(data) {
                        jQuery("#field16294_" + i).val(data); //成本中心编号
                        jQuery("#field16294_" + i + "span").text(data);
                    });

                    Action_Util.getTabValue(fieldnamet, tablename, strWhere, function(data) {
                        jQuery("#field16295_" + i).val(data); //成本中心编号
                        jQuery("#field16295_" + i + "span").text("");
                    });
                }
                //alert(fymxbmid);
                var Deduction = jQuery("#disfield24272_" + index).val(); //扣款事由
                var Deductiontext = jQuery("#disfield24272_" + index + "  option:selected").text(); //扣款事由
                var Deductionbz = jQuery("#field16225").val();

                var tmp = Deductiontext + Deductionmoney + Deductionbz;

                jQuery("#field16280_" + i).val(Deductionmoney); //借方金额
                jQuery("#field16280_" + i + "span").text("");

                jQuery("#field16276_" + i).val(jzm); //记账码
                jQuery("#field16276_" + i + "span").text(jzm);

                jQuery("#field16277_" + i).val(tmp); //借方行项目文本
                jQuery("#field16277_" + i + "span").text("");

                if (lx == 0) {
                    // 0   配送（Delivery）-0
                    if (Deduction == 1) {
                        // 破损扣款 1
                        //少货扣款  0
                        // 其他扣款 2
                        var subject = "6601550000";
                        jQuery("#field16278_" + i).val(subject); //总账科目
                        jQuery("#field16278_" + i + "span").text(subject);
                        jQuery("#field16279_" + i).val("营业费用_客诉补偿"); //短中文描述
                    } else if (Deduction == 0) {
                        var subject = "6601550000";

                        jQuery("#field16278_" + i).val(subject); //总账科目
                        jQuery("#field16278_" + i + "span").text(subject);
                        jQuery("#field16279_" + i).val("营业费用_客诉补偿"); //短中文描述
                    } else if (Deduction == 2) {
                        var subject = "6601410000";

                        jQuery("#field16278_" + i).val(subject); //总账科目
                        jQuery("#field16278_" + i + "span").text(subject);

                        jQuery("#field16279_" + i).val("营业费用_产品包装费"); //短中文描述
                    }
                } else if (lx == 1 || lx == 4 || lx == 6) {
                    // 1   转储（Transfer）-1
                    // 4   调拨移库（Allocate Transter）-1
                    // 6    采购类型 -1
                    if (Deduction == 1) {
                        // 破损扣款 1
                        //少货扣款  0
                        // 其他扣款 2
                        var subject = "6601400300";
                        jQuery("#field16278_" + i).val(subject); //总账科目
                        jQuery("#field16278_" + i + "span").text(subject);
                        jQuery("#field16279_" + i).val("营业费用_存货管理损失_破损报废"); //短中文描述
                    } else if (Deduction == 0) {
                        var subject = "6601400100";

                        jQuery("#field16278_" + i).val(subject); //总账科目
                        jQuery("#field16278_" + i + "span").text(subject);

                        jQuery("#field16279_" + i).val("营业费用_存货管理损失_收货损失"); //短中文描述
                    } else if (Deduction == 2) {
                        var subject = "6601410000";

                        jQuery("#field16278_" + i).val(subject); //总账科目
                        jQuery("#field16278_" + i + "span").text(subject);

                        jQuery("#field16279_" + i).val("营业费用_产品包装费"); //短中文描述
                    }
                }
            }
        }
    }

    function setdf(xuh) {
        if (xuh == "0") {
            var jzm = "50";
            jQuery("#field16266_" + xuh).val(jzm); //记账码
            jQuery("#field16266_" + xuh + "span").text(jzm);

            var sumje = jQuery("#field16226").val();
            jQuery("#field16286_" + xuh).val(sumje); //金额
            jQuery("#field16286_" + xuh + "span").text("");

            var ttwb = jQuery("#field16245").val();
            jQuery("#field16285_" + xuh).val(ttwb);
            jQuery("#field16285_" + xuh + "span").text("");

            var lx = jQuery("#field16325").val(); //类型
            if (lx == "1") {
                jQuery("#field16267_" + xuh).val("11"); //原因代码编号
                jQuery("#field16267_" + xuh + "span").text("11");
                jQuery("#field16287_" + xuh).val("购买商品、接受劳务支付的现金"); //原因代码名称
                jQuery("#field16287_" + xuh + "span").text("");
            } else {
                jQuery("#field16267_" + xuh).val("15"); //原因代码编号
                jQuery("#field16267_" + xuh + "span").text("15");
                jQuery("#field16287_" + xuh).val("支付的其他与经营活动有关的现金"); //原因代码名称
                jQuery("#field16287_" + xuh + "span").text("");
            }
        }
    }

    if (spantxt) { //申请或编辑状态
        setpztt();
        var bt_add = parseFloat(jQuery("#indexnum0").val());
        var hsbt = parseFloat(jQuery("#indexnum1").val());

        if (hsbt < bt_add) {
            for (var i = 0; i < bt_add; i++) {
                jQuery("button[name='addbutton1']").click();

            }
        }

        var hsdf = parseInt(jQuery("#indexnum2").val());
        if (hsdf == 0) {
            jQuery("button[name='addbutton2']").click();
        }

    }

    function checksd_bz() {
        //return true;
        var bz_h = jQuery("#field16225").val();
        var df_node = document.getElementsByName("check_node_2");
        var df_l = df_node.length;
        for (var x = 0; x < df_l; x++) {
            var j = df_node[x].value;
            var km = jQuery("#field16274_" + j).val();
            var bz_str = jQuery("#field16288_" + j).val();
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
    
    checkCustomize = function() {
        return checksd_bz() && checkamout();
    }
    
    // 0901-2021110042 
    //贷方金额总和不能超过OA总额  2022/4/18 modify
    function checkamout() {
        var sumje = jQuery("#field16226span").text().replace(/,/gm, '');
        var ndexnum2 = document.getElementById("indexnum2").value * 1.0;
        var sumdf = 0;
        for (var index = 0; index < ndexnum2; index++) {
            sumdf += jQuery("#field16286_" + index).val() * 1.0;
        }
        if (sumdf > sumje) {
            return false;
        }
        return true;
    }


    //获取最终行数,调用setjfadd   
    //0901-2021120026  2022/4/2
    var indexnum0final = 0;
    if (document.getElementById("indexnum0")) {
        indexnum0final = document.getElementById("indexnum0").value * 1.0 - 1;
    }
    setjfadd(indexnum0final);
});