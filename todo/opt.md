```
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="weaver.general.Util" %>
<%@ page import="net.sf.json.*" %>
<%@ page import="weaver.conn.*"%>
<%@ page import="weaver.hrm.*" %>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="com.sap.mw.jco.IFunctionTemplate"%>
<%@ page import="com.sap.mw.jco.JCO"%>
<%@ page import="com.sap.mw.jco.JCO.ParameterList"%>
<%@ page import="com.sap.mw.jco.JCO.Table"%>
<%@ page import="weaver.sunda.dwr.SAPConn"%>

<jsp:useBean id="rs" class="weaver.conn.RecordSet" scope="page" />

<% 
	User user = HrmUserVarify.getUser (request , response) ;
	int userid = user.getUID();
	
	if(userid != 1)
{
	//response.sendRedirect("/notice/noright.jsp");
	//return;
}
%>

<%
	// all
	String method = Util.null2String(request.getParameter("method"));
	String sql = "";
	JSONObject rel = new JSONObject();
	JSONArray lists = new JSONArray();
	JSONObject json;
	// common
	if(method.equals("getJhdBxXX")){
		
		String sapjhd = Util.null2String(request.getParameter("sapjhd")).trim();
		String reid = Util.null2String(request.getParameter("reid"));
		
		
		if(sapjhd.contains(";")){
			
			String[] sapjhds = sapjhd.split(";");
			sapjhd = "";
			for(int i = 0; i < sapjhds.length; i++){
				if(!sapjhds[i].equals("")){
					sapjhd += ",'" + sapjhds[i].trim() + "'";
				}
			}
			sapjhd = sapjhd.substring(1);
		} else {
			sapjhd = "'" + sapjhd + "'";
		}
		
		sql = "select a.requestid,a.bianhao,b.MX11 from formtable_main_310 a inner join formtable_main_310_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " where b.MX2 in ("+sapjhd+") and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		sql += " union all";
		sql += " select a.requestid,a.bianhao,b.MX11 from formtable_main_375 a inner join formtable_main_375_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " where b.MX27 in ("+sapjhd+") and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		
		rs.execute(sql);
		int cnt = 0;
		double zsj = 0;
		String dh = "";
		String bh = "";
		while (rs.next()) {
			zsj = zsj + Util.getDoubleValue(rs.getString("MX11").replaceAll(",", ""), 0);
			bh = Util.null2String(rs.getString("bianhao"));
			bh = bh.equals("") ? Util.null2String(rs.getString("requestid")) : bh;
			if (dh.equals("")) {
				cnt = cnt + 1;
				dh = bh;
			} else {
				if (("," + dh + ",").indexOf("," + bh + ",") == -1) {
					cnt = cnt + 1;
					dh = dh + "," + bh;
				}
			}
		}
		
		rel.put("cnt", cnt);
		rel.put("zsj", zsj);
		rel.put("dh", dh);
		rel.put("param", sapjhd);
		
		/*rel.put("cnt", 0);
		rel.put("zsj", 0);
		rel.put("dh", "");
		rel.put("param", "");*/
		out.println(rel);
	} else if(method.equals("getYdhBxXX")){
		
		String ydh = Util.null2String(request.getParameter("ydh")).trim();
		String reid = Util.null2String(request.getParameter("reid"));
		
		String sqlww = "";
		Map<String, String> hases = new HashMap<String, String>();
		
		if(ydh.contains(";")){
			String[] ydhs = ydh.split(";");
			ydh = "";
			for(int i = 0; i < ydhs.length; i++){
				if(!ydhs[i].equals("")){
					hases.put(ydhs[i].trim(), ydhs[i].trim());
					sqlww += " or b.MX13 like '%"+ydhs[i].trim()+"%'";
					//sqlww += " or b.MX13 = '"+ydhs[i].trim()+"'";
					ydh += ",'" + ydhs[i].trim() + "'";
				}
			}
			ydh = ydh.substring(1);
		} else {
			hases.put(ydh, ydh);
			sqlww += " or b.MX13 like '%"+ydh+"%'";
			//sqlww += " or b.MX13 = '"+ydh+"'";
			ydh = "'" + ydh + "'";
		}
		
		sqlww = "where 1 = 1 and (b.MX13 in ("+ydh+") "+sqlww+")";
		
		sql = "select a.requestid,a.bianhao,b.MX11,b.MX13 from formtable_main_310 a inner join formtable_main_310_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " "+sqlww+" and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		sql += " union all";
		sql += " select a.requestid,a.bianhao,b.MX11,b.MX13 from formtable_main_375 a inner join formtable_main_375_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " "+sqlww+" and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		
		rs.execute(sql);
		int cnt = 0;
		double zsj = 0;
		String dh = "";
		String bh = "";
		String ydd = "";
		while (rs.next()) {
			ydd = Util.null2String(rs.getString("MX13"));
			String[] _ydhs = ydd.split(";");
			boolean flag = false;
			for(int i = 0; i < _ydhs.length; i++){
				if(hases.containsKey(_ydhs[i].trim())){
					flag = true;
				}
			}
			
			// 存在重复的装箱单
			if(flag){
				zsj = zsj + Util.getDoubleValue(rs.getString("MX11").replaceAll(",", ""), 0);
				bh = Util.null2String(rs.getString("bianhao"));
				bh = bh.equals("") ? Util.null2String(rs.getString("requestid")) : bh;
				if (dh.equals("")) {
					cnt = cnt + 1;
					dh = bh;
				} else {
					if (("," + dh + ",").indexOf("," + bh + ",") == -1) {
						cnt = cnt + 1;
						dh = dh + "," + bh;
					}
				}
			}
		}
		
		rel.put("cnt", cnt);
		rel.put("zsj", zsj);
		rel.put("dh", dh);
		rel.put("param", ydh);
		
		/*rel.put("cnt", 0);
		rel.put("zsj", 0);
		rel.put("dh", "");
		rel.put("param", "");*/
		out.println(rel);
	} else if(method.equals("getJhdBxXX0725")){
		
		String sapjhd = Util.null2String(request.getParameter("sapjhd")).trim();
		String reid = Util.null2String(request.getParameter("reid"));
		
		
		if(sapjhd.contains(";")){
			
			String[] sapjhds = sapjhd.split(";");
			sapjhd = "";
			for(int i = 0; i < sapjhds.length; i++){
				if(!sapjhds[i].equals("")){
					sapjhd += ",'" + sapjhds[i].trim() + "'";
				}
			}
			sapjhd = sapjhd.substring(1);
		} else {
			sapjhd = "'" + sapjhd + "'";
		}
		
		sql = "select a.requestid,a.bianhao,b.MX11 from formtable_main_375 a inner join formtable_main_375_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " where b.MX27 in ("+sapjhd+") and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		sql += " union all";
		sql += " select a.requestid,a.bianhao,b.MX11 from formtable_main_310 a inner join formtable_main_310_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " where b.MX2 in ("+sapjhd+") and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		
		rs.execute(sql);
		int cnt = 0;
		double zsj = 0;
		String dh = "";
		String bh = "";
		while (rs.next()) {
			zsj = zsj + Util.getDoubleValue(rs.getString("MX11").replaceAll(",", ""), 0);
			bh = Util.null2String(rs.getString("bianhao"));
			bh = bh.equals("") ? Util.null2String(rs.getString("requestid")) : bh;
			if (dh.equals("")) {
				cnt = cnt + 1;
				dh = bh;
			} else {
				if (("," + dh + ",").indexOf("," + bh + ",") == -1) {
					cnt = cnt + 1;
					dh = dh + "," + bh;
				}
			}
		}
		
		rel.put("cnt", cnt);
		rel.put("zsj", zsj);
		rel.put("dh", dh);
		rel.put("param", sapjhd);
		
		/*rel.put("cnt", 0);
		rel.put("zsj", 0);
		rel.put("dh", "");
		rel.put("param", "");*/
		out.println(rel);
	} else if(method.equals("getYdhBxXX0725")){
		
		String ydh = Util.null2String(request.getParameter("ydh")).trim();
		String reid = Util.null2String(request.getParameter("reid"));
		
		String sqlww = "";
		Map<String, String> hases = new HashMap<String, String>();
		
		if(ydh.contains(";")){
			
			String[] ydhs = ydh.split(";");
			ydh = "";
			for(int i = 0; i < ydhs.length; i++){
				if(!ydhs[i].equals("")){
					hases.put(ydhs[i].trim(), ydhs[i].trim());
					sqlww += " or b.MX13 like '%"+ydhs[i].trim()+"%'";
					//sqlww += " or b.MX13 = '"+ydhs[i].trim()+"'";
					ydh += ",'" + ydhs[i].trim() + "'";
				}
			}
			ydh = ydh.substring(1);
		} else {
			hases.put(ydh, ydh);
			sqlww += " or b.MX13 like '%"+ydh+"%'";
			//sqlww += " or b.MX13 = '"+ydh+"'";
			ydh = "'" + ydh + "'";
		}
		
		sqlww = "where 1 = 1 and (b.MX13 in ("+ydh+") "+sqlww+")";
		
		sql = "select a.requestid,a.bianhao,b.MX11,b.MX13 from formtable_main_375 a inner join formtable_main_375_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " "+sqlww+" and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		sql += " union all";
		sql += " select a.requestid,a.bianhao,b.MX11,b.MX13 from formtable_main_310 a inner join formtable_main_310_dt4 b";
		sql += " on a.id=b.mainid inner join workflow_requestbase c on a.requestid=c.requestid";
		sql += " "+sqlww+" and a.requestId<>" + Util.getIntValue(reid, 0) + " and c.currentnodetype in (1,2,3)";
		
		rs.execute(sql);
		int cnt = 0;
		double zsj = 0;
		String dh = "";
		String bh = "";
		String ydd = "";
		
		while (rs.next()) {
			ydd = Util.null2String(rs.getString("MX13"));
			String[] _ydhs = ydd.split(";");
			boolean flag = false;
			for(int i = 0; i < _ydhs.length; i++){
				if(hases.containsKey(_ydhs[i].trim())){
					flag = true;
				}
			}
			
			if(flag){
				zsj = zsj + Util.getDoubleValue(rs.getString("MX11").replaceAll(",", ""), 0);
				bh = Util.null2String(rs.getString("bianhao"));
				bh = bh.equals("") ? Util.null2String(rs.getString("requestid")) : bh;
				if (dh.equals("")) {
					cnt = cnt + 1;
					dh = bh;
				} else {
					if (("," + dh + ",").indexOf("," + bh + ",") == -1) {
						cnt = cnt + 1;
						dh = dh + "," + bh;
					}
				}
			}
		}
		
		rel.put("cnt", cnt);
		rel.put("zsj", zsj);
		rel.put("dh", dh);
		rel.put("param", ydh);
		
		/*rel.put("cnt", 0);
		rel.put("zsj", 0);
		rel.put("dh", "");
		rel.put("param", "");*/
		out.println(rel);
	} else if(method.equals("updateLoanStatus")){
		
		String loankey = Util.null2String(request.getParameter("loankey")).trim();

		sql = "update udt_employee_loan set isconfirm = 1 where vendor + enddate + account + companycode + currency = '"+loankey+"')";
		
		if(rs.execute(sql)){
			rel.put("code", "1");
			rel.put("msg", "确认成功");
		} else {
			rel.put("code", "0");
			rel.put("msg", "确认失败，请联系管理员！");
		}
		
		out.println(rel);
	} else if(method.equals("getDbNo")){
		
		String zzdy = Util.null2String(request.getParameter("zzdy")).trim();
		String rq = Util.null2String(request.getParameter("rq")).trim();

		rq = rq.substring(0,4);
		
		String newcode = "";
		String code = "";
		sql = "select value from formtable_main_453 where lx = 2 and id = '"+zzdy+"'";
		rs.execute(sql);
		if(rs.next()){
			code = Util.null2String(rs.getString("value"));
			
			sql = "select count(1) + 1 from formtable_main_456 where substring(rq,0,5) = '"+rq+"' and zzdy = '"+zzdy+"'";
			
			rs.execute(sql);
			if(rs.next()){
				newcode = rq + "-" + code + "-" + Util.null2String(rs.getString(1));
			}
			
		}
		
		if(!newcode.equals("")){
			rel.put("code", "1");
			rel.put("msg", newcode);
		} else {
			rel.put("code", "0");
			rel.put("msg", "获取失败，请联系管理员！");
		}
		
		out.println(rel);
	} else if(method.equals("getZbDescr")){
		
		String yjbm = Util.null2String(request.getParameter("yjbm")).trim();
		String zbdl = Util.null2String(request.getParameter("zbdl")).trim();
		
		String newcode = "";
		sql = "select descr from formtable_main_458 where id = '"+yjbm+"'";
		rs.execute(sql);
		if(rs.next()){
			newcode = Util.null2String(rs.getString("descr"));
			
			sql = "select descr from formtable_main_458 where id = '"+zbdl+"'";
			
			rs.execute(sql);
			if(rs.next()){
				newcode = newcode + "-" + Util.null2String(rs.getString("descr"));
			}
			
		}
		
		if(!newcode.equals("")){
			rel.put("code", "1");
			rel.put("msg", newcode);
		} else {
			rel.put("code", "0");
			rel.put("msg", "获取失败，请联系管理员！");
		}
		
		out.println(rel);
	} else if(method.equals("clearjf")){
		
		rel.put("code", "0");
		rel.put("msg", "清除成功");
		
		String requestid = Util.null2String(request.getParameter("requestid")).trim();
		String tabledt = "";
		String workflowid = "";
		
		sql = "select workflowid from workflow_requestbase where requestid = '"+requestid+"'";
		rs.execute(sql);
		if(rs.next()){
			workflowid = Util.null2String(rs.getString("workflowid"));
		}
		
		if(!workflowid.equals("")){
			sql = "select tablename  from workflow_bill where id = (select formid from workflow_base where id = '"+workflowid+"')";
			rs.execute(sql);
			if(rs.next()){
				tabledt = Util.null2String(rs.getString("tablename"));
			}		
		
			if(!tabledt.equals("")){
				String rid = "";
				sql = "select id from "+tabledt+" where requestid = '"+requestid+"'";
				rs.execute(sql);
				if(rs.next()){
					rid = Util.null2String(rs.getString("id"));
				}
		
				if(workflowid.equals("221")){
					tabledt = tabledt + "_dt1";
				}

				sql = "delete from "+tabledt+" where mainid = '"+rid+"'";
				//if(!rs.execute(sql)){
					rel.put("code", "200");
					rel.put("msg", "清除失败:" + sql);
				//}
			}
		}
		
		out.println(rel);
	} else if(method.equals("getTfFac")){
		
		String tfFac = "";
		sql = "select stuff((select ',' + convert(varchar,id) from HrmDepartment";
		sql += " where 1 = 1 and (subcompanyid1 in (select id from dbo.GetSubcomIdsTreeWithSelf(34)) or departmentname like '%陶瓷%') for xml path('')), 1, 1, '')";
		rs.execute(sql);
		if(rs.next()){
			tfFac = Util.null2String(rs.getString(1));
		}
		
		if(!tfFac.equals("")){
			rel.put("code", "1");
			rel.put("msg", tfFac);
		} else {
			rel.put("code", "0");
			rel.put("msg", "获取失败，请联系管理员！");
		}
		
		out.println(rel);
	} else if(method.equals("get0732bank")){
		String requestid = Util.null2String(request.getParameter("requestid")).trim();
		sql = "select top 1 bankno,BANKNAME,fhmc,ACCOUNTNO,zhmc,MX27,MX5 from formtable_main_310_dt4 where mainid = (select id from formtable_main_310 where requestId = '"+requestid+"')";
		rs.execute(sql);
		if(rs.next()){
			rel.put("code", "1");
			rel.put("pp1", rs.getString(1));
			rel.put("pp2", rs.getString(2));
			rel.put("pp3", rs.getString(3));
			rel.put("pp4", rs.getString(4));
			rel.put("pp5", rs.getString(5));
			rel.put("pp6", rs.getString(6));
			rel.put("pp7", rs.getString(7));
		} else {
			rel.put("code", "0");
			rel.put("pp1", "");
			rel.put("pp2", "");
			rel.put("pp3", "");
			rel.put("pp4", "");
			rel.put("pp5", "");
			rel.put("pp6", "");
			rel.put("pp7", "");
		}
		
		out.println(rel);
	} else if(method.equals("getposAddress")){
		LinkedHashMap<String, List<Map<String,String>>> dataMap = new LinkedHashMap<String, List<Map<String,String>>>();
		List<Map<String,String>> datas;
		Map<String,String> data;
		
		datas = new ArrayList<Map<String,String>>();
		sql = "select case when country = point then country else country + ' ' + point end,code,forenetaddr,internetaddr from pos_point where region = '东非' order by country";
		rs.execute(sql);
		while(rs.next()){
			
			data = new HashMap<String,String>();
			data.put("country", rs.getString(1));
			data.put("scope", rs.getString(2));
			data.put("forenetaddr", rs.getString(3));
			data.put("internetaddr", rs.getString(4));
			datas.add(data);
		}
		dataMap.put("e",datas);
		
		datas = new ArrayList<Map<String,String>>();
		sql = "select case when country = point then country else country + ' ' + point end,code,forenetaddr,internetaddr from pos_point where region = '西非' order by country";
		rs.execute(sql);
		while(rs.next()){
			
			data = new HashMap<String, String>();
			data.put("country", rs.getString(1));
			data.put("scope", rs.getString(2));
			data.put("forenetaddr", rs.getString(3));
			data.put("internetaddr", rs.getString(4));
			datas.add(data);
		}
		dataMap.put("w",datas);
		
		rel.put("data", JSON.toJSONString(dataMap));
		out.println(rel);
	} else if(method.equals("getkzfw")){
		
		String costno = Util.null2String(request.getParameter("costno"));
		
		SAPConn sapconn = new SAPConn("");
		JCO.Client sapconnection = sapconn.getConnection();
		JCO.Repository mRepository;
		JCO.Function jcoFunction = null;

		try {
			mRepository = new JCO.Repository("Z_OSAP_GET_COSTCENTER", sapconnection);
			IFunctionTemplate ft = mRepository.getFunctionTemplate("Z_OSAP_GET_COSTCENTER");

			jcoFunction = new JCO.Function(ft);
			JCO.ParameterList input = jcoFunction.getImportParameterList();
			input.setValue(costno, "KOSTL"); // 成本中心
			
			sapconnection.execute(jcoFunction);
			ParameterList output = jcoFunction.getTableParameterList();
			Table tables_out = output.getTable("T_DATA");

			String KOKRS = "";
			String GSBER = "";
			
			for (int i = 0; i < tables_out.getNumRows(); i++) {
				tables_out.setRow(i);
				KOKRS = tables_out.getString("FUNC_AREA").trim();
				GSBER = tables_out.getString("GSBER").trim();
			}
			
			rel.put("code", "1");
			rel.put("KOKRS", KOKRS);
			rel.put("GSBER", GSBER);
		}
		catch (Exception e) {
			rel.put("code", "0");
			rel.put("KOKRS", "");
			rel.put("GSBER", "");
		}
		finally {
			sapconn.releaseC(sapconnection);
		}

		out.println(rel);
	}
	
	out.flush();
	out.close();
 %>

```

