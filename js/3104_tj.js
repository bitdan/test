jQuery(document).ready(function () {

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
        //费用承担部门
        jQuery("#field11509_" + indexnum0).bind("propertychange", function () {
            var bm = jQuery("#field11509_" + indexnum0).val();
            if (bm != "") {
                fycdbm();
            }
        });
        //冲借支字段
        jQuery("#field11531_" + indexnum0).click(function () {
            checkjzs();
        });
    });


    //给币种赋值(firefox)
    jQuery("button[name='addbutton0']").bind("click", function () {
        setbz();

        if (document.getElementById("indexnum0")) {
            indexnum0 = document.getElementById("indexnum0").value * 1.0 - 1;
        }

        //业务金额
        jQuery("#field11547_" + indexnum0).bind("change", function () {
            setEngje();
        });

        //更改业务币种
        jQuery("#field11545span" + indexnum0).prev().bind("click", function () {
            setEngje();
        });

        //冲借支字段
        jQuery("#field11531_" + indexnum0).click(function () {
            checkjzs();
        });
    });


    //初始化设置字段只读
    function setreadonly() {
        jQuery("#field11467").attr("readonly", "readonly");  //供应商名称
        jQuery("#field11488").attr("readonly", "readonly");  //剩余未还款金额
        jQuery("#field11508").attr("readonly", "readonly");  //英文金额
        jQuery("#field11481").attr("readonly", "readonly");  //兑人民币汇率

        var indexnum = jQuery("#indexnum0").val() - 1;
        for (var x = 0; x <= indexnum; x++) {
            jQuery("#field11546_" + x).attr("readonly", "readonly");  //兑换汇率
            jQuery("#field13223_" + x).attr("readonly", "readonly");  //type


            //更改金额
            jQuery("#field11547_" + x).bind("change", function () {
                setEngje();
            });

            //汇率
            jQuery("#field11545span" + x).prev().bind("click", function () {
                setEngje();
            });

        }
    }


    function PingBi(id) {
        var k = window.event.keyCode;
        if (k == id) {
            window.event.keyCode = 0;
            window.event.returnValue = false;
            return false;
        }
    }

    function checkxtzmr() {
        var xtzmr = jQuery("#field16211").val();
        xtzmr = jQuery("#field23329").val(); // 新
        var _hv = jQuery("#field11481").val();
        if (_hv == "") _hv = 0;
        var hasTcc = 0;
        var hasNoTcc = 0;
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var kmval = jQuery("#field11535_" + i).val();
            var ywje = jQuery("#field11547_" + i).val() * 1.0;
            var _mhv = jQuery("#field11546_" + i).val() * 1.0;
       
            if (kmval == "114" && xtzmr == "" && (ywje * _hv * _mhv >= 10000)) {
                alert("协调费证明人 必填！ \n Certifier of coordination fee is mandatory");
                return false;
            }

            if (kmval == "114" && (ywje * _hv * _mhv >= 10000) && xtzmr.indexOf(",") == -1) {
                alert("大额协调费需要两名中方员工在场见证款项实际支付");
                return false;
            }
            if (kmval == "114" && (ywje * _hv * _mhv <= 10000) && xtzmr != "") {
                alert("协调费金额没有大于1万元无需填写证明人，请删除！");
                return false;
            }

            var strbmval = jQuery("#field11509_" + i).val();
            if (fFacData.indexOf("," + strbmval + ",") > -1) {
                hasTcc = 1;
            } else {
                hasNoTcc = 1;
            }

        }
        if (hasTcc == 1 && hasNoTcc == 1) {
            alert("费用承担部门不能同时出现“陶瓷厂” 和 “非陶瓷厂” 部门！ \n The expense-bearing department cannot simultaneously appear in the “ceramic factory” and “non-ceramic factory” departments!");
            return false;
        }
        return true;
    }

    function checkRentalfees() {
        var mx22 = document.getElementsByName("check_node_0");
        var mxs = mx22.length;
        var flag = true;
        var _bm = "0";
        var _km = "";
        var fybm = jQuery("#field11469span").text();
        if (fybm.indexOf("仓储") > -1) {
            _bm = "1";
        }
        for (var h = 0; h < mxs; h++) {
            var c = mx22[h].value;
            var km3j = jQuery("#field11535_" + c + "span").text();
            if (km3j.indexOf("租赁费_仓库") > -1) {
                _km = "1";
            }
            if (km3j.indexOf("Rental fees_Warehouse") > -1) {
                _km = "1";
            }
        }
        if (_bm == "0" && _km == "1") {
            alert("报销科目含有仓库租赁费，表头发生人部门应该为仓储部！\nThe account title contains warehouse rental fee, and the Department of the originator should be the warehouse department.");
            flag = false;
        }
        return flag;
    }

    function Checklength() {
        var message = "费用发生人工号过长";
        var flag = true;
        var mx22 = document.getElementsByName("check_node_0");;//取明细表总行数
        var mxs = mx22.length;
        for (var i = 0; i < mxs; i++) {
            var c = mx22[i].value;
            var miantxt_mx = jQuery("#field22888_" + c).val();
            var mx_length = miantxt_mx.length;
            if (mx_length > 7) {
                flag = false;
            }
        }
        if (!flag) {
            alert(message);
        }
        return flag;
    }

    function checkBudgetfee() {
        var mx = document.getElementsByName("check_node_0");
        var mxs = mx.length;

        for (var h = 0; h < mxs; h++) {
            var c = mx[h].value;
            var km2j = jQuery("#field11534_" + c + "span").text().substr(0, 4);
            var deptype = jQuery("#disfield22614_" + c).find("option:selected").val();
            var rownum = c * 1 + 1;
            //alert(rownum+"_"+deptype+"_"+km2j);
            if ((deptype == "0" && km2j == "5101") || (deptype == "0" && km2j == "5001")) {//非生产部门
                alert("第" + rownum + "行的科目与部门不匹配，非生产性部门不能入制造费用、生产成本类科目\nThe item in line " + rownum + " does not match the department, Manufacturing expenses, production cost accounts should be used in the factory production department.");
                return false;
            } else if ((deptype == "1" && km2j == "6601") || (deptype == "1" && km2j == "5001")) { //间接
                alert("第" + rownum + "行的科目与部门不匹配，间接生产性部门不能入营业费用、生产成本类科目\nThe items in line " + rownum + " do not match the department, Business expense and production cost shouldn’t be used in indirect production department.");
                return false;
            } else if (deptype == "2" && km2j == "6601") {  //直接
                alert("第" + rownum + "行的科目与部门不匹配，直接生产性部门不能入营业费用类科目\nThe item in line " + rownum + " does not match the department, Operating expenses shouldn’t be used in direct productive departments.")
                return false;
            } else if ((deptype == "3" && km2j == "5101") || (deptype == "3" && km2j == "5001")) {
                alert("第" + rownum + "行的科目与部门不匹配，未投产工厂部门不能入制造费用、生产成本类科目\nThe item in line " + rownum + " does not match the department, nonactive plant shouldn't use Manufacturing expenses, production cost accounts.");
                return false;
            }
        }
        return true;
    }

    function checkjzs() {
        var mx22 = document.getElementsByName("check_node_0");
        var mxs = mx22.length;
        var flag = true;
        var _zj = "0";
        var xglc = jQuery("#field11489").val();
        for (var h = 0; h < mxs; h++) {
            var c = mx22[h].value;
            var jz = jQuery("#field11531_" + c).attr("checked");
            if (jz) {
                _zj = "1";
            }
        }
        if (xglc == "" && _zj == "1") {
            alert("冲借支，请添加对应的借款OA！\nIf you choose Clear loan,please add the related loan OA.");
            jQuery("#field11489span").html("<img src='/images/BacoError.gif'>");
            flag = false;
        } else if (xglc == "" && _zj == "0") {
            jQuery("#field11489span").html("");
        }
        return flag;
    }

    //协助确认费用部门
    jQuery("#field16136").hide();
    jQuery("#field16985").hide();
    jQuery("#field17704").hide();//福利费_医疗费
    jQuery("#field17846").hide();//应交税费
    jQuery("#field17964").hide();
    jQuery("#field17965").hide();

    function fycdbm() {
        var sfkm = 0;
        var sfjj = 0;
        var ylf = 0;//福利费_医疗费
        var yjs = 0;//应交税费
        var hasTcc = 0;
        var hasNoTcc = 0;
        var bms = "", strbms = "";
        var fybms = jQuery("#field11468").val(); //Э????????
        jQuery("#field11468").val("");
        jQuery("#field11468span").text("");
        jQuery("#field11468span").prev().attr("readonly", "readonly");
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        var bxrbm = jQuery("#field11469").val();
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var bm = jQuery("#field11509_" + i).val();
            var strbm = jQuery("#field11509_" + i + "span").text();
            if (strbm.indexOf("陶瓷厂") > -1) {
                hasTcc = 1;
            } else if (strbm.indexOf("科达") > -1) {
                hasTcc = 1;
            } else {
                hasNoTcc = 1;
            }
            if (check_bm(bms, bm)) {
                if (bxrbm != bm) {
                    bms = bms + "," + bm;
                    strbms = strbms + " " + strbm;
                }
            }
            var km3j = jQuery("#field11535_" + i + "span").text();
            if (km3j.indexOf("员工关怀") > -1) {
                sfkm = 1;
            }
            if (km3j.indexOf("Overseas Chinese Employee care") > -1) {
                sfkm = 1;
            }
            if (km3j.indexOf("奖金_外方员工") > -1) {
                sfjj = 1;
            }
            if (km3j.indexOf("福利费_医疗费") > -1) {
                ylf = 1;
            }
            if (km3j.indexOf("应交税费_未交增值税") > -1) {
                yjs = 1;
            }
            if (km3j.indexOf("应交税费_企业所得税") > -1) {
                yjs = 1;
            }
            if (km3j.indexOf("应交税费_应交增值税_预交税款") > -1) {
                yjs = 1;
            }
            if (km3j.indexOf("应交税费_其他税费N") > -1) {
                yjs = 1;
            }
            if (km3j.indexOf("应交税费_企业所得税N") > -1) {
                yjs = 1;
            }
            if (km3j.indexOf("应交税费_未交增值税N") > -1) {
                yjs = 1;
            }
        }

        if (hasTcc == 1) {
            jQuery("#field17964").attr("checked", "checked");
        } else {
            jQuery("#field17964").attr("checked", "");
        }

        if (hasNoTcc == 1) {
            jQuery("#field17965").attr("checked", "checked");
        } else {
            jQuery("#field17965").attr("checked", "");
        }

        if (sfkm == 1) {
            jQuery("#field16136").attr("checked", "checked");
        } else {
            jQuery("#field16136").attr("checked", "");
        }

        if (sfjj == 1) {
            jQuery("#field16985").attr("checked", "checked");
        } else {
            jQuery("#field16985").attr("checked", "");
        }

        if (ylf == 1) {
            jQuery("#field17704").attr("checked", "checked");
        } else {
            jQuery("#field17704").attr("checked", "");
        }

        if (yjs == 1) {
            jQuery("#field17846").attr("checked", "checked");
        } else {
            jQuery("#field17846").attr("checked", "");
        }

        if (bms != "") {
            bms = bms.substr(1);
        }

        jQuery("#field11468").val(bms);
        jQuery("#field11468span").text(strbms);

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
        getcount();
    }



    checkCustomize = function () {
        if (spantxt) {
            fycdbm();
            getcount();
        }
        //        return checkxtzmr() && checkRentalfees() && checkjzs() && checkBudgetfee() && Checklength();
        return checkxtzmr() && checkRentalfees() && checkjzs() && Checklength();
    }


    //点添加按钮,自动给下面币种赋值
    function setbz() {
        var indexnum = jQuery("#indexnum0").val() - 1;
        for (var x = 0; x <= indexnum; x++) {
            jQuery("#field11546_" + x).attr("readonly", "readonly");
            jQuery("#field13223_" + x).attr("readonly", "readonly");  //type

        }
        var bz = jQuery("#field11473").val();
        if (bz != "") {

            var mainhl = jQuery("#field11481").val();
            jQuery("#field12447_" + indexnum).val(mainhl);

            if (jQuery("#field11545_" + indexnum).val() == "") {
                jQuery("#field11545_" + indexnum).val(bz);
                jQuery("#field11545_" + indexnum + "span").text(bz);
                jQuery("#field11546_" + indexnum).val("1.0000");
            }

            for (var x = 0; x <= indexnum; x++) {
                var row_bz = jQuery("#field11545_" + x);
                if (row_bz.val() == "") {
                    jQuery("#field11545_" + x).val(bz);
                    jQuery("#field11545_" + x + "span").text(bz);
                    jQuery("#field11546_" + x).val("1.0000");
                }
            }
        }
        calSum(0);
    }

    //更改付款币种，清空下面的币种
    jQuery("#field11473span").prev().bind("click", function () {

        jQuery("#field11481").attr("readonly", "readonly");  //兑人民币汇率
        var indexnum = jQuery("#indexnum0").val() - 1;
        var bz = jQuery("#field11473").val();
        if (bz != "") {
            for (var x = 0; x <= indexnum; x++) {
                var row_bz = jQuery("#field11545_" + x);
                jQuery("#field11545_" + x).val(bz);
                jQuery("#field11545_" + x + "span").text(bz);
                jQuery("#field11546_" + x).val("1.0000");
            }
        }
        calSum(0);

        var gs = jQuery("#field11471span").text();
        if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field11466").val("99999999");
            jQuery("#field11466span").text("99999999");
        }
    });


    //读取英文翻译
    function setEngje() {
        calSum(0);
        var cnje = jQuery("#field11501span"); //付款金额
        var je = cnje.text().replace(/,/gm, '');
        var engje = jQuery("#field11508");    //英文金额
        var fieldname = "tmpje";
        var tablename = "(select dbo.f_num_eng(replace('" + je + "',',','')) tmpje) t";
        var strWhere = "1=1";
        Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
            engje.val(data);
            engje.attr("readonly", "readonly");
        });
    }

    //提交时，重新计算付款金额和预算金额，给人民币赋值
    function getcount() {
        var indexnum0 = document.getElementById("indexnum0").value * 1.0 - 1;
        var ywje = 0.00;
        var ysje = 0.00;
        var sum = 0.00;
        for (var x = 0; x <= indexnum0; x++) {
            ywje = 0 + jQuery("#field11547_" + x).val() * jQuery("#field11546_" + x).val();
            ywje = Math.round(parseFloat(ywje) * 10000) / 10000 * 1.00;

            jQuery("#field11543_" + x).val(ywje); //付款金额
            jQuery("#field11543_" + x + "span").text(ywje); //付款金额
            sum = sum + ywje;
        }
        var je = sum;
        var engje = jQuery("#field11508");    //英文金额
        var fieldname = "tmpje";
        var tablename = "(select dbo.f_num_eng(replace('" + je + "',',','')) tmpje) t";
        var strWhere = "1=1";
        Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
            engje.val(data);
            engje.attr("readonly", "readonly");
        });
    }

    //2022-5-23 0901-2022010036 币种等于CNY默认广州财务部
    jQuery("#field11473").bind("propertychange", function () {//付款币种
        var bz = jQuery("#field11473span").text();
        if (bz == "CNY") {
            jQuery("#field16870").val("202"); //付款财务部
            jQuery("#field16870span").text("GZ Finace(广州财务部)");
            jQuery("#field16870").prev().prev().attr("disabled", "disabled");
        } else {
            jQuery("#field16870").val(""); //付款财务部
            jQuery("#field16870span").text("");
            jQuery("#field16870").prev().prev().attr("disabled", "");
        }
    });


 

});