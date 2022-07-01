jQuery(document).ready(function () {

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

    function setjf(xuh) {
        jQuery("#field15670_" + xuh).val("25");//记账码
        jQuery("#field15670_" + xuh + "span").text("25");

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
        //var qglx = jQuery("#field18747").val();//清关类型        
        //0923-2022020029 modify 2022/4/6  该需求在过账节点新增变化
        //  当【清关类型】=[出口转运TRANSIT]时，在财务过账节点，借方【记账码】= 40，【会计科目】= [6601450000],【科目名称】=[营业费用_报关费]，【成本中心】=【费用归属部门】。
        //	当【清关类型】=[进口]，【费用编码】只要有一行费用编码等于ZB05、ZB04时，【贷方原因代码】=[16]，否则【贷方原因代码】=[11]；如果【清关类型】不等于[进口]则默认【贷方原因代码】=[15]。
        //0 进口(Imported)
        //2 分公司转运(TRANSFER)
        //1 出口第三方(Export)
        var Clearancetype = jQuery("#field18747").val();//清关类型
        var Feebelongsdep = jQuery("#field15731").val();//费用归属部门
        
        if (Clearancetype == 2) {
            
            jQuery("#field15670_" + xuh).val("40");//记账码
            jQuery("#field15670_" + xuh + "span").text("40");

            jQuery("#field15672_" + xuh).val("6601450000");//科目编号编号
            jQuery("#field15672_" + xuh + "span").text("6601450000");

            jQuery("#field15673_" + xuh).val("营业费用_报关费");//科目名称
            jQuery("#field15673_" + xuh + "span").text("");


            if (Feebelongsdep != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";
                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + Feebelongsdep + ")";
                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field15724_" + xuh).val(data);//成本中心编号
                    jQuery("#field15724_" + xuh + "span").text(data);
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
                    jQuery("#field15725_" + xuh).val(data);//成本中心名称
                    jQuery("#field15725_" + xuh + "span").text("");
                });
            }


        } else {
            
            var gysbh = jQuery("#field15720span").text();//供应商账号
            jQuery("#field15672_" + xuh).val(gysbh);//科目编号编号
            jQuery("#field15672_" + xuh + "span").text(gysbh);

            var gysmc = jQuery("#field15721span").text();//供应商名称
            jQuery("#field15673_" + xuh).val(gysmc);//科目名称
            jQuery("#field15673_" + xuh + "span").text("");
        }

        var fymxzy = jQuery("#field12193_" + xuh + "span").text();//摘要
        var fybm = jQuery("#field12192_" + xuh + "span").text();//费用编码
        var frgs = jQuery("#field17291span").text();//法人公司名称20190307增加

        var vat = jQuery("#disfield23457_" + xuh).find("option:selected").text(); // vat

        if (vat != "") {
            jQuery("#field15671_" + xuh).val(txt_str + "_" + vat + "_" + fybm + "_" + fymxzy + "_" + frgs);//文本
        } else {
            jQuery("#field15671_" + xuh).val(txt_str + "_" + fybm + "_" + fymxzy + "_" + frgs);//文本
        }

        jQuery("#field15671_" + xuh + "span").text("");

        //jQuery("#field15671_"+xuh).val("出口清关"+txt_str+"_"+fybm+"_"+fymxzy+"_"+frgs);//文本

        var sumje = jQuery("#field10620_" + xuh + "span").text().replace(/,/gm, '');
        jQuery("#field15674_" + xuh).val(sumje);//金额
        jQuery("#field15674_" + xuh + "span").text("");


        /*
                var wkid=jQuery("#workflowid").val();
                if(wkid=="344"){
                    jQuery("#field15670_"+xuh).val("40");//记账码
                    jQuery("#field15670_"+xuh+"span").text("40");
                    jQuery("#field15672_"+xuh).val("6401050000");//科目编号编号
                    jQuery("#field15672_"+xuh+"span").text("6401050000");
                    jQuery("#field15673_"+xuh).val("主营业务成本_其他差异");//科目名称
                }
        */

        var _cbgs = jQuery("#field18575").val();//成本归属
        var _fgs = jQuery("#field10267span").text();//清关部门
        var _vat = jQuery("#field12193_" + xuh + "span").text();//费用名称
        var _fybm = jQuery("#field12192_" + xuh).val();//费用编码

        if (_fgs.indexOf("秘鲁") > -1) {
            if (_fybm == "ZB05" && _vat.indexOf("VAT") > -1) {
                setkmjzm(xuh);
            }
        } else {
            if (_fgs.indexOf("科特") > -1) {
                if (_cbgs == 0) {
                    if (_fybm == "ZB05" && _vat.indexOf("VAT") > -1) {
                        setkmjzm(xuh);
                    }
                }
            } else {
                if (_cbgs == 0 || _cbgs == 1) {
                    if (_fybm == "ZB05" && _vat.indexOf("VAT") > -1) {
                        setkmjzm(xuh);
                    }
                }
            }
        }

        var _qglx = jQuery("#field18747").val();
        if (_qglx == 1) {
            jQuery("#field15670_" + xuh).val("40");//记账码
            jQuery("#field15670_" + xuh + "span").text("40");
            jQuery("#field15672_" + xuh).val("6601450000");//科目编号编号
            jQuery("#field15672_" + xuh + "span").text("6601450000");
            jQuery("#field15673_" + xuh).val("营业费用_报关费");//科目名称

            var fymxbmid = jQuery("#field15731").val();//归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";

                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";

                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field15724_" + xuh).val(data);//成本中心编号
                    jQuery("#field15724_" + xuh + "span").text(data);
                });
            }
        }
    }

    function setkmjzm(xuh) {
        jQuery("#field15670_" + xuh).val("40");//记账码
        jQuery("#field15670_" + xuh + "span").text("40");
        jQuery("#field15672_" + xuh).val("2221010200");//科目编号编号
        jQuery("#field15672_" + xuh + "span").text("2221010200");
        jQuery("#field15673_" + xuh).val("应交税费_应交增值税_进项税");//科目名称
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
            // if (Clearancetype == 0) {
            //     var Costtext = jQuery("#field12193_" + xuh + "span").text();//费用编码
            //     if (Costtext.indexOf("增值税") >= 0 || Costtext.indexOf("关税") >= 0 || Costtext.indexOf("其他税项") >= 0) {
            //         jQuery("#field15684_" + xuh).val("16");//原因代码编号
            //         jQuery("#field15684_" + xuh + "span").text("16");
            //     } else {
            //         jQuery("#field15684_" + xuh).val("11");//原因代码编号
            //         jQuery("#field15684_" + xuh + "span").text("11");
            //     }
        } else {
            jQuery("#field15684_" + xuh).val("15");//原因代码编号
            jQuery("#field15684_" + xuh + "span").text("15");
        }
        jQuery("#field15679_" + xuh).val("50");//记账码
        jQuery("#field15679_" + xuh + "span").text("50");

        var fymxzy = jQuery("#field12193_0span").text();//摘要
        jQuery("#field15680_" + xuh).val(fymxzy);//文本
        jQuery("#field15680_" + xuh + "span").text("");

        var sumje = jQuery("#field10618span").text().replace(/,/gm, '');
        jQuery("#field15683_" + xuh).val(sumje);//金额
        jQuery("#field15683_" + xuh + "span").text("");

        // jQuery("#field15684_" + xuh).val("11");//原因代码编号
        // jQuery("#field15684_" + xuh + "span").text("11");
        jQuery("#field15685_" + xuh).val("购买商品、接受劳务支付的现金");//原因代码名称
        jQuery("#field15685_" + xuh + "span").text("");

        //var gysbh=jQuery("#field9239span").text();//供应商账号
        //jQuery("#field9520_"+xuh).val(gysbh);//科目编号编号
        //jQuery("#field9520_"+xuh+"span").text(gysbh);
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