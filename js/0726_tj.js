jQuery(document).ready(function () {

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }

    // 运输类型变化
    jQuery("#field16325").bind("change", function () {

        // 配送 0 转储 1 调拨 1
        var _temp = jQuery(this).find("option:selected").text();

        // 配送 0 转储 1 调拨 4
        var lx = jQuery(this).val();

        // 类型编码 0 1 两类 
        jQuery("#field18741").val(_temp.split("-")[1]);
        jQuery("#field18741span").text(_temp.split("-")[1]);

        jQuery("#field16318").val(""); // 目的地
        jQuery("#field16319").val(""); // 里程数
        jQuery("#field16228").val(""); // 合计本币英文

        // 配送 目的地 里程数 可填
        if (lx == "0") {
            jQuery("#field16318").removeAttr("readonly");
            jQuery("#field16319").removeAttr("readonly");
        } else { // 转储 调拨 不可填
            jQuery("#field16318").attr("readonly", "readonly");
            jQuery("#field16319").attr("readonly", "readonly");
        }
    });

    // 设置目的地 里程数 英文金额只读
    setreadonly();

    // 设置只读
    function setreadonly() {
        jQuery("#field16318").attr("readonly", "readonly"); //目的地
        jQuery("#field16319").attr("readonly", "readonly"); //里程数
        jQuery("#field16228").attr("readonly", "readonly"); //英文金额

        var s = document.getElementsByName("check_node_0");
        var sl = s.length;
        for (var x = 0; x < sl; x++) {
            var i = s[x].value;
            jQuery("#field16300_" + i).bind("propertychange", function () {
                var intRow = this.id.split('_')[1];
                setjhsxx(intRow);
            });
            jQuery("#field16311_" + i).bind("change", function () {
                var intRow = this.id.split('_')[1];
                setjhsxx(intRow);
            });
            jQuery("#field16335_" + i).bind("propertychange", function () {
                var intRow = this.id.split('_')[1];
                fycdbm(intRow);
            });
            setHideTextVal("field16324_" + i);
            setHideTextVal("field16334_" + i);
            setHideTextVal("field16327_" + i);
        }
    }

    // 合计付款本币 变化时 取英文大写
    jQuery("#field16226").bind("change", function () {
        // 取英文大写
        setEngje();
    });

    function setEngje() {
        var cnje = jQuery("#field16226"); //付款金额
        var je = cnje.val().replace(/,/gm, '');
        var engje = jQuery("#field16228"); //英文金额
        var fieldname = "tmpje";
        var tablename = "(select dbo.f_num_eng(replace('" + je + "',',','')) tmpje) t";
        var strWhere = "1=1";
        Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
            engje.val(data);
            engje.attr("readonly", "readonly");
        });
    }

    //alert(jQuery("#indexnum0").val());
    var _in = jQuery("#indexnum0").val();
    for (var jk = 0; jk < _in; jk++) {
        jQuery("#field16311_" + jk).blur(function () {
            var textflag = /^(\d|[a-zA-Z;-])+$/.test(this.value.trim());
            if (!textflag && this.value != "") {
                this.value = this.value.replace(/[^a-zA-Z0-9;-]/i, '');
                alert("仅允许输入字母、数字和单破折号(-)，多运单号必须用分号(;)隔开。\n\r Only semicolons are allowed for delimiters between orders.");
                jQuery(this).val("");
            } else {
                setjhsxx(jk);
            }
        });
    }

    function setbm() {
        var indexnum = document.getElementById("indexnum0").value * 1.0;;
        //alert(indexnum);
        var bz = jQuery("#field16214span").text();
        //alert(bz);

        for (var i = 0; i < indexnum; i++) {

            //alert(2);
            //jQuery("#field16335_" + i).val(bz);
            //jQuery("#field16335_" + i + "span").text(bz);


        }

    }
    //发生人-部门（jbrbm）字段假如发生变化，明细表1费用承担部门（fyhsbm）值等于发生人-部门，赋值后，申请人可修改；
    jQuery("#field16214span").bind("propertychange", function () {

        setbm();

    });
    //设置明细部门跟随变化
    jQuery("#indexnum0").bind("propertychange", function () {

        setbm();

    });

    // 行变化时监听
    jQuery("#indexnum0").bind("propertychange", function () {
        var indexnum0 = parseFloat(this.value) - 1;
        //alert(indexnum0);
        // 运单号失去焦点时
        jQuery("#field16311_" + indexnum0).blur(function () {
            var textflag = /^(\d|[a-zA-Z;-])+$/.test(this.value.trim());
            if (!textflag && this.value != "") {
                this.value = this.value.replace(/[^a-zA-Z0-9;-]/i, '');
                alert("仅允许输入字母、数字和单破折号(-)，多运单号必须用分号(;)隔开。\n\r Only semicolons are allowed for delimiters between orders.");
                jQuery(this).val("");
            } else {
                setjhsxx(indexnum0);
            }
        });

        // SAP交货单 变化时监听
        jQuery("#field16300_" + indexnum0).bind("propertychange", function () {
            setjhsxx(indexnum0);
        });

        // 费用承担部门 变化时监听
        jQuery("#field16335_" + indexnum0).bind("propertychange", function () {
            fycdbm(indexnum0);
        });

        // 按元素取值后并向该元素赋值并隐藏元素 报销次数 已经报销总数量 报销单号
        setHideTextVal("field16324_" + indexnum0);
        setHideTextVal("field16334_" + indexnum0);
        setHideTextVal("field16327_" + indexnum0);
    });

    // 按元素取值后并向该元素赋值并隐藏元素
    function setTextVal(fieldid, val) {
        jQuery("#" + fieldid).val(val);
        jQuery("#" + fieldid + "span").html(val);
        jQuery("#" + fieldid).hide();
    }

    // 按元素取值后并向该元素赋值并隐藏元素
    function setHideTextVal(fieldid) {
        var val = jQuery("#" + fieldid).val();
        setTextVal(fieldid, val);
    }

    // 定时任务 设置交货单号/交货单 报销次数等信息
    //setInterval(setwlwy, 1000 * 20);
    jQuery("#refsapdata").bind('click', function () {
        setwlwy();
    });
    jQuery("#field16325").bind("change", function () {
        setwlwy();
    });

    function setwlwy() {
        var ids = document.getElementsByName("check_node_0");
        for (var x = 0; x < ids.length; x++) {
            var i = ids[x].value;
            // 设置交货单号/交货单 报销次数等信息
            setjhsxx(i);
        }
    }

    // 设置交货单号/交货单 报销次数等信息
    function setjhsxx(nodeid) {
        //alert(nodeid);
        var reid = jQuery("#requestid").val();
        var jhdh = jQuery("#field16300_" + nodeid).val(); // 交货单号
        var lx = jQuery("#field16325").val(); // 运输类型
        if (lx == "0" || lx == "4") { // 配送 调拨
            var ydh = jQuery("#field16311_" + nodeid).val(); // 运单号
            //alert(ydh);
            if (ydh != "") { // 运单号不为空
                jQuery.ajax({
                    url: "/sunda/xy/commom/opt.jsp",
                    data: {
                        "method": "getYdhBxXX",
                        "ydh": ydh,
                        "reid": reid,
                        "ran": Math.random()
                    },
                    dataType: "json",
                    success: function (res) {
                        setTextVal("field16324_" + nodeid, res.cnt); // 报销次数 赋值
                        setTextVal("field16334_" + nodeid, res.zsj); // 已经报销总数量 赋值
                        setTextVal("field16327_" + nodeid, res.dh); // 报销单号 赋值
                    }
                });
                /* Action_Util.getYdhBxXX(ydh, reid, function(data) {
                    var tmp = data.split("~#");
                    setTextVal("field16324_" + nodeid, tmp[0]); // 报销次数 赋值
                    setTextVal("field16334_" + nodeid, tmp[1]); // 已经报销总数量 赋值
                    setTextVal("field16327_" + nodeid, tmp[2]); // 报销单号 赋值
                }); */
            } else {
                setTextVal("field16324_" + nodeid, "0"); // 报销次数 赋值
                setTextVal("field16334_" + nodeid, "0"); // 已经报销总数量 赋值
                setTextVal("field16327_" + nodeid, ""); // 报销单号 赋值
            }
        } else { // 转储 按交货单
            jQuery.ajax({
                url: "/sunda/xy/commom/opt.jsp",
                data: {
                    "method": "getJhdBxXX",
                    "sapjhd": jhdh,
                    "reid": reid,
                    "ran": Math.random()
                },
                dataType: "json",
                success: function (res) {
                    setTextVal("field16324_" + nodeid, res.cnt); // 报销次数 赋值
                    setTextVal("field16334_" + nodeid, res.zsj); // 已经报销总数量 赋值
                    setTextVal("field16327_" + nodeid, res.dh); // 报销单号 赋值
                }
            });
            /* Action_Util.getJhdBxXX(jhdh, reid, function(data) {
                var tmp = data.split("~#");
                setTextVal("field16324_" + nodeid, tmp[0]); // 报销次数 赋值
                setTextVal("field16334_" + nodeid, tmp[1]); // 已经报销总数量 赋值
                setTextVal("field16327_" + nodeid, tmp[2]); // 报销单号 赋值
            }); */
        }
    }

    // 反写 费用协助部门
    function fycdbm() {
        var bms = "",
            strbms = "";
        var fybms = jQuery("#field16340").val(); // 协助确认费用部门
        jQuery("#field16340").val("");
        jQuery("#field16340span").text("");
        jQuery("#field16340span").prev().attr("disabled", "disabled");
        var bxrbm = jQuery("#field16214").val(); // 申请部门
        var s = document.getElementsByName("check_node_0");
        var si = s.length;
        for (var x = 0; x < si; x++) {
            var i = s[x].value;
            var bm = jQuery("#field16335_" + i).val(); // 费用承担部门
            var strbm = jQuery("#field16335_" + i + "span").text(); // 费用承担部门
            if (check_bm(bms, bm)) {
                if (bxrbm != bm) {
                    bms = bms + "," + bm;
                    strbms = strbms + " " + strbm;
                }
            }
        }
        if (bms != "") {
            // 得到费用承担部门明细集合
            bms = bms.substr(1);
        }
        jQuery("#field16340").val(bms); // 反写协助确认费用部门
        jQuery("#field16340span").text(strbms); // 反写协助确认费用部门
    }

    // 判断部门id是否在id组里面
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

    // 检查运单号 是否重复
    function fn_check() {
        var lx = jQuery("#field16325").val(); // 运输类型
        var s = document.getElementsByName("check_node_0");
        var sl = s.length;
        var yundh = "";
        var jhdhs = "";
        var cftjcs = 0; // 重复提交次数

        for (var x = 0; x < sl; x++) {
            var i = s[x].value;
            var jhdh = jQuery("#field16300_" + i).val(); // SAP交货单
            var ydh = jQuery("#field16311_" + i).val().replace(/\s*/g, ""); // 运单号
            var sfsj = jQuery("#field16626_" + i).is(":checked"); // 是否税金

            // 配送/调拨 且 运单号为空 且 不是税金 时 运单号必填
            if ((lx == "0" || lx == "4") && ydh == "" && !sfsj) {
                alert("运单号必填! \n\r Waybill number is required!");
                return false;
            }

            // 转储 且 交货单号为空 且 不是税金 时 交货单必填
            if ((lx == "1" || lx == "2" || lx == "3") && jhdh == "" && !sfsj) {
                alert("SAP交货单必填! \n\r SAP Delivery order required!");
                return false;
            }

            if (jQuery("#field16324_" + i).val() == "") {
                alert("无法校验重复报销次数! \n\r The number of repeated reimbursement cannot be verified!");
                return false;
            }

            // 客户/供应商名称
            var shkh = jQuery("#field16303_" + i).val();

            // 配送 且 客户/供应商名称为空
            if (lx == "0" && shkh == "") {
                alert("客户/供应商名称必填! \n\r Receiving customer  is required!");
                return false;
            }

            var fycdf = jQuery("#field18744_" + i).val();

            var arr = ydh.split(";");
            for (var xf = 0; xf < arr.length; xf++) {
                var i = arr[xf];
                if (i != "") yundh += fycdf + i + ";";
            }

            jhdhs += jhdh + ";";

            cftjcs += jQuery("#field16324_" + i).val();
        }
        //alert(yundh);
        if (cftjcs > 0) {
            alert("明细行存在历史 重复报销，请检查! \n\r Duplicate reimbursement exists in detail line, please check!");
            return false;
        }

        var arr;
        var obj;

        // 校验重复的运输单号 本页面
        // 配送/调拨
        if (lx == "0" || lx == "4") {
            arr = yundh.split(";");
            obj = new Array();
            for (var x = 0; x < arr.length; x++) {
                var i = arr[x];
                if (i != "") obj.push(i);
            }
            obj.sort();
            if (obj.length > 1) {
                var tempobj = "";
                var flag = false;
                for (var x = 0; x < obj.length; x++) {
                    var i = obj[x];
                    if (tempobj != "" && (tempobj == i)) {
                        flag = true;
                        break;
                    } else {
                        tempobj = i;
                    }
                }
                if (flag) {
                    alert("运单号 " + tempobj + "重复，请检查! \n\r  Waybill number " + tempobj + ", please check!");
                    return false;
                }
            }
        }

        // 校验重复的交货单号 本页面
        // 转储
        if (lx == "1" || lx == "2" || lx == "3") {
            arr = jhdhs.split(";");
            obj = new Array();
            for (var xx = 0; xx < arr.length; xx++) {
                var i = arr[xx];
                if (i != "") obj.push(i);
            }
            obj.sort();
            if (obj.length > 1) {
                var tempobj = "";
                var flag = false;
                for (var xx = 0; xx < obj.length; xx++) {
                    var i = obj[xx];
                    if (tempobj != "" && (tempobj == i)) {
                        flag = true;
                        break;
                    } else {
                        tempobj = i;
                    }
                }
                if (flag) {
                    alert("交货单号 " + tempobj + "重复，请检查! \n\r  SAP Delivery order " + tempobj + ", please check!");
                    return false;
                }
            }
        }

        /**/

        return true;
    }

    checkCustomize = function () {
        setwlwy();
        fycdbm();
        return fn_check();
    }

});