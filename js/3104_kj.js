jQuery(document).ready(function () {
    /*
    <script src="/dwr/interface/Action_Util.js"></script>
    <p>　　</p>
    <script src="/dwr/engine.js"></script>
    <p>　　</p>
    <script src="/dwr/util.js"></script>
    <p>　　</p>
    <script src="/sunda/js/fybx0304/kj.js"></script>
    */

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
    /*
    * by TenzeChen 2021-04-25 需求：0901-2021040005 窦婉婷（合资）-凭证抬头文本字符或字数口径与SAP不一致，且无字符或字数限制
    * */
    jQuery("#field11495").bind("propertychange", function () {
        var sap_miantxt = jQuery("#field11495").val();
        var txt_length = sap_miantxt.length;
        var display_txt = txt_length + " " + "/25"
        jQuery("#messageCons").html(display_txt);
    });
    jQuery("#field11495").blur(function () {
        var sap_miantxt = jQuery("#field11495").val();
        var txt_length = sap_miantxt.length;
        if (txt_length > 25) {
            alert("请注意！您输入的凭证抬头文本已超25字符。 \n SAP-Text has exceeded 25 characters. ");
        }
    });



    //2022-5-23 0901-2022010036 币种等于CNY默认广州财务部
    jQuery("#field11473").bind("propertychange", function () {//付款币种
        var bz = jQuery(this).val();
        alert(bz);
        if (bz == "CNY") {
            jQuery("#field16870").val("202"); //付款财务部
            jQuery("#field16870span").children("a").text("GZ Finace(广州财务部)"); 
        } else {
            jQuery("#field16870").val(""); //付款财务部
            jQuery("#field16870span").children("a").text("");
        }
    });


    /*
    * by XieRuiBin 2021-07-22 需求：0901-2021070042 李思桦-当会计节点把科目改成过渡科目的时候，需要把原来科目的编码和成本中心编码带到文本里面去
    * */

    // 初始化
    /*var in0 = 0;
    var reqid = jQuery("#requestid").val();
    if(document.getElementById("indexnum0")){
        in0 = document.getElementById("indexnum0").value * 1.0 - 1;
    }
    
    if(reqid > 0 && in0 > -1){
        for(var i = 0; i <= in0; i++){
            bindTxt(i);
        }
    }
    
    function bindTxt(index){
        jQuery("#field11520_" + index).bind('propertychange', function() {
            var pj = jQuery(this).val();
            var _txt = jQuery("#field11519_" + index).val();
            if(_txt != ""){
                var _cost = jQuery("#field11539_" + index).val();
                var _sub = jQuery("#field11520_" + index).val();
                
                if(_sub != ""){
                    if(_newarry.length < i0){
                        _cost + "_" + _sub + "_" + _txt;
                        _txt;
                    }
                    
                    if(_sub.length > 4){
                        var _substr = _sub.substring(0, 4);
                        if(_substr == "6605" || _substr == "6606"){
                            jQuery("#field11519_" + index).val(_newarry[index]);
                        } else {
                            //jQuery("#field11519_" + i).val(_oldarry[i]);
                        }
                    }
                }
            }
        });
    }*/

    function find(str, cha, num) {
        var x = str.indexOf(cha);
        for (var i = 0; i < num; i++) {
            x = str.indexOf(cha, x + 1);
        }
        return x;
    }

    jQuery(".dff").hide();
    var _index = 0;
    var _newarry = new Array();
    var _oldarry = new Array();
    var _statearry = new Array();
    var task = setInterval(setTxt, 3000);
    function setTxt() {
        var i0 = parseFloat(jQuery("#indexnum0").val());

        for (var i = 0; i < i0; i++) {
            var _txt = jQuery("#field11519_" + i).val();

            if (_txt != "") {
                var _cost = jQuery("#field11539_" + i).val();
                var _sub = jQuery("#field11520_" + i).val();
                //alert(_sub);
                if (_sub != "") {
                    var _substr = _sub.substring(0, 4);
                    var ic = (_txt.split('_')).length - 1;
                    if (ic > 1) {
                        var io = find(_txt, '_', 1);
                        _txt = _txt.substring(io + 1, _txt.length);

                        if (_substr != "6605" && _substr != "6606") {
                            //jQuery("#field11519_" + i).val(_txt);
                        }
                    }

                    if (_newarry.length < i0) {
                        // 拼接在后面 因为长文本功能取消后面拼接的方式
                        //_newarry.push(_txt + "_" + _cost + "_" + _sub); 

                        // 拼接在前面
                        _newarry.push(_cost + "_" + _sub + "_" + _txt);

                        _oldarry.push(_txt);
                        _statearry.push(0);
                    }

                    if (_sub.length > 4) {
                        if (_substr == "6605" || _substr == "6606") {
                            jQuery("#field11519_" + i).val(jQuery("#field23510_" + i).val() + "_" + jQuery("#field23511_" + i).val() + "_" + jQuery("#field23531_" + i).val());
                            //if(_statearry[i] == 0){
                            //	jQuery("#field11519_" + i).val(_newarry[i]);
                            //	_statearry[i] = 1;
                            //}
                        } else {
                            //jQuery("#field11519_" + i).val(jQuery("#field23531_" + i).val());
                            //jQuery("#field11519_" + i).val(_oldarry[i]);
                        }
                    }
                }
            }
        }
        //alert(_arry);
    }

    function setpztt() {
        jQuery("#field11499").val("ZO");             //凭证类型
        jQuery("#field11499span").text("");

        var lcbh = jQuery("#field11478span").text();
        jQuery("#field11500").val(lcbh);//参照
        jQuery("#field11500span").text("");

        var gs = jQuery("#field11471span").text();
        var fd = jQuery("#field11480span").text();
        var fx = jQuery("#field11472span").text();

        if (gs.indexOf("加纳") >= 0) {

            jQuery("#field11490").val("GH01");//公司代码
            jQuery("#field11490span").text("GH01");
            jQuery("#field11491").val("Sunda (GH) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("洗衣粉") >= 0) {

            jQuery("#field11490").val("GF01");//公司代码
            jQuery("#field11490span").text("GF01");
            jQuery("#field11491").val("Sunda (GF02) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("五金厂") >= 0) {

            jQuery("#field11490").val("GF02");//公司代码
            jQuery("#field11490span").text("GF02");
            jQuery("#field11491").val("Sunda (GF02) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        } else if (gs.indexOf("加纳") >= 0 && fd.indexOf("房地产") >= 0) {
            jQuery("#field11490").val("RE01");//公司代码
            jQuery("#field11490span").text("RE01");
            jQuery("#field11491").val("Realestate company Ltd");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("加纳") >= 0 && fd.indexOf("Homepro") >= 0) {
            jQuery("#field11490").val("GH02");//公司代码
            jQuery("#field11490span").text("GH02");
            jQuery("#field11491").val("Homepro company Ltd");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("肯尼亚") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field11490").val("KF01");//公司代码
            jQuery("#field11490span").text("KF01");
            jQuery("#field11491").val("KENYA FACTORY");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("肯尼亚") >= 0) {
            jQuery("#field11490").val("KE01");//公司代码
            jQuery("#field11490span").text("KE01");
            jQuery("#field11491").val("Sunda (KE) Investment");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("KEDS") >= 0) {

            jQuery("#field11490").val("TF01");//公司代码
            jQuery("#field11490span").text("TF01");
            jQuery("#field11491").val("Tanzania KEDS Factory");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0 && fd.indexOf("瓷") >= 0) {

            jQuery("#field11490").val("TF02");//公司代码
            jQuery("#field11490span").text("TF02");
            jQuery("#field11491").val("Twyford Tile (TZ) Factory");//公司代码名称
            jQuery("#field11491span").text("");

        }
        else if (gs.indexOf("坦桑") >= 0) {
            jQuery("#field11490").val("TZ01");//公司代码
            jQuery("#field11490span").text("TZ01");
            jQuery("#field11491").val("SUNDA (TZ)INVESTMENT");//公司代码名称
            jQuery("#field11491span").text("");
        } else if (gs.indexOf("秘鲁") >= 0) {
            jQuery("#field11490").val("PE01");//公司代码
            jQuery("#field11490span").text("PE01");
            jQuery("#field11491").val("SUNDA (PE)INVESTMENT");//公司代码名称
            jQuery("#field11491span").text("");
        } else if (gs.indexOf("哥伦比亚") >= 0) {
            jQuery("#field11490").val("CO01");//公司代码
            jQuery("#field11490span").text("CO01");
            jQuery("#field11491").val("SUNDA (CO)INVESTMENT");//公司代码名称
            jQuery("#field11491span").text("");
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
            jQuery("#field11518_" + xuh).val("40");//记账码
            jQuery("#field11518_" + xuh + "span").text("40");

            var _kgsfk = jQuery("#field16869").val(); //是否为跨公司付款
            var _ffcwb = jQuery("#field16870").val(); //付款财务部

            var _sjkm = jQuery("#field11535_" + xuh).val(); //三级科目
            var _cbzx = jQuery("#field11509_" + xuh).val(); //成本中心

            var fymxzy = jQuery("#field11510_" + xuh + "span").text();//摘要
            jQuery("#field11519_" + xuh).val(fymxzy); //文本
            jQuery("#field11519_" + xuh + "span").text("");
            jQuery("#field23531_" + xuh).val(fymxzy);//文本

            var fymxje = jQuery("#field11543_" + xuh + "span").text().replace(/,/gm, '');//申报金额
            jQuery("#field11523_" + xuh).val(fymxje);//金额
            jQuery("#field11523_" + xuh + "span").text("");



            var fyyggh = jQuery("#field22888_" + xuh + "span").text();//员工工号
            jQuery("#field22889_" + xuh).val(fyyggh);//文本
            jQuery("#field22889_" + xuh + "span").text("");



            var fymxbmid = jQuery("#field11509_" + xuh).val();//归属部门ID
            if (fymxbmid != "") {
                var fieldname = "hsdm";
                var fieldnamet = "hsmc";
                var tablename = "CostAccountingCenter";

                var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";

                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    jQuery("#field11539_" + xuh).val(data);//成本中心编号
                    jQuery("#field11539_" + xuh + "span").text(data);

                    jQuery("#field23510_" + xuh).val(data);//原始成本中心编号
                });

                Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
                    jQuery("#field11540_" + xuh).val(data);//成本中心编号
                    jQuery("#field11540_" + xuh + "span").text("");
                });
            }


            var fymxkmid = jQuery("#field11535_" + xuh).val();//三级科目ID
            if (fymxkmid != "") {
                var fieldname = "racct";
                var tablename = "FnaBudgetfeeType";
                var strWhere = "id=" + fymxkmid;
                var isndyt = jQuery("#field11515_" + xuh).val();//是否冲减年度预提
                Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
                    if (data != "" && isndyt == "1") {
                        Action_Util.getYtkm("", data, "", function (ytkm) {
                            if (ytkm != "") {
                                var sapytkm = ytkm.substr(0, 10);
                                var sapytkmmc = ytkm.substr(10);
                                jQuery("#field11520_" + xuh).val(sapytkm);//科目编号
                                jQuery("#field11520_" + xuh + "span").text(sapytkm);
                                jQuery("#field11521_" + xuh).val(sapytkmmc);

                                jQuery("#field23511_" + xuh).val(data);//原始科目编号
                            } else {
                                //jQuery("#field11520_"+xuh).val(data);//科目编号
                                //jQuery("#field11520_"+xuh+"span").text(data);
                            }
                        });
                    } else {
                        jQuery("#field11520_" + xuh).val(data);//科目编号
                        jQuery("#field11520_" + xuh + "span").text(data);

                        jQuery("#field23511_" + xuh).val(data);//原始科目编号
                    }
                });


            }
            if (fymxkmid == "212") {
                jQuery("#field11539_" + xuh).val();//成本中心编号
                jQuery("#field11539_" + xuh + "span").text();
                jQuery("#field11540_" + xuh).val();//成本中心名称
                jQuery("#field11540_" + xuh + "span").text("");
            }

            var fykmmc = jQuery("#field11535_" + xuh + "span").text();//三级科目名称
            jQuery("#field11521_" + xuh).val(fykmmc);//科目名称
            jQuery("#field11521_" + xuh + "span").text("");
        }
    }

    function setdf(xuh) {
        if (xuh == "0") {
            var jzm = "50";
            if (checkiscj()) {
                jzm = "35"
            }
            jQuery("#field11524_" + xuh).val(jzm);//记账码
            jQuery("#field11524_" + xuh + "span").text(jzm);

            var sumje = jQuery("#sumvalue11523").val().replace(/,/gm, '');
            jQuery("#field11530_" + xuh).val(sumje);//金额
            jQuery("#field11530_" + xuh + "span").text("");

            jQuery("#field11528_" + xuh).val("15");//原因代码编号
            jQuery("#field11528_" + xuh + "span").text("15");
            jQuery("#field11529_" + xuh).val("支付的其他与经营活动有关的现金");//原因代码名称
            jQuery("#field11529_" + xuh + "span").text("");
        }
    }



    function checkiscj() {//明细是否有冲减标识
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var cj = jQuery("#field11531_" + i).val();
            if (cj == "1") {
                return true;
            }
        }
        return false;
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
            var jejf = jQuery("#field11523_" + i).val().replace(/,/gm, '');
            if (jejf == "") {
                jejf = "0"
            }
            jfje = jfje + parseFloat(jejf);

            var jfzy = jQuery("#field11519_" + i).val();
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
            var jedf = jQuery("#field11530_" + j).val().replace(/,/gm, '');
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

    function checksd_bz() {
        //return true;
        var bz_h = jQuery("#field11473").val();
        var df_node = document.getElementsByName("check_node_2");
        var df_l = df_node.length;
        for (var x = 0; x < df_l; x++) {
            var j = df_node[x].value;
            var km = jQuery("#field11526_" + j).val();
            var bz_str = jQuery("#field11527_" + j).val();
            var bzs = bz_str.split("_");
            if (isArray(bzs)) {
                if (km.substr(0, 4) == "1002") {
                    var bz_mx = bzs[2];
                    if (bz_mx != bz_h) {
                        alert("Currency mismatch!");
                        return false;
                    }
                } else if (km.substr(0, 4) == "1001" || km.substr(0, 4) == "1003") {
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


    function isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    }

    checkCustomize = function () {
        return checkjdfje() && checksd_bz();
    }

});