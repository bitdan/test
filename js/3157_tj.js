jQuery(document).ready(function () {
    /*
    <script src="/sunda/js/fybx0304/tj393.js?randomId=2"></script>
    */

    jQuery("#indexnum0").bind("propertychange", function () {
        var indexnum0 = parseFloat(this.value) - 1;
        setbz();
        jQuery("#field16087_" + indexnum0).val("35");
        jQuery("#field16087_" + indexnum0 + "span").html("660109业务佣金(HQ)");
    });
    jQuery("#sdAddMx").bind("click", function () {
        //jQuery("#sdAddMx").click(function(){
        delmx0();
        setmx0();
    });


    jQuery("#field12402").bind("propertychange", function () {
        var indexnum = jQuery("#indexnum0").val() - 1;
        var bz = jQuery("#field12401").val();

        if (bz != "") {
            for (var x = 0; x <= indexnum; x++) {
                var row_bz = jQuery("#field16093_" + x);

                jQuery("#field16093_" + x).val(bz);
                jQuery("#field16093_" + x + "span").text(bz);
                jQuery("#field16094_" + x).val("1.0000");


                //如果已经填写业务金额,给人民币金额赋值
                var ywje = jQuery("#field16095_" + x).val();
                var mainhl = jQuery("#field12402").val();
                var rowhl = jQuery("#field16094_" + x).val();

                jQuery("#field16097_" + x).val(mainhl);

                if (rowhl != "" && ywje != "" && mainhl != "" && rowhl != "0" && ywje != "0" && mainhl != "0") {
                    var rmb_je = Math.round(parseFloat(mainhl) * parseFloat(rowhl) * parseFloat(ywje) * 100) / 100;

                    jQuery("#field16092_" + x).val(rmb_je);
                }
                else {
                    jQuery("#field16092_" + x).val("");
                }
            }
        }
        else {
            var row_bz = jQuery("#field16093_" + x);
            jQuery("#field16093_" + x).val("");
            jQuery("#field16093_" + x + "span").text("");
            jQuery("#field16094_" + x).val("");
            jQuery("#field16092_" + x).val("");
        }

    });
    function delmx0() {
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            s[x].checked = "checked";
        }
        deleteRow0(0, true);
    }

    function setmx0() {

        var s5 = document.getElementsByName("check_node_5");
        var s6 = document.getElementsByName("check_node_6");
        var s5i = s5.length;
        var s6i = s6.length;
        var she = s5i + s6i;
        var mainjy = jQuery("#field21919").val();

        for (x = 0; x < s5i; x++) {
            jQuery("button[name='addbutton0']").click();
            setbz();
            var s0 = document.getElementsByName("check_node_0");
            var i0 = s0[x].value;
            var i5 = s5[x].value;
            var pos = mainjy + "_" + jQuery("#field17855_" + i5).val();
            var yonj = jQuery("#field17863_" + i5).val();
            jQuery("#field16087_" + i0).val("35");
            jQuery("#field16087_" + i0 + "span").html("660109业务佣金(HQ)");
            jQuery("#field16089_" + i0).val(pos);
            //jQuery("#field16095_"+i0).val(yonj);
        }
        for (var x = 0; x < s6i; x++) {
            jQuery("button[name='addbutton0']").click();
            setbz();
            var s0 = document.getElementsByName("check_node_0");
            var ms = s5i * 1 + x * 1;
            var i0 = s0[ms].value;
            var i6 = s6[x].value;
            var pos = mainjy + "_" + jQuery("#field17865_" + i6).val();
            var yonj = jQuery("#field17869_" + i6).val();
            jQuery("#field16087_" + i0).val("35");
            jQuery("#field16087_" + i0 + "span").html("660109业务佣金(HQ)");
            jQuery("#field16089_" + i0).val(pos);
            //jQuery("#field16095_"+i0).val(yonj);
        }
    }


    function setbz() {
        var indexnum = jQuery("#indexnum0").val() - 1;
        for (var x = 0; x <= indexnum; x++) {
            jQuery("#field16094_" + x).attr("readonly", "readonly");
            jQuery("#field16092_" + x).attr("readonly", "readonly");
        }

        var bz = jQuery("#field12401").val();

        if (bz != "") {
            if (jQuery("#field16093_" + indexnum).val() == "") {
                jQuery("#field16093_" + indexnum).val(bz);
                jQuery("#field16093_" + indexnum + "span").text(bz);
                jQuery("#field16094_" + indexnum).val("1.0000");
            }

            var mainhl = jQuery("#field12402").val();

            for (var x = 0; x <= indexnum; x++) {
                var row_bz = jQuery("#field16093_" + x);

                jQuery("#field16097_" + x).val(mainhl);
                if (row_bz.val() == "") {
                    jQuery("#field16093_" + x).val(bz);
                    jQuery("#field16093_" + x + "span").text(bz);
                    jQuery("#field16094_" + x).val("1.0000");

                    //如果已经填写业务金额,给付款金额和人民币金额赋值

                    var ywje = jQuery("#field16095_" + x).val();

                    if (ywje != "") {
                        jQuery("#field16092_" + x).val(ywje);

                    }

                }
            }
        }
        calSum(0);
    }



    checkCustomize = function () {
        return true;
    }

    //2022-3-16 修改
    var indexnum6 = document.getElementById("indexnum6").value * 1.0;

    var _INVOICEVALUE = dt7_INVOICEVALUE;
    var _COMMISSIONRATE = dt7_COMMISSIONRATE;
    var _TAXDEDUCTION = dt7_TAXDEDUCTION;
    var _COMMISSION = dt7_COMMISSION;
    for (var i = 0; i < indexnum6; i++) {
        //发票金额 变化时
        jQuery("#" + _INVOICEVALUE + "_" + i).bind("propertychange", function () {

            Commission(i);
        });
        //佣金比例 变化时
        jQuery("#" + _COMMISSIONRATE + "_" + i).bind("propertychange", function () {

            Commission(i);
        });
        //扣税 变化时
        jQuery("#" + _TAXDEDUCTION + "_" + i).bind("propertychange", function () {

            Commission(i);
        });
    }

    jQuery("#indexnum6").bind("propertychange", function () {
        var i = parseFloat(this.value) - 1;
        //alert(i);

        //发票金额 变化时
        jQuery("#" + _INVOICEVALUE + "_" + i).bind("propertychange", function () {
            Commission(i);
        });
        //佣金比例 变化时
        jQuery("#" + _COMMISSIONRATE + "_" + i).bind("propertychange", function () {

            Commission(i);
        });
        //扣税 变化时
        jQuery("#" + _TAXDEDUCTION + "_" + i).bind("propertychange", function () {
            Commission(i);
        });
    });

    function Commission(i) {
        var Invoiceamount = jQuery("#" + _INVOICEVALUE + "_" + i).val();//发票金额
        var Proportion = jQuery("#" + _COMMISSIONRATE + "_" + i).val();//佣金比例 
        Proportion = toPoint(Proportion);
        var Deduction = jQuery("#" + _TAXDEDUCTION + "_" + i).val();//扣税
        //var Settlementcommission = parseFloat(Invoiceamount) * Proportion - parseFloat(Deduction);
        var Settlementcommission = (Invoiceamount * 100 * Proportion - Deduction * 100) / 100;

        Settlementcommission = Math.formatFloat(Settlementcommission, 2);
        Settlementcommission = parseFloat(Settlementcommission);
        if (selfIsNaN(Settlementcommission)) {
            jQuery("#" + _COMMISSION + "_" + i).val();//结算佣金
        } else {
            jQuery("#" + _COMMISSION + "_" + i).val(Settlementcommission);//结算佣金
            jQuery("#" + _COMMISSION + "_" + i + "span").remove(); //移除佣金后面的感叹号
        }

    }

    function checkCommission() {
        var _COMMISSIONRATE = dt7_COMMISSIONRATE;
        var indexnum = document.getElementById("indexnum6").value * 1.0;
        var patt = new RegExp(/^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/);
        var flag = true;
        for (var i = 0; i < indexnum; i++) {
            var Proportion = jQuery("#" + _COMMISSIONRATE + "_" + i).val();//佣金比例 
            var result = patt.test(Proportion);
            if (!result) {
                flag = false;
                alert("请查看佣金比例范围, 并且要以 % 结束");
            }
        }
        return flag;
    }

    function selfIsNaN(value) {
        return value !== value
    }

    function toPoint(percent) {
        var str = percent.replace("%", "");
        str = str / 100;
        return str;
    }

    checkCustomize = function () {
        return checkCommission();
    }

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }


});