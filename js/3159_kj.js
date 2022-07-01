jQuery(document).ready(function () {
    //3159kj
    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }


    jQuery("#indexnum1").bind("propertychange", function () {
        var index0 = parseFloat(this.value) - 1;
        if (spantxt) {
            var indexnum2 = parseFloat(jQuery("#indexnum0").val());
            if (index0 < indexnum2) {
                setjf(index0);
            }
        }
    });

    jQuery("#indexnum2").bind("propertychange", function () {
        var index1 = parseFloat(this.value) - 1;
        if (spantxt) {
            if (index1 == "0") {
                setdf(index1);
            }
        }
    });


    function setpztt() {

        var gs1_ = jQuery("#field10273span").text();
        var gs2_ = jQuery("#field10281span").text();
        var gs = gs1_ + gs2_;
        var fd = jQuery("#field10281span").text();

        if (gs.indexOf("加纳") >= 0 && fd.indexOf("Accra") >= 0) {
            jQuery("#field15662").val("GH01");//公司代码
            jQuery("#field15662span").text("GH01");
            jQuery("#field15663").val("Sunda (GH) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {
            jQuery("#field15662").val("GF01");//公司代码
            jQuery("#field15662span").text("GF01");
            jQuery("#field15663").val("Sunda (GF) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("HomePro") >= 0) {
            jQuery("#field15662").val("GH02");//公司代码
            jQuery("#field15662span").text("GH02");
            jQuery("#field15663").val("Homepro company Ltd");//公司代码名称
            jQuery("#field15663span").text("");
        }
        else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            jQuery("#field15662").val("RE01");//公司代码
            jQuery("#field15662span").text("RE01");
            jQuery("#field15663").val("Realestate company Ltd");//公司代码名称
            jQuery("#field15663span").text("");
        }
        else if (gs.indexOf("肯尼亚") >= 0) {
            jQuery("#field15662").val("KE01");//公司代码
            jQuery("#field15662span").text("KE01");
            jQuery("#field15663").val("Sunda (KE) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {
            jQuery("#field15662").val("TF01");//公司代码
            jQuery("#field15662span").text("TF01");
            jQuery("#field15663").val("Tanzania KEDS Factory");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("瓷") >= 0) {
            jQuery("#field15662").val("TF02");//公司代码
            jQuery("#field15662span").text("TF02");
            jQuery("#field15663").val("Twyford Tile (TZ) Factory");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("坦桑") >= 0) {
            jQuery("#field15662").val("TZ01");//公司代码
            jQuery("#field15662span").text("TZ");
            jQuery("#field15663").val("Sunda (TZ) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("科特") >= 0) {
            jQuery("#field15662").val("CI01");//公司代码
            jQuery("#field15662span").text("CI01");
            jQuery("#field15663").val("Sunda (CI) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("秘鲁") >= 0) {
            jQuery("#field15662").val("PE01");//公司代码
            jQuery("#field15662span").text("PE01");
            jQuery("#field15663").val("Sunda (PE) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field15662").val("CO01");//公司代码
            jQuery("#field15662span").text("CO01");
            jQuery("#field15663").val("Sunda (CO) Investment");//公司代码名称
            jQuery("#field15663span").text("");
        } else {
            jQuery("#field15662").val("0001");//公司代码
            jQuery("#field15662span").text("0001");
            jQuery("#field15663").val("SAP A.G.");//公司代码名称
            jQuery("#field15663span").text("");
        }

        var lcbh = jQuery("#field10279span").text();
        jQuery("#field15666").val(lcbh);//参照
        jQuery("#field15666span").text("");

        Action_Util.getCurrentDateTimeFormat("currentdate", function (data) {
            jQuery("#field15664").val(data);//过账日期
            jQuery("#field15664span").text(data);
            jQuery("#field15665").val(data);//凭证日期
            jQuery("#field15665span").text(data);
        });
    }

    var FeebelongsdepID = jQuery("#field15731").val();   //费用归属部门ID
    var Feebelongsdepname = jQuery("#field15731span").children("a").text();   //费用归属部门文本
    function setjf(xuh) {
        // 重新梳理3159借方过账逻辑 modify 2022/5/18 xsz
        var zxdh = jQuery("#field13586_" + xuh + "span").text();//装箱单号
        var txt_str = "";
        var str1 = zxdh.substr(0, 1);
        var str = /^[A-Za-z]*$/;

        if (str.test(str1)) {
            txt_str = zxdh;
        } else {
            if (zxdh.length == 6) {
                txt_str = "PL00" + zxdh;
            } else if (zxdh.length == 5) {
                txt_str = "PL000" + zxdh;
            } else if (zxdh.length == 4) {
                txt_str = "PL0000" + zxdh;
            } else if (zxdh.length == 3) {
                txt_str = "PL00000" + zxdh;
            }
        }
        jQuery("#field24523_" + xuh).val(txt_str);//装箱单号
        var fymxzy = jQuery("#field12193_" + xuh + "span").text();//费用文本 
        var _invoice=f_invoice;  //交票付款 0 是 1 否
        _invoice = jQuery("#" + _invoice).val();   //0901-2022060024 
        if (_invoice==1) {
            txt_str="NI_"+txt_str;
        }
        var frgs = jQuery("#field17291span").text();//法人公司名称20190307增加
        var fybm = jQuery("#field12192_" + xuh + "span").text();//费用编码
        // alert(fybm);
        var vat = jQuery("#disfield23457_" + xuh).find("option:selected").text(); // vat
        //alert(vat);
        if (vat != "") {
            jQuery("#field15671_" + xuh).val(txt_str + "_" + vat + "_" + fybm + "_" + fymxzy + "_" + frgs);//借方行项目文本
        } else {
            jQuery("#field15671_" + xuh).val(txt_str + "_" + fybm + "_" + fymxzy + "_" + frgs);//借方行项目文本
        }
        jQuery("#field15671_" + xuh + "span").text("");

        var sumje = jQuery("#field10620_" + xuh + "span").text().replace(/,/gm, '');//去掉千分位 ,
        jQuery("#field15674_" + xuh).val(sumje);         //借方金额
        jQuery("#field15674_" + xuh + "span").text("");  //借方金额

        var Clearancetype = jQuery("#field18747").val();   //清关类型

        // var _Costcompy = f_Costcompy;                      //成本归属
        // _Costcompy = jQuery("#" + _Costcompy).find("option:selected").text();

        var _Costcompy = jQuery("#disfield18575").find("option:selected").text();
        // alert(_Costcompy);
        //价税分离 这里首先判断价税分离, 后续用到
        //1 价税分离 
        //2 非价税分离
        var Priceandtax = 0;

        if (_Costcompy.indexOf("陶瓷") >= 0) {
            Priceandtax = 1;
        } else if (_Costcompy.indexOf("自有") >= 0) {
            if (Feebelongsdepname.indexOf("科特") >= 0 || Feebelongsdepname.indexOf("几内亚") >= 0 || Feebelongsdepname.indexOf("尼日利亚") >= 0) {
                Priceandtax = 2;
            } else {
                Priceandtax = 1;
            }
        } else if (_Costcompy.indexOf("贸易") >= 0) {
            if (Feebelongsdepname.indexOf("秘鲁") >= 0) {
                Priceandtax = 1;
            } else {
                Priceandtax = 2;
            }
        }


        var supplieraccount = jQuery("#field15720").val(); //供应商账号
        var suppliername = jQuery("#field15721").val();    //供应商名称
        //0 进口
        //2 出口转运
        //1 出口第三方
        if (Clearancetype == 0) {
            if (fybm == "ZB05" && Priceandtax == 1) {
                Inputtax(xuh);
            } else {
                Supplier(xuh, supplieraccount, suppliername);
            }
        } else if (Clearancetype == 2) {
            if (vat == "VAT" && Priceandtax == 1) {
                Inputtax(xuh)
            } else if (fybm == "ZC01" || fybm == "ZC91" || fybm == "ZS06") {
                Supplier(xuh, supplieraccount, suppliername);
            } else {
                CustomsDepartment(xuh);
            }

        } else if (Clearancetype == 1) {
            if (vat == "VAT" && Priceandtax == 1) {
                Inputtax(xuh);
            } else {
                CustomsDepartment(xuh);
            }
        }
    }
    //借方科目描述== 应交税费_应交增值税_进项税
    function Inputtax(xuh) {
        //alert("应交税费_应交增值税_进项税");
        jQuery("#field15670_" + xuh).val("40");//记账码
        jQuery("#field15670_" + xuh + "span").text("40");
        jQuery("#field15672_" + xuh).val("2221010200");//科目编号编号
        jQuery("#field15672_" + xuh + "span").text("2221010200");
        jQuery("#field15673_" + xuh).val("应交税费_应交增值税_进项税");//科目名称
    }
    //借方科目描述== 供应商
    function Supplier(xuh, supplieraccount, suppliername) {
        jQuery("#field15670_" + xuh).val("25");//记账码
        jQuery("#field15670_" + xuh + "span").text("25");
        jQuery("#field15672_" + xuh).val(supplieraccount);//科目编号编号
        jQuery("#field15672_" + xuh + "span").text(supplieraccount);
        jQuery("#field15673_" + xuh).val(suppliername);//科目名称
    }
    //借方科目描述== 营业费用_报关费
    function CustomsDepartment(xuh) {
        //alert("营业费用_报关费");
        jQuery("#field15670_" + xuh).val("40");//记账码
        jQuery("#field15670_" + xuh + "span").text("40");
        jQuery("#field15672_" + xuh).val("6601450000");//科目编号编号
        jQuery("#field15672_" + xuh + "span").text("6601450000");
        jQuery("#field15673_" + xuh).val("营业费用_报关费");//科目名称
        CostCenter(FeebelongsdepID, xuh);
    }
    // 获取 成本中心编码 成本中心名称
    function CostCenter(FeebelongsdepID, xuh) {
        var fieldname = "hsdm";
        var fieldnamet = "hsmc";
        var tablename = "CostAccountingCenter";
        var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + FeebelongsdepID + ")";
        Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
            jQuery("#field15724_" + xuh).val(data);//成本中心编号
            jQuery("#field15724_" + xuh + "span").text(data);
        });

        Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
            jQuery("#field15725_" + xuh).val(data);//成本中心名称
            jQuery("#field15725_" + xuh + "span").text("");
        });
    }

    function setdf(xuh) {
        var Clearancetype = jQuery("#field18747").val();//清关类型


        if (Clearancetype == 0) {
            //明细行只要含有费用编码等于ZB05、ZB04，【贷方原因代码】=[16]
            var num = parseFloat(jQuery("#indexnum0").val());//明细行数
            for (var index = 0; index < num; index++) {

                //var Costtext = jQuery("#field12193_" + index + "span").text();//费用文本
                var Costcode = jQuery("#field12192_" + index + "span").text();//费用编码
                if (Costcode.indexOf("ZB04") >= 0 || Costcode.indexOf("ZB05") >= 0) {
                    jQuery("#field15684_" + xuh).val("16");//原因代码编号
                    jQuery("#field15684_" + xuh + "span").text("16");
                    break;
                } else {
                    jQuery("#field15684_" + xuh).val("11");//原因代码编号
                    jQuery("#field15684_" + xuh + "span").text("11");
                }

            }

        } else {
            jQuery("#field15684_" + xuh).val("15");//原因代码编号
            jQuery("#field15684_" + xuh + "span").text("15");
        }
        jQuery("#field15679_" + xuh).val("50");//记账码
        jQuery("#field15679_" + xuh + "span").text("50");

        var fymxzy = jQuery("#field12193_0span").text();//摘要
        var _invoice=f_invoice;  //交票付款 0 是 1 否
        _invoice = jQuery("#" + _invoice).val();   //0901-2022060024 
        if (_invoice==1) {
            fymxzy="NI_"+fymxzy;
        }
        jQuery("#field15680_" + xuh).val(fymxzy);//文本
        jQuery("#field15680_" + xuh + "span").text("");

        var sumje = jQuery("#field10618span").text().replace(/,/gm, '');
        jQuery("#field15683_" + xuh).val(sumje);//金额
        jQuery("#field15683_" + xuh + "span").text("");

        jQuery("#field15685_" + xuh).val("购买商品、接受劳务支付的现金");//原因代码名称
        jQuery("#field15685_" + xuh + "span").text("");


    }



    if (spantxt) {//申请或编辑状态
        setpztt();
        var bt_add = parseFloat(jQuery("#indexnum0").val());
        var hsbt = parseFloat(jQuery("#indexnum1").val());

        if (hsbt < bt_add) {
            for (var i = 1; i < bt_add; i++) {
                addRow1(1);
            }
        }
    }

    checkCustomize = function () {
        return checksd_bz() && checktosap();
        //return checksd_bz();
    }

    function checkjdfje() {
        var jfje = 0;
        var sjf = document.getElementsByName("check_node_1");
        var sijf = sjf.length;
        for (var x = 0; x < sijf; x++) {
            var i = sjf[x].value;
            var jejf = jQuery("#field15674_" + i).val().replace(/,/gm, '');
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
            var jedf = jQuery("#field15683_" + j).val().replace(/,/gm, '');
            if (jedf == "") {
                jedf = "0"
            }
            dfje = dfje + parseFloat(jedf);
        }

        if (Math.formatFloat(jfje, 2) != Math.formatFloat(dfje, 2)) {
            alert("The amount of debit and credit is difference！");
            return false;
        }

        return true;
    }

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }

    function checksd_bz() {
        var bz_h = jQuery("#field10275").val();
        var df_node = document.getElementsByName("check_node_2");
        var df_l = df_node.length;
        for (var x = 0; x < df_l; x++) {
            var j = df_node[x].value;
            var km = jQuery("#field15681_" + j).val();
            var bz_str = jQuery("#field15682_" + j).val();
            var bzs = bz_str.split("_");

            if (isArray(bzs)) {
                if (km.substr(0, 4) == "1002") {
                    var bz_mx = bzs[2];
                    if (bz_mx != bz_h) {
                        alert("Currency mismatch!");
                        return false;
                    }
                } else if (km.substr(0, 4) == "1001") {
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

    function checktosap() {
        var flag = true;
        var total1 = jQuery("#field10618").val();   //表头付款金额
        var total2 = jQuery("#sumvalue15683").val();  //过账贷方金额
        var err = "贷方合计金额大于OA付款总金额，不能过账。 \n The total amount of credit is higher than the total payment amount,fail to submit to sap.";
        total1 = total1.replace(/\,/g, "");
        total1 = parseFloat(total1);
        total2 = parseFloat(total2);
        if (total1 < total2) {
            flag = false;
        }
        if (!flag) {
            alert(err);
        }
        return flag;
    }

    function isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    }

});