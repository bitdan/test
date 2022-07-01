else if(method.equals("getbankinfo")){
		String ACCOUNTNO = Util.null2String(request.getParameter("ACCOUNTNO")).trim();
		String CURRENCYNO = Util.null2String(request.getParameter("CURRENCYNO"));
		

		LinkedHashMap<String, String> datas = new LinkedHashMap<String, String>();
		datas.put("ACCOUNTNO", ACCOUNTNO);              
		datas.put("CURRENCYNO", CURRENCYNO);  
		JSONArray tmp=new JSONArray();
		tmp.add(datas);
		JSONObject mainObject=new JSONObject();
		mainObject.put("code", "ACCACK");
		mainObject.put("datasource", "OA");
		mainObject.put("traceID", ACCOUNTNO);
		mainObject.put("datas", tmp);
        writeLog("0313search+ACCOUNTNO" +ACCOUNTNO+ mainObject);
		String url="http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway";
		JSONObject retobj = new JSONObject();
		HttpPost httpPost = new HttpPost(url);
		CloseableHttpClient client = HttpClients.createDefault();
		//请求参数转JOSN字符串
		StringEntity entity = new StringEntity(mainObject.toString(), "UTF-8");
		entity.setContentEncoding("UTF-8");
		entity.setContentType("application/json");
		httpPost.setEntity(entity);
		try {
			HttpResponse response = client.execute(httpPost);
			if (response.getStatusLine().getStatusCode() == 200) {
				 retobj = JSON.parseObject(EntityUtils.toString(response.getEntity(), "UTF-8"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			retobj.put("error", "连接错误！");

		}

		writeLog("0313search+ACCOUNTNO" +ACCOUNTNO+ retobj);
		if (retobj.getString("success").equals("true")) {//说明接收格式是对的
			JSONArray tmpArray=retobj.getJSONArray("datas");
			//writeLog(tmpArray);
			for (int i = 0; i < tmpArray.size(); i++) {
				String tmpArray_return = tmpArray.getJSONObject(i).getString("RESULT_EXP");
				if (tmpArray_return.equals("查询成功")) {//返回结果, 成功
					String ACCOUNTNO = tmpArray.getJSONObject(i).getString("ACCOUNTNO");
					String CURRENCYNO = tmpArray.getJSONObject(i).getString("CURRENCYNO");
					String CANCELDATE = tmpArray.getJSONObject(i).getString("CANCELDATE");
					String USAGEID = tmpArray.getJSONObject(i).getString("USAGEID");
					String SWIFT_CODE = tmpArray.getJSONObject(i).getString("SWIFT_CODE");
					String ACT_CLTNO = tmpArray.getJSONObject(i).getString("ACT_CLTNO");
					String CTID = tmpArray.getJSONObject(i).getString("CTID");
					String OPENACCOUNTDATE = tmpArray.getJSONObject(i).getString("OPENACCOUNTDATE");
					String FOREIGNTYPE = tmpArray.getJSONObject(i).getString("FOREIGNTYPE");
					String CLTNO = tmpArray.getJSONObject(i).getString("CLTNO");
					String NATUREID = tmpArray.getJSONObject(i).getString("NATUREID");
					String OUT_FLAG = tmpArray.getJSONObject(i).getString("OUT_FLAG");
					String IS_ONLY = tmpArray.getJSONObject(i).getString("IS_ONLY");
					String CANCELREASON = tmpArray.getJSONObject(i).getString("CANCELREASON");
					String UPDATE_TIME = tmpArray.getJSONObject(i).getString("UPDATE_TIME");
					String MEMORYNAME = tmpArray.getJSONObject(i).getString("MEMORYNAME");
					String CNREMARK = tmpArray.getJSONObject(i).getString("CNREMARK");
					String ACCOUNTNAME = tmpArray.getJSONObject(i).getString("ACCOUNTNAME");
					String TO_POS = tmpArray.getJSONObject(i).getString("TO_POS");
					String APPMODE = tmpArray.getJSONObject(i).getString("APPMODE");
					String POSID = tmpArray.getJSONObject(i).getString("POSID");
					String SIGNER = tmpArray.getJSONObject(i).getString("SIGNER");
					String CNAPS_NAME = tmpArray.getJSONObject(i).getString("CNAPS_NAME");
					String ISGRP = tmpArray.getJSONObject(i).getString("ISGRP");
					String RESULT_EXP = tmpArray.getJSONObject(i).getString("RESULT_EXP");
					String CNAPS_CODE = tmpArray.getJSONObject(i).getString("CNAPS_CODE");


					rel.put("ACCOUNTNO", ACCOUNTNO);
					rel.put("CURRENCYNO", CURRENCYNO);
					rel.put("CANCELDATE", CANCELDATE);
					rel.put("USAGEID", USAGEID);
					rel.put("SWIFT_CODE", SWIFT_CODE);
					rel.put("ACT_CLTNO", ACT_CLTNO);
					rel.put("CTID", CTID);
					rel.put("OPENACCOUNTDATE", OPENACCOUNTDATE);
					rel.put("FOREIGNTYPE", FOREIGNTYPE);
					rel.put("CLTNO", CLTNO);
					rel.put("NATUREID", NATUREID);
					rel.put("OUT_FLAG", OUT_FLAG);
					rel.put("OUT_FLAG", OUT_FLAG);
					rel.put("IS_ONLY", IS_ONLY);
					rel.put("CANCELREASON", CANCELREASON);
					rel.put("UPDATE_TIME", UPDATE_TIME);
					rel.put("CNREMARK", CNREMARK);
					rel.put("ACCOUNTNAME", ACCOUNTNAME);
					rel.put("TO_POS", TO_POS);
					rel.put("APPMODE", APPMODE);
					rel.put("POSID", POSID);
					rel.put("SIGNER", SIGNER);
					rel.put("ISGRP", ISGRP);
					rel.put("RESULT_EXP", RESULT_EXP);
					rel.put("CNAPS_CODE", CNAPS_CODE);

				}else  {//信息异常
					String RESULT_EXP = tmpArray.getJSONObject(i).getString("RESULT_EXP");
					rel.put("RESULT_EXP", RESULT_EXP);
				}
			
			}
		}
		
		out.println(rel);
	} 