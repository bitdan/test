jQuery(document).ready(function () {

    var dochref = location.href;
    var spantxt = false;
    if (dochref.indexOf("ViewRequest") == -1) {
        spantxt = true;
    }


    var _sdtype = f_sdtype; //申请类型
    var _sdbankcodesap = f_sdbankcodesap; //bak
    jQuery("#" + _sdbankcodesap).bind("propertychange", function () {
        if (spantxt) {
            ModifyCountryAndBankcode();
        }
    });


    jQuery("#" + _sdtype).bind("propertychange", function () {
        if (spantxt) {
            ModifyCountryAndBankcode();
        }
    });

    function ModifyCountryAndBankcode() {//赋值银行国家代码和银行代码
        var applicationtype = jQuery("#" + _sdtype).val()//申请类型

        // 0 新增
        // 1 删除
        // 2 变更
        // 变更前内容
        var _sdbankctry = f_sdbankctry;          // 国家
        var _sdbankkey = f_sdbankkey;            //银行代码
        var _sdbankswiftcode = f_sdbankswiftcode;//Swiftcode
        var _sdbankname = f_sdbankname;          //银行全称
        var _sdbankname2 = f_sdbankname2;        //银行全称（外文）
        var _sdcityold = f_sdcityold;             //城市
        var _sdprovincenoold = f_sdprovincenoold;  //省份编号
        var _sdprovinceold = f_sdprovinceold;     //省份
        var _sdbankno = f_sdbankno;     //bianhao

        var _sdbankctry = jQuery("#" + _sdbankctry).val();
        var _sdbankkey = jQuery("#" + _sdbankkey).val();
        var _sdbankswiftcode = jQuery("#" + _sdbankswiftcode).val();
        var _sdbankname = jQuery("#" + _sdbankname).val();
        var _sdbankname2 = jQuery("#" + _sdbankname2).val();
        var _sdcityold = jQuery("#" + _sdcityold).val();
        var _sdprovincenoold = jQuery("#" + _sdprovincenoold).val();
        var _sdprovinceold = jQuery("#" + _sdprovinceold).val();
        var _sdbankno = jQuery("#" + _sdbankno).val();
        //alert(_sdbankno);
        var _sdcountry = f_sdcountry;
        var _sdbankcode = f_sdbankcode;
        var _sdswiftcode = f_sdswiftcode;
        var _sdbankfullname = f_sdbankfullname;
        var _sdbankforeignname = f_sdbankforeignname;
        var _sdprovince = f_sdprovince;
        var _sdcity = f_sdcity;
        var _sdprovinceno = f_sdprovinceno;
        var _bankno = f_bankno;


        var t_sdbankcode = jQuery("#" + _sdbankcode).val();
        if (t_sdbankcode == "") {
            if (applicationtype == 1 || applicationtype == 2) {

                jQuery("#" + _sdcountry).val(_sdbankctry);
                jQuery("#" + _sdcountry + "span").text(_sdbankctry);
                jQuery("#" + _sdbankcode).val(_sdbankkey);
                jQuery("#" + _sdbankcode + "span").text("");
                jQuery("#" + _sdswiftcode).val(_sdbankswiftcode);
                jQuery("#" + _sdswiftcode + "span").text("");
                jQuery("#" + _sdbankfullname).val(_sdbankname);
                jQuery("#" + _sdbankfullname + "span").text("");
                jQuery("#" + _sdbankforeignname).val(_sdbankname2);
                jQuery("#" + _sdbankforeignname + "span").text("");
                jQuery("#" + _sdcity).val(_sdcityold);
                jQuery("#" + _sdcity + "span").text("");
                jQuery("#" + _sdprovinceno).val(_sdprovincenoold);
                jQuery("#" + _sdprovinceno + "span").text(_sdprovincenoold);
                jQuery("#" + _sdprovince).val(_sdprovinceold);
                jQuery("#" + _sdprovince + "span").text(_sdprovinceold);
                jQuery("#" + _bankno).val(_sdbankno);
                jQuery("#" + _bankno + "span").text("");

                jQuery("#field24291").prev().prev().attr("disabled", "disabled");
                jQuery("#field24265").attr("readonly", "readonly");
            } else {
                jQuery("#field24291").prev().prev().attr("disabled", "");
                jQuery("#field24265").attr("readonly", "");
            }
        }
    }

    checkCustomize = function () {

        var _sdcountry = f_sdcountry;
        var _sdbankcode = f_sdbankcode;
        var _sdswiftcode = f_sdswiftcode;
        var _sdbankfullname = f_sdbankfullname;
        var _sdbankforeignname = f_sdbankforeignname;
        var _sdprovince = f_sdprovince;
        var _sdcity = f_sdcity;

        var _sdcountry = jQuery("#" + _sdcountry).val();
        var _sdswiftcode = jQuery("#" + _sdswiftcode).val();
        var _sdbankcode = jQuery("#" + _sdbankcode).val();

        var _sdprovince = jQuery("#" + _sdprovince).val();
        var _sdcity = jQuery("#" + _sdcity).val();

        var _sdbankfullname = jQuery("#" + _sdbankfullname).val();
        var _sdbankforeignname = jQuery("#" + _sdbankforeignname).val();
        if (_sdcountry == "CN") {
            if (_sdbankcode == "") {
                alert("银行代码必填!!!");
                return false;
            }
            if (_sdbankfullname == "") {
                alert("银行全称必填!!!");
                return false;
            }
            if (_sdcity == "") {
                alert("城市必填!!!")
                return false;
            }
            if (_sdprovince == "") {
                alert("省份必填!!!")
                return false;
            }
        } else {
            if (_sdbankfullname == "") {
                alert("银行全称必填!!!");
                return false;
            }
            if (_sdswiftcode == "") {
                alert("SEIFTCODE必填!!!");
                return false;
            }
        }
        //alert(_sdbankcode);
        //alert(checkEnglishandnumbers(_sdbankcode));
        var applicationtype = jQuery("#" + _sdtype).val();//申请类型
        if (applicationtype == 2) {

            alert("您如果清空\n" + "SWEFTCODE, 省份, 城市, 银行全称, 银行全称(外文)\n" + "等字段内容, 数据将被空值覆盖. 请确认!!!");

        }
        if (!checkEnglishandnumbers(_sdbankcode)) {
            alert("银行代码只能有英文和数字");
            return false;
        }
        if (!checkEnglishandnumbers(_sdswiftcode)) {
            alert("swiftcode只能有英文和数字");
            return false;
        }
        if (_sdbankcode.length > 15) {
            alert("银行代码超过15位");
            return false;
        }
        if (_sdswiftcode.length > 11) {
            alert("SWIDTCODE超过11位");
            return false;
        }
        return true;
    }

    function checkEnglishandnumbers(s) {
        var reg = new RegExp(/^[0-9a-zA-Z_]{0,}$/);
        return reg.test(s);
    }
})