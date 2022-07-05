jQuery(document).ready(function () {
    // var _searchno = dt3_searchno;//查询账号

    var _oldbankaccount = dt3_oldbankaccount;
    var _oldbz = dt3_oldbz;
    var oldbankaccount = "";
    var oldbz = "";
    var tmpobj = "";

    jQuery("#indexnum2").bind("propertychange", function () {
        var indexnum2 = 0;
        if (document.getElementById("indexnum2")) {
            indexnum2 = document.getElementById("indexnum2").value * 1.0 - 1;
        }
        // alert("明细2aaaa" + indexnum2);
        var indexnum1 = parseFloat(jQuery("#indexnum1").val()) - 1;
        if (indexnum1 < indexnum2) {
            for (var i = indexnum1; i < indexnum2; i++) {
                jQuery("button[name='addbutton1']").click();
            }
        }
    })

    var indexnum2 = document.getElementById("indexnum0").value * 1.0;
    for (var i = 0; i < indexnum2; i++) {

        jQuery("#" + _oldbz + "_" + i).bind('propertychange', function () {
            oldbankaccount = jQuery("#" + _oldbankaccount + "_" + i).val();
            oldbz = jQuery("#" + _oldbz + "_" + i).val();
            // alert(oldbankaccount);
            // alert(oldbz);
            getBankinfo(i);
            setTimeout(function () {
                setfirstone(i);
            }, 1000);
        })

    }

    jQuery("#indexnum2").bind("propertychange", function () {
        var i = parseFloat(this.value) - 1;
        jQuery("#" + _oldbz + "_" + i).bind('propertychange', function () {
            oldbankaccount = jQuery("#" + _oldbankaccount + "_" + i).val();
            oldbz = jQuery("#" + _oldbz + "_" + i).val();
            // alert(oldbankaccount);
            // alert(oldbz);
            getBankinfo(i);
            setTimeout(function () {
                setfirstone(i);
            }, 1000);
        })
    });


    function setfirstone(x) {
        alert(tmpobj.CLTNO);
        var _companynamecode = dt2_companynamecode;//	公司主体代码
        jQuery("#" + _companynamecode + "_" + x).val(tmpobj.CLTNO);

        var _GSDM = dt2_GSDM;//	公司代码
        jQuery("#" + _GSDM + "_" + x).val(tmpobj.ACT_CLTNO);
        jQuery("#" + _GSDM + "_" + x + "span").text(tmpobj.ACT_CLTNO);

        var _bankaccount = dt2_bankaccount;//	银行账号
        jQuery("#" + _bankaccount + "_" + x).val(tmpobj.ACCOUNTNO);

        var _openaccountdate = dt2_openaccountdate;//	开户日期
        jQuery("#" + _openaccountdate + "_" + x).val(tmpobj.OPENACCOUNTDATE.substring(0, 10));
        jQuery("#" + _openaccountdate + "_" + x + "span").text(tmpobj.OPENACCOUNTDATE.substring(0, 10));

        var _bankname = dt2_bankname;//	开户行名称
        jQuery("#" + _bankname + "_" + x).val(tmpobj.CNAPS_NAME);

        var _bz = dt2_bz;//	币种
        jQuery("#" + _bz + "_" + x).val(tmpobj.CURRENCYNO);
    }

    function getBankinfo(x) {
        // var ACCOUNTNO = "117010100100733866";
        // var CURRENCYNO = "CNY";
        jQuery.ajax({
            url: "/sunda/xy/commom/opt.jsp",
            data: {
                "method": "getbankinfo",
                "ACCOUNTNO": oldbankaccount,
                "CURRENCYNO": oldbz,
                // "ACCOUNTNO": ACCOUNTNO,
                // "CURRENCYNO": CURRENCYNO,
                "ran": Math.random()
            },
            dataType: "json",
            success: function (res) {

                tmpobj = res;
                // alert(res.OPENACCOUNTDATE.substring(0, 10));

                var _oldcompanynamecode = dt3_oldcompanynamecode;//	公司主体代码
                jQuery("#" + _oldcompanynamecode + "_" + x).val(res.CLTNO);

                var _oldgsdm = dt3_oldgsdm;//	公司代码
                jQuery("#" + _oldgsdm + "_" + x).val(res.ACT_CLTNO);
                jQuery("#" + _oldgsdm + "_" + x + "span").text(res.ACT_CLTNO);


                // var _oldbankaccount = dt3_oldbankaccount;//	银行账号
                // jQuery("#" + _oldbankaccount + "_" + x).val(res.ACCOUNTNO);

                var _oldopenaccountdate = dt3_oldopenaccountdate;//	开户日期
                jQuery("#" + _oldopenaccountdate + "_" + x).val(res.OPENACCOUNTDATE.substring(0, 10));

                var _oldbankname = dt3_oldbankname;//	开户行名称
                jQuery("#" + _oldbankname + "_" + x).val(res.CNAPS_NAME);

                // var _oldaccountstate = dt3_oldaccountstate;//	开户行国家
                // jQuery("#" + _oldaccountstate + "_" + x).val(res.CNAPS_NAME);

                var _oldcoilno = dt3_oldcoilno;//	联行号
                jQuery("#" + _oldcoilno + "_" + x).val(res.CNAPS_CODE);

                var _oldswiftcode = dt3_oldswiftcode;//	swiftcode
                jQuery("#" + _oldswiftcode + "_" + x).val(res.SWIFT_CODE);

                // var _oldbz = dt3_oldbz;//	币种
                // jQuery("#" + _oldbz + "_" + x).val(res.CURRENCYNO);

                var _oldinsystem = dt3_oldinsystem;//	是否体系内
                jQuery("#" + _oldinsystem + "_" + x).find("option[value='" + res.ISGRP + "']").attr("selected", true);


                var _oldoutflag = dt3_oldoutflag;//	境内外标识
                jQuery("#" + _oldoutflag + "_" + x).find("option[value='" + res.OUT_FLAG + "']").attr("selected", true);


                // var _oldreservedseal=dt3_oldreservedseal;//	预留印鉴
                // jQuery("#" + _oldreservedseal + "_" + x).val(res.OUT_FLAG);

                var _oldaccountowner = dt3_oldaccountowner;//	有效签字人
                jQuery("#" + _oldaccountowner + "_" + x).val(res.SIGNER);

                var _oldsyncpos = dt3_oldsyncpos;//	同步到POS
                jQuery("#" + _oldsyncpos + "_" + x).find("option[value='" + res.TO_POS + "']").attr("selected", true);


                var _oldposonetoone = dt3_oldposonetoone;//	是否与POS一对一
                jQuery("#" + _oldposonetoone + "_" + x).find("option[value='" + res.IS_ONLY + "']").attr("selected", true);


                var _oldPOSID = dt3_oldPOSID;//	POSID
                jQuery("#" + _oldPOSID + "_" + x).val(res.POSID);

                var _oldaccountcategory = dt3_oldaccountcategory;//	账户类别
                var realNATUREID = res.NATUREID - 1;
                jQuery("#" + _oldaccountcategory + "_" + x).find("option[value='" + realNATUREID + "']").attr("selected", true);


            }
        });

    }
});