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
	/*
	jQuery("#indexnum2").bind("propertychange",function(){
	var index1 = parseFloat(this.value) - 1;
	if(spantxt){
	setjf(index1);
	}
	});

	jQuery("#indexnum3").bind("propertychange",function(){
	var index2 = parseFloat(this.value) - 1;
	if(spantxt){
	setdf(index2);
	}
	});

	 */
	function setpztt() {
		jQuery("#field22078").val("ZO"); //凭证类型
		jQuery("#field22078span").text("");

		var lcbh = jQuery("#field22063span").text();
		jQuery("#field22079").val(lcbh); //参照
		jQuery("#field22079span").text(lcbh);
	}

	function setjf(xuh) {

		jQuery("#field22447_" + xuh).val("50"); //记账码
		jQuery("#field22447_" + xuh + "span").text("50");

		var fyje = jQuery("#field22089_" + xuh + "span").text().replace(/,/gm, '');

		var kmbm = "6051110000";
		var kmmc = "Other operating income_Scrap materials sales";

		var sqlx = jQuery("#disfield22083_" + xuh).find("option:selected").text();
		var _sqlx = jQuery('#field22083_' + xuh).val();
		if (_sqlx == "3") {
			// 林卓海申请调整 0901-2021070026
			//kmbm = "6051980000";
			//kmmc = " Other operating income_Others";
			kmbm = "6601540000";
			kmmc = " Business expenses_Sample and moudle";
		}

		var fymxbmid = jQuery("#field22061").val();//归属部门ID
		if (fymxbmid != "") {
			var fieldname = "hsdm";
			var fieldnamet = "hsmc";
			var tablename = "CostAccountingCenter";
			var strWhere = "id=(select sshscbzx from HrmDepartment where id=" + fymxbmid + ")";

			Action_Util.getTabValue(fieldname, tablename, strWhere, function (data) {
				jQuery("#field22453_" + xuh).val(data);//成本中心编号
				jQuery("#field22453_" + xuh + "span").text(data);
			});

			Action_Util.getTabValue(fieldnamet, tablename, strWhere, function (data) {
				jQuery("#field22454_" + xuh).val(data);//成本中心编号
				jQuery("#field22454_" + xuh + "span").text("");
			});
		}

		//jQuery("#field22448_" + xuh).val("_非生产废旧物资变卖_"+sqlx+"_"); //科目编码
		var Materialtype = jQuery("#disfield22083_" + xuh).find("option:selected").text();//物料类型
		var ItemName = jQuery("#field22084_" + xuh).val();//物品名称
		jQuery("#field22448_" + xuh).val(Materialtype + "_" + ItemName + "_非生产废旧物资变卖_");

		jQuery("#field22448_" + xuh + "span").text("");
		jQuery("#field22449_" + xuh).val(kmbm); //科目编码
		jQuery("#field22449_" + xuh + "span").text(kmbm);
		jQuery("#field22450_" + xuh).val(kmmc); //科目名称
		jQuery("#field22450_" + xuh + "span").text("");
		jQuery("#field22452_" + xuh).val(fyje);

	}

	function setdf(xuh) {
		jQuery("#field22460_" + xuh).val("40"); //记账码
		jQuery("#field22460_" + xuh + "span").text("40");

		var sqlx = jQuery("#disfield22083_" + xuh).find("option:selected").text();
		//jQuery("#field22461_" + xuh).val("_非生产废旧物资变卖_"+sqlx+"_"); //科目编码  
		var Materialtype = jQuery("#disfield22083_" + xuh).find("option:selected").text();//物料类型
		var ItemName = jQuery("#field22084_" + xuh).val();//物品名称
		jQuery("#field22461_" + xuh).val(Materialtype + "_" + ItemName + "_非生产废旧物资变卖_");

		jQuery("#field22461_" + xuh + "span").text("");

		jQuery("#field22466_" + xuh).val("01"); //原因代码
		jQuery("#field22466_" + xuh + "span").text("01");
		jQuery("#field22467_" + xuh).val("Sales or rendering services received");
		jQuery("#field22467_" + xuh + "span").text("");
		var sumje = jQuery("#sumvalue22089").val().replace(/,/gm, '');
		jQuery("#field22464_" + xuh).val(sumje);
	}

	if (spantxt) { //申请或编辑状态
		setpztt();
		var bt_add = parseFloat(jQuery("#indexnum1").val());
		//var hsbt   = parseFloat(jQuery("#indexnum3").val());

		/*
		if (bt_add < 2) {
			for (var i = 0; i < 2; i++) {
				//addRow1(1);
				jQuery("button[name='addbutton2']").click();
			}
		}

		var hsdf = parseInt(jQuery("#indexnum3").val());
		if (hsdf == 0) {
			jQuery("button[name='addbutton3']").click();
		}
		*/

	}

});