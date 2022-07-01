jQuery(document).ready(function () {


    var workflownum = jQuery("#field23865span").text(); //单号
    jQuery("#field23920").val(workflownum);
    var Fundingtype = jQuery("#field23871").val() //调账类型
    var Salesman = jQuery("#field23910span").text(); //业务员

    if (Fundingtype == 0) {
        var packinglist = jQuery("#field23908").val(); //装箱单号
        var invoicenumber = jQuery("#field23907").val(); //发票号
        var indexnum1 = document.getElementById("indexnum0").value * 1.0;
        var indexnum2 = document.getElementById("indexnum1").value * 1.0;

        var Customer2name = jQuery("#field23904").val(); //客户2名称
        var Customer2 = jQuery("#field23934").val(); //客户2
        var Customer1name = jQuery("#field23903").val(); //客户1名称
        var Customer1 = jQuery("#field23933").val(); //客户1

        var Amount1 = parseFloat(jQuery("#field23905").val()); //金额1
        var Amount2 = parseFloat(jQuery("#field23906").val()); //金额2
        var text0 = jQuery("#field23909").val() //文本
        jQuery("#field23922").val(text0);

        //if (Amount1 == Amount2) {
        //    }
        //设置借方
        if (indexnum1 == 0) jQuery("button[name='addbutton0']").click();

        jQuery("#field23876_0").val("01"); //借方记账码
        jQuery("#field23876_0span").text("01"); //借方记账码

        jQuery("#field23878_0").val(Customer1); //借方科目编码
        jQuery("#field23878_0span").text(Customer1); //借方科目编码

        jQuery("#field23879_0").val(Customer1name); //借方科目描述
        jQuery("#field23879_0span").text(""); //借方科目描述

        jQuery("#field23881_0").val(Amount1); //借方金额
        jQuery("#field23881_0span").text(""); //借方金额

        jQuery("#field23877_0").val(text0); //借方行项目文本
        jQuery("#field23877_0span").text(""); //借方行项目文本

        //设置贷方
        if (indexnum2 == 0) jQuery("button[name='addbutton1']").click();
        jQuery("#field23889_0").val("11"); //贷方记账码
        jQuery("#field23889_0span").text("11"); //贷方记账码

        jQuery("#field23890_0").val(text0); //贷方文本
        jQuery("#field23890_0span").val(""); //贷方文本

        jQuery("#field23891_0").val(Customer2); //贷方科目编码
        jQuery("#field23891_0span").text(Customer2); //贷方科目编码

        jQuery("#field23892_0").val(Customer2name); //贷方科目名称
        jQuery("#field23892_0span").text(""); //贷方科目名称

        jQuery("#field23896_0").val(Amount2); //贷方金额
        jQuery("#field23896_0span").text(""); //贷方金额


        if (Amount1 != Amount2) {
            //新增贷方明细行2
            if (indexnum2 == 0) jQuery("button[name='addbutton1']").click();
            if (Amount1 > Amount2) {
                jQuery("#field23889_1").val("50"); //贷方记账码
                jQuery("#field23889_1span").text("50"); //贷方记账码
            } else if (Amount1 < Amount2) {
                jQuery("#field23889_1").val("40"); //贷方记账码
                jQuery("#field23889_1span").text("40"); //贷方记账码
            }
            jQuery("#field23890_1").val(text0); //贷方文本
            jQuery("#field23890_1span").val(""); //贷方文本

            jQuery("#field23891_1").val("6001060000");
            jQuery("#field23891_1span").text("6001060000");

            jQuery("#field24563_1").val("0000000100"); //贷方利润中心
            jQuery("#field24563_1span").text("0000000100"); //贷方利润中心

            jQuery("#field23892_1").val("主营业务收入_第三方收入调整"); //贷方科目名称
            jQuery("#field23892_1span").text(""); //贷方科目名称

            jQuery("#field23896_1").val(Math.abs(Amount1 - Amount2)); //贷方金额
            jQuery("#field23896_1span").text(""); //贷方金额

            //jQuery("#field23929_1").val("CN0100251"); //成本中心编号
            //jQuery("#field23929_1span").text("CN0100251"); //成本中心编号
        }
    } else if (Fundingtype == 1 || Fundingtype == 2) {

        var Customer3name = jQuery("#field23932").val(); //客户3名称
        var Customer3 = jQuery("#field23935").val(); //客户3
        var indexnum2 = 0;
        if (document.getElementById("indexnum2")) {
            indexnum2 = document.getElementById("indexnum2").value * 1.0;
        }

        var indexnum0 = 0;
        if (document.getElementById("indexnum0")) {
            indexnum0 = document.getElementById("indexnum0").value * 1.0;
        }
        if (indexnum0 < indexnum2) {
            for (var index = 0; index < indexnum2; index++) {
                jQuery("button[name='addbutton0']").click(); //设置借方
                jQuery("button[name='addbutton1']").click(); //设置贷方
                var text3 = jQuery("#field24129_" + index).val();
                jQuery("#field23922").val(text3);
                var Increaseordecrease = jQuery("#field23944_" + index).val(); //增减
                //根据增减值设置不同借贷, 0增加 ,1 减少
                //如果==0, 就是用debitandcredit0 
                //如果==1, 就是用debitandcredit1
                if (Increaseordecrease == 0) {
                    debitandcredit0(index);
                } else if (Increaseordecrease == 1) {
                    debitandcredit1(index);
                }
            }
        }

    } else if (Fundingtype == 3) {

        var Customer3name = jQuery("#field23932").val(); //客户3名称
        var Customer3 = jQuery("#field23935").val(); //客户3
        var indexnum2 = 0;
        if (document.getElementById("indexnum2")) {
            indexnum2 = document.getElementById("indexnum2").value * 1.0;
        }

        var indexnum0 = 0;
        if (document.getElementById("indexnum0")) {
            indexnum0 = document.getElementById("indexnum0").value * 1.0;
        }

        if (indexnum0 < indexnum2) {
            for (var index = 0; index < indexnum2; index++) {
                jQuery("button[name='addbutton0']").click(); //设置借方
                jQuery("button[name='addbutton1']").click(); //设置贷方
                var text3 = jQuery("#field24129_" + index).val();
                jQuery("#field23922").val(text3);
                var Increaseordecrease = jQuery("#field23944_" + index).val(); //增减
                //根据增减值设置不同借贷,
                //如果==0, 就是用debitandcredit0
                //如果==1, 就是用debitandcredit1
                if (Increaseordecrease == 0) {
                    debitandcredit3(index);
                } else if (Increaseordecrease == 1) {
                    debitandcredit2(index);
                }
            }
        }
    }

    function debitandcredit0(i) {

        var Adjustmentamount = jQuery("#field23914_" + i).val(); //调整金额

        jQuery("#field23876_" + i).val("01"); //借方记账码
        jQuery("#field23876_" + i + "span").text("01"); //借方记账码

        jQuery("#field23878_" + i).val(Customer3); //借方科目编码
        jQuery("#field23878_" + i + "span").text(Customer3); //借方科目编码

        jQuery("#field23879_" + i).val(Customer3name); //借方科目名称
        jQuery("#field23879_" + i + "span").text(""); //借方科目名称

        jQuery("#field23881_" + i).val(Adjustmentamount); //借方金额
        jQuery("#field23881_" + i + "span").text(""); //借方金额

        jQuery("#field23877_" + i).val(text3); //借方行项目文本
        jQuery("#field23877_" + i + "span").text(""); //借方行项目文本

        jQuery("#field23889_" + i).val("50"); //贷方记账码
        jQuery("#field23889_" + i + "span").text("50"); //贷方记账码

        jQuery("#field23890_" + i).val(text3); //贷方文本
        jQuery("#field23890_" + i + "span").text(""); //贷方文本

        jQuery("#field23891_" + i).val("6001060000"); //贷方科目编码
        jQuery("#field23891_" + i + "span").text("6001060000"); //贷方科目编码

        jQuery("#field23892_" + i).val("主营业务收入_第三方收入调整"); //贷方科目名称
        jQuery("#field23892_" + i + "span").text(""); //贷方科目名称

        jQuery("#field23896_" + i).val(Adjustmentamount); //贷方金额
        jQuery("#field23896_" + i + "span").text(""); //贷方金额

        jQuery("#field23929_" + i).val("CN0100251"); //成本中心编码
        jQuery("#field23929_" + i + "span").text("CN0100251"); //成本中心编码

        jQuery("#field24563_" + i).val("0000000100"); //贷方利润中心
        jQuery("#field24563_" + i + "span").text("0000000100"); //贷方利润中心
    }

    function debitandcredit1(i) {

        var Adjustmentamount = jQuery("#field23914_" + i).val(); //调整金额

        jQuery("#field23876_" + i).val("11"); //借方记账码
        jQuery("#field23876_" + i + "span").text("11"); //借方记账码

        jQuery("#field23878_" + i).val(Customer3); //借方科目编码
        jQuery("#field23878_" + i + "span").text(Customer3); //借方科目编码

        jQuery("#field23879_" + i).val(Customer3name); //借方科目名称
        jQuery("#field23879_" + i + "span").text(""); //借方科目名称

        jQuery("#field23881_" + i).val(Adjustmentamount); //借方金额
        jQuery("#field23881_" + i + "span").text(""); //借方金额

        jQuery("#field23877_" + i).val(text3); //借方行项目文本
        jQuery("#field23877_" + i + "span").text(""); //借方行项目文本

        jQuery("#field23889_" + i).val("40"); //贷方记账码
        jQuery("#field23889_" + i + "span").text("40"); //贷方记账码

        jQuery("#field23890_" + i).val(text3); //贷方文本
        jQuery("#field23890_" + i + "span").text(""); //贷方文本

        jQuery("#field23891_" + i).val("6001060000"); //贷方科目编码
        jQuery("#field23891_" + i + "span").text("6001060000"); //贷方科目编码

        jQuery("#field23892_" + i).val("主营业务收入_第三方收入调整"); //贷方科目描述
        jQuery("#field23892_" + i + "span").text(""); //贷方科目描述

        jQuery("#field23896_" + i).val(Adjustmentamount); //贷方金额
        jQuery("#field23896_" + i + "span").text(""); //贷方金额

        jQuery("#field23929_" + i).val("CN0100251"); //成本中心编码
        jQuery("#field23929_" + i + "span").text("CN0100251"); //成本中心编码

        jQuery("#field24563_" + i).val("0000000100"); //贷方利润中心
        jQuery("#field24563_" + i + "span").text("0000000100"); //贷方利润中心
    }

    function debitandcredit2(i) {

        var Adjustmentamount = jQuery("#field23914_" + i).val(); //调整金额

        jQuery("#field23876_" + i).val("11"); //借方记账码
        jQuery("#field23876_" + i + "span").text("11"); //借方记账码

        jQuery("#field23878_" + i).val(Customer3); //借方科目编码
        jQuery("#field23878_" + i + "span").text(Customer3); //借方科目编码

        jQuery("#field23879_" + i).val(Customer3name); //借方科目名称
        jQuery("#field23879_" + i + "span").text(""); //借方科目名称

        jQuery("#field23881_" + i).val(Adjustmentamount); //借方金额
        jQuery("#field23881_" + i + "span").text(""); //借方金额

        jQuery("#field23877_" + i).val(text3); //借方行项目文本
        jQuery("#field23877_" + i + "span").text(""); //借方行项目文本

        jQuery("#field23889_" + i).val("40"); //贷方记账码
        jQuery("#field23889_" + i + "span").text("40"); //贷方记账码

        jQuery("#field23890_" + i).val(text3); //贷方文本
        jQuery("#field23890_" + i + "span").text(""); //贷方文本

        jQuery("#field23891_" + i).val("6701010000"); //贷方科目编码
        jQuery("#field23891_" + i + "span").text("6701010000"); //贷方科目编码

        jQuery("#field23892_" + i).val("资产减值损失_应收账款减值"); //贷方科目描述
        jQuery("#field23892_" + i + "span").text(""); //贷方科目描述

        jQuery("#field23896_" + i).val(Adjustmentamount); //贷方金额
        jQuery("#field23896_" + i + "span").text(""); //贷方金额

        jQuery("#field23929_" + i).val("CN0100251"); //成本中心编码
        jQuery("#field23929_" + i + "span").text("CN0100251"); //成本中心编码
    }

    function debitandcredit3(i) {

        var Adjustmentamount = jQuery("#field23914_" + i).val(); //调整金额

        jQuery("#field23876_" + i).val("01"); //借方记账码
        jQuery("#field23876_" + i + "span").text("01"); //借方记账码

        jQuery("#field23878_" + i).val(Customer3); //借方科目编码
        jQuery("#field23878_" + i + "span").text(Customer3); //借方科目编码

        jQuery("#field23879_" + i).val(Customer3name); //借方科目名称
        jQuery("#field23879_" + i + "span").text(""); //借方科目名称

        jQuery("#field23881_" + i).val(Adjustmentamount); //借方金额
        jQuery("#field23881_" + i + "span").text(""); //借方金额

        jQuery("#field23877_" + i).val(text3); //借方行项目文本
        jQuery("#field23877_" + i + "span").text(""); //借方行项目文本

        jQuery("#field23889_" + i).val("50"); //贷方记账码
        jQuery("#field23889_" + i + "span").text("50"); //贷方记账码

        jQuery("#field23890_" + i).val(text3); //贷方文本
        jQuery("#field23890_" + i + "span").text(""); //贷方文本

        jQuery("#field23891_" + i).val("6701010000"); //贷方科目编码
        jQuery("#field23891_" + i + "span").text("6701010000"); //贷方科目编码

        jQuery("#field23892_" + i).val("资产减值损失_应收账款减值"); //贷方科目描述
        jQuery("#field23892_" + i + "span").text(""); //贷方科目描述

        jQuery("#field23896_" + i).val(Adjustmentamount); //贷方金额
        jQuery("#field23896_" + i + "span").text(""); //贷方金额

        jQuery("#field23929_" + i).val("CN0100251"); //成本中心编码
        jQuery("#field23929_" + i + "span").text("CN0100251"); //成本中心编码
    }

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }
});