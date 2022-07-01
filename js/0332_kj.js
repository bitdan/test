jQuery(document).ready(function () {


    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }


    //适用chrome浏览器方法
    jQuery("button[name='addbutton1']").bind("click", function () {
        var indexnum1 = 0;
        if (document.getElementById("indexnum1")) {
            indexnum1 = document.getElementById("indexnum1").value * 1.0 - 1;
        }
        if (spantxt) {
            setjf(indexnum1);
        }
    });

    jQuery("button[name='addbutton2']").bind("click", function () {
        var indexnum2 = 0;
        if (document.getElementById("indexnum2")) {
            indexnum2 = document.getElementById("indexnum2").value * 1.0 - 1;
        }
        if (spantxt) {
            setdf(indexnum2);
        }
    });
    //

    /*
    jQuery("#indexnum1").bind("propertychange",function(){
        var index1 = parseFloat(this.value) - 1;
        if(spantxt){
            setjf(index1);
        }
    });
    
    jQuery("#indexnum2").bind("propertychange",function(){
        var index2 = parseFloat(this.value) - 1;
        if(spantxt){
            setdf(index2);
        }
    });
    */

    function setpztt() {
        jQuery("#field20104").val("ZO");             //凭证类型
        jQuery("#field20104span").text("");

        var lcbh = jQuery("#field20080span").text();
        jQuery("#field20105").val(lcbh);//参照
        jQuery("#field20105span").text("");

        var gs = jQuery("#field20088span").text();
        var fd = jQuery("#field20086span").text();
        var fx = jQuery("#field20090span").text();

        if (gs.indexOf("加纳") >= 0) {

            jQuery("#field20098").val("GH01");//公司代码
            jQuery("#field20098span").text("GH01");
            jQuery("#field20099").val("Sunda (GH) Investment");//公司代码名称
            jQuery("#field20099span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {

            jQuery("#field20098").val("GF01");//公司代码
            jQuery("#field20098span").text("GF01");
            jQuery("#field20099").val("Sunda (GF02) Investment");//公司代码名称
            jQuery("#field20099span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("五金厂") >= 0) {

            jQuery("#field20098").val("GF02");//公司代码
            jQuery("#field20098span").text("GF02");
            jQuery("#field20099").val("Sunda (GF02) Investment");//公司代码名称
            jQuery("#field20099span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            jQuery("#field20098").val("RE01");//公司代码
            jQuery("#field20098span").text("RE01");
            jQuery("#field20099").val("Realestate company Ltd");//公司代码名称
            jQuery("#field20099span").text("");

        }
        else if (gs.indexOf("加纳") >= 0 && fd.indexOf("Homepro") >= 0) {
            jQuery("#field20098").val("GH02");//公司代码
            jQuery("#field20098span").text("GH02");
            jQuery("#field20099").val("Homepro company Ltd");//公司代码名称
            jQuery("#field20099span").text("");

        }
        else if (gs.indexOf("肯尼亚") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field20098").val("KF01");//公司代码
            jQuery("#field20098span").text("KF01");
            jQuery("#field20099").val("KENYA FACTORY");//公司代码名称
            jQuery("#field20099span").text("");

        }
        else if (gs.indexOf("肯尼亚") >= 0) {
            jQuery("#field20098").val("KE01");//公司代码
            jQuery("#field20098span").text("KE01");
            jQuery("#field20099").val("Sunda (KE) Investment");//公司代码名称
            jQuery("#field20099span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {

            jQuery("#field20098").val("TF01");//公司代码
            jQuery("#field20098span").text("TF01");
            jQuery("#field20099").val("Tanzania KEDS Factory");//公司代码名称
            jQuery("#field20099span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field20098").val("TF02");//公司代码
            jQuery("#field20098span").text("TF02");
            jQuery("#field20099").val("Twyford Tile (TZ) Factory");//公司代码名称
            jQuery("#field20099span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0) {
            jQuery("#field20098").val("TZ01");//公司代码
            jQuery("#field20098span").text("TZ01");
            jQuery("#field20099").val("SUNDA (TZ)INVESTMENT");//公司代码名称
            jQuery("#field20099span").text("");
        } else if (gs.indexOf("秘鲁") >= 0) {
            jQuery("#field20098").val("PE01");//公司代码
            jQuery("#field20098span").text("PE01");
            jQuery("#field20099").val("SUNDA (PE)INVESTMENT");//公司代码名称
            jQuery("#field20099span").text("");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field20098").val("CO01");//公司代码
            jQuery("#field20098span").text("CO01");
            jQuery("#field20099").val("SUNDA (CO)INVESTMENT");//公司代码名称
            jQuery("#field20099span").text("");
        } else {
        }


        //Action_Util.getCurrentDateTimeFormat("currentdate",function(data){
        //			jQuery("#field11492").val(data);//过账日期
        //			jQuery("#field11492span").text(data);
        //			jQuery("#field11493").val(data);//凭证日期
        //			jQuery("#field11493span").text(data);				
        //});
    }

    function setjf(xuh) {
        var indexnum0 = parseFloat(jQuery("#indexnum0").val());
        if (parseFloat(xuh) < indexnum0) {

            var applicant=jQuery("#field20083span").text();//申请人
            var Customercode=jQuery("#field20107_"+xuh).val();//客户编码
            var Customer=jQuery("#field20108_"+xuh).val();//客户
            var Collectionlistnumber=jQuery("#field20112_"+xuh).val();//收款单号
            //var text=applicant+"收回非本人责任的逾期应收及坏账奖励"+"("+Customer+Customercode+")_"+Collectionlistnumber;
            //2022-03-29 变更 客户编码截取后六位
            Customercode=Customercode.substring(Customercode.length-6, Customercode.length);
            var text=applicant+"收回非本人责任的逾期应收及坏账奖励"+"(客户"+Customercode+")_"+Collectionlistnumber;
            //alert(xuh);
            jQuery("#field20119_"+xuh).val(text);//客户
            
            

            jQuery("#field20118_" + xuh).val("40");//记账码
            jQuery("#field20118_" + xuh + "span").text("40");

            //var fymxzy=jQuery("#field11510_"+xuh+"span").text();//摘要
            //jQuery("#field11519_"+xuh).val(fymxzy);//文本
            //jQuery("#field11519_"+xuh+"span").text("");

            var fymxje = jQuery("#field20358_" + xuh + "span").text().replace(/,/gm, '');//申报金额 人民币金额field20358  奖励（返还）金额 field20116_
            jQuery("#field20123_" + xuh).val(fymxje);//金额
            jQuery("#field20123_" + xuh + "span").text("");

            var fymxbmid = jQuery("#field20114_" + xuh).val();//归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";

                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";

                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field20124_" + xuh).val(data);//成本中心编号
                    jQuery("#field20124_" + xuh + "span").text(data);
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
                    jQuery("#field20125_" + xuh).val(data);//成本中心编号
                    jQuery("#field20125_" + xuh + "span").text("");
                });
            }
            var fylx = jQuery("#field20096").val();
            if (fylx == "0") {
                jQuery("#field20120_" + xuh).val("6601100000");//科目编码
                jQuery("#field20120_" + xuh + "span").text("6601100000");
                jQuery("#field20121_" + xuh).val("营业费用_非薪酬奖金");//科目名称
                jQuery("#field20121_" + xuh + "span").text("");

            } else if (fylx == "1") {
                jQuery("#field20120_" + xuh).val("6701010000");//科目编码
                jQuery("#field20120_" + xuh + "span").text("6701010000");
                jQuery("#field20121_" + xuh).val("资产减值损失_应收账款减值");//科目名称
                jQuery("#field20121_" + xuh + "span").text("");
            }

        }
    }

    function setdf(xuh) {
        if (xuh == "0") {
            var jzm = "50";

            jQuery("#field20132_" + xuh).val(jzm);//记账码
            jQuery("#field20132_" + xuh + "span").text(jzm);

            var sumje = jQuery("#sumvalue20123").val().replace(/,/gm, '');
            jQuery("#field20136_" + xuh).val(sumje);//金额
            jQuery("#field20136_" + xuh + "span").text("");

            jQuery("#field20138_" + xuh).val("12");//原因代码编号
            jQuery("#field20138_" + xuh + "span").text("12");
            jQuery("#field20139_" + xuh).val("付给职工以及为职工支付的现金");//原因代码名称
            jQuery("#field20139_" + xuh + "span").text("");
        }
    }



    if (spantxt) {//申请或编辑状态
        setpztt();
        var bt_add = parseFloat(jQuery("#indexnum0").val());
        var hsbt = parseFloat(jQuery("#indexnum1").val());

        if (hsbt < bt_add) {
            for (var i = 0; i < bt_add; i++) {
                //addRow1(1);
                jQuery("button[name='addbutton1']").click();
            }
        }

        var hsdf = parseInt(jQuery("#indexnum2").val());
        if (hsdf == 0) {
            jQuery("button[name='addbutton2']").click();
        }

    }

    function checkjdfje() {
        var jfje = 0;
        var sjf = document.getElementsByName("check_node_1");
        var sijf = sjf.length;
        for (var x = 0; x < sijf; x++) {
            var i = sjf[x].value;
            var jejf = jQuery("#field20123_" + i).val().replace(/,/gm, '');
            if (jejf == "") {
                jejf = "0"
            }
            jfje = jfje + parseFloat(jejf);

            var jfzy = jQuery("#field20119_" + i).val();
            if (jfzy.length > 50) {
                var n = parseInt(i) + 1;

                var str = "The " + n + "th row description of credit too long";
                //alert(str);
                //return false;
            }
        }

        var dfje = 0;
        var sdf = document.getElementsByName("check_node_2");
        var sidf = sdf.length;
        for (var x = 0; x < sidf; x++) {
            var j = sdf[x].value;
            var jedf = jQuery("#field20136_" + j).val().replace(/,/gm, '');
            if (jedf == "") {
                jedf = "0"
            }
            dfje = dfje + parseFloat(jedf);
        }



        jfje = Math.round(parseFloat(jfje) * 10000) / 10000;
        dfje = Math.round(parseFloat(dfje) * 10000) / 10000;

        if (Math.formatFloat(jfje, 4) != Math.formatFloat(dfje, 4)) {
            if (confirm("The amount of debit and credit is difference！" + Math.formatFloat(jfje, 4) + ";" + Math.formatFloat(dfje, 4) + ",Submit or Not ?")) {
                return true;
            } else {
                return flase;
            }
        }

        return true;
    }

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }




    function isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    }

    checkCustomize = function () {
        return checkjdfje();
    }

});
