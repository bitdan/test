jQuery(document).ready(function () {
    /*
    <script src="/dwr/interface/Action_Util.js"></script>
    <p>　　</p>
    <script src="/dwr/engine.js"></script>
    <p>　　</p>
    <script src="/dwr/util.js"></script>
    <p>　　</p>
    <script src="/sunda/js/fybx0304/tj.js"></script>
    */
    //-------------------------开始

    window.onload = setreadonly;
    var fFacData = "";

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }

    // 初始化数据
    initRelData();

    function initRelData() {
        inittfFacData();
    }

    function inittfFacData() {
        // 陶瓷厂
        jQuery.ajax({
            url: "/sunda/xy/commom/opt.jsp",
            data: {
                "method": "getTfFac",
                "ran": Math.random()
            },
            dataType: "json",
            success: function (res) {
                fFacData = "," + res.msg + ",";
            }
        });
    }

    jQuery("#indexnum0").bind("propertychange", function () {
        var indexnum0 = parseFloat(this.value) - 1;
        setbz();

        //费用确认部门
        jQuery("#field6691_" + indexnum0).bind("propertychange", function () {
            var bm = jQuery("#field6691_" + indexnum0).val();
            if (bm != "") {
                fycdbm();
            }
        });

        //业务金额
        jQuery("#field10706_" + indexnum0).bind("change", function () {
            getFnaInfoDataColor();
            calSum(0);
        });


        //汇率
        jQuery("#field10705_" + indexnum0).bind("propertychange", function () {
            calSum(0);
        });


    });


    //更改付款币种，清空下面的币种
    jQuery("#field6572").bind("propertychange", function () {
        var indexnum = jQuery("#indexnum0").val() - 1;
        var bz = jQuery("#field9804").val();

        if (bz != "") {
            for (var x = 0; x <= indexnum; x++) {
                var row_bz = jQuery("#field10704_" + x);

                jQuery("#field10704_" + x).val(bz);
                jQuery("#field10704_" + x + "span").text(bz);
                jQuery("#field10705_" + x).val("1.0000");


                //如果已经填写业务金额,给人民币金额赋值
                var ywje = jQuery("#field10706_" + x).val();
                var mainhl = jQuery("#field6572").val();
                var rowhl = jQuery("#field10705_" + x).val();

                jQuery("#field13487_" + x).val(mainhl);

                if (rowhl != "" && ywje != "" && mainhl != "" && rowhl != "0" && ywje != "0" && mainhl != "0") {
                    var rmb_je = Math.round(parseFloat(mainhl) * parseFloat(rowhl) * parseFloat(ywje) * 100) / 100;

                    jQuery("#field6603_" + x).val(rmb_je);
                } else {
                    jQuery("#field6603_" + x).val("");
                }
            }
        } else {
            var row_bz = jQuery("#field10704_" + x);
            jQuery("#field10704_" + x).val("");
            jQuery("#field10704_" + x + "span").text("");
            jQuery("#field10705_" + x).val("");
            jQuery("#field6603_" + x).val("");
        }

    });


    //初始化设置字段只读
    function setreadonly() {

        jQuery("#field6963").attr("readonly", "readonly");  //供应商名称
        jQuery("#field10222").attr("readonly", "readonly"); //剩余未还款金额

        var indexnum = jQuery("#indexnum0").val() - 1;

        for (var x = 0; x <= indexnum; x++) {
            jQuery("#field10705_" + x).attr("readonly", "readonly"); //兑换汇率
            jQuery("#field6603_" + x).attr("readonly", "readonly");  //人民币
            jQuery("#field13487_" + x).attr("readonly", "readonly");  //人民币汇率

            //更改金额
            jQuery("#field10706_" + x).bind("change", function () {
                setbz();
                getFnaInfoDataColor();
            });


            //汇率
            jQuery("#field10705_" + x).bind("propertychange", function () {
                setbz();
            });

        }
        calSum(0);
    }

    function checkxtzmr() {
        var xtzmr = jQuery("#field23331").val();
        var _hv = jQuery("#field6572").val();
        if (_hv == "") _hv = 0;
        var hasTcc = 0;
        var hasNoTcc = 0;
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var kmval = jQuery("#field9762_" + i).val();
            var ywje = jQuery("#field10706_" + i).val() * 1.0;
            var _mhv = jQuery("#field10705_" + i).val() * 1.0;
            if (kmval == "114" && xtzmr == "" && (ywje * _hv * _mhv >= 10000)) {
                alert("协调费证明人 必填！ \n Certifier of coordination fee is mandatory");
                return false;
            }

            if (kmval == "114" && (ywje * _hv * _mhv >= 10000) && xtzmr.indexOf(",") == -1) {
                alert("协调费证明人数必须两人以上，请重新填写！");
                return false;
            }
        }
        return true;
    }


    //协助确认费用部门
    function fycdbm() {

        var bms = "", strbms = "";
        var fybms = jQuery("#field10105").val();
        jQuery("#field10105").val("");
        jQuery("#field10105span").text("");
        jQuery("#field10105span").prev().attr("disabled", "disabled");
        var s = document.getElementsByName("check_node_0");
        var si = s.length;

        var bxrbm = jQuery("#field10162").val();
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var bm = jQuery("#field6691_" + i).val();
            var strbm = jQuery("#field6691_" + i + "span").text();

            if (check_bm(bms, bm)) {
                if (bxrbm != bm) {
                    bms = bms + "," + bm;
                    strbms = strbms + " " + strbm;
                }
            }
        }

        if (bms != "") {
            bms = bms.substr(1);
        }
        jQuery("#field10105").val(bms);
        jQuery("#field10105span").text(strbms);

        bms = "";
        strbms = "";
        jQuery("#field15732").val("");
        jQuery("#field15732span").text("");
        jQuery("#field15732span").prev().attr("disabled", "disabled");
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var bm = jQuery("#field6691_" + i).val();
            var strbm = jQuery("#field6691_" + i + "span").text();
            if (strbm.indexOf("陶瓷厂") > -1) {
                if (check_bm(bms, bm)) {
                    bms = bms + "," + bm;
                    strbms = strbms + " " + strbm;
                }
            }
        }

        if (bms != "") {
            bms = bms.substr(1);
        }
        jQuery("#field15732").val(bms);
        //jQuery("#field15732span").text(strbms);
        jQuery("#field15732span").hide();
    }

    jQuery("#field16135").hide();

    function checkbmOfTcc() {
        var sfkm = 0;
        var hasTcc = 0;
        var hasNoTcc = 0;
        var zpNo = 0;
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var strbmval = jQuery("#field6691_" + i).val();
            if (fFacData.indexOf("," + strbmval + ",") > -1) {
                hasTcc = 1;
            } else {
                hasNoTcc = 1;
            }

            /*var strbm = jQuery("#field6691_" + i + "span").text();
            if (strbm.indexOf("陶瓷厂") > -1) {
                hasTcc = 1;
            } else {
                hasNoTcc = 1;
            }*/
            var km3j = jQuery("#field9762_" + i + "span").text();
            if (km3j.indexOf("员工关怀") > -1) {
                sfkm = 1;
            } else if (km3j.indexOf("招聘费_猎头招聘费") > -1) {
                zpNo = 1;
            } else if (km3j.indexOf("招聘费_面试人员补贴") > -1) {
                zpNo = 1;
            }
        }
        if (sfkm == 1) {
            jQuery("#field16135").attr("checked", "checked");
        } else {
            jQuery("#field16135").attr("checked", "");
        }
        if (hasTcc == 1 && hasNoTcc == 1) {
            alert("费用承担部门不能同时出现“陶瓷厂” 和 “非陶瓷厂” 部门！");
            return false;
        }
        if (zpNo == 1) {
            alert("猎头招聘费/面试人员补贴，请提交“0325”猎头费专用流程");
            return false;
        }
        return true;
    }

    function checkRentalfees() {
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        var flag = true;
        var _bm = "0";
        var _km = "";
        var fybm = jQuery("#field10162span").text();
        if (fybm.indexOf("物流单证部") > -1) {
            _bm = "1";
        }
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var km3j = jQuery("#field9762_" + i + "span").text();
            if (km3j.indexOf("租赁费_仓库") > -1) {
                _km = "1";
            }
            if (km3j.indexOf("Rental fees_Warehouse") > -1) {
                _km = "1";
            }
        }
        if (_bm == "0" && _km == "1") {
            alert("报销科目含有仓库租赁费，发生人部门应该为物流单证部!");
            flag = false;
        }
        return flag;
    }

    // function checkBudgetfee() {
    //     var mx = document.getElementsByName("check_node_0");
    //     var mxs = mx.length;

    //     for (var h = 0; h < mxs; h++) {
    //         var c = mx[h].value;
    //         var km2j = jQuery("#field9761_" + c + "span").text().substr(0, 4);
    //         var deptype = jQuery("#disfield22616_" + c).find("option:selected").val();
    //         var rownum = c * 1 + 1;
    //         //alert(rownum+"_"+deptype+"_"+km2j);
    //         if ((deptype == "0" && km2j == "5101") || (deptype == "0" && km2j == "5001")) {//非生产部门
    //             alert("第" + rownum + "行的科目与部门不匹配，非生产性部门不能入制造费用、生产成本类科目\nThe item in line " + rownum + " does not match the department, Manufacturing expenses, production cost accounts should be used in the factory production department.");
    //             return false;
    //         } else if ((deptype == "1" && km2j == "6601") || (deptype == "1" && km2j == "5001")) { //间接
    //             alert("第" + rownum + "行的科目与部门不匹配，间接生产性部门不能入营业费用、生产成本类科目\nThe items in line " + rownum + " do not match the department, Business expense and production cost shouldn’t be used in indirect production department.");
    //             return false;
    //         } else if (deptype == "2" && km2j == "6601") {  //直接
    //             alert("第" + rownum + "行的科目与部门不匹配，直接生产性部门不能入营业费用类科目\nThe item in line " + rownum + " does not match the department, Operating expenses shouldn’t be used in direct productive departments.")
    //             return false;
    //         } else if ((deptype == "3" && km2j == "5101") || (deptype == "3" && km2j == "5001")) {
    //             alert("第" + rownum + "行的科目与部门不匹配，未投产工厂部门不能入制造费用、生产成本类科目\nThe item in line " + rownum + " does not match the department, nonactive plant shouldn't use Manufacturing expenses, production cost accounts.");
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    //点添加按钮,自动给下面币种赋值
    function setbz() {
        var indexnum = jQuery("#indexnum0").val() - 1;
        for (var x = 0; x <= indexnum; x++) {
            jQuery("#field10705_" + x).attr("readonly", "readonly");
            jQuery("#field6603_" + x).attr("readonly", "readonly");
        }

        var bz = jQuery("#field9804").val();

        if (bz != "") {
            if (jQuery("#field10704_" + indexnum).val() == "") {
                jQuery("#field10704_" + indexnum).val(bz);
                jQuery("#field10704_" + indexnum + "span").text(bz);
                jQuery("#field10705_" + indexnum).val("1.0000");
            }

            var mainhl = jQuery("#field6572").val();

            for (var x = 0; x <= indexnum; x++) {
                var row_bz = jQuery("#field10704_" + x);

                jQuery("#field13487_" + x).val(mainhl);
                if (row_bz.val() == "") {
                    jQuery("#field10704_" + x).val(bz);
                    jQuery("#field10704_" + x + "span").text(bz);
                    jQuery("#field10705_" + x).val("1.0000");

                    //如果已经填写业务金额,给付款金额和人民币金额赋值

                    var ywje = jQuery("#field10706_" + x).val();

                    if (ywje != "") {
                        jQuery("#field6603_" + x).val(ywje);

                    }

                }
            }
        }
        calSum(0);
    }


    function check_bm(fybms, bmid) {
        if (fybms == "") {
            return true;
        } else {
            fybms = "," + fybms + ",";
            bmid = "," + bmid + ",";
            if (fybms.indexOf(bmid) == -1) {
                return true;
            } else {
                return false;
            }
        }
    }


    if (spantxt) {
        fycdbm();
    }

    checkCustomize = function () {
        if (spantxt) {
            getFnaInfoDataColor();
            fycdbm();
        }
        //该需求要求去掉  0923-2022040005
        return checkxtzmr() && checkbmOfTcc() && checkRentalfees();
        // return checkxtzmr() && checkbmOfTcc() && checkRentalfees() && checkBudgetfee();
    }


    //-------------------------结束

});