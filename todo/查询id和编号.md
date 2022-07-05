```sql
SELECT
	t.* ,
	wr.requestname 
FROM
	(
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_125 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_202 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_131 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_350 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_177 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_407 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_310 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_166 UNION ALL
	SELECT
		requestId,
		bianhao 
	FROM
		formtable_main_125 
	) t
	LEFT JOIN workflow_requestbase wr ON t.requestId= wr.requestid
```

![image-20220506102559992](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220506102559992.png)







```sql
1=1  ${if(len(point) == 0,"","and fendian= '" +point + "'")} 

fendian='${point}' 

```

