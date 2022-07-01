/*
    清关专项费用报销单
*/
jQuery(document).ready(function () {
    // 初始化
    var indexnum0 = 0;
    var reqid = jQuery("#requestid").val();
    if (document.getElementById("indexnum0")) {
        indexnum0 = document.getElementById("indexnum0").value * 1.0 - 1;
    }

    if (reqid > 0 && indexnum0 > -1) {
        for (var i = 0; i <= indexnum0; i++) {
            jQuery("#field10617_" + i).val("");
            bindZxdh(i);
        }
    }

    //更改金额重新加载
    jQuery("#indexnum0").bind("propertychange", function () {

        var indexnum2 = parseFloat(this.value) - 1;
        jQuery("#field10620_" + indexnum2).bind("change", function () {
            engje();
        });
    });



    function engje() {
        //calSum(0);
        var cnje = jQuery("#field10618span");
        var je = cnje.text().replace(/,/gm, '');
        var engje = jQuery("#field10621");
        var fieldname = "tmpje";
        var tablename = "(select dbo.f_num_eng(replace('" + je + "',',','')) tmpje) t";
        var strWhere = "1=1";
        Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
            engje.val(data);
            //alert(data);
            engje.css({
                "border": "0px"
            });
        });

        var sumsl = jQuery("#sumvalue13356").val().replace(/,/gm, '');
        if (sumsl != "" && sumsl != "0") {
            jQuery("#field13357").val(sumsl);
        } else {
            jQuery("#field13357").val("0");
        }
    }

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }

    //初始化设置字段只读
    function setreadonly() {
        SetCurr();
    }

    if (spantxt) {
        engje();
    }

    checkCustomize = function () {
        //engje();
        return true;
    }

    //更改币种，清空下面的币种
    jQuery("#field10275span").prev().bind("click",
        function () {
            SetCurr();
        });

    //点击添加按钮,触发事件
    jQuery("button[name='addbutton0']").bind("click", function () {
        jQuery("#field13357").attr("readonly", "readonly");

        SetCurr();

        //jQuery("#field10620_" + indexnum2).bind("change",function() {
        //    engje();
        //});

    });

    //设置兑换人民币汇率
    function SetCurr() {
        var indexnum = jQuery("#indexnum0").val() - 1;
        var mainhl = jQuery("#field12865").val();

        if (mainhl != "" && mainhl != "0") {
            mainhl = Math.round(parseFloat(mainhl) * 10000) / 10000;

            for (var x = 0; x <= indexnum; x++) {
                jQuery("#field12492_" + x).val(mainhl);

                jQuery("#field12492_" + x).attr("readonly", "readonly");
            }
        }

        for (var x = 0; x <= indexnum; x++) {
            jQuery("#field13356_" + x).attr("readonly", "readonly");
        }
        calSum(0);

        var sumsl = jQuery("#sumvalue13356").val().replace(/,/gm, '');
        if (sumsl != "" && sumsl != "0") {
            jQuery("#field13357").val(sumsl);
        } else {
            jQuery("#field13357").val("0");
        }
    }

    function getZxdInfo(zxdh, index) {
        if (zxdh != "") {
            jQuery.ajax({
                url: "/sunda/xy/3159/wfopt.jsp",
                data: {
                    "method": "getzxdinfo",
                    "zxdh": zxdh,
                    "ran": Math.random()
                },
                dataType: "json",
                success: function (res) {
                    jQuery("#field16298_" + index).val(res.DGDAT);
                    jQuery("#field16298_" + index + "span").text(res.DGDAT);

                    jQuery("#field23597_" + index).val(res.ACONT);
                    jQuery("#field23597_" + index + "span").text(res.ACONT);

                    jQuery("#field12427_" + index).val(res.ACONT);

                    jQuery("#field23598_" + index).val(res.MAGRV);
                    jQuery("#field23598_" + index + "span").text(res.MAGRV);

                    jQuery("#field23599_" + index).val(res.KUNNR);
                    jQuery("#field23599_" + index + "span").text(res.KUNNR);

                    //jQuery("#field23600_" + index).val(res.NAME1);
                    //jQuery("#field23600_"+index+"span").text(res.NAME1);
                }
            });
        } else {
            jQuery("#field16298_" + index).val("");
            jQuery("#field16298_" + index + "span").text("");

            jQuery("#field23597_" + index).val("");
            jQuery("#field23597_" + index + "span").text("");

            jQuery("#field23598_" + index).val("");
            jQuery("#field23598_" + index + "span").text("");

            jQuery("#field23599_" + index).val("");
            jQuery("#field23599_" + index + "span").text("");

            jQuery("#field23600_" + index).val("");
            jQuery("#field23600_" + index + "span").text("");
        }
    }

    // 初始化绑定
    jQuery("#indexnum0").bind("propertychange", function () {
        var indexnum0 = parseFloat(this.value) - 1;

        bindZxdh(indexnum0);
    });

    // 绑定 装箱单号
    function bindZxdh(index) {
        jQuery("#field13586_" + index).blur(function () {
            var zxdh = jQuery(this).val();
            getZxdInfo(zxdh, index);
        });
    }

    // 校验本单内重复
    function checkUserSubmit() {

        var flag = true;
        var indexnum0 = 0;
        if (document.getElementById("indexnum0")) {
            indexnum0 = document.getElementById("indexnum0").value * 1.0 - 1;
        }

        var _workflowid = jQuery("input[name='workflowid']").val();
        if (_workflowid != 371) {
            return true;
        }

        var _qglx = jQuery("#field18747").val();
        var ary = new Array();
        if (indexnum0 > -1) {
            var _qgtypeflag = false;
            var _fgs = jQuery("#field10267span").text();
            for (var i = 0; i <= indexnum0; i++) {
                var _zxd = jQuery("#field13586_" + i).val();
                var _fybm = jQuery("#field12192_" + i).val();
                var _vat = jQuery("#field23457_" + i).find("option:selected").text();

                var _flag = false;
                if (_fgs.indexOf("加纳") > -1) {
                    if (_fybm == "ZG15" || _fybm == "HB06" || _fybm == "ZG22" || _fybm == "ZG13") {
                        _flag = true;
                    }
                }

                if (!_flag) {
                    var _data = "";
                    if (_vat != "") {
                        _data = _zxd + "_" + _fybm + "_" + _vat;
                    } else {
                        _data = _zxd + "_" + _fybm;
                    }
                    ary.push(_data);
                }

                if (_qglx == 1) {
                    if (!_qgtypeflag) {
                        if (_fybm == "ZB04" || _fybm == "ZB05") {
                            _qgtypeflag = true;
                        }
                    }
                }
            }
        }

        var nary = ary.sort();
        for (var i = 0; i < ary.length; i++) {
            if (nary[i] == nary[i + 1]) {
                alert("Duplicate content：" + nary[i]);
                flag = false;
            }
        }

        // if(flag){
        // 	if(_qgtypeflag){
        // 		alert("出口业务不应产生进项税或关税\nExport business shall not generate input VAT OR DUTY");
        // 		flag = false;
        // 	}
        // }

        return flag;
    }

    // 自定义提交函数
    checkCustomize = function () {
        jQuery("#field23746").val(jQuery("#field-annexupload").val());

        //alert(jQuery("#field-annexupload").val());
        //alert(jQuery("#field23746").val());
        if (checkUserSubmit() && checked()) {
            return true;

        } else {
            return false;
        }
        return true;
    }/**/

    //0923-2022020029 modify 2022/4/6
    // 只填了添加check函数
    function checked() {
        var Clearancetype = jQuery("#field18747").val();//清关类型
        //0 进口(Imported)
        //2 分公司转运(TRANSFER)
        //1 出口第三方(Export)
        var Feebelongsdep = jQuery("#field15731span").text();//费用归属部门
        var flag = true;

        if (Clearancetype == 2) {
            var Importingnationalcode = jQuery("#field20919").val();// 进口国公司代码

            if (Importingnationalcode == "") {
                alert("进口国公司代码必填 \n" + "Importing country code Required");
                flag = false;
            }
            if (Feebelongsdep.indexOf("进出口") < 0) {
                alert("出口转运的费用归属部门应选出口国进出口部 \n" + "Transit Costs are recorded in exporting country's IED");
                flag = false;
            }

            var num = parseFloat(jQuery("#indexnum0").val());
            for (var index = 0; index < num; index++) {
                var Feecode = jQuery("#field12192_" + index + "span").text();//费用编码

                if (Feecode.indexOf("ZB04") >= 0 || Feecode.indexOf("ZB05") >= 0) {
                    alert("不是进口业务不应产生进项税或关税\n" + "It is not an imported business and should not generate input VAT or DUTY");
                    flag = false;
                }
            }
        } else if (Clearancetype == 1) {
            
            if (Feebelongsdep.indexOf("业务部") < 0&&Feebelongsdep.indexOf("销售") < 0||FeebelongsdepindexOf("渠道") < 0||FeebelongsdepindexOf("市场") < 0||FeebelongsdepindexOf("market") < 0) {
                alert("出口第三方的费用归属部门应选销售业务部\n" + "Export costs are recorded in Sales Department");
                flag = false;
            }


            var num = parseFloat(jQuery("#indexnum0").val());
            for (var index = 0; index < num; index++) {
                var Feecode = jQuery("#field12192_" + index + "span").text();//费用编码
                if (Feecode.indexOf("ZB04") >= 0 || Feecode.indexOf("ZB05") >= 0) {
                    alert("不是进口业务不应产生进项税或关税\n" + "It is not an import business and should not generate input VAT OR DUTY");
                    flag = false;
                }
            }
        }

        return flag;
    }

    jQuery("#field10621").attr("readonly", "readonly");
    jQuery("#field12865").attr("readonly", "readonly");
    jQuery("#field13357").attr("readonly", "readonly");
    jQuery("#field13356_0").attr("readonly", "readonly");
});

function submitRequests() {
    jQuery("#field23492").val("1");
    doSubmitBack(this);
}

function resetRequests() {
    var _url = window.location.href;
    window.location.href = _url.substring(0, _url.indexOf("&message="));
}