jQuery(document).ready(function () {
    jQuery("#field23871").change(function () {
        var Fundingtype = jQuery(this).val()//调账类型
        //alert(Fundingtype);
        if (Fundingtype == 0) {
            jQuery("#field23933").bind("propertychange", function () {//客户1
                changetext1();
            });
            jQuery("#field23934").bind("propertychange", function () {//客户2
                changetext1();
            });
            jQuery("#field23908").bind("propertychange", function () {//装箱单号
                changetext1();
            });
            jQuery("#field23907").bind("propertychange", function () {//发票号
                changetext1();
            });
            jQuery("#field23910").bind("propertychange", function () {//业务员
                changetext1();
            });

        } else if (Fundingtype == 1) {
            var Fundingtype = jQuery(this).val()//调账类型
            //alert(Fundingtype);
            jQuery("#field23910").bind("propertychange", function () {//业务员
                //alert(jQuery(this).val());
                changetext2();
            });
            jQuery("#field23935").bind("propertychange", function () {//客户3
                //alert(jQuery(this).val());
                changetext2();
            });
            jQuery("#indexnum2").bind("propertychange", function () {


                var indexnum2 = document.getElementById("indexnum2").value * 1.0;

                //alert(indexnum2);
                var index = indexnum2 - 1;
                //alert(index);
                jQuery("#field23912_" + index).bind("propertychange", function () {//装箱单
                    // alert(jQuery(this).val());
                    changetext2(index);
                });
                jQuery("#field23913_" + index).bind("propertychange", function () {//发票号
                    //alert(jQuery(this).val());
                    changetext2(index);
                });
                jQuery("#field23944_" + index).bind("propertychange", function () {//装箱单
                    // alert(jQuery(this).val());
                    changetext2(index);
                });

            })
        } else if (Fundingtype == 2 || Fundingtype == 3) {

            jQuery("#field23910").bind("propertychange", function () {//业务员
                changetext3();
            });
            jQuery("#field23935").bind("propertychange", function () {//客户3
                changetext3();
            });
            jQuery("#indexnum2").bind("propertychange", function () {
                var indexnum2 = document.getElementById("indexnum2").value * 1.0;
                var index = indexnum2 - 1;
                jQuery("#field23912_" + index).bind("propertychange", function () {//装箱单
                    changetext3(index);
                });
                jQuery("#field23913_" + index).bind("propertychange", function () {//发票号
                    changetext3(index);
                });
                jQuery("#field23944_" + index).bind("propertychange", function () {//装箱单
                    changetext3(index);
                });

            })
        }
    })

    function changetext1() {
        var Salesman = jQuery("#field23910span").text();//业务员

        var packinglist = jQuery("#field23908").val();//装箱单号 
        var invoicenumber = jQuery("#field23907").val();//发票号
        var Customer2name = jQuery("#field23904").val();//客户2名称
        var Customer1name = jQuery("#field23903").val();//客户1名称

        var text0 = Salesman + "_销货_" + Customer2name + "_" + packinglist + "_" + invoicenumber + "从" + Customer1name + "转出";
        jQuery("#field23909").val(text0) //文本
        jQuery("#field23909span").text("") //文本
    }

    function changetext2(index) {

        var Salesman = jQuery("#field23910span").text();//业务员
        //alert(Salesman);
        var Customer3name = jQuery("#field23932").val();//客户3名称
        var packinglist = jQuery("#field23912_" + index).val();//装箱单号 
        var invoicenumber = jQuery("#field23913_" + index).val();//发票号
        var text3 = Salesman + "_销货_" + Customer3name + "_" + packinglist + "_" + invoicenumber + "_";//文本3
        var Increaseordecreasetmp = jQuery("#field23944_" + index).val();//增减
        if (Increaseordecreasetmp == 0) {
            text3 += "_增加";
        } else if (Increaseordecreasetmp == 1) {
            text3 += "_减少";
        }
        jQuery("#field24129_" + index).val(text3);
        jQuery("#field24129_" + index + "span").text("");
    }

    function changetext3(index) {

        var Salesman = jQuery("#field23910span").text();//业务员
        //alert(Salesman);
        var Customer3name = jQuery("#field23932").val();//客户3名称
        var packinglist = jQuery("#field23912_" + index).val();//装箱单号 
        var invoicenumber = jQuery("#field23913_" + index).val();//发票号
        var text3 = Salesman + "_调整_" + Customer3name + "_" + packinglist + "_" + invoicenumber + "_COC费用";//文本3

        jQuery("#field24129_" + index).val(text3);
        jQuery("#field24129_" + index + "span").text("");
    }

});

