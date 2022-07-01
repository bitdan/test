jQuery(document).ready(function () {
    /*<script type="text/javascript" charset="GB2312" src="/sunda/js2/fybx0304/tj.js?randomId=1"></script>
    */
    window.onload = setreadonly;

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
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
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var kmval = jQuery("#field11535_" + i).val();
            if (kmval == "114" && xtzmr == "") {
                alert("协调费证明人 必填！");
                return false;
            }
        }
        return true;
    }

    //协助确认费用部门
    jQuery("#field16136").hide();
    jQuery("#field16985").hide();
    jQuery("#field17964").hide();//陶瓷厂


    function fycdbm() {
        var sfkm = 0;
        var sfjj = 0;
        var hasTcc = 0;
        var bms = "", strbms = "";
        var fybms = jQuery("#field11468").val(); //协助确认部门
        jQuery("#field11468").val("");
        jQuery("#field11468span").text("");
        jQuery("#field11468span").prev().attr("readonly", "readonly");
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var bm = jQuery("#field11509_" + i).val();
            var strbm = jQuery("#field11509_" + i + "span").text();
            if (strbm.indexOf("陶瓷厂") > -1) {
                hasTcc = 1;
            } else if (strbm.indexOf("科达") > -1) {
                hasTcc = 1;
            }
            if (check_bm(bms, bm)) {
                bms = bms + "," + bm;
                strbms = strbms + " " + strbm;
            }
            var km3j = jQuery("#field11535_" + i + "span").text();
            if (km3j.indexOf("员工关怀") > -1) {
                sfkm = 1;
            }
            if (km3j.indexOf("奖金_外方员工") > -1) {
                sfjj = 1;
            }

        }
        if (hasTcc == 1) {
            jQuery("#field17964").attr("checked", "checked");
        } else {
            jQuery("#field17964").attr("checked", "");
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
    // function checkBudgetfee() {
    //     var mx = document.getElementsByName("check_node_0");
    //     var mxs = mx.length;

    //     for (var h = 0; h < mxs; h++) {
    //         var c = mx[h].value;
    //         var km2j = jQuery("#field11534_" + c + "span").text().substr(0, 4);
    //         var deptype = jQuery("#disfield22614_" + c).find("option:selected").val();
    //         var rownum = c * 1 + 1;
    //         //alert(deptype+"_"+km2j);
    //         if ((deptype == "0" && km2j == "5101") || (deptype == "0" && km2j == "5001")) {//非生产部门
    //             alert("第" + rownum + "行的科目与部门不匹配，非生产性部门不能入制造费用、生产成本类科目\nThe item in line " + rownum + " does not match the department, Manufacturing expenses, production cost accounts should be used in the factory production department.");
    //             return false;
    //         } else if ((deptype == "1" && km2j == "6601") || (deptype == "1" && km2j == "5001")) {
    //             alert("第" + rownum + "行的科目与部门不匹配，间接生产性部门不能入营业费用、生产成本类科目\nThe items in line " + rownum + " do not match the department, Business expense and production cost shouldn’t be used in indirect production department.");
    //             return false;
    //         } else if (deptype == "2" && km2j == "6601") {
    //             alert("第" + rownum + "行的科目与部门不匹配，直接生产性部门不能入营业费用类科目\nThe item in line " + rownum + " does not match the department, Operating expenses shouldn’t be used in direct productive departments.")
    //             return false;
    //         } else if ((deptype == "3" && km2j == "5101") || (deptype == "3" && km2j == "5001")) {
    //             alert("第" + rownum + "行的科目与部门不匹配，未投产工厂部门不能入制造费用、生产成本类科目\nThe item in line " + rownum + " does not match the department, nonactive plant shouldn't use Manufacturing expenses, production cost accounts.");
    //             return false;
    //         }
    //     }
    //     return true;
    // }


    if (spantxt) {
        fycdbm();
        getcount();
    }

    checkCustomize = function () {
        if (spantxt) {
            fycdbm();
            getcount();
        }
        // 该需求要求去掉 0923-2022040005
        return checkxtzmr();
        // return checkxtzmr() && checkBudgetfee();
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

    //-------------------------结束

});