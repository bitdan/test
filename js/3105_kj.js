jQuery(document).ready(function () {

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }

    var _workflowid = jQuery("input[name='workflowid']").val();

    jQuery("#indexnum0").bind("propertychange", function () {
        var index0 = parseFloat(this.value) - 1;
        if (spantxt) {
            var indexnum2 = parseFloat(jQuery("#indexnum2").val());
            if (index0 < indexnum2) {
                setjf(index0);
            }
        }
    });

    jQuery("#indexnum1").bind("propertychange", function () {
        var index1 = parseFloat(this.value) - 1;
        if (spantxt) {
            if (index1 == "0") {
                setdf(index1);
            }
        }
    });

    function setpztt() {
        jQuery("#field9920").val("ZO");
        jQuery("#field9920span").text("");

        var lcbh = jQuery("#field8212span").text();
        jQuery("#field9500").val(lcbh);//参照
        jQuery("#field9500span").text("");

        var gs = jQuery("#field8216span").text();
        var fd = jQuery("#field8210span").text();
        var fx = jQuery("#field10472span").text();

        //  var tmp=jQuery("#field10735").val();
        //	jQuery("#field9496").val(tmp);//公司代码
        //	jQuery("#field9496span").text(tmp);
        //    if(tmp =="FK01" ){
        //	jQuery("#field9497").val("KENYA FACTORY");//公司代码名称
        //	jQuery("#field9497span").text("");
        //	}
        if (gs.indexOf("加纳") >= 0 && fd.indexOf("Accra") >= 0) {
            jQuery("#field9496").val("GH01");//公司代码
            jQuery("#field9496span").text("GH01");
            jQuery("#field9497").val("Sunda (GH) Investment");//公司代码名称
            jQuery("#field9497span").text("");
        }
        else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {
            jQuery("#field9496").val("GF01");//公司代码
            jQuery("#field9496span").text("GF01");
            jQuery("#field9497").val("Sunda (GF) Investment");//公司代码名称
            jQuery("#field9497span").text("");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("Kumasi") >= 0) {
            jQuery("#field9496").val("GH01");//公司代码
            jQuery("#field9496span").text("GH01");
            jQuery("#field9497").val("Sunda (GH) Investment");//公司代码名称
            jQuery("#field9497span").text("");
        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("HomePro") >= 0) {
            jQuery("#field9496").val("GH02");//公司代码
            jQuery("#field9496span").text("GH02");
            jQuery("#field9497").val("Homepro company Ltd");//公司代码名称
            jQuery("#field9497span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            jQuery("#field9496").val("RE01");//公司代码
            jQuery("#field9496span").text("RE01");
            jQuery("#field9497").val("Realestate company Ltd");//公司代码名称
            jQuery("#field9497span").text("");

        } else if (gs.indexOf("肯尼亚") >= 0) {

            jQuery("#field9496").val("KE01");//公司代码
            jQuery("#field9496span").text("KE01");
            jQuery("#field9497").val("Housemart(Kenya)");//公司代码名称
            jQuery("#field9497span").text("");
            if (fd.indexOf("基苏木陶") >= 0) {
                jQuery("#field9496").val("KF71");//公司代码
                jQuery("#field9496span").text("KF71");
                jQuery("#field9497").val("KEDA(Kisumu) CERAMICS");//公司代码名称
                jQuery("#field9497span").text("");
            } else if (fd.indexOf("肯尼亚瓷") >= 0) {
                jQuery("#field9496").val("KF01");//公司代码
                jQuery("#field9496span").text("KF01");
                jQuery("#field9497").val("KEDA(KENYA) CERAMICS");//公司代码名称
                jQuery("#field9497span").text("");
            } else if (fd.indexOf("肯尼亚纸") >= 0) {
                jQuery("#field9496").val("KF31");//公司代码
                jQuery("#field9496span").text("KF31");
                jQuery("#field9497").val("SUNDA(KENYA) INDUSTRIAL");//公司代码名称
                jQuery("#field9497span").text("");
            }
        } else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {

            jQuery("#field9496").val("TF01");//公司代码
            jQuery("#field9496span").text("TF01");
            jQuery("#field9497").val("Tanzania KEDS Factory");//公司代码名称
            jQuery("#field9497span").text("");
        } else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field9496").val("TF02");//公司代码
            jQuery("#field9496span").text("TF02");
            jQuery("#field9497").val("Twyford Tile (TZ) Factory");//公司代码名称
            jQuery("#field9497span").text("");

        } else if (gs.indexOf("坦桑") >= 0) {
            jQuery("#field9496").val("TZ01");//公司代码
            jQuery("#field9496span").text("TZ01");
            jQuery("#field9497").val("SUNDA (TZ)INVESTMENT");//公司代码名称
            jQuery("#field9497span").text("");
        } else if (gs.indexOf("秘鲁") >= 0) {
            jQuery("#field9496").val("PE01");//公司代码
            jQuery("#field9496span").text("PE01");
            jQuery("#field9497").val("SUNDA (PE)INVESTMENT");//公司代码名称
            jQuery("#field9497span").text("");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field9496").val("CO01");//公司代码
            jQuery("#field9496span").text("CO01");
            jQuery("#field9497").val("SUNDA (CO)INVESTMENT");//公司代码名称
            jQuery("#field9497span").text("");
        } else if (gs.indexOf("基苏木") >= 0) {

        }

        Action_Util.getCurrentDateTimeFormat("currentdate", function (data) {
            jQuery("#field9498").val(data);//过账日期
            jQuery("#field9498span").text(data);
            jQuery("#field9499").val(data);//凭证日期
            jQuery("#field9499span").text(data);
        });
    }

    function setjf(xuh) {

        jQuery("#field9504_" + xuh).val("25");//记账码
        jQuery("#field9504_" + xuh + "span").text("25");

        var fymxzy = jQuery("#field10131_" + xuh + "span").text();//摘要
        var _shsphfk = f_shsphfk; //收货收票后付款
        _shsphfk = jQuery("#" + _shsphfk).val();   //0901-2022060024 
        if (_shsphfk == 1) {
            fymxzy = "NI_" + fymxzy;
        }
        jQuery("#field9505_" + xuh).val(fymxzy);//文本
        jQuery("#field9505_" + xuh + "span").text("");

        var sumje = jQuery("#field10132_" + xuh + "span").text().replace(/,/gm, '');
        jQuery("#field9508_" + xuh).val(sumje);//金额
        jQuery("#field9508_" + xuh + "span").text("");

        var gysbh = jQuery("#field9239span").text();//供应商账号
        jQuery("#field9506_" + xuh).val(gysbh);//科目编号编号
        jQuery("#field9506_" + xuh + "span").text(gysbh);

        var gysmc = jQuery("#field9917span").text();//供应商名称
        jQuery("#field9507_" + xuh).val(gysmc);//科目名称
        jQuery("#field9507_" + xuh + "span").text("");

        if (gysbh == "VCN01") {
            jQuery("#field9504_" + xuh).val("09");//记账码
            jQuery("#field9504_" + xuh + "span").text("09");
            jQuery("#field22749_" + xuh).val("7");//科目名称
            jQuery("#field22749_" + xuh + "span").text("7");
            var fendian = jQuery("#field8210span").text();
            var fendiandm = "";
            var fendianmc = "";
            if (fendian.indexOf("加纳") >= 0) {
                fendiandm = "GF03";
                fendianmc = "加纳陶瓷厂";
            } else if (fendian.indexOf("塞内") >= 0) {
                fendiandm = "SN61";
                fendianmc = "塞内陶瓷厂";
            } else if (fendian.indexOf("坦桑") >= 0) {
                fendiandm = "TF02";
                fendianmc = "坦桑陶瓷厂";
            } else if (fendian.indexOf("肯尼亚") >= 0) {
                var _ffbm = jQuery("#field8214span").text(); // 费用承担部门
                if (_ffbm.indexOf("基苏木") > -1) {
                    fendiandm = "KF71";
                    fendianmc = "基苏木陶瓷厂";
                } else {
                    fendiandm = "KF01";
                    fendianmc = "肯尼亚陶瓷厂";
                }
            } else if (fendian.indexOf("赞比亚") >= 0) {
                fendiandm = "ZM61";
                fendianmc = "赞比亚陶瓷厂";
            } else if (fendian.indexOf("喀麦隆") >= 0) {
                fendiandm = "CM61";
                fendianmc = "喀麦隆陶瓷厂";
            }
            jQuery("#field9506_" + xuh).val(fendiandm);//科目编号编号
            jQuery("#field9506_" + xuh + "span").text(fendiandm);
            jQuery("#field9507_" + xuh).val(fendianmc);//科目名称
            jQuery("#field9507_" + xuh + "span").text("");
            jQuery("#field10664_" + xuh).val("CN01");//借方公司代码
            jQuery("#field10664_" + xuh + "span").text("CN01");
        } else if (gysbh == "VMU02") {
            jQuery("#field9504_" + xuh).val("09");//记账码
            jQuery("#field9504_" + xuh + "span").text("09");
            jQuery("#field22749_" + xuh).val("7");//科目名称
            jQuery("#field22749_" + xuh + "span").text("7");
            var fendian = jQuery("#field8210span").text();
            var fendiandm = "";
            var fendianmc = "";
            if (fendian.indexOf("加纳") >= 0) {
                fendiandm = "GF03";
                fendianmc = "加纳陶瓷厂";
            } else if (fendian.indexOf("塞内") >= 0) {
                fendiandm = "SN61";
                fendianmc = "塞内陶瓷厂";
            } else if (fendian.indexOf("坦桑") >= 0) {
                fendiandm = "TF02";
                fendianmc = "坦桑陶瓷厂";
            } else if (fendian.indexOf("肯尼亚") >= 0) {
                var _ffbm = jQuery("#field8214span").text(); // 费用承担部门
                if (_ffbm.indexOf("基苏木") > -1) {
                    fendiandm = "KF71";
                    fendianmc = "基苏木陶瓷厂";
                } else {
                    fendiandm = "KF01";
                    fendianmc = "肯尼亚陶瓷厂";
                }
            } else if (fendian.indexOf("赞比亚") >= 0) {
                fendiandm = "ZM61";
                fendianmc = "赞比亚陶瓷厂";
            } else if (fendian.indexOf("喀麦隆") >= 0) {
                fendiandm = "CM61";
                fendianmc = "喀麦隆陶瓷厂";
            }
            jQuery("#field9506_" + xuh).val(fendiandm);//科目编号编号
            jQuery("#field9506_" + xuh + "span").text(fendiandm);
            jQuery("#field9507_" + xuh).val(fendianmc);//科目名称
            jQuery("#field9507_" + xuh + "span").text("");
            jQuery("#field10664_" + xuh).val("MU02");//借方公司代码
            jQuery("#field10664_" + xuh + "span").text("MU02");
        }

        // 0901-2021100033 林卓海
        var _fknr = jQuery("#field23716").val();
        // 租赁押金
        if (_fknr == 1) {
            jQuery("#field9504_" + xuh).val("29");//记账码
            jQuery("#field9504_" + xuh + "span").text("29");

            jQuery("#field22749_" + xuh).val("H");//总账
            jQuery("#field22749_" + xuh + "span").text("H");
        } else if (_fknr == 2) {  // 保证金
            jQuery("#field9504_" + xuh).val("29");//记账码
            jQuery("#field9504_" + xuh + "span").text("29");

            jQuery("#field22749_" + xuh).val("3");//总账
            jQuery("#field22749_" + xuh + "span").text("3");
        }
    }

    function setdf(xuh) {
        jQuery("#field9511_" + xuh).val("50");//记账码
        jQuery("#field9511_" + xuh + "span").text("50");

        var fymxzy = jQuery("#field10131_0span").text();//摘要
        var _shsphfk = f_shsphfk; //收货收票后付款
        _shsphfk = jQuery("#" + _shsphfk).val();   //0901-2022060024 
        if (_shsphfk == 1) {
            fymxzy = "NI_" + fymxzy;
        }
        jQuery("#field9512_" + xuh).val(fymxzy);//文本
        jQuery("#field9512_" + xuh + "span").text("");

        var sumje = jQuery("#field9245span").text().replace(/,/gm, '');
        jQuery("#field9515_" + xuh).val(sumje);//金额
        jQuery("#field9515_" + xuh + "span").text("");

        // 原因代码编号 0305 默认代码为15 3105默认为11
        if (_workflowid == 164) {
            jQuery("#field9516_" + xuh).val("15");//原因代码编号
            jQuery("#field9516_" + xuh + "span").text("15");
            jQuery("#field9517_" + xuh).val("购买商品、接受劳务支付的现金");//原因代码名称
            jQuery("#field9517_" + xuh + "span").text("");
        } else {
            jQuery("#field9516_" + xuh).val("11");//原因代码编号
            jQuery("#field9516_" + xuh + "span").text("11");
            jQuery("#field9517_" + xuh).val("购买商品、接受劳务支付的现金");//原因代码名称
            jQuery("#field9517_" + xuh + "span").text("");
        }

        var gysbh = jQuery("#field9239span").text();//供应商账号
        if (gysbh == "VCN01") {
            jQuery("#field9516_" + xuh).val("17");//原因代码编号
            jQuery("#field9516_" + xuh + "span").text("17");
            jQuery("#field9517_" + xuh).val("森大付科达系资金或科达系付森大资金");//原因代码名称
            jQuery("#field9517_" + xuh + "span").text("");

            var fendian = jQuery("#field8210span").text();
            var fendiandm = "";
            if (fendian.indexOf("加纳") >= 0) {
                fendiandm = "GF03";
            } else if (fendian.indexOf("塞内") >= 0) {
                fendiandm = "SN61";
            } else if (fendian.indexOf("坦桑") >= 0) {
                fendiandm = "TF02";
            } else if (fendian.indexOf("肯尼亚") >= 0) {
                fendiandm = "KF01";
            } else if (fendian.indexOf("赞比亚") >= 0) {
                fendiandm = "ZM61";
            } else if (fendian.indexOf("喀麦隆") >= 0) {
                fendiandm = "CM61";
            }
            jQuery("#field12384_" + xuh).val(fendiandm);
            jQuery("#field12384_" + xuh + "span").text(fendiandm);

            var _ywfw = fendiandm;
            if (fendiandm == "GF03") {
                _ywfw = "GH04";
            } else if (fendiandm == "KF01") {
                _ywfw = "";
            } else if (fendiandm == "TF02") {
                _ywfw = "TZ04";
            }
            jQuery("#field12385_" + xuh).val(_ywfw);
            jQuery("#field12385_" + xuh + "span").text(_ywfw);
        } else if (gysbh == "VMU02") {
            jQuery("#field9516_" + xuh).val("17");//原因代码编号
            jQuery("#field9516_" + xuh + "span").text("17");
            jQuery("#field9517_" + xuh).val("森大付科达系资金或科达系付森大资金");//原因代码名称
            jQuery("#field9517_" + xuh + "span").text("");

            var fendian = jQuery("#field8210span").text();
            var fendiandm = "";
            if (fendian.indexOf("加纳") >= 0) {
                fendiandm = "GF03";
            } else if (fendian.indexOf("塞内") >= 0) {
                fendiandm = "SN61";
            } else if (fendian.indexOf("坦桑") >= 0) {
                fendiandm = "TF02";
            } else if (fendian.indexOf("肯尼亚") >= 0) {
                fendiandm = "KF01";
            } else if (fendian.indexOf("赞比亚") >= 0) {
                fendiandm = "ZM61";
            } else if (fendian.indexOf("喀麦隆") >= 0) {
                fendiandm = "CM61";
            }
            jQuery("#field12384_" + xuh).val(fendiandm);
            jQuery("#field12384_" + xuh + "span").text(fendiandm);

            var _ywfw = fendiandm;
            if (fendiandm == "GF03") {
                _ywfw = "GH04";
            } else if (fendiandm == "KF01") {
                _ywfw = "";
            } else if (fendiandm == "TF02") {
                _ywfw = "TZ04";
            }
            jQuery("#field12385_" + xuh).val(_ywfw);
            jQuery("#field12385_" + xuh + "span").text(_ywfw);
        } else {
            jQuery("#field9520_" + xuh).val(gysbh);//贷方供应商账号
            jQuery("#field9520_" + xuh + "span").text(gysbh);
        }
    }



    if (spantxt) {//申请或编辑状态
        setpztt();
        var indexnum2 = parseFloat(jQuery("#indexnum2").val());
        for (var i = 1; i < indexnum2; i++) {
            addRow0(0);
        }
        /*jQuery.ajax({
            url: "/sunda/xy/commom/opt.jsp",
            data: {
                "method": "clearjf",
                "requestid": jQuery("#requestid").val(),
                "ran": Math.random()
            },
            dataType: "json",
            success: function(res) {
                alert(res.msg);
                if (res.code == "200") {
                    var indexnum2 = parseFloat(jQuery("#indexnum2").val());
                    for(var i=1;i<indexnum2;i++){
                        addRow0(0);
                    }
                }
            }
        });*/
    }

    checkCustomize = function () {
        return checkjdfje();
    }

    function checkjdfje() {
        var jfje = 0;
        var sjf = document.getElementsByName("check_node_0");
        var sijf = sjf.length;
        for (var x = 0; x < sijf; x++) {
            var i = sjf[x].value;
            var jejf = jQuery("#field9508_" + i).val().replace(/,/gm, '');
            if (jejf == "") {
                jejf = "0"
            }
            jfje = jfje + parseFloat(jejf);
        }

        var dfje = 0;
        var sdf = document.getElementsByName("check_node_1");
        var sidf = sdf.length;
        for (var x = 0; x < sidf; x++) {
            var j = sdf[x].value;
            var jedf = jQuery("#field9515_" + j).val().replace(/,/gm, '');
            if (jedf == "") {
                jedf = "0"
            }
            dfje = dfje + parseFloat(jedf);
        }

        //if(Math.formatFloat(jfje,2)!=Math.formatFloat(dfje,2)){
        if (parseFloat(changeTwoDecimal_f(jfje)) != parseFloat(changeTwoDecimal_f(dfje))) {
            alert("借贷方金额不相等！");
            return false;
        }

        return true;
    }

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }

    function changeTwoDecimal_f(x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return '0.00';
        }
        var f_x = Math.round(x * 100) / 100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    }

});

